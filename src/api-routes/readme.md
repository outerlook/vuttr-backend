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