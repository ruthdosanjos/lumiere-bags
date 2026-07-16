# 📁 project.md — LUMIÈRE

# 👜 Visão Geral

LUMIÈRE é um e-commerce fictício de bolsas com estética minimalista e sofisticada, desenvolvido como projeto de portfólio front-end.

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

---

# Estrutura

Implementado:

* Organização completa das pastas do projeto.
* Arquitetura modular de CSS.
* Estrutura modular de JavaScript.
* Organização dos assets por categoria.
* Design System com variáveis de cores, tipografia e espaçamentos.
* Separação de responsabilidades entre HTML, CSS e JavaScript.

---

# Header

Implementado:

* Navbar fixa reutilizável entre páginas.
* Header integrado ao index.html e cart.html.
* Efeito Glassmorphism ao scroll.
* Navegação por âncoras na página inicial.
* Links adaptados para navegação entre páginas.
* Botões de ações preparados para futuras funcionalidades.
* Estrutura semântica com acessibilidade.
* Contador do carrinho integrado ao sistema de compras.
* Atualização dinâmica conforme quantidade de produtos adicionados.
* Compartilhamento do estado do carrinho entre diferentes páginas.

Arquitetura:

Header  
↓  
cart.js  
↓  
Cart State  
↓  
localStorage  
↓  
Mini Cart / Cart Page

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

## Aurora

* Elegância natural.
* Tons claros e sofisticados.
* Representa leveza e novos começos.

## Celeste

* Design contemporâneo.
* Personalidade urbana.
* Representa confiança e modernidade.

## Élise

* Estética clássica e delicada.
* Inspiração artesanal.
* Representa feminilidade atemporal.

## Noire

* Peça assinatura da coleção.
* Luxo discreto.
* Representa sofisticação e poder.

Implementado:

* Product Cards reutilizáveis.
* Grid responsivo.
* Hover animations.
* Botão de favoritos funcional.
* Renderização dinâmica através do JavaScript.
* Dados dos produtos centralizados em uma única fonte.
* Estrutura preparada para expansão do catálogo.

---

# Catálogo de Produtos

Implementado:

* Sistema de produtos baseado em dados.
* Renderização automática dos cards.
* Criação de componentes reutilizáveis através da função createProductCard().
* Integração entre Featured Collection e catálogo completo.

Novos produtos adicionados para expansão do catálogo:

## Alba

* Design sofisticado e minimalista.
* Representa elegância discreta para o dia a dia.

## Serena

* Modelo funcional e contemporâneo.
* Representa equilíbrio entre estilo e praticidade.

## Stella

* Design marcante e refinado.
* Representa personalidade e presença.

## Vivienne

* Estética premium e feminina.
* Representa luxo atemporal.

Filtros implementados:

* Todos.
* Shoulder.
* Tote.
* Mini.
* Crossbody.

Também implementado:

* Estado vazio para categorias sem resultados.
* Atualização dinâmica dos produtos filtrados.
* Estrutura preparada para novos produtos.

---

# Sistema de Favoritos

Implementado utilizando JavaScript Vanilla e localStorage.

Funcionalidades:

* Adicionar produtos aos favoritos.
* Remover produtos dos favoritos.
* Atualização dinâmica do ícone de favorito.
* Estado salvo no navegador.
* Persistência após atualização da página.
* Sincronização entre produtos da Featured Collection e catálogo completo.

Estrutura:

Product Card  
↓  
Favorite Button  
↓  
Favorites State  
↓  
localStorage

Chave utilizada:

lumiereFavorites

---

# Botão de Compra

Implementado:

* Botão "Adicionar ao carrinho" integrado aos Product Cards.
* Identificação dos produtos através de data-product-id.
* Evento global de clique utilizando JavaScript Vanilla.
* Adição dinâmica dos produtos ao estado do carrinho.
* Feedback visual através de Toast de confirmação.

Fluxo implementado:

Product Card  
↓  
Add To Cart Button  
↓  
Cart State  
↓  
localStorage  
↓  
Mini Cart

---

# Sistema de Carrinho

Sistema completo de carrinho implementado utilizando JavaScript Vanilla e localStorage.

A arquitetura foi estruturada separando o estado do carrinho dos dados dos produtos e permitindo reutilização entre componentes e páginas diferentes.

O estado do carrinho possui uma única fonte de verdade compartilhada entre:

* Mini Carrinho.
* Página completa do carrinho.
* Contador do Header.


O carrinho mantém apenas as referências necessárias:

- productId.
- quantity.

Os dados completos dos produtos são recuperados através do products.js.

Fluxo implementado:

Product Card  
↓  
cart.js  
↓  
Cart State Global  
↓  
localStorage  
↓  
Header Counter  
↓  
Mini Cart  
↓  
cart-page.js  
↓  
Products Data  
↓  
Renderização da página completa


