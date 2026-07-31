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
* Menu mobile e Bootstrap Icons disponíveis também em `cart.html`.
* Ação do carrinho em `cart.html` direcionada para a lista de itens da própria página.

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

* Layout responsivo para desktop, tablet e mobile.
* Adaptação do conteúdo para diferentes tamanhos de tela.
* Headline principal.
* CTA principal.
* Imagem hero otimizada.
* Tipografia alinhada ao posicionamento premium da marca.
* Organização em coluna no mobile para melhor experiência visual.
---

# Featured Collection — ÉTOILE

A seção Featured Collection foi refinada para apresentar uma coleção específica da marca ao invés de produtos aleatórios do catálogo.

Coleção em destaque:

## ÉTOILE

Representa:

* Leveza.
* Elegância cotidiana.
* Design atemporal.
* Sofisticação discreta.

Produtos apresentados:

## Aurora

* Shoulder Bag.
* Elegância natural.
* Tons claros e sofisticados.

## Celeste

* Tote Bag.
* Design contemporâneo.
* Personalidade urbana.

## Alba

* Shoulder Bag.
* Minimalismo refinado.
* Versatilidade para o dia a dia.

## Luna

* Mini Bag.
* Design compacto.
* Praticidade aliada à sofisticação.

Implementado:

* Renderização dinâmica baseada em coleção.
* Separação entre Featured Collection e catálogo completo.
* Estrutura preparada para destacar diferentes coleções futuramente.

# Catálogo de Produtos

Implementado:

* Dez produtos cadastrados em `products.js`.
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

Novos produtos adicionados:

## Luna

* Coleção: ÉTOILE.
* Categoria: Mini Bag.
* Design compacto e elegante.
* Criada para completar a coleção destaque.

## Amélie

* Coleção: ATELIER.
* Categoria: Mini Bag.
* Design artesanal e sofisticado.
* Representa a proposta refinada da coleção ATELIER.

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
* Leitura defensiva do `localStorage`.
* Descarte de IDs inválidos ou sem produto correspondente.

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

A arquitetura separa os dados dos produtos do estado de compra. `cart.js` é a fonte central para estado, persistência, helpers e ações; `cart-page.js` fica responsável pela transformação e renderização exclusiva da página completa.

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

Cart State + Actions

↓

localStorage / window.cart

↓

Header Counter / Mini Cart / cart-page.js


Funcionalidades atuais:

* Adicionar produtos ao carrinho.
* Incrementar quantidade automaticamente ao adicionar o mesmo produto novamente.
* Persistência validada dos dados no navegador.
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
* Sincronização entre contador, mini carrinho e página completa.
* Sincronização do estado entre abas através do evento `storage`.
* Leitura defensiva do `localStorage`, aceitando apenas IDs e quantidades inteiras válidas.


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
* Controle de quantidade.
* Remoção de produtos.
* Subtotal atualizado automaticamente.
* Redirecionamento para a página completa através do botão de checkout do mini carrinho.
* Exibição de:
  * Imagem do produto.
  * Nome.
  * Coleção.
  * Preço.
  * Quantidade.
  * Subtotal.

Próximo passo:

* Checkout simulado, sem integração real de pagamento.

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
* Botão preparado para o futuro checkout simulado.
* Mensagem de segurança da compra.


Arquivo:

css/components/cart/cart-summary.css

Arquitetura de estilos:

* cart-page.css concentra os estilos base exclusivos da página do carrinho.
* cart-responsive.css reúne todas as adaptações responsivas específicas da página, mantendo a separação entre estilos globais e estilos locais.
* Os componentes Cart Item e Cart Summary permanecem isolados em arquivos próprios para facilitar reutilização e manutenção.
* Os seletores do mini carrinho e da página completa são limitados aos seus respectivos contextos para evitar efeitos colaterais.


---


## Lógica da página

Responsável pela lógica exclusiva da página completa.

Responsabilidades:

* Consumir o estado, os helpers e as ações centralizadas em `cart.js`.
* Transformar as referências do carrinho em dados completos de produtos.
* Criar os itens da página.
* Atualizar resumo financeiro.
* Renderizar novamente a página quando o carrinho muda em outra aba.
* Manter sua lógica exclusiva isolada do escopo global.

Arquitetura:

Central Cart State + Actions

↓

Product Lookup

↓

Cart Products

↓

Page Rendering

O arquivo é executado em escopo isolado. Isso evita colisões globais e mantém em `cart.js` as implementações únicas de persistência, busca, formatação e ações do carrinho.

# Refatoração do cart.js

O arquivo cart.js passou por uma refatoração estrutural para se tornar a fonte central do estado do carrinho.

A responsabilidade do arquivo foi organizada para controlar:

