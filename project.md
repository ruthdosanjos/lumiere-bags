# Documento técnico — Lumière

## Visão geral

Lumière é um e-commerce fictício de bolsas premium desenvolvido como projeto de portfólio Front-end. A aplicação cobre descoberta de produtos, favoritos, carrinho e finalização demonstrativa de pedido usando somente HTML5, CSS3 modular e JavaScript Vanilla.

O código atual é a fonte oficial deste documento. A aplicação não possui backend, banco de dados, autenticação, gateway de pagamento ou persistência de pedidos confirmados.

## Objetivos

- Demonstrar organização de uma aplicação Front-end multipágina sem frameworks.
- Construir uma experiência de compra coerente e responsiva.
- Manter uma identidade visual minimalista, premium e consistente.
- Aplicar separação de responsabilidades entre marcação, estilos, dados, estado e interface.
- Tratar persistência e entradas do usuário de forma defensiva.
- Oferecer fluxos acessíveis por teclado e tecnologias assistivas.
- Simular um checkout sem coletar ou transmitir dados financeiros.

## Arquitetura

### Stack

- HTML5 semântico.
- CSS3 modular com variáveis customizadas.
- JavaScript Vanilla ES6+ em scripts clássicos.
- Web Storage API para estados locais selecionados.
- Fetch API e `AbortController` para integração com ViaCEP.

Não há bundler, módulos ES, TypeScript, React, jQuery, biblioteca de validação ou biblioteca de máscara.

### Páginas

| Página | Responsabilidade |
|---|---|
| `index.html` | Home, coleção em destaque, catálogo, filtros, favoritos, newsletter e mini carrinho |
| `cart.html` | Carrinho completo, edição de quantidades, remoção, totais e acesso ao checkout |
| `checkout.html` | Checkout demonstrativo em quatro etapas e confirmação simulada |

### Organização do CSS

`css/style.css` importa o núcleo compartilhado:

- `variables.css`: tokens do Design System;
- `base/`: reset, tipografia e regras globais;
- `layout/`: seções e estruturas da Home;
- `components/`: botões, Product Card e mini carrinho.

As páginas especializadas usam folhas adicionais:

- `pages/cart-page.css`, que importa `cart-item.css` e `cart-summary.css`;
- `cart-responsive.css` para adaptações do carrinho completo;
- `pages/checkout-page.css` para a estrutura e os componentes do checkout;
- `checkout-responsive.css` para adaptações do checkout;
- `responsive.css` para regras gerais da interface.

Os seletores do mini carrinho, carrinho completo e checkout são limitados aos seus contextos para reduzir efeitos colaterais entre componentes.

### Organização do JavaScript

| Arquivo | Responsabilidade principal |
|---|---|
| `js/products.js` | Dados dos produtos, Product Cards, Featured, catálogo, filtros, Categories e favoritos |
| `js/cart.js` | Estado central do carrinho, persistência, helpers, ações, contador e mini carrinho |
| `js/cart-page.js` | Renderização e eventos exclusivos de `cart.html` |
| `js/checkout.js` | Estado temporário, etapas, ViaCEP, validação, resumo, revisão e confirmação |
| `js/newsletter.js` | Validação, persistência e feedback da newsletter |
| `js/main.js` | Estado visual do header durante a rolagem |
| `js/components/mobile-menu.js` | Abertura, fechamento e acessibilidade do menu mobile |
| `js/components/toast.js` | Feedback temporário reutilizável na Home |

`cart-page.js` e `checkout.js` são encapsulados em funções autoexecutáveis. As funções centrais do carrinho permanecem disponíveis no escopo global porque as páginas usam scripts clássicos e dependem delas pela ordem de carregamento.

### Ordem dos scripts

Home:

1. `toast.js`
2. `mobile-menu.js`
3. Bootstrap Bundle 5.3.7
4. `main.js`
5. `products.js`
6. `cart.js`
7. `newsletter.js`

Carrinho:

1. `mobile-menu.js`
2. `products.js`
3. `cart.js`
4. `main.js`
5. `cart-page.js`

Checkout:

1. `mobile-menu.js`
2. `products.js`
3. `cart.js`
4. `main.js`
5. `checkout.js`

`products.js` antecede `cart.js` porque o carrinho consulta a fonte central de produtos. `cart.js` antecede as páginas consumidoras porque expõe os helpers e as ações compartilhadas.

## Estrutura de pastas

```text
lumiere-bags/
├── assets/
│   └── images/
│       ├── categories/
│       │   ├── crossbody.jpg
│       │   ├── mini.png
│       │   ├── shoulder.png
│       │   └── tote.jpg
│       ├── hero/
│       │   ├── banner1.jpg
│       │   └── banner2.png
│       └── products/
│           ├── alba.png
│           ├── amelie.png
│           ├── aurora.png
│           ├── celeste.png
│           ├── elise.png
│           ├── luna.png
│           ├── noire.png
│           ├── serena.png
│           ├── stella.png
│           └── vivienne.png
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

## Design System

### Conceito visual

- minimalista;
- elegante;
- premium;
- atemporal;
- baseado em espaço negativo, hierarquia e poucos elementos concorrentes.

### Tokens atuais

| Grupo | Tokens principais |
|---|---|
| Cores | `--color-primary`, `--color-secondary`, `--color-background`, `--color-surface`, `--color-white`, `--color-text`, `--color-text-muted`, `--color-border` |
| Tipografia | Playfair Display para headings e Inter para corpo |
| Espaçamento | `--spacing-xs` a `--spacing-xl` |
| Raios | `--radius-sm`, `--radius-md`, `--radius-lg` |
| Sombras | `--shadow-sm`, `--shadow-md` |
| Movimento | `--transition` |
| Layout | `--header-height`, `--container-width` |

As páginas de carrinho e checkout reutilizam esses tokens e padrões de botões, bordas, sombras e tipografia. Não existe uma identidade visual paralela para o checkout.

## Componentes

### Compartilhados

- Header fixo com navegação, busca visual, favoritos visual e carrinho.
- Menu mobile com `aria-expanded`, nome acessível dinâmico, fechamento por link, redimensionamento e `Escape`.
- Footer institucional responsivo.
- Botões primários e secundários.
- Product Card criado por `createProductCard()`.
- Toast com `role="status"`, `aria-live="polite"` e `aria-atomic="true"`.

### Home

- Hero.
- Featured Collection.
- Benefits.
- Story.
- Categories.
- Products e filtros.
- Newsletter.
- Mini carrinho.

### Carrinho completo

- Cart Item.
- Cart Summary.
- Estado vazio.
- Controle de quantidade e remoção.

### Checkout

- Indicador de progresso.
- Painéis de etapa.
- Grupos de dados pessoais e endereço.
- Opções de pagamento demonstrativas.
- Resumo lateral do pedido.
- Blocos de revisão.
- Estado de processamento.
- Painel de confirmação.

## Catálogo e produtos

`js/products.js` é a única fonte de dados dos dez produtos atuais:

| ID | Produto | Coleção | Categoria |
|---:|---|---|---|
| 1 | Aurora | ÉTOILE | shoulder |
| 2 | Celeste | ÉTOILE | tote |
| 3 | Élise | ATELIER | mini |
| 4 | Noire | SIGNATURE | crossbody |
| 5 | Alba | ÉTOILE | shoulder |
| 6 | Serena | ATELIER | tote |
| 7 | Stella | SIGNATURE | crossbody |
| 8 | Vivienne | SIGNATURE | mini |
| 9 | Luna | ÉTOILE | mini |
| 10 | Amélie | ATELIER | mini |

A Featured Collection seleciona até quatro produtos ÉTOILE: Aurora, Celeste, Alba e Luna. O catálogo completo oferece filtros para todos os produtos e para as quatro categorias cadastradas.

Os cards de Categories carregam um `data-category` explícito e reutilizam `applyProductFilter()`. O fluxo não dispara cliques artificiais nem duplica a lógica de filtragem. Após aplicar o filtro, a página rola para Products com comportamento reduzido quando essa preferência está ativa.

## Favoritos

O estado de favoritos é um array de IDs e usa `lumiereFavorites` no `localStorage` como fonte persistida.

- A leitura aceita somente um array de IDs inteiros correspondentes a produtos existentes.
- A interação usa delegação de eventos no documento.
- `updateFavoriteButtons()` atualiza todos os cards que compartilham o mesmo `data-product-id`.
- `loadFavoriteState()` reaplica o estado após renderizações da Featured Collection, catálogo e filtros.
- Ícone, classe ativa, `aria-pressed` e `aria-label` são atualizados em conjunto.

Não existe uma segunda lista de favoritos nem uma página dedicada a eles.

## Fluxo da Home

A ordem atual das seções é:

1. Hero.
2. Featured Collection.
3. Benefits.
4. Story.
5. Categories.
6. Products.
7. Newsletter.
8. Footer.

### Jornada e CTAs

- O CTA principal do Hero direciona para Featured Collection.
- O CTA da Featured Collection direciona para Products.
- Benefits reforça confiança e não possui CTA.
- O CTA da Story direciona para Categories.
- Cada card de Categories ativa seu filtro correspondente e conduz a Products.
- Os Product Cards preservam favoritos, adição ao carrinho e o link visual `Ver detalhes`.
- O mini carrinho direciona para `cart.html`.

O link `Ver detalhes` ainda usa `href="#"` e não possui uma experiência de detalhes implementada. Os controles visuais de busca também não têm lógica de pesquisa.

## Arquitetura do carrinho

### Fonte de verdade

`js/cart.js` controla a única fonte de estado do carrinho. Cada item persistido contém somente:

```text
{
  productId: inteiro,
  quantity: inteiro maior que zero
}
```

O array carregado é compartilhado por `cart` e `window.cart`. Remoções, sincronização externa e `clearCart()` usam mutação do array, preservando a referência para todos os consumidores.

### Helpers centrais

- `getProduct(productId)`: consulta `products.js`.
- `getCartItem(productId)`: localiza uma referência no estado.
- `getCartProducts()`: combina referências válidas com os dados do catálogo e inclui quantidade.
- `getCartItemsCount()`: soma quantidades de produtos válidos.
- `formatPrice(value)`: formata valores em BRL.
- `getCartSubtotal()`: soma preço multiplicado pela quantidade.
- `getShippingCost(subtotal)`: retorna zero sem subtotal e 25 quando há subtotal.
- `getOrderTotal(subtotal, shipping)`: soma subtotal e frete.

### Ações centrais

- `addToCart()`.
- `increaseQuantity()`.
- `decreaseQuantity()`.
- `removeFromCart()`.
- `clearCart()`.
- `syncCart()`.

As ações chamam o fluxo central de sincronização, que atualiza o `localStorage`, o contador e o mini carrinho quando seus elementos existem.

### Mini carrinho

O mini carrinho existe na Home e contém lista dinâmica, subtotal, controle de quantidade, remoção, estado vazio, overlay e link para a página completa. Seu botão não abre o checkout diretamente; o fluxo é Mini Cart → Cart → Checkout.

Quando aberto, o painel atua como diálogo modal acessível. O código gerencia `aria-hidden`, `inert`, contenção de foco, fechamento por `Escape` e restauração de foco.

### Página completa

`js/cart-page.js` está isolado em uma função autoexecutável e mantém somente responsabilidades da página:

- renderizar lista e estado vazio;
- acionar ações centrais de quantidade e remoção;
- apresentar subtotal, frete e total usando os helpers de `cart.js`;
- controlar o estado do botão de checkout;
- responder à sincronização do armazenamento.

O botão `Finalizar compra` é um `button` com `data-checkout-url="./checkout.html"`. Ele fica desabilitado e recebe `aria-disabled="true"` quando não existem produtos válidos. `Continuar comprando` aponta para `index.html#products`.