Funcionalidades atuais:

* Adicionar produtos ao carrinho.
* Incrementar quantidade automaticamente ao adicionar o mesmo produto novamente.
* Persistência dos dados no navegador.
* Atualização dinâmica do contador do header.
* Renderização do mini carrinho lateral.
* Página completa de carrinho.
* Busca dos dados dos produtos através do catálogo centralizado.
* Cálculo automático de subtotal, frete e valor total.
* Estado vazio quando não existem produtos adicionados.
* Controle de quantidade na página completa do carrinho.
* Remoção de produtos.
* Integração do Header entre index.html e cart.html.
* Reutilização do estado do carrinho entre páginas.
* Compartilhamento do estado através de window.cart.
* Separação entre lógica do mini carrinho e renderização da página completa.


Chave utilizada:

lumiereCart

---

# Mini Carrinho

Interface lateral criada para simular a experiência de compra de um e-commerce premium.

Implementado:

* Abertura através do botão do carrinho no header.
* Overlay de fundo para foco na interação.
* Controle visual de abertura e fechamento.
* Lista dinâmica dos produtos adicionados.
* Exibição de:
  * Imagem do produto.
  * Nome.
  * Coleção.
  * Preço.
  * Quantidade.
  * Valor total.

Estrutura preparada para evolução:

* Controle de quantidade.
* Remoção de produtos.
* Checkout.
* Página completa de carrinho.

---

# Página Completa do Carrinho

Página dedicada para revisão dos produtos antes do checkout.

Arquivo principal:

cart.html

Responsabilidades:

* Exibir produtos adicionados.
* Permitir alteração de quantidade.
* Permitir remoção de produtos.
* Exibir resumo financeiro.
* Calcular subtotal.
* Calcular frete.
* Calcular valor total.

Estrutura visual:

Cart Header

↓

Lista de Produtos

↓

Resumo do Pedido

↓

Finalização da Compra


Componentes criados:

## Cart Item

Responsável pela representação individual de cada produto.

Exibe:

* Imagem.
* Coleção.
* Nome.
* Preço.
* Quantidade.
* Controle de ações.


Arquivo:

css/components/cart/cart-item.css


---

## Cart Summary

Responsável pelo resumo financeiro.

Exibe:

* Subtotal.
* Frete.
* Total.
* Botão de checkout.
* Mensagem de segurança da compra.


Arquivo:

css/components/cart/cart-summary.css


---

## cart-page.js

Responsável pela lógica exclusiva da página completa.

Funções:

* Ler o estado atual do carrinho.
* Buscar informações dos produtos.
* Criar os itens da página.
* Atualizar quantidade.
* Remover produtos.
* Atualizar resumo financeiro.

Arquitetura:

Cart State

↓

Product Lookup

↓

Cart Products

↓

Page Rendering

# Refatoração do cart.js

O arquivo cart.js passou por uma refatoração estrutural para se tornar a fonte central do estado do carrinho.

A responsabilidade do arquivo foi organizada para controlar:

* Estado do carrinho.
* Persistência dos dados.
* Atualização do Header.
* Renderização do Mini Carrinho.
* Eventos de interação.
* Comunicação com a página completa do carrinho.

Melhorias implementadas:

* Separação clara de responsabilidades.
* Criação de helpers reutilizáveis.
* Redução de repetição de código.
* Funções menores e mais coesas.
* Padronização dos comentários.
* Centralização da busca de produtos.
* Centralização da formatação monetária.
* Separação entre estado, armazenamento, renderização e eventos.
* Compartilhamento do estado através de uma única fonte de dados.

Arquitetura:

## Cart State

Responsável pelo estado atual dos produtos adicionados.

Estrutura armazenada:

```text
[
    {
        productId: 1,
        quantity: 2
    }
]

## Storage Helpers

Responsável pela persistência através do localStorage.

Chave utilizada:

lumiereCart

## Product Helpers

Responsável por:

* Buscar produtos através do products.js.
* Localizar itens existentes no carrinho.
* Formatar valores.

## Cart Helpers

Responsável por:

* Contagem de itens.
* Cálculo do valor total.
* Atualização dos dados exibidos.

## Rendering

Responsável por:

* Criar itens do mini carrinho.
* Renderizar estado vazio.
* Atualizar valores exibidos.

## Events

Responsável pelas interações:

* Adicionar produtos.
* Aumentar quantidade.
* Diminuir quantidade.
* Remover produtos.
* Abrir e fechar Mini Carrinho.
* Redirecionar para página completa do carrinho.

## Integração entre páginas

O estado do carrinho passou a ser compartilhado entre páginas através de:

cart.js

↓

window.cart

↓

cart-page.js

Isso permite que diferentes interfaces utilizem o mesmo estado sem duplicação de dados.

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

* Shoulder Bags.
* Tote Bags.
* Mini Bags.
* Crossbody Bags.

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
├── js/  
    ├── cart.js  
    ├── cart-page.js  
    ├── main.js  
    └── products.js    

---

# 🎨 Direção Visual

## Conceito

* Minimalista.
* Elegante.
* Premium.
* Atemporal.

## Inspirações

* E-commerce de luxo.
* Landing Pages SaaS.
* Apple.
* COS.
* Polène.
* Cuyana.

## Identidade

"Luz + Sofisticação"

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

* HTML5.
* CSS3 Modular.
* JavaScript Vanilla.
* Bootstrap (ícones e utilidades pontuais).

---

# Organização CSS

base/

layout/

components/

responsive.css

style.css

variables.css

---

# Organização JavaScript

## main.js

Responsável por:

* Comportamentos gerais da página.
* Interações globais da interface.

## products.js

Responsável por:

* Dados dos produtos.
* Renderização dos cards.
* Filtros por categoria.
* Sistema de favoritos.
* Persistência com localStorage.

## cart.js

Responsável por:

* Estado central do carrinho.
* Persistência com localStorage.
* Adição de produtos.
* Atualização do contador do Header.
* Renderização do Mini Carrinho.
* Controle das ações de compra.
* Atualização dos dados exibidos.
* Comunicação com a página completa do carrinho.
* Preparação para checkout.

Arquitetura atual:

Cart State

↓

Storage

↓

Helpers

↓

Cart Actions

↓

Rendering

↓

Events

↓

Shared Cart State

Arquitetura atual:

Cart State  
↓  
Helpers  
↓  
Cart Actions  
↓  
Rendering  
↓  
Events


## cart-page.js

Responsável exclusivamente pela página completa do carrinho.

Responsabilidades:

* Consumir o estado compartilhado do carrinho.
* Integrar com products.js.
* Transformar referências em dados completos dos produtos.
* Renderizar os produtos adicionados.
* Atualizar quantidade.
* Remover itens.
* Calcular subtotal.
* Calcular frete.
* Calcular valor total.

Arquitetura:

Shared Cart State

↓

Product Lookup

↓

Cart Products

↓

Page Rendering

↓

Summary Update
---

# Componentes criados

## Layout

* Header.
* Hero.
* Featured.
* Story.
* Benefits.
* Categories.
* Products.
* Header.
* Sections.
* Categories

## Componentes

* Buttons.
* Product Card.
* Mini Cart.
* Cart Item.
* Cart Summary.

---

# ✨ Melhorias implementadas

## Performance

* Uso de loading="lazy" em imagens secundárias.
* Uso de loading="eager" no Hero.
* Uso de decoding="async" nas imagens.
* Organização dos assets por contexto.

---

## Acessibilidade

Implementado:

* Uso de landmarks semânticas (header, main, section, article, footer).
* Hierarquia correta de headings.
* aria-label em elementos interativos.
* Textos alternativos descritivos nas imagens.

---

## Product Cards

Evoluídos para componentes reutilizáveis.

Incluem:

* Renderização dinâmica.
* Hover.
* Escala de imagem.
* Favoritos persistentes.
* Design System.
* Aspect Ratio.
* Estrutura compatível com futura migração para React.
* Integração com botão de compra.

---

# 🚧 Próximos Passos

## Curto prazo

* Refinar microinterações.
* Ajustar responsividade completa.

---

## Médio prazo

* Implementar checkout simulado.
* Criar modal de detalhes do produto.
* Criar Newsletter funcional.
* Finalizar Footer completo.
* Melhorar experiência geral de navegação.

---

## Longo prazo

* Migração para React.
* Componentização completa.
* Catálogo dinâmico.
* Integração com API simulada.
* Persistência avançada de dados.

---

# 📌 Status Geral

O projeto evoluiu de uma landing page visual para uma experiência de e-commerce funcional.

A Lumière atualmente possui:

* Marca definida.
* Sistema visual consistente.
* Hero finalizado.
* Coleção em destaque.
* Catálogo dinâmico renderizado via JavaScript.
* Oito produtos cadastrados.
* Sistema de filtros por categoria.
* Sistema de favoritos persistente.
* Product Cards reutilizáveis.
* Botão de compra funcional.
* Carrinho persistente com localStorage.
* Mini Carrinho lateral funcional.
* Página completa de carrinho.
* Header reutilizável entre páginas.
* Integração entre carrinho e catálogo de produtos.
* Controle de quantidade.
* Remoção de produtos.
* Cálculo automático de subtotal, frete e total.
* Arquitetura JavaScript organizada e escalável.

O foco atual passa a ser o refinamento da experiência de compra, evolução visual dos componentes e preparação da arquitetura para futura migração para React.
