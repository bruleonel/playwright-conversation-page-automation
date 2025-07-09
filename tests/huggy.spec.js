import { test } from '@playwright/test';
import { ConversationPage } from '../pages/ConversationPage.js';

test.describe('Desafio Huggy - Conversation Page', () => {
  let conversationPage;

  test.beforeEach(async ({ page }) => {
    conversationPage = new ConversationPage(page);
    await conversationPage.open();
  });

  test('Fluxo completo de atendimento Huggy', async () => {
    await conversationPage.fillContact({
      name: 'Bruna QA',
      countryCode: '+55',
      phone: '(41) 98015368',
      email: 'psbru2012@gmail.com'
    });

    await conversationPage.sendMessage('Oi');
    await conversationPage.sendMessage('Teste Huggy');
    await conversationPage.verifyResponse('Teste passou');

    await conversationPage.uploadImage('vida-de-gato.jpg');

    await conversationPage.finalizeConversation();

    await conversationPage.reopenConversation();

    await conversationPage.sendEmoji('😂');

    await conversationPage.sendTranscript('bruna.qa@example.com');
  });
});