A interface de cupom existe, mas a aplicação de cupons ainda não foi implementada.

## Arquitetura do checkout

### Estrutura geral

O checkout é uma única página com progresso de quatro etapas:

1. Dados e entrega.
2. Pagamento.
3. Revisão.
4. Confirmação.

`js/checkout.js` é executado em escopo isolado e usa um objeto `checkoutState` em memória como estado operacional. A etapa Confirmação não pode ser acessada pela navegação comum; ela é exibida apenas depois da conclusão bem-sucedida.

### Etapa 1 — Dados e entrega

Dados pessoais:

- nome completo;
- e-mail;
- telefone.

Endereço de entrega:

- CEP;
- endereço;
- número;
- complemento opcional;
- bairro;
- cidade;
- estado.

Regras implementadas:

- nome obrigatório com pelo menos duas partes úteis;
- e-mail obrigatório e validado por formato razoável;
- telefone validado por 10 ou 11 dígitos;
- CEP validado por exatamente oito dígitos;
- endereço, número, bairro, cidade e estado obrigatórios;
- número aceita formato numérico com complementos alfanuméricos ou `S/N`;
- espaços são removidos nas extremidades e o e-mail é normalizado para minúsculas.

O telefone recebe máscara dinâmica para 10 ou 11 dígitos. O CEP recebe máscara `00000-000`. A validação usa somente os dígitos, sem bloquear colagem ou edição do valor.