* Estado do carrinho.
* Leitura defensiva e persistência dos dados.
* Busca de produtos e formatação monetária.
* Ações de adicionar, aumentar, diminuir e remover.
* Atualização do Header.
* Renderização do Mini Carrinho.
* Eventos de interação.
* Comunicação com a página completa do carrinho.
* Sincronização entre abas do navegador.

Melhorias implementadas:

* Separação clara de responsabilidades.
* Criação de helpers reutilizáveis.
* Redução de repetição de código.
* Funções menores e mais coesas.
* Padronização dos comentários.
* Centralização da busca de produtos.
* Centralização da formatação monetária.
* Centralização da persistência e das ações do carrinho.
* Separação entre estado, armazenamento, renderização e eventos.
* Compartilhamento do estado através de uma única fonte de dados.
* Preservação da referência de `window.cart` após remoções.
* Contagem de itens reutilizada entre contador e mini carrinho.

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
```

## Storage Helpers

Responsável pela leitura defensiva e persistência através do localStorage.

O estado carregado precisa ser um array com `productId` e `quantity` inteiros, sendo a quantidade maior que zero. Conteúdo ausente, malformado ou incompatível resulta em carrinho vazio sem interromper a interface.

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

O estado e as ações do carrinho são compartilhados entre as interfaces através de:

cart.js

↓

window.cart + Cart Helpers + Cart Actions

↓

Header Counter / Mini Cart / cart-page.js

`cart-page.js` reutiliza essas funções centrais sem redefini-las. O evento `storage` mantém as interfaces atualizadas quando o carrinho é alterado em outra aba.

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
* Adaptação responsiva com empilhamento de conteúdo no mobile.
* Centralização de texto e imagem em telas menores.

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

Responsividade:

* Grid adaptado para diferentes dispositivos.
* Cards organizados em coluna no mobile.
* Preservação da hierarquia visual da seção.
* Página do carrinho totalmente adaptada para dispositivos móveis.
* Responsividade do carrinho isolada em arquivo próprio (cart-responsive.css).
* Header mobile reutilizado entre páginas com personalizações específicas para o carrinho.
* Separação entre regras responsivas globais e regras exclusivas da página do carrinho.

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
* Layout adaptado para diferentes tamanhos de tela.
* Organização simplificada em coluna no mobile mantendo a identidade visual.

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
│       ├── hero/  
│       ├── products/  
│       └── categories/  
│  
├── css/
│   ├── base/
│   ├── components/
│   │   └── cart/
│   │       ├── cart-item.css
│   │       └── cart-summary.css
│   ├── layout/
│   ├── pages/
│   │   └── cart-page.css
│   ├── responsive.css
│   ├── cart-responsive.css
│   ├── style.css
│   └── variables.css
│  
├── js/  
    ├── cart.js  
    ├── cart-page.js  
    ├── main.js  
    ├── newsletter.js  
    ├── products.js  
    │
    └── components/
        ├── mobile-menu.js
        └── toast.js  

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
    └── cart/
        ├── cart-item.css
        └── cart-summary.css

pages/
    └── cart-page.css

responsive.css

cart-responsive.css

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
* Leitura defensiva dos IDs favoritos persistidos.

## newsletter.js

Responsável por:

* Gerenciamento da inscrição da newsletter.
* Validação de e-mail.
* Persistência dos inscritos através do localStorage.
* Controle de cadastro duplicado.
* Integração com o sistema global de Toast.
* Leitura defensiva da lista de inscritos.
* Registro do evento somente quando formulário e input existem.

Chave utilizada:

lumiereNewsletter

## cart.js

Responsável por:

* Estado central do carrinho.
* Leitura defensiva e persistência com localStorage.
* Busca, formatação e ações centralizadas.
* Atualização do contador do Header.
* Renderização do Mini Carrinho.
* Atualização dos dados exibidos.
* Comunicação com a página completa do carrinho.
* Sincronização entre abas do navegador.
* Redirecionamento do checkout limitado ao botão do mini carrinho.

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


## cart-page.js

Responsável exclusivamente pela página completa do carrinho.

Responsabilidades:

* Consumir o estado, os helpers e as ações de `cart.js`.
* Integrar com `products.js`.
* Transformar referências em dados completos dos produtos.
* Renderizar os produtos adicionados.
* Calcular subtotal.
* Calcular frete.
* Calcular valor total.
* Atualizar a interface após mudanças feitas em outra aba.
* Isolar a lógica exclusiva da página do escopo global.

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
* Sections.

## Componentes

* Buttons.
* Product Card.
* Mini Cart.
* Cart Item.
* Cart Summary.
* Toast.

---

# ✨ Melhorias implementadas

## Robustez de estado e integração

* Estado, persistência, helpers e ações do carrinho centralizados em `cart.js`.
* `cart-page.js` isolado do escopo global e sem redefinir funções centrais.
* Carrinho, favoritos e newsletter carregados com validação defensiva do `localStorage`.
* Contador, mini carrinho e página completa sincronizados após cada ação.
* Carrinho sincronizado entre abas através do evento `storage`.
* Referência compartilhada de `window.cart` preservada após remoções.
* Seletores DOM opcionais protegidos antes do uso.
* Redirecionamento do checkout limitado ao botão do mini carrinho.
* Estilos do mini carrinho e da página completa escopados por componente.
* Token `--color-white` adicionado ao Design System.

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

## Newsletter

Implementado:

* Seção institucional de captura de e-mails.
* Formulário responsivo integrado ao design da marca.
* Validação de e-mail utilizando JavaScript Vanilla.
* Persistência dos cadastros através de localStorage.
* Bloqueio de cadastros duplicados.
* Feedback visual através do componente Toast.
* Ajustes responsivos para diferentes tamanhos de tela.
* Layout mobile com formulário reorganizado verticalmente.

Arquitetura:

Newsletter Form

↓

newsletter.js

↓

Validation

↓

localStorage

↓

Toast Feedback

Chave utilizada:

lumiereNewsletter
---

## Footer

Implementado:

* Footer completo seguindo a identidade visual da marca.
* Organização em colunas para navegação e informações institucionais.
* Área de descrição da marca.
* Links para coleções e atendimento.
* Layout responsivo para dispositivos menores.
* Adaptação da estrutura para mobile com navegação mais compacta.
* Organização dos links em formato inline no mobile para preservar a estética minimalista.
* Integração visual com o restante da página.

Estrutura:

Logo + Descrição

↓

Collections

↓

Institutional

↓

Customer Service

↓

Copyright

## Product Cards

Evoluídos para componentes reutilizáveis.

Incluem:

* Renderização dinâmica.
* Hover.
* Escala de imagem.
* Favoritos persistentes.
* Design System.
* Aspect Ratio.
* Integração com botão de compra.

---

# Responsividade

Implementada a adaptação da página inicial e da página completa do carrinho para diferentes dispositivos.

A responsividade foi trabalhada preservando a identidade premium da Lumière e evitando perda de hierarquia visual.

Implementado:

* Header reorganizado para mobile nas duas páginas.
* Menu hamburguer funcional em `index.html` e `cart.html`.
* Hero adaptado para layout vertical.
* Featured Collection com grid responsivo.
* Story reorganizado com texto e imagem empilhados.
* Benefits adaptado para cards em coluna.
* Categories reorganizado para mobile.
* Products adaptado para catálogo em uma coluna.
* Filtros de produtos preparados para rolagem horizontal.
* Newsletter com formulário adaptado para telas menores.
* Footer reorganizado para navegação mobile.
* Lista, resumo financeiro e controles do carrinho adaptados para telas menores.
* Responsividade exclusiva do carrinho mantida em `cart-responsive.css`.

Direção aplicada:

* Preservação de espaçamento.
* Melhor aproveitamento de telas pequenas.
* Manutenção da hierarquia tipográfica.
* Redução de elementos excessivos no mobile.
* Experiência consistente entre desktop e dispositivos móveis.

# 🚧 Próximos Passos

## Curto prazo

* Refinar microinterações.
* Realizar polimentos pontuais de responsividade e experiência mobile.

---

## Médio prazo

* Implementar checkout simulado.
* Criar modal de detalhes do produto.
* Melhorar experiência geral de navegação.

---

## Longo prazo

* Expandir componentes conforme novas páginas forem adicionadas.
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
* Dez produtos cadastrados.
* Sistema de filtros por categoria.
* Sistema de favoritos persistente.
* Product Cards reutilizáveis.
* Botão de compra funcional.
* Carrinho persistente com leitura defensiva do localStorage.
* Mini Carrinho lateral funcional.
* Página completa de carrinho.
* Header reutilizável entre páginas.
* Integração entre carrinho e catálogo de produtos.
* Controle de quantidade.
* Remoção de produtos.
* Cálculo automático de subtotal, frete e total.
* Estado, persistência, helpers e ações centralizados em `cart.js`.
* Contador, mini carrinho e página completa sincronizados.
* Sincronização do carrinho entre abas.
* Arquitetura JavaScript organizada e escalável.
* Newsletter funcional com persistência local.
* Sistema de Toast reutilizável entre funcionalidades.
* Página inicial e carrinho responsivos para desktop, tablet e mobile.
* Componentes adaptados mantendo consistência visual entre diferentes resoluções.
* Experiência mobile refinada para navegação, catálogo e áreas institucionais.
