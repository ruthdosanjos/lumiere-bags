# LUMIÈRE

E-commerce fictício de bolsas premium desenvolvido como projeto de portfólio com HTML5, CSS3 modular e JavaScript Vanilla.

O projeto oferece uma jornada front-end completa, da descoberta dos produtos à confirmação de um pedido simulado. Não há backend, autenticação, banco de dados ou processamento real de pagamentos.

## Visão geral

A Lumière combina uma identidade visual minimalista com uma arquitetura conservadora, baseada apenas em tecnologias nativas da web. Produtos, favoritos, carrinho, newsletter e checkout são implementados no navegador, com persistência local somente onde ela é necessária.

Estado atual:

- três páginas: Home, carrinho e checkout;
- dez produtos cadastrados em uma fonte central;
- carrinho compartilhado entre contador, mini carrinho, página completa e checkout;
- checkout demonstrativo em quatro etapas;
- layouts adaptados para desktop, tablet e mobile.

## Funcionalidades

### Home e catálogo

- Hero com CTA para a coleção em destaque.
- Featured Collection renderizada a partir dos produtos da coleção ÉTOILE.
- Seções Benefits, Story, Categories, Products e Newsletter.
- Catálogo completo com dez produtos renderizados dinamicamente.
- Filtros `Todos`, `Shoulder`, `Tote`, `Mini` e `Crossbody`.
- Integração entre os cards de Categories e os filtros do catálogo.
- Rolagem até Products com respeito a `prefers-reduced-motion`.
- Product Card reutilizado na coleção em destaque e no catálogo.

### Favoritos

- Adição e remoção por delegação de eventos.
- Persistência defensiva dos IDs válidos.
- Sincronização visual entre cards repetidos da Featured Collection e do catálogo.
- Restauração do estado visual após filtros e novas renderizações.
- Atualização de `aria-pressed` e do nome acessível dos controles.

### Carrinho

- Adição de produtos pelos Product Cards.
- Mini carrinho lateral com overlay, estado vazio, subtotal, quantidades e remoção.
- Diálogo do mini carrinho com fechamento por botão, overlay ou `Escape`, contenção de foco e retorno do foco ao acionador.
- Contador global baseado na soma das quantidades válidas.
- Página completa do carrinho com alteração de quantidade, remoção e resumo financeiro.
- Frete de R$ 25,00 quando existe subtotal válido e frete zero no carrinho vazio.
- Botão `Finalizar compra` habilitado somente quando existem produtos válidos.
- Sincronização do carrinho entre abas pelo evento `storage`.
- Estado, persistência, consultas, cálculos e ações centralizados em `js/cart.js`.

### Checkout simulado

- Página única com quatro etapas: Dados e entrega, Pagamento, Revisão e Confirmação.
- Bloqueio e redirecionamento para o carrinho quando não existem produtos válidos.
- Formulário com validação por etapa, mensagens locais e foco no primeiro campo inválido.
- Máscara de telefone para 10 ou 11 dígitos e de CEP no formato `00000-000`.
- Consulta ao ViaCEP no `blur` de um CEP com oito dígitos.
- Preenchimento conservador de endereço, bairro, cidade e estado sem sobrescrever valores manuais; número e complemento nunca são preenchidos pela API.
- Modalidades demonstrativas Pix, Cartão e Boleto, sem coleta de dados financeiros.
- Resumo e revisão construídos com os helpers centrais do carrinho.
- Prevenção de submissão duplicada e estado temporário `Confirmando...`.
- Snapshot final mantido somente em memória antes da limpeza do carrinho.
- Número fictício de pedido e confirmação explícita de que nenhuma cobrança foi realizada.
- Limpeza centralizada do carrinho somente após a confirmação bem-sucedida.

### Newsletter e feedback

- Validação de e-mail, normalização e prevenção de inscrições duplicadas.
- Persistência defensiva dos endereços cadastrados.
- Toast reutilizável com região de status acessível.

### Responsividade e acessibilidade

- Adaptações gerais nos breakpoints de 992 px, 768 px e 425 px.
- Home, carrinho e checkout responsivos, sem alterar a identidade visual entre páginas.
- Menu mobile com estado acessível, fechamento por `Escape` e restauração de foco.
- HTML semântico, labels visíveis, `fieldset` e `legend` no pagamento.
- Uso de `aria-current`, `aria-invalid`, `aria-describedby`, `aria-live`, `aria-busy`, `hidden` e `disabled` conforme o estado da interface.
- Navegação por teclado, foco visível e gerenciamento de foco entre etapas e erros.
- Preferência por movimento reduzido respeitada nos fluxos que usam animação ou rolagem.

## Fluxo do usuário

A jornada principal de compra é:

Home  
↓  
Featured Collection  
↓  
Story  
↓  
Categories  
↓  
Products  
↓  
Mini Cart  
↓  
Cart  
↓  
Checkout  
↓  
Confirmação simulada

Na ordem real do DOM, a Home apresenta: Hero, Featured Collection, Benefits, Story, Categories, Products, Newsletter e Footer. Benefits atua como bloco de confiança entre a apresentação da coleção e a história da marca.

## Arquitetura

### HTML

- `index.html`: descoberta da marca, catálogo, favoritos, newsletter e mini carrinho.
- `cart.html`: revisão e edição do carrinho completo.
- `checkout.html`: finalização demonstrativa em quatro etapas.

