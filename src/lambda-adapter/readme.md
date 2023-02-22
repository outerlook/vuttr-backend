## Responsible for

- generating ready-to-deploy lambda artifacts and metadata for the lambda functions.
- defining lambda middlewares, such as logging, error handling, etc
- if necessary may do something

## NOT responsible for

- defining infrastructure for the lambda functions.
- deploying the lambda functions.
- application logic

## Depends on

- [src/api-routes](src/api-routes/readme.md)

# Como poderia melhorar?

- Inverter dependencia com api-routes. Ou seja, importar um adapter de dentro de api-routes e não importar api-routes
  dentro de adapter. Isso permitiria ficar mais fácil de exigir um contrato de "adapter" dentro de api-routes,
  facilitando a definição do que é necessário para construir um novo adaptador (netlify, express, gcp, etc)
