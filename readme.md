### Observações

- mudei alguns returns como adicionar o objeto tools ao GET /tools em vez de ser seco o array
- preferi não usar o dynamodb middleware de middy porque quero ter mais controle sobre o este layer, e não contato
  direto com o dynamodb
- poderia ter como colocar configurações adicionais a partir do lambda (memória, timeout, etc)
- testes collocated nas pastas dos serviços, para que se precisar mover para outro lugar, não seja necessário alterar
  muito as estruturas
- gostaria de colocar a configuração do serverless em outra pasta mais especifica, mas infelizmente é exigido colocar na
  root do projeto
- poderia ter paginação no GET /tools
- Não foi implementado uma autorização complexa, focado apenas em autenticação. Ou seja, um usuário pode interagir com qualquer recurso da API.
