# 📖 Biblioteca IPD

Sistema de gerenciamento de biblioteca para Igreja Presbiteriana.

## Funcionalidades

- **Página inicial** com citações bíblicas rotativas, busca, novos livros e mais procurados
- **Acervo completo** com filtros por título, categoria e status
- **Página do livro** com detalhes, solicitação de empréstimo, fila de espera e comentários
- **Painel administrativo** com:
  - Dashboard com estatísticas
  - Gerenciamento de solicitações (aprovar/rejeitar)
  - Controle de empréstimos e devoluções
  - Cadastro e edição de livros
  - Alertas de atraso em vermelho

## Identidade Visual

- **Verde IPD:** `#0F5C34`
- **Tipografia:** Merriweather (títulos) + Inter (corpo)

## Estrutura

```
BibliotecaIPD/
├── index.html          ← Página inicial
├── css/
│   └── style.css
├── js/
│   ├── data.js         ← Camada de dados (localStorage)
│   └── app.js          ← Helpers de UI
└── pages/
    ├── acervo.html     ← Catálogo completo
    ├── livro.html      ← Detalhe do livro
    └── admin.html      ← Painel administrativo
```

## Como usar

Abra o `index.html` em qualquer navegador. Os dados ficam salvos no `localStorage` do navegador.

> **Privacidade:** CPFs são armazenados mascarados (ex: `123.***.***-45`).