### ViaCEP

A consulta usa `https://viacep.com.br/ws/{cep}/json/` somente no `blur` de um CEP com oito dígitos.

- `logradouro` → endereço;
- `bairro` → bairro;
- `localidade` → cidade;
- `uf` → estado.

Somente campos vazios são preenchidos; valores digitados pelo usuário são preservados. Número e complemento não são preenchidos. Os campos continuam editáveis.

O fluxo apresenta estados de busca, sucesso, CEP não encontrado, falha de rede e resposta inválida. `AbortController` cancela uma consulta anterior quando necessário, e a mesma consulta bem-sucedida não é repetida sem necessidade. A resposta completa do serviço não é armazenada.

### Etapa 2 — Pagamento

As modalidades válidas são `pix`, `card` e `boleto`, apresentadas como Pix, Cartão e Boleto. A interface solicita somente a modalidade e exibe uma explicação demonstrativa específica.

Não são solicitados número de cartão, validade, CVV, nome impresso, CPF ou dados bancários. O aviso “Esta é uma experiência demonstrativa. Nenhuma cobrança será realizada.” permanece visível no fluxo.

### Etapa 3 — Revisão

A revisão apresenta dinamicamente:

- dados pessoais;
- endereço completo;
- modalidade escolhida;
- produtos, coleção, quantidades e preços;
- subtotal, frete e total.

O resumo lateral usa exclusivamente os helpers centrais. Referências a produtos inexistentes são ignoradas e anunciadas; se nenhum produto válido permanecer, o rascunho é limpo e a navegação usa `location.replace()` para `cart.html#cart-content`.

O botão `Confirmar pedido simulado`:

- existe somente na área de ações da Revisão;
- mantém `type="submit"`;
- fica oculto fora da Revisão e após o sucesso;
- usa `disabled` enquanto o estado não é válido ou durante o processamento;
- mostra `Confirmando...` e impede submissão duplicada.

### Etapa 4 — Confirmação

Antes de confirmar, o código revalida dados, pagamento, produtos e valores. Em seguida:

1. gera um número demonstrativo no formato `LUM-ANO-XXXXXX`;
2. cria um snapshot completo do pedido somente em memória;
3. chama exclusivamente `clearCart()`;
4. remove o rascunho do checkout;
5. limpa o estado operacional que não é mais necessário;
6. renderiza a confirmação e move o foco para seu heading.

A confirmação mostra número fictício, total, modalidade, aviso de que nenhuma cobrança foi realizada e CTA para `index.html#products`. Não mostra endereço completo ou telefone e não persiste o pedido. Ao recarregar depois do sucesso, o carrinho vazio faz o checkout retornar ao carrinho.

## Persistência

### localStorage

| Chave | Formato | Regras defensivas |
|---|---|---|
| `lumiereCart` | Array de `{ productId, quantity }` | Aceita apenas IDs e quantidades inteiros, com quantidade maior que zero |
| `lumiereFavorites` | Array de IDs | Aceita apenas inteiros correspondentes a produtos existentes |
| `lumiereNewsletter` | Array de strings | Aceita apenas strings não vazias; novas entradas são normalizadas |