### CSS

- `css/variables.css`: tokens de cor, tipografia, espaçamento, raio, sombra e layout.
- `css/base/`: reset, tipografia e regras globais.
- `css/layout/`: estilos das seções da Home e estruturas compartilhadas.
- `css/components/`: botões, Product Card, mini carrinho e componentes do carrinho completo.
- `css/pages/`: estilos exclusivos das páginas de carrinho e checkout.
- arquivos responsivos gerais e específicos para carrinho e checkout.

### JavaScript

- `products.js`: fonte dos produtos, renderização, filtros, Categories e favoritos.
- `cart.js`: estado central, armazenamento, helpers, cálculos, ações, contador e mini carrinho.
- `cart-page.js`: renderização e eventos exclusivos de `cart.html`, em escopo isolado.
- `checkout.js`: estado temporário, etapas, validação, ViaCEP, revisão e confirmação simulada, em escopo isolado.
- `newsletter.js`: validação e persistência da newsletter.
- `main.js`: comportamento do header ao rolar.
- `js/components/`: menu mobile e toast.

O carrinho mantém uma única referência compartilhada em `window.cart`. Todas as mutações passam pelas ações centrais, que preservam essa referência e sincronizam persistência e interfaces. O checkout consome `getCartProducts()`, `getCartSubtotal()`, `getShippingCost()`, `getOrderTotal()`, `formatPrice()` e `clearCart()`; não mantém um segundo carrinho nem replica os cálculos financeiros.

## Persistência

| Armazenamento | Chave | Conteúdo |
|---|---|---|
| `localStorage` | `lumiereCart` | Array de itens com `productId` e `quantity` válidos |
| `localStorage` | `lumiereFavorites` | Array de IDs de produtos válidos |
| `localStorage` | `lumiereNewsletter` | Array de e-mails normalizados e não vazios |
| `sessionStorage` | `lumiereCheckoutDraft` | Rascunho validado e limitado aos campos permitidos do checkout |

As leituras são defensivas: JSON inválido ou tipos incompatíveis retornam estados seguros. O pedido confirmado e a resposta completa do ViaCEP não são persistidos. Dados de cartão, CVV, CPF ou dados bancários não são solicitados.

## Estrutura do projeto

```text
lumiere-bags/
├── assets/
│   └── images/
│       ├── categories/
│       ├── hero/
│       └── products/
├── css/
│   ├── base/
│   │   ├── globals.css
│   │   ├── reset.css
│   │   └── typography.css
│   ├── components/
│   │   ├── cart/
│   │   │   ├── cart-item.css
│   │   │   └── cart-summary.css
│   │   ├── buttons.css
│   │   ├── cart.css
│   │   └── product-card.css
│   ├── layout/
│   │   ├── benefits.css
│   │   ├── categories.css
│   │   ├── featured.css
│   │   ├── footer.css
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── newsletter.css
│   │   ├── products.css
│   │   ├── sections.css
│   │   └── story.css
│   ├── pages/
│   │   ├── cart-page.css
│   │   └── checkout-page.css
│   ├── cart-responsive.css
│   ├── checkout-responsive.css
│   ├── responsive.css
│   ├── style.css
│   └── variables.css
├── js/
│   ├── components/
│   │   ├── mobile-menu.js
│   │   └── toast.js
│   ├── cart-page.js
│   ├── cart.js
│   ├── checkout.js
│   ├── main.js
│   ├── newsletter.js
│   └── products.js
├── .gitignore
├── .vscode/
│   └── settings.json
├── cart.html
├── checkout.html
├── index.html
├── project.md
└── README.md
```

## Tecnologias e serviços

- HTML5 semântico.
- CSS3 modular.
- JavaScript Vanilla (ES6+), carregado como scripts clássicos.
- Web Storage API (`localStorage` e `sessionStorage`).
- Fetch API e `AbortController` para consulta de CEP.
- Google Fonts: Inter e Playfair Display.
- Bootstrap 5.3.7 na Home.
- Bootstrap Icons 1.13.1 nas três páginas.
- ViaCEP para consulta pública de endereço.

Não há processo de build, gerenciador de pacotes ou dependências instaladas no repositório.

## Execução local

Sirva a raiz do projeto com um servidor HTTP local, como a extensão Live Server, e abra `index.html`. O servidor é recomendado porque o checkout consulta o ViaCEP por `fetch`.

## Limites da simulação

- Nenhuma cobrança é realizada.
- Não há gateway de pagamento, backend, banco de dados ou autenticação.
- O número de pedido é demonstrativo e não é persistido.
- Frete, disponibilidade e confirmação não representam operações comerciais reais.

## Melhorias futuras

- Implementar busca de produtos nos controles já presentes no header.
- Criar uma experiência real para o link `Ver detalhes` dos Product Cards.
- Implementar a aplicação de cupons exibida na página do carrinho.
- Substituir links sociais de demonstração por destinos reais.
- Expandir o catálogo e refinar microinterações e testes de interface.
- Considerar sincronização em tempo real do checkout com alterações realizadas em outra aba.

## Autoria

Desenvolvido por **Ruth Emilly dos Anjos Paulino** como projeto de portfólio Front-end.
