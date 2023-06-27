# Boas vindas ao repositório do projeto!


### É uma aplicação feita por mim, onde é possível cadastrar, listar, deletar e atualizar um chamado.
### Nela, conseguimos efetuar cadastro de usuários e chamados, login do usuário com autenticação do token JWT, atualizar e deletar.
### Utilizei a biblioteca bcrypt para a realização de criptografia das senhas criadas pelos usuários.

## Funcionamento da aplicação
⚠ **Atenção:** ⚠
Para rodar a aplicação é necessário instalar as dependências antes.

Para instalar as dependências:
```sh
npm install
```
Para rodar a aplicação:
```sh
npm run start:dev
```

## Alguns campos no modelo principal são:

+ Name 
+ Email
+ Password
  
Além disso, podendo ter um usuário com esses campos:

+ name
+ email
+ password
+ role
+ createdAt
+ updatedAt

Podendo conseguir realizar a abertura de chamados com esses campos:

+ title
+ comment
+ status
+ priority
+ createdAt
+ updatedAt


## Tecnologia usadas:

<table>
  <tr>
    <td>Nodejs</td>
    <td>TypeScript</td>
    <td>Postgres</td>
    <td>TypeORM</td>
  </tr>
</table>