JSON ausente, inválido ou com tipo incompatível produz um estado seguro sem interromper a interface.

### sessionStorage

`lumiereCheckoutDraft` armazena somente uma whitelist:

- etapa atual;
- nome, e-mail e telefone;
- CEP, endereço, número, complemento, bairro, cidade e estado;
- modalidade de pagamento.

O rascunho é salvo após avanço válido e pode ser atualizado ao voltar. Ele não é salvo a cada tecla. Na restauração, o conteúdo é sanitizado e as etapas anteriores são revalidadas antes de permitir uma etapa avançada.

O rascunho é removido quando:

- o formato persistido é inválido;
- o checkout não possui produtos válidos;
- o usuário usa os links de saída para editar o carrinho;
- o pedido simulado é confirmado.

### Dados não persistidos

- resposta completa do ViaCEP;
- snapshot do pedido confirmado;
- número fictício do pedido;
- dados de pagamento, que não são solicitados.

Nenhum dado do checkout é gravado no `localStorage`.

## Responsividade

### Breakpoints existentes

- até 992 px: grids e checkout passam por redução de colunas e espaçamento; o resumo deixa de ser sticky;
- até 768 px: navegação mobile, campos em uma coluna, ações reorganizadas e componentes ajustados para telas menores;
- até 425 px: refinamentos de Home e catálogo, incluindo cards de produto em uma coluna.

### Comportamento por página

- Home: Hero vertical, Featured e catálogo responsivos, Story empilhada, Benefits e Categories reorganizados, filtros roláveis, newsletter e footer compactados.
- Carrinho: lista, controles, resumo e header adaptados por `cart-responsive.css`.
- Checkout: duas colunas com resumo sticky em telas largas; uma coluna e resumo estático em tablet; campos e ações em largura apropriada no mobile.

`checkout-responsive.css` também trata `prefers-reduced-motion`. A implementação busca preservar ordem de leitura, áreas de toque e ausência de overflow horizontal.

## Acessibilidade

### Navegação e estrutura

- landmarks e headings semânticos;
- um `h1` por página;
- labels visíveis nos formulários;
- `fieldset` e `legend` para grupos de dados e pagamento;
- botões com tipos explícitos;
- imagens com texto alternativo;
- foco visível preservado.

### Estados dinâmicos

- `aria-expanded` no menu mobile;
- `aria-pressed` nos favoritos;
- `role="dialog"`, `aria-modal`, `aria-hidden` e `inert` no mini carrinho;
- `aria-current="step"` no progresso do checkout;
- `aria-invalid` e `aria-describedby` nos campos;
- mensagens gerais em região `aria-live="polite"`;
- `aria-busy` durante busca de CEP e confirmação;
- painéis inativos com `hidden`;
- estados indisponíveis com `disabled`, sem confundi-los com visibilidade.

### Gerenciamento de foco

- fechamento do menu mobile por `Escape` devolve foco ao acionador;
- mini carrinho contém o foco e o devolve ao controle de abertura;
- troca de etapa foca o heading correspondente;
- erro de validação foca o primeiro campo inválido;
- sucesso foca o heading da confirmação;
- a consulta de CEP só direciona ao número após sucesso iniciado pelo usuário e quando isso não interrompe a interação assistiva prevista.

## Funcionalidades implementadas

- Home institucional com oito blocos na ordem atual.
- Dez produtos e Featured Collection ÉTOILE.
- Catálogo dinâmico e filtros por categoria.
- Categories conectadas aos filtros.
- Favoritos persistentes e sincronizados visualmente.
- Product Cards reutilizáveis.
- Toast de feedback.
- Newsletter validada e persistente.
- Header ao scroll e menu mobile acessível.
- Mini carrinho lateral acessível.
- Carrinho completo e persistente.
- Cálculos centrais de subtotal, frete e total.
- Sincronização do carrinho entre interfaces e abas.
- Checkout simulado completo em quatro etapas.
- Validação acessível dos campos e pagamento.
- Máscaras de telefone e CEP.
- Preenchimento de endereço via ViaCEP.
- Rascunho defensivo na sessão.
- Revisão dinâmica do pedido.
- Prevenção de confirmação duplicada.
- Snapshot em memória, limpeza central do carrinho e confirmação simulada.
- Responsividade de Home, carrinho e checkout.

