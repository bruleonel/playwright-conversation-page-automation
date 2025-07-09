# 🤖 Playwright Conversation Page Automation

Automação de testes E2E com Playwright para o fluxo de atendimento na Conversation Page da Huggy.

---

## 📌 Visão Geral

Este projeto automatiza o fluxo de atendimento, incluindo ações dentro de iframe, envio de transcrição por e-mail e finalização do atendimento, utilizando o padrão Page Object Model (POM) para melhor organização e manutenção.

---

## 🗂️ Estrutura do Projeto

```
.
├── pages/
│   └── ConversationPage.js      # Classe POM para interagir com a página de conversa
├── tests/
│   └── huggy.spec.js            # Teste E2E principal
├── playwright.config.js         # Configurações do Playwright
├── package.json                # Dependências e scripts npm
└── README.md                   # Este arquivo
```

---

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPO.git
cd SEU-REPO
```

2. Instale as dependências:

```bash
npm install
```

3. Instale os navegadores usados pelo Playwright:

```bash
npx playwright install
```

---

## 🚀 Como Executar

- Para rodar todos os testes no modo headless (sem interface):

```bash
npx playwright test
```

- Para rodar com o navegador visível (modo headed):

```bash
npx playwright test --headed
```

- Para rodar com debug interativo:

```bash
npx playwright test --debug
```

- Para abrir o relatório HTML dos testes:

```bash
npx playwright show-report
```

---

## Detalhes Técnicos

- A automação interage com elementos dentro de iframes usando `frame.locator()`.
- Quando há múltiplos elementos iguais, utiliza-se `.first()` ou `.nth()` para selecionar o correto.
- O uso de `waitFor` é fundamental para garantir que os elementos estejam visíveis e prontos para interação antes das ações.
- Há uso de pausas (`page.pause()`) para debug manual e inspeção.

---

## 🐞 Dicas para Debug

- Utilize `await page.pause()` no fluxo para pausar a execução e inspecionar a página.
- Configure screenshots e vídeos no `playwright.config.js` para melhor rastreamento de falhas.
- Use o comando `npx playwright codegen URL` para gerar seletores e scripts automáticos.
