# API Routes

## Como definir rotas?

Elas podem ser definidas dentro deste módulo. O formato das rotas é inspirado por SvelteKit, Next.js, e outros
frameworks e é bem simples de entender.

### Exemplo

Estrutura de root

```
src
 |- api-routes
   |- root
     |- login.ts
```

com o arquivo `login.ts`:

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

definirá a rota

```
POST /login
```

- Pode ter mais de um método em uma pasta
- para utilizar uma variável na rota, basta criar uma pasta com o nome da variável (
  ex: `src/api-routes/root/users/[userId]/index.ts`);
- Necessário utilizar DefinedRequest e DefinedResponse para tipar corretamente as rotas e também facilitar o processo de
  gerar o OAS;
- O nome das funções devem ser os métodos HTTP, ex: `post`, `get`, `put`, `del` (delete é uma palavra reservada do
  javascript, então não pode ser usada como nome de função).

## Responsible for

- Defining routes for the API
- Defining the API's request and response types
- Declarative authorization layer
- Application logic

### Then, will change if

- Changes to GraphQL schema

## NOT responsible for

- Implementing authentication
- Defining the communication protocol between the API and the client
- Knowing how to read and write data to any data source
- Defining infrastructure usage for the API

### Then, will not change if

- Changes infrastructure for the data sources
- Changes infrastructure for the API
- Changes how authentication happens

## Depends on

- [persistence](src/persistence/readme.md)