## Decisões arquiteturais

### Arquitetura conservadora

O projeto preserva HTML, CSS modular e JavaScript Vanilla. As responsabilidades foram separadas sem introduzir framework, dependência de build ou abstrações incompatíveis com o tamanho atual.

### Estado centralizado do carrinho

`cart.js` é a fonte única para estado, armazenamento, consultas, cálculos e ações. Mini carrinho, contador, página completa e checkout consomem esse núcleo. Isso evita estados paralelos e diferenças financeiras entre interfaces.

### Referência compartilhada estável

As ações removem e limpam itens por mutação. `window.cart` continua apontando para o mesmo array durante toda a sessão da página.

### Checkout em página única

As quatro etapas vivem em `checkout.html`. Painéis inativos usam `hidden`, o que mantém uma ordem de documento previsível e evita criar rotas ou arquivos adicionais para cada etapa.

### Pagamento somente simulado

O checkout coleta apenas a modalidade. A ausência de campos financeiros reduz risco e comunica corretamente o caráter demonstrativo do portfólio.

### Estado híbrido do checkout

O estado operacional permanece em memória. Somente um rascunho mínimo e validado vai para `sessionStorage`, permitindo recuperação após recarga sem transformar dados do checkout em persistência duradoura.

### Helpers financeiros reutilizados

Carrinho completo e checkout usam a mesma busca de produtos, formatação monetária e regras de subtotal, frete e total. O valor do frete não é redefinido fora de `cart.js`.

### Persistência limitada por responsabilidade

`localStorage` mantém apenas carrinho, favoritos e newsletter. `sessionStorage` mantém o rascunho do checkout. Pedido confirmado e resposta de serviço externo permanecem fora do armazenamento.

### HTML semântico e estados explícitos

Labels, fieldsets, legends, headings e botões reais formam a base dos componentes. Atributos ARIA complementam estados dinâmicos, sem substituir semântica nativa.

## Dependências externas

- Google Fonts: Inter e Playfair Display.
- Bootstrap CSS e Bootstrap Bundle 5.3.7, carregados na Home.
- Bootstrap Icons 1.13.1, carregado nas três páginas.
- ViaCEP, consultado durante o preenchimento de endereço.

Não há pacotes instalados no repositório. A indisponibilidade de fontes, CDN ou ViaCEP pode afetar recursos externos, mas o preenchimento manual do endereço permanece disponível em falhas de rede.

## Limitações atuais

- O link `Ver detalhes` dos Product Cards não abre uma página ou modal.
- Os controles visuais de busca não executam pesquisa.
- A interface de cupom não aplica descontos.
- Links de Instagram e Pinterest usam destinos de demonstração.
- Não existe sincronização imediata do checkout com alterações feitas em outra aba; o carrinho é revalidado na entrada e antes da confirmação.
- O pedido confirmado existe apenas na memória da página e não pode ser recuperado após recarga.
- Frete, estoque, cobrança e confirmação não correspondem a operações reais.

## Melhorias futuras

- Implementar busca no catálogo.
- Criar detalhes de produto para o CTA já existente.
- Implementar cupons simulados sem duplicar os cálculos centrais.
- Substituir links sociais de demonstração.
- Ampliar o catálogo e os conteúdos institucionais.
- Adicionar testes automatizados de interface e persistência.
- Refinar microinterações e pontos responsivos conforme novos testes em dispositivos reais.
- Avaliar sincronização opcional do checkout entre abas sem ampliar a fonte de estado.

Integração real de pagamento, backend, autenticação e persistência de pedidos não fazem parte da implementação atual. Caso sejam consideradas no futuro, exigirão uma revisão arquitetural e de privacidade separada.
