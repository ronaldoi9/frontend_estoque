# Decisões de Projeto

Para elaborar o frontend da aplicação de estoques, utilizou-se o React para construir a interface com o usuário.

A arquitetura da aplicação está dividida seguindo alguns patterns básicos como separação de páginas, serviços e componentes.

### Componentes
Como esta aplicação deve ser escalável, optei por dividir os componentes que são rendundantes para conseguir reaproveitá-los no futuro, assim como, campos de formulário e linhas de tabela que possuem algumas características. Todos utilizando conceitos de interface da linguagem Typescript para controlar a comunicação.

### Store
Para realizar o gerenciamento de estado utilizou-se a biblioteca do Redux. Primeiramente dentro da pasta store separei por funcionalidade os ducks da aplicação. Entendendo que este código será escalável, cada duck possui suas características separadas em arquivos.

- **type**: Define quais são os tipos de cada actions.
- **actions**: Contém todas as ações baseadas em cada type definido e o seu devido payload. Neste arquivo utilizei uma abordagem que realiza o mapeamento de tipo, para conseguir obter o produto tanto pelo tipo `Product` quanto pelo tipo `Product[]`
- **index**: Contém o reducer de produto, que é responsável por manipular o estado de acordo com a action disparada.

### Service
Para realizar a comunicação com a API desenvolvida, utilizei o framework axios, que fará as requisições http para nosso backend.

### Domain
Esta pasta contém a interface da entidade que estamos trabalhando, decidi colocá-la em um lugar específico para ser reaproveitado em outras partes do projeto, devido a alta necessidade de utilização.

### Pages
Contém as duas paginas da nossa aplicação, **Home** que é a página inicial que mostra a lista de produtos existentes no banco, e a página **Form** que contém um formulário para cadastro e edição de um novo produto. 

Na primeira vez que o usuário entrar na página Home, todos os produtos são carregados no banco uma única vez. Assim, se o usuário desejar cadastrar um novo produto, o frontend enviará uma requisição http para add um novo produto, porém, quando retornar ao menu principal não será disparado uma nova requisição ao banco, pois, o redux será resposável por gerenciar o estado da minha lista de produtos.

Para remover a responsabilidade da página Home de puxar todos os produtos do backend, esta função foi delegada para o App da minha aplicação, devido ao fato de que essa applicação possui uma história de usuários simples.

Na página Home também contém o dispatcher para realizar a exclusão de um produto no banco, na qual, esta operação é controlada pelo redux, que faz o gerenciamento do estado sem ter a necessidade de carregar novas informações do banco.

Na Página do Form contém 2 dispatchers, um para o momento de adicionar um objeto e outro no momento de edição, na qual, ambos controlam o estado da minha aplicação, novamente evitando chamadas desnecessárias ao banco.

### Utils
Contém um arquivo que possui a função de realizar o parse do objeto JSON recebido pela requisição, convertendo os campos que devem ser number para devido seu tipo realizando sua validação.

### Routes
Responsável por realizar a transição das páginas da aplicação, na qual, utiliza-se de um componente que navega entre as páginas de acordo com a url recebida.

# Getting Started 

Após clonar este repositório, deve-se executar o comando abaixo para iniciar a aplicação:

### `yarn start`
