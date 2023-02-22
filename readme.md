# Very Useful Tools To Remember

A aplicação é um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags.

## Resumo das especificações iniciais

- Utilização das ferramentas e serviços: AWS Cognito, AWS API Gateway, AWS Lambda, AWS DynamoDB, Serverless Framework e
  Middy
- Rotas necessárias:

| METHOD | ROUTE      | DESCRIPTION                                                          |
| ------ | ---------- | -------------------------------------------------------------------- |
| GET    | /tools     | Listar ferramentas. Deve ser possivel uma busca por tag com queries. |
| POST   | /tools     | Cadastrar ferramenta                                                 |
| DELETE | /tools/:id | Deletar ferramenta                                                   |

- Uso de autenticação
- Formato de uma ferramenta:

```ts
type Tool = {
  id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
};
```

## Implementação atual

Estado atual: WIP

### Resumo

Foram criados pastas separadas para que se comportem como módulos distintos, podendo depois serem separadas em
diferentes packages, ou utilizar melhor ferramentas como pnpm workspace para gerenciar cada parte deste sistema.

Foco desta implementação:

- Por mais simples que o problema seja, estou criando uma estrutura para explorar possibilidades que poderiam ser
  utilizados em escalas ou problemas maiores;
- Utilizar ao máximo o typescript para ter segurança na tipagem;
- Ter responsabilidades bem definidas entre os módulos, e estrutura bem desacoplada entre elas para que uma alteração em
  uma delas possa influenciar menos em outras;
- Evitar repetição de informações, ou seja, definir apenas uma vez alguma interface, e desenvolver ou utilizar geradores
  para fazer a produção automática de artefatos em formatos que outros módulos possam precisar (exemplo: assinaturas de
  typescript gerando OAS);

#### Resumo dos módulos

| Módulo          | Descrição                                                         |
| --------------- | ----------------------------------------------------------------- |
| api-routes      | Onde se define as rotas e sua lógica                              |
| persistence     | Serviços para persistir dados (Cognito, DynamoDB)                 |
| deployment      | Coordenação da infraestrutura (Serverless Framework)              |
| lambda-adapter  | Gera lambdas prontos para upload a partir das rotas definidas     |
| generate-oas    | Gera OpenAPI spec a partir das rotas definidas                    |
| brute-force-oas | OpenAPI spec já definidas enquanto `generate-oas` não está pronto |

### Features

#### Definir rotas de forma simples

<details>
<summary>Exemplo de uma rota definida (POST /login)</summary>

```ts
import { login } from "src/persistence/cognito/login";
import { DefinedRequest, DefinedResponse } from "src/api-routes/utils/types";

interface LoginResponse {
  token: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const post = async (
  request: DefinedRequest<{ body: LoginBody }>
): Promise<
  | DefinedResponse<{
      status: 200;
      body: LoginResponse;
    }>
  | DefinedResponse<{ status: 401 }>
  | DefinedResponse<{ status: 404 }>
> => {
  // detalhes da implementação
};
```

</details>

#### Autorização de rotas em um local separado e bem definido

- Lógica de autorização não está acoplada a lógica de execução das rotas.
- Declaração de autorização é feita em um local separado, e bem definido.

#### Cada rota equivale a exatamente um lambda

- Utilização de ESBuild para compilar os lambdas, e gerar artefatos prontos para upload.

#### Utilização do Cognito como autenticação e autorizador de lambdas

- Ou seja, não é necessário implementar uma lógica de autorização em cada lambda, pois o próprio Cognito já faz isso.

### Observações

- preferi não usar o dynamodb middleware de middy porque quero ter mais controle sobre o este layer, e não contato
  direto com o dynamodb;
- testes collocated nas pastas dos serviços, para que se precisar mover para outro lugar, não seja necessário alterar
  muito as estruturas;

### Limitações

- Ainda não dá para colocar configurações adicionais do lambda (memória, timeout, etc). Mas poderia ser corrigido
  colocando essa responsabilidade sobre algum modulo (api-routes, ou então no módulo lambda-adapter?);
- Não foi implementado uma autorização complexa, focado apenas em autenticação. Ou seja, um usuário pode interagir com
  qualquer recurso da API.
- Sem paginação na API
- Ainda não pode alterar middlewares middy por rotas;

## Documentação

- [Definição de rotas](/src/api-routes/): Consulte nesta pasta;

## Para utilizar localmente

Instale e configure o [localstack](https://github.com/localstack/localstack) para simular o ambiente AWS localmente.

Clone o repositório do projeto:

```shell
git clone https://github.com/outerlook/vuttr-backend.git;
cd vultr-backend;
```

Instale as dependências do projeto (neste caso utilizando pnpm, mas use o gerenciador de pacotes que preferir)

```sh
pnpm install
```

Gere os artefatos que serão utilizados para deployment:

```sh
pnpm build
```

Isso irá gerar os artefatos do seu projeto em uma pasta ./out (mas pode ser configurado)

<details>
<summary>O que build faz?</summary>

1. Cria pastas necessárias (por exemplo `/out`)
2. Limpa a pasta `/out`
3. Constrói arquivo de metadata sobre as rotas (filepath, method, etc) [módulo api-routes]
4. Gera artefatos para upload de lambdas [módulo lambda-adapter]
5. (não está pronto) Gera OpenAPI spec [módulo generate-oas]
6. Gera configuração do serverless [módulo deployment]

</details>

Deploy da aplicação:

```shell
pnpm deploy
```

Isso irá fazer o deploy da aplicação. Inicialmente este deploy é executado em um ambiente local.
