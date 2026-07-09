
# 👜 LUMIÈRE

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue)
![Tecnologias](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20Modular%20%7C%20JS%20Vanilla-orange)

A **LUMIÈRE** é um e-commerce fictício de bolsas com estética minimalista e sofisticada. O projeto foi idealizado para simular a experiência de navegação de uma marca de moda de luxo, unindo um design de alto padrão a uma engenharia de software robusta no front-end.

Mais do que uma interface bonita, este projeto demonstra o domínio de **fundamentos sólidos em Web Development**, focado em performance, semântica, acessibilidade e arquitetura de código escalável.

---

## 🎯 Diferenciais Técnicos (O que este projeto demonstra)

Em vez de utilizar frameworks pesados, a LUMIÈRE foi construída do zero utilizando tecnologias nativas, aplicando boas práticas de mercado que garantem a sustentabilidade do código:

* **Arquitetura CSS Modular (SMACSS/ITCSS adaptado):** Código CSS totalmente desacoplado e organizado por responsabilidade (`base`, `layout`, `components`), evitando especificidade descontrolada e facilitando a manutenção.
* **Foco total em Acessibilidade (a11y):** Uso rigoroso de landmarks semânticas (`<header>`, `<main>`, `<section>`, `<article>`), atributos `aria-label` em elementos interativos e contraste visual planejado.
* **Otimização de Performance:** Estratégia de carregamento de mídia utilizando `loading="lazy"` para imagens secundárias e `loading="eager"` com prioridade para o Hero banner (LCP).
* **Componentização e Mentalidade React:** Os elementos de UI (como o *Product Card*) foram desenhados de forma isolada e estruturada, preparando o projeto para uma migração suave para React no futuro.

---

## 🛠️ Tecnologias e Ferramentas

* **HTML5** (Semântico e acessível)
* **CSS3** (Variáveis nativas, Flexbox, Grid e estrutura modular)
* **JavaScript Vanilla** (Lógica de negócios, manipulação de DOM e gerenciamento de estado do carrinho)
* **Bootstrap** (Utilizado estritamente para ícones e utilitários de espaçamento, preservando a leveza do projeto)

---

## 📂 Estrutura do Projeto

A organização de pastas reflete uma estrutura profissional e limpa:

```text
lumiere/
├── index.html          # Estrutura principal semântica
├── project.md          # Documentação interna de acompanhamento
├── assets/             # Imagens organizadas por contexto (brand, hero, products)
├── css/
│   ├── base/           # Resets, globais e tipografia
│   ├── components/     # UI isolada (buttons, cards, badges)
│   ├── layout/         # Seções estruturais (header, hero, featured)
│   ├── variables.css   # Design System (Cores, fontes, sombras)
│   └── style.css       # Centralizador de imports
└── js/
    ├── main.js         # Inicialização e escopo global
    ├── products.js     # Estrutura e dados dos produtos
    └── cart.js         # Lógica do carrinho de compras
```
---
## 🚀 Próximos Passos na Roadmap
[ ] Finalizar o catálogo dinâmico renderizado via JavaScript (desacoplamento de dados).

[ ] Implementar a lógica funcional do carrinho de compras (LocalStorage).

[ ] Criar animações de microinterações nos cards de produtos.

[ ] Futuro: Refatorar a aplicação completa para React, aproveitando a atual arquitetura de componentes.

## 🧾 Nota sobre o Histórico do Projeto
Este projeto nasceu originalmente em 2023 durante a Formação em Web Design – Instituto NU by Descomplica. Após perder o acesso total à minha conta antiga do GitHub, decidi não apenas recuperar a ideia original, mas reestruturá-la completamente do zero.

O código atual reflete minha evolução técnica recente, transformando um site estático antigo em uma aplicação front-end modular, performática e moderna.