# 📁 project.md — LUMIÈRE

# 👜 Visão Geral

**LUMIÈRE** é um e-commerce fictício de bolsas com estética minimalista e sofisticada, desenvolvido como projeto de portfólio front-end.

O objetivo é simular uma marca de moda premium com experiência de navegação moderna, inspirada em e-commerces de luxo e landing pages SaaS.

---

# 🎯 Objetivos

* Construir um e-commerce visualmente forte para portfólio.
* Demonstrar domínio de HTML5, CSS3 modular e JavaScript Vanilla.
* Criar uma interface elegante, responsiva e reutilizável.
* Simular um produto real com identidade visual consistente.
* Evoluir futuramente para React com reaproveitamento da arquitetura atual.

---

# 🧱 Status do Projeto

## ✅ Concluído

### Estrutura

* Organização completa das pastas do projeto.
* Arquitetura modular de CSS.
* Estrutura modular de JavaScript.
* Organização dos assets por categoria.

### Header

* Navbar fixa.
* Efeito Glassmorphism ao scroll.
* Correção do problema de transparência.
* Compatibilidade com Bootstrap preservada.
* Navegação estruturada.

### Hero

* Hero section finalizada.
* Layout responsivo.
* CTA principal.
* Imagem otimizada.
* Tipografia definitiva.

### Featured Collection

Primeira seção de produtos implementada.

Contém:

* Cabeçalho da seção.
* Grid responsivo.
* Quatro Product Cards.
* Hover animations.
* Botão de favoritos.
* Estrutura preparada para futura integração com JavaScript.

---

# 📂 Estrutura Atual

```text
lumiere/
├── README.md
├── project.md
├── index.html
│
├── assets/
│   └── images/
│       ├── brand/
│       │   ├── favicon.ico
│       │   ├── logo.png
│       │   └── logoWhite.png
│       │
│       ├── hero/
│       │   ├── banner1.jpg
│       │   ├── banner2.jpg
│       │   ├── banner3.jpg
│       │   └── banner4.jpg
│       │
│       └── products/
│           ├── aurora.jpg
│           ├── celeste.jpg
│           ├── elise.jpg
│           └── noire.jpg
│
├── css/
│   ├── base/
│   │   ├── globals.css
│   │   ├── reset.css
│   │   └── typography.css
│   │
│   ├── components/
│   │   ├── badges.css
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   └── product-card.css
│   │
│   ├── layout/
│   │   ├── featured.css
│   │   ├── footer.css
│   │   ├── header.css
│   │   ├── hero.css
│   │   └── sections.css
│   │
│   ├── responsive.css
│   ├── style.css
│   └── variables.css
│
└── js/
    ├── cart.js
    ├── main.js
    └── products.js
```

---

# 🎨 Direção Visual

## Conceito

* Minimalista
* Elegante
* Premium
* Atemporal

## Inspirações

* E-commerce de luxo
* Landing Pages SaaS
* Apple
* COS
* Polène
* Cuyana

## Identidade

"Luz + Sofisticação"

A interface prioriza:

* Espaço negativo
* Tipografia elegante
* Hierarquia visual
* Componentes reutilizáveis
* Poucos elementos por tela

---

# 🧠 Arquitetura

## Tecnologias

* HTML5
* CSS3 Modular
* JavaScript Vanilla
* Bootstrap (apenas ícones e utilidades)

---

## Organização CSS

```text
base/
layout/
components/
responsive.css
style.css
variables.css
```

---

## Organização JavaScript

```text
main.js
products.js
cart.js
```

---

## Componentes criados

### Layout

* Header
* Hero
* Featured

### Componentes

* Buttons
* Product Card
* Badges
* Cards

---

# ✨ Melhorias implementadas

## Responsividade

Grid de produtos:

Desktop

```
4 colunas
```

Tablet

```
2 colunas
```

Mobile

```
1 coluna
```

---

## Product Card

Estrutura preparada para reutilização.

Inclui:

* Hover
* Escala da imagem
* Botão de favoritos
* Sombras utilizando Design System
* Aspect Ratio fixo
* Estrutura flexível para futuras ações
* Componentização visando futura migração para React

---

## Acessibilidade

* Uso de landmarks semânticas (`header`, `main`, `section`, `article`, `footer`).
* `aria-label` em botões e links interativos.
* Textos alternativos mais descritivos.
* Imagens secundárias com `loading="lazy"`.
* Hero com carregamento prioritário (`loading="eager"`).

---

# 🚧 Próximos Passos

## Curto prazo

* Refinar microinterações dos Product Cards.
* Implementar estado ativo do botão de favoritos.
* Finalizar a seção Featured.
* Revisar consistência visual da UI.

---

## Médio prazo

* Criar seção Categories.
* Criar vitrine completa de produtos.
* Construir seção Story.
* Implementar seção Benefits.
* Criar Newsletter.

---

## Longo prazo

* Carrinho funcional.
* Catálogo dinâmico via JavaScript.
* Dados dos produtos desacoplados do HTML.
* Migração para React.
* Integração com API simulada.

---

# 📌 Status Geral

O projeto deixou definitivamente a fase de estruturação inicial.

A arquitetura de HTML, CSS e JavaScript está consolidada e organizada em componentes reutilizáveis.

A interface principal (Header + Hero + Featured) encontra-se funcional, responsiva e alinhada à identidade visual proposta.

O foco das próximas etapas passa a ser a expansão da experiência do usuário por meio de novas seções, refinamento das microinterações e implementação da lógica da aplicação.
