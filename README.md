
# LUMIÈRE

### E-commerce fictício de bolsas premium desenvolvido como projeto de portfólio

<div align="center">

<br>

<p>
  <img src="./assets/images/github/lumiere-preview.png" alt="Lumière Preview" width="100%">
</p>

<br>

![Status](https://img.shields.io/badge/Status-Concluído-22C55E?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-Semântico-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Modular-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Responsivo](https://img.shields.io/badge/Responsivo-Mobile%20First-2563EB?style=for-the-badge)
![Acessibilidade](https://img.shields.io/badge/Acessibilidade-WCAG%20Oriented-7C3AED?style=for-the-badge)
![Checkout](https://img.shields.io/badge/Checkout-4%20Etapas-0F766E?style=for-the-badge)
![Web Storage](https://img.shields.io/badge/Web%20Storage-localStorage%20%26%20sessionStorage-F97316?style=for-the-badge)

</div>

---

O projeto oferece uma jornada completa de compra, desde a descoberta dos produtos até a confirmação de um pedido simulado, utilizando apenas tecnologias nativas da web. Não há backend, autenticação, banco de dados ou processamento real de pagamentos.

## ✨ Destaques

- Jornada completa de compra (Home → Carrinho → Checkout → Confirmação)
- Catálogo de produtos renderizado dinamicamente
- Sistema de favoritos com persistência
- Estado global do carrinho compartilhado entre todas as páginas
- Checkout demonstrativo em quatro etapas
- Layout responsivo para desktop, tablet e mobile
- Implementação com foco em acessibilidade
- Arquitetura modular em HTML, CSS e JavaScript
- Persistência utilizando Web Storage API

---

## 🎯 Objetivos do projeto

- Desenvolver uma experiência completa de e-commerce Front-end.
- Aplicar princípios de arquitetura e organização de código.
- Praticar gerenciamento de estado sem o uso de frameworks.
- Construir componentes reutilizáveis e de fácil manutenção.
- Aplicar boas práticas de acessibilidade e experiência do usuário.
- Simular um fluxo realista de compra.

---

## 📑 Índice

- [Visão geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Fluxo do usuário](#fluxo-do-usuário)
- [Arquitetura](#arquitetura)
- [Persistência](#persistência)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Tecnologias e serviços](#tecnologias-e-serviços)
- [Execução local](#execução-local)
- [Limites da simulação](#limites-da-simulação)
- [Melhorias futuras](#melhorias-futuras)
- [Autoria](#autoria)

---

## Visão geral

A Lumière combina uma identidade visual minimalista com uma arquitetura conservadora, baseada apenas em tecnologias nativas da web. Produtos, favoritos, carrinho, newsletter e checkout são implementados no navegador, com persistência local somente onde ela é necessária.

Estado atual:

- três páginas: Home, carrinho e checkout;
- dez produtos cadastrados em uma fonte central;
- carrinho compartilhado entre contador, mini carrinho, página completa e checkout;
- checkout demonstrativo em quatro etapas;
- layouts adaptados para desktop, tablet e mobile.

  ## Funcionalidades

A Lumière foi desenvolvida para simular uma experiência completa de compra em um e-commerce, priorizando organização de código, reutilização de componentes, acessibilidade e uma experiência consistente entre todas as páginas.

### 🛍️ Home e catálogo

- Hero com CTA para a coleção em destaque.
- Featured Collection renderizada dinamicamente a partir da coleção ÉTOILE.
- Seções Benefits, Story, Categories, Products e Newsletter.
- Catálogo completo com dez produtos renderizados dinamicamente.
- Filtros por categoria (`Todos`, `Shoulder`, `Tote`, `Mini` e `Crossbody`).
- Integração entre os cards de Categories e os filtros do catálogo.
- Rolagem automática até a seção Products respeitando `prefers-reduced-motion`.
- Reutilização do mesmo Product Card na Featured Collection e no catálogo.

---

### ❤️ Favoritos

- Adição e remoção utilizando delegação de eventos.
- Persistência dos produtos favoritados com validação defensiva.
- Sincronização visual entre produtos repetidos na Featured Collection e no catálogo.
- Restauração automática do estado após filtros e novas renderizações.
- Atualização dinâmica de `aria-pressed` e do nome acessível dos controles.

---

### 🛒 Carrinho

- Adição de produtos diretamente pelos Product Cards.
- Mini carrinho lateral com overlay, estado vazio, subtotal, alteração de quantidades e remoção de itens.
- Fechamento por botão, clique no overlay ou tecla `Escape`.
- Contenção e restauração de foco para melhor acessibilidade.
- Contador global baseado na soma das quantidades válidas.
- Página completa do carrinho com atualização de quantidades, remoção de produtos e resumo financeiro.
- Frete fixo de R$ 25,00 para pedidos válidos e frete gratuito para carrinhos vazios.
- Botão **Finalizar compra** habilitado apenas quando existem produtos válidos.
- Sincronização automática entre abas utilizando o evento `storage`.
- Estado, persistência, cálculos e ações centralizados em `js/cart.js`.

---

### 💳 Checkout demonstrativo

- Fluxo em página única dividido em quatro etapas:
  - Dados e entrega
  - Pagamento
  - Revisão
  - Confirmação
- Redirecionamento automático para o carrinho quando não existem produtos válidos.
- Validação independente para cada etapa.
- Mensagens locais de erro e foco automático no primeiro campo inválido.
- Máscaras para telefone e CEP.
- Consulta automática ao ViaCEP utilizando `fetch`.
- Preenchimento inteligente de endereço sem sobrescrever informações inseridas manualmente.
- Modalidades demonstrativas de pagamento (Pix, Cartão e Boleto), sem coleta de dados financeiros.
- Revisão do pedido construída utilizando os mesmos helpers centrais do carrinho.
- Proteção contra envio duplicado.
- Estado temporário **"Confirmando..."** durante o processamento.
- Snapshot do pedido mantido apenas em memória.
- Número fictício de pedido.
- Limpeza centralizada do carrinho apenas após confirmação bem-sucedida.

---

### 📧 Newsletter

- Validação de e-mail.
- Normalização dos dados armazenados.
- Prevenção de inscrições duplicadas.
- Persistência utilizando Web Storage.
- Toast reutilizável com região de status acessível.

---

### ♿ Responsividade e acessibilidade

- Layout adaptado para desktop, tablet e smartphone.
- Breakpoints em **992 px**, **768 px** e **425 px**.
- Home, Carrinho e Checkout responsivos.
- Menu mobile acessível com suporte à tecla `Escape`.
- HTML semântico.
- Labels visíveis.
- Uso de `fieldset` e `legend` no formulário de pagamento.
- Implementação de `aria-current`, `aria-invalid`, `aria-describedby`, `aria-live`, `aria-busy`, `hidden` e `disabled`.
- Navegação completa por teclado.
- Gerenciamento de foco entre componentes e formulários.
- Respeito à preferência do usuário para redução de movimento (`prefers-reduced-motion`).

  ## Fluxo do usuário

A jornada principal simulada pela aplicação segue o fluxo abaixo:

```text
Home
   │
   ▼
Featured Collection
   │
   ▼
Story
   │
   ▼
Categories
   │
   ▼
Products
   │
   ▼
Mini Cart
   │
   ▼
Cart
   │
   ▼
Checkout
   │
   ▼
Confirmação
```

Na ordem real do DOM, a Home apresenta as seguintes seções:

- Hero
- Featured Collection
- Benefits
- Story
- Categories
- Products
- Newsletter
- Footer

A seção **Benefits** atua como um bloco de confiança entre a apresentação da coleção e a história da marca.

---

# Arquitetura

## HTML

| Arquivo | Responsabilidade |
|---------|------------------|
| `index.html` | Descoberta da marca, catálogo, favoritos, newsletter e mini carrinho |
| `cart.html` | Revisão e edição do carrinho |
| `checkout.html` | Fluxo de checkout em quatro etapas |

---

## CSS

A organização dos estilos segue uma arquitetura modular:

- `css/base/` → Reset, tipografia e regras globais.
- `css/layout/` → Estrutura das seções da Home.
- `css/components/` → Componentes reutilizáveis.
- `css/pages/` → Estilos exclusivos do Carrinho e Checkout.
- `responsive.css` → Responsividade geral.
- `cart-responsive.css` → Ajustes específicos do carrinho.
- `checkout-responsive.css` → Ajustes específicos do checkout.
- `variables.css` → Tokens de cor, tipografia, espaçamentos, sombras e layout.

---

## JavaScript

| Arquivo | Responsabilidade |
|---------|------------------|
| `products.js` | Fonte de dados, renderização, filtros, categorias e favoritos |
| `cart.js` | Estado global do carrinho, persistência, cálculos e mini carrinho |
| `cart-page.js` | Funcionalidades exclusivas da página do carrinho |
| `checkout.js` | Fluxo do checkout, validações, ViaCEP e confirmação |
| `newsletter.js` | Newsletter |
| `main.js` | Header e comportamentos globais |
| `js/components/` | Menu mobile e Toast |

O carrinho mantém uma única referência compartilhada em `window.cart`.

Todas as alterações passam pelas ações centrais, preservando a referência compartilhada, sincronizando persistência, contador global e todas as interfaces que consomem esse estado.

O checkout reutiliza diretamente os helpers do carrinho (`getCartProducts()`, `getCartSubtotal()`, `getShippingCost()`, `getOrderTotal()`, `formatPrice()` e `clearCart()`), evitando duplicação de lógica.

---

# Persistência

| Armazenamento | Chave | Conteúdo |
|---------------|-------|----------|
| `localStorage` | `lumiereCart` | Itens válidos do carrinho |
| `localStorage` | `lumiereFavorites` | IDs dos produtos favoritados |
| `localStorage` | `lumiereNewsletter` | E-mails cadastrados |
| `sessionStorage` | `lumiereCheckoutDraft` | Rascunho temporário do checkout |

As leituras são defensivas: JSON inválido ou tipos incompatíveis retornam estados seguros.

Dados financeiros não são armazenados.

---

# Estrutura do projeto

```text
lumiere-bags/
├── assets/
│   └── images/
│       ├── categories/
│       ├── github/
│       │   └── lumiere-preview.png
│       ├── hero/
│       └── products/
├── css/
│   ├── base/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── responsive.css
│   ├── cart-responsive.css
│   ├── checkout-responsive.css
│   ├── style.css
│   └── variables.css
├── js/
│   ├── components/
│   ├── cart-page.js
│   ├── cart.js
│   ├── checkout.js
│   ├── main.js
│   ├── newsletter.js
│   └── products.js
├── assets/
├── index.html
├── cart.html
├── checkout.html
├── project.md
└── README.md
```

---

# Tecnologias e serviços

| Front-end | APIs | Bibliotecas |
|-----------|------|-------------|
| HTML5 | ViaCEP | Bootstrap 5 |
| CSS3 Modular | Fetch API | Bootstrap Icons |
| JavaScript (ES6+) | Web Storage API | Google Fonts |

O projeto utiliza apenas tecnologias nativas da web.

Não há processo de build, bundlers, frameworks JavaScript ou gerenciadores de pacotes.

---

# Execução local

Basta servir a raiz do projeto utilizando um servidor HTTP local (como a extensão **Live Server**) e abrir `index.html`.

O uso de um servidor é recomendado porque o checkout realiza consultas ao ViaCEP utilizando `fetch`.

---

# Limites da simulação

- Nenhuma cobrança é realizada.
- Não existe backend.
- Não existe autenticação.
- Não existe banco de dados.
- O número do pedido é apenas ilustrativo.
- Frete e disponibilidade são simulados.

---

# Melhorias futuras

- Página individual de produto.
- Sistema de cupons.
- Microinterações adicionais.
- Testes automatizados.
- Sincronização em tempo real do checkout entre abas.
- Backend e autenticação para transformar o projeto em uma aplicação completa.

---

# Autoria

Desenvolvido por **Ruth Emilly dos Anjos Paulino** como projeto de portfólio Front-end.

Caso tenha gostado do projeto, considere deixar uma ⭐ no repositório.
