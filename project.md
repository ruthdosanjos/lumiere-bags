# 📁 project.md — LUMIÈRE

# 👜 Visão Geral

**LUMIÈRE** é um e-commerce fictício de bolsas com estética minimalista e sofisticada, desenvolvido como projeto de portfólio front-end.

O objetivo é simular uma marca de moda premium com experiência de navegação moderna, inspirada em e-commerces de luxo e landing pages contemporâneas.

---

# 🎯 Objetivos

* Construir um e-commerce visualmente forte para portfólio.
* Demonstrar domínio de HTML5, CSS3 modular e JavaScript Vanilla.
* Criar uma interface elegante, responsiva e reutilizável.
* Simular uma marca real com identidade visual consistente.
* Evoluir futuramente para React utilizando a arquitetura atual como base.

---

# 🧱 Status do Projeto

## ✅ Concluído

## Estrutura

* Organização completa das pastas do projeto.
* Arquitetura modular de CSS.
* Estrutura modular de JavaScript.
* Organização dos assets por categoria.
* Design System com variáveis de cores, tipografia e espaçamentos.

---

# Header

Implementado:

* Navbar fixa.
* Efeito Glassmorphism ao scroll.
* Navegação por âncoras.
* Botões de ações preparados para futuras funcionalidades.
* Estrutura semântica com acessibilidade.

---

# Hero

Finalizado:

* Layout responsivo.
* Headline principal.
* CTA principal.
* Imagem hero otimizada.
* Tipografia alinhada ao posicionamento premium da marca.

---

# Featured Collection

Seção de produtos em destaque finalizada.

Coleção criada:

### Aurora

* Elegância natural.
* Tons claros e sofisticados.
* Representa leveza e novos começos.

### Celeste

* Design contemporâneo.
* Personalidade urbana.
* Representa confiança e modernidade.

### Élise

* Estética clássica e delicada.
* Inspiração artesanal.
* Representa feminilidade atemporal.

### Noire

* Peça assinatura da coleção.
* Luxo discreto.
* Representa sofisticação e poder.

Implementado:

* Product Cards reutilizáveis.
* Grid responsivo.
* Hover animations.
* Botão de favoritos.
* Estrutura preparada para integração futura com JavaScript.

---

# Story

Seção institucional criada.

Objetivo:

Transmitir a filosofia da Lumière:

> Design pensado para acompanhar histórias.

Implementado:

* Layout dividido entre texto e imagem.
* Comunicação de marca.
* CTA direcionando para coleção.

---

# Benefits

Seção de benefícios finalizada.

Destaques:

* Materiais Premium.
* Design Atemporal.
* Acabamento Cuidadoso.
* Entrega Nacional.

Objetivo:

Construir confiança e reforçar percepção de valor.

---

# Categories

Seção de categorias criada.

Categorias:

* Shoulder Bags
* Tote Bags
* Mini Bags
* Crossbody Bags

Características:

* Grid assimétrico.
* Cards com diferentes proporções.
* Overlay com gradiente.
* Hover com zoom da imagem.

Direção visual:

As imagens foram criadas seguindo uma mesma identidade de coleção, mantendo:

* Mesmo estilo fotográfico.
* Mesmo acabamento premium.
* Mesma linguagem visual.
* Mesma atmosfera de marca.

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
│       ├── hero/
│       ├── products/
│       └── categories/
│
├── css/
│   ├── base/
│   ├── components/
│   ├── layout/
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

**"Luz + Sofisticação"**

A interface prioriza:

* Espaço negativo.
* Tipografia elegante.
* Hierarquia visual.
* Componentes reutilizáveis.
* Consistência visual.
* Experiência premium.

---

# 🧠 Arquitetura

## Tecnologias

* HTML5
* CSS3 Modular
* JavaScript Vanilla
* Bootstrap (ícones e utilidades pontuais)

---

# Organização CSS

```text
base/
layout/
components/
responsive.css
style.css
variables.css
```

---

# Organização JavaScript

```text
main.js
products.js
cart.js
```

---

# Componentes criados

## Layout

* Header
* Hero
* Featured Collection
* Story
* Benefits
* Categories

## Componentes

* Buttons
* Product Card
* Category Card
* Benefit Card
* Badges

---

# ✨ Melhorias implementadas

## Performance

* Uso de `loading="lazy"` em imagens secundárias.
* Uso de `loading="eager"` no Hero.
* Uso de `decoding="async"` nas imagens.
* Organização dos assets por contexto.

---

## Acessibilidade

Implementado:

* Uso de landmarks semânticas (`header`, `main`, `section`, `article`, `footer`).
* Hierarquia correta de headings.
* `aria-label` em elementos interativos.
* Textos alternativos descritivos nas imagens.

---

## Product Cards

Estrutura preparada para evolução.

Inclui:

* Hover.
* Escala de imagem.
* Favoritos.
* Design System.
* Aspect Ratio.
* Estrutura compatível com futura migração para React.

---

# 🚧 Próximos Passos

## Curto prazo

* Refinar microinterações.
* Ajustar detalhes visuais finais.
* Implementar comportamento dos favoritos.
* Finalizar responsividade completa.
* Revisar experiência geral da landing page.

---

## Médio prazo

* Criar catálogo completo de produtos.
* Implementar lógica de carrinho.
* Integrar dados dos produtos via JavaScript.
* Criar Newsletter.
* Finalizar Footer completo.

---

## Longo prazo

* Migração para React.
* Componentização completa.
* Catálogo dinâmico.
* Integração com API simulada.
* Persistência de carrinho.

---

# 📌 Status Geral

O projeto ultrapassou a fase inicial de estruturação e atualmente possui uma landing page completa com identidade visual consolidada.

A Lumière já apresenta:

* Marca definida.
* Sistema visual consistente.
* Hero finalizado.
* Coleção em destaque.
* Story institucional.
* Benefícios.
* Categorias de produtos.
* Estrutura preparada para evolução funcional.

O foco atual passa a ser o refinamento da experiência, implementação das funcionalidades de e-commerce e preparação da arquitetura para uma futura migração para React.
