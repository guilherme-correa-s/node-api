# 🔐 Node Store API
> Uma API que simula uma loja.
Este é um projeto feito para BlueEdTech para treinar a criação de uma API RESTful em Node.js. Várias tecnologias em alta demanda no mercado foram utilizadas, como JWT para validação de identidade, MongoDB e Mongoose para persistência de dados.

# 🚀 Executando o projeto
Antes de tudo, é necessário criar um arquivo ```.env``` no diretório raiz do projeto, seguindo a mesma estrutura do [arquivo .env.example](/.env.example), que também se encontra no diretório raiz.

Após criar o arquivo e preencher os dados necessários, é hora de baixar as dependências utilizando ```npm --install``` ou ```yarn```.

Com as dependências instaladas, o projeto já está pronto para ser executado. Há duas formas de fazer isso: executar em modo de produção, utilizando ```npm start``` ou ```yarn run start```, ou em modo de desenvolvimento utilizando ```npm run dev``` ou ```yarn run dev```. Executar em modo de desenvolvimento irá mostrar algumas informações úteis no console, como por exemplo, o status de conexão com o banco de dados.

# 📃 Documentação dos endpoints
A documentação segue a seguinte convenção: rotas públicas que não requerem autenticação são prefixadas com (✅). Rotas protegidas requerem um cabeçalho de autenticação no estilo ```Bearer <token>```, e são prefixadas com (🔒).

---
### ✅ **POST** ```/customers```

Cria um usuário, que deverá ser utilizado para adquirir uma autenticação.

Parâmetros obrigatórios no corpo da requisição:
- name: ```string``` | Nome do usuário
- email: ```string``` | E-mail do usuário
- password: ```string``` | Senha do usuário

Exemplo de resposta:
```json
{
  "message": "Cliente cadastrado com sucesso!"
}
```
---
### ✅ **POST** ```/customers/authenticate```

Autentica o usuário, e retorna um ```Bearer token``` que deverá ser utilizado nos endpoints protegidos.

Parâmetros obrigatórios no corpo da requisição:
- email: ```string``` | E-mail do usuário
- password: ```string``` | Senha do usuário

Exemplo de resposta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDNlYWI3YmIxZDRjOTNkMDA0ZWMwNiIsImVtYWlsIjoiZ3VpbGhlcm1lc2NvcnJlYTFAZ21haWwuY29tIiwibmFtZSI6Ikd1aWxoZXJtZSBDb3JyZWEiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTYzMTg0MDk4NywiZXhwIjoxNjMxOTI3Mzg3fQ.FhdYyOuCGM34QPZGBDX3IV507e7bS5QOzgr8yM3ufxA",
  "data": {
    "email": "guilhermescorrea1@gmail.com",
    "name": "Guilherme Correa"
  }
}
```
---
### ✅ **GET** ```/products```
Retorna um array contendo os produtos cadastrados.

Exemplo de resposta:
```json
[
  {
    "active": true,
    "tags": [
      "mouse",
      "gamer"
    ],
    "_id": "61411b34ae9d782398c35963",
    "title": "Mouse Gamer",
    "slug": "mouse-gamer",
    "description": "Mouse gamer rápido e de qualidade",
    "price": 200,
    "__v": 0
  },
  {
    "active": true,
    "tags": [
      "teclado",
      "gamer",
      "teclado mecanico"
    ],
    "_id": "61427795ef20544f9c89335a",
    "title": "Teclado Gamer",
    "slug": "teclado-gamer",
    "description": "Teclado gamer mecânico.",
    "price": 800,
    "__v": 0
  },
  {
    "active": true,
    "tags": [
      "cadeira",
      "gamer"
    ],
    "_id": "6143eb1fbb1d4c93d004ec09",
    "title": "Cadeira Gamer",
    "slug": "cadeira-gamer",
    "description": "Cadeira gamer confortável",
    "price": 1500,
    "__v": 0
  }
]
```
---
### ✅ **GET** ```/products/adm/<id>```
>```userId``` ID válido de um produto
Retorna o produto contendo o Id informado.

Exemplo de resposta:
```json
{
  "active": true,
  "tags": [
    "cadeira",
    "gamer"
  ],
  "_id": "6143eb1fbb1d4c93d004ec09",
  "title": "Cadeira Gamer",
  "slug": "cadeira-gamer",
  "description": "Cadeira gamer confortável",
  "price": 1500,
  "__v": 0
}
```
---
### 🔒 **POST** ```/products```

Cria um produto

Parâmetros obrigatórios no corpo da requisição:
- title: ```string``` | Título do produto
- slug: ```string``` | Título sem letra maiúscula
- price: ```number``` | Preço do produto
- tags: ```string``` | tags do produto [array]

Um token de admin pode ser passado das seguintes maneiras:
query: ```/products?<token>```
body: "token": <token>
header: x-access-token = <token>

Exemplo de resposta:
```json
{
  "message": "Produto cadastrado com sucesso!"
}
```
---
### 🔒 **DELETE** ```/products/<userId>```
>```userId``` ID válido de um usuário
Deleta permanentemente um produto da loja.

Um token de admin pode ser passado das seguintes maneiras:
query: ```/products?<token>```
body: "token": <token>
header: x-access-token = <token>

Exemplo de resposta:
```json
{
  "message": "Produto deletado com sucesso!"
}
```
---