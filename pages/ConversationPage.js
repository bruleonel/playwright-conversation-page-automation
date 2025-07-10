export class ConversationPage {
  constructor(page) {
    this.page = page;
    this.url = "https://www.huggy.chat/9a710192-8df6-490f-aba1-16986342aa4b";
  }

  async open() {
    await this.page.goto(this.url);
  }

  async getIframe() {
    const iframeElement = await this.page.waitForSelector(
      "iframe.powerzap_chat_canvas_iframe.opened",
      { timeout: 15000 }
    );
    const frame = await iframeElement.contentFrame();
    return frame;
  }

  async fillContact({ name, countryCode, phone, email }) {
    const frame = await this.getIframe();

    await frame.getByPlaceholder("Seu nome completo").first().fill(name);
    await frame.getByLabel("Código de país (DDI)").selectOption(countryCode);
    await frame.locator('input[type="tel"]').first().fill(phone);
    await frame.getByPlaceholder("Seu melhor e-mail").first().fill(email);
    await this.page.pause();
    await frame
      .locator('input[type="submit"][value="Iniciar atendimento"]')
      .first()
      .click();
  }

  async sendMessage(message) {
    const frame = await this.getIframe();

    const input = frame.locator("#input");
    await input.click();
    await input.fill("");
    await input.type(message);

    await input.focus();
    await this.page.pause();
    await this.page.keyboard.press("Enter");
  }

  async verifyResponse(expectedText) {
    const frame = await this.getIframe();
    await frame.getByText(expectedText).waitFor({ state: "visible" });
    await this.page.pause();
  }

  async uploadImage(imageName) {
    const frame = await this.getIframe();
    const fileInput = frame.locator('input[type="file"]');
    await fileInput.setInputFiles(`tests/fixtures/${imageName}`);
    await this.page.pause();
  }

  async finalizeConversation() {
    const frame = await this.getIframe();

    const optionsButton = frame.locator(
      'div.ChatForm-button.ChatForm-options-button[aria-label="Mais opções"]'
    );
    await optionsButton.waitFor({ state: "visible", timeout: 15000 });
    await optionsButton.click();

    await this.page.pause();

    const finalizeButton = frame.locator(
      'div[aria-label="Finalizar atendimento"]'
    );
    await finalizeButton.waitFor({ state: "visible", timeout: 15000 });
    await finalizeButton.click();
    await this.page.pause();
  }

  async reopenConversation() {
    const frame = await this.getIframe();
    await frame.waitForSelector("button.powerzap_finalize_reOpen", {
      state: "visible",
      timeout: 30000,
    });
    await frame.locator("button.powerzap_finalize_reOpen").click();
    await this.page.pause();
  }

  async sendEmoji(emoji) {
    const frame = await this.getIframe();

    const input = frame.locator("#input");
    await input.click();
    await input.fill("");
    await input.type(emoji);

    await this.page.keyboard.press("Enter");
    await this.page.pause();
  }

  async sendTranscript(email) {
    const frame = await this.getIframe();

    const optionsButton = frame.locator(
      'div.ChatForm-button.ChatForm-options-button[aria-label="Mais opções"]'
    );
    await optionsButton.waitFor({ state: "visible", timeout: 15000 });
    await optionsButton.click();

    const emailButton = frame
      .locator('div[aria-label="Enviar por e-mail"]')
      .first();
    await emailButton.waitFor({ state: "visible", timeout: 15000 });
    await emailButton.click();

    const emailInputs = frame.locator('input[aria-label="Seu melhor e-mail"]');
    const count = await emailInputs.count();
    console.log(`Achou ${count} inputs`);

    for (let i = 0; i < count; i++) {
      const el = emailInputs.nth(i);
      if (await el.isVisible()) {
        await el.waitFor({ state: "visible" });
        await el.fill(email);
        break;
      }
      await this.page.pause();
    }

    const sendEmailButton = frame.locator(
      'input[aria-label="Enviar por e-mail"][type="submit"]'
    );
    await sendEmailButton.waitFor({ state: "visible" });
    await sendEmailButton.click();
    await this.page.pause();
  }
}
