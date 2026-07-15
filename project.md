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

* Navbar fixa.
* Efeito Glassmorphism ao scroll.
* Navegação por âncoras.
* Botões de ações preparados para futuras funcionalidades.
* Estrutura semântica com acessibilidade.
* Contador do carrinho integrado ao sistema de compras.
* Atualização dinâmica conforme quantidade de produtos adicionados.

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

A arquitetura foi estruturada separando o estado do carrinho dos dados dos produtos.

O carrinho mantém apenas as referências necessárias:

- productId.
- quantity.

Os dados completos dos produtos são recuperados através do products.js.

Fluxo implementado:

Product Card  
↓  
cart.js  
↓  
Cart State  
↓  
localStorage  
↓  
cart-page.js  
↓  
Products Data  
↓  
Renderização do carrinho


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

# Refatoração do cart.js

O arquivo cart.js passou por uma refatoração estrutural para melhorar organização e escalabilidade.

Melhorias implementadas:

* Separação clara de responsabilidades.
* Criação de helpers reutilizáveis.
* Redução de repetição de código.
* Funções menores e mais coesas.
* Padronização dos comentários.
* Centralização da busca de produtos.
* Centralização da formatação de valores monetários.
* Separação entre estado, armazenamento, renderização e eventos.

Nova organização:

## Cart State

Responsável pelo estado atual dos produtos adicionados.

## Storage Helpers

Responsável pela persistência através do localStorage.

## Product Helpers

Responsável por:

* Buscar produtos.
* Buscar itens do carrinho.
* Formatar valores.

## Cart Helpers

Responsável por:

* Contagem de itens.
* Cálculo do valor total.
* Atualização das informações do carrinho.

## Rendering

Responsável por:

* Criar itens do mini carrinho.
* Renderizar estado vazio.
* Atualizar valores exibidos.

## Events

Responsável pelas interações:

* Adicionar produtos.
* Abrir mini carrinho.
* Fechar mini carrinho.

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

* Estado do carrinho.
* Persistência com localStorage.
* Adição de produtos.
* Contador do header.
* Renderização do mini carrinho.
* Controle da interface de compra.
* Atualização dos dados do carrinho.
* Preparação para checkout.

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

Responsável pela página completa do carrinho.

Responsabilidades:

* Leitura do estado salvo no localStorage.
* Integração com products.js.
* Renderização dos produtos adicionados.
* Atualização de quantidade.
* Remoção de itens.
* Cálculo de subtotal.
* Cálculo de frete.
* Cálculo do valor total.

Arquitetura:

Cart State  
↓  
Product Lookup  
↓  
Cart Products  
↓  
Page Rendering
---

# Componentes criados

## Layout

* Header.
* Hero.
* Featured Collection.
* Story.
* Benefits.
* Categories.
* Products.

## Componentes

* Buttons.
* Product Card.
* Category Card.
* Benefit Card.
* Badges.
* Mini Cart.

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

* Implementar controle de quantidade no mini carrinho.
* Criar feedback visual para alterações no carrinho.
* Sincronizar contador do header com todas as interações.
* Refinar microinterações.
* Ajustar responsividade completa.
* Criar fluxo do botão finalizar compra.

---

## Médio prazo

* Criar página completa de carrinho.
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
* Mini carrinho lateral funcional.
* Página completa de carrinho.
* Integração entre carrinho e catálogo de produtos.
* Cálculo de subtotal, frete e total.
* Arquitetura JavaScript organizada e escalável.

O foco atual passa a ser o refinamento da jornada de compra e evolução da arquitetura para uma futura migração para React.
