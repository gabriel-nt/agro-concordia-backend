<p align="center">
  <img src="https://github.com/gabriel-nt/app-agro-concordia/blob/master/mobile/src/assets/logo.png" alt="Agro Concórdia" />
</p>

<h1 align="center">
    🚀 Agro Concórdia
</h1>
<p align="center">Backend da aplicativo da Agro Concórdia</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=node&message=14.15.0&color=green&logo=node.js" />
  <img src="https://img.shields.io/static/v1?label=typescript&message=4.3.2&color=blue&logo=typescript" />
  <img src="https://img.shields.io/badge/last%20commit-july-orange" />
  <img src="https://img.shields.io/badge/license-MIT-success"/>
</p>

<p align="center">
  <a href="#-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-pré-requisitos">Pré-Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rodando-o-back-end-servidor">Backend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-bibliotecas">Bibliotecas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Lincença</a>
</p>

<h3 align="center"> 
🚧  Finalizado  🚧
</h3>

### 📌 Sobre 
A aplicação foi desenvolvida com o intuito de sanar um problema de controle de estoque de um comércio familiar, 
onde não havia um controle dos estoques do produtos vendidos.

### 📎 Features

#### Produtos
- [x] Criação de Produtos
- [x] Atualização de produtos
- [x] Upload de imagens
- [x] Deleção de produtos

#### Marcas
- [x] Criação de Marcas
- [x] Upload de imagens (logo e banner)
- [x] Atualização de registro
- [x] Deleção de registro

#### Vendas
- [x] Criação de Vendas
- [x] Atualização da transação
- [x] Remoção do registro

#### Compras
- [x] Criação de Vendas
- [x] Atualização da transação
- [x] Remoção do registro

#### Usuários
- [x] Login e Logout
- [x] Criação de Perfil
- [x] Listagem do Perfil
- [x] Atualização de Perfil
- [x] Atualização do Avatar

#### Gerais
- Dashboard
  - [x] Relatórios
  - [x] Gráficos
  - [x] Listagem de produtos por marcas
- Cache
  - [x] Redis
- Upload de Imagens
  - [x] Disk Storage

### ⚙ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e/ou [Yarn](https://https://yarnpkg.com/)
Também, será necessário ter o [Docker](https://www.docker.com/) instalado e configurado em sua máquina.
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🛢 Configurando Docker
```bash

# Clone este repositório
$ git clone https://github.com/gabriel-nt/agro-concordia-backend

# Crie o container do Postgres
$ docker run --name gobarber -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Crie o container do Redis
$ docker run --name redis -p 6379:6379 -d -t redis:alpine 

````

### 🎲 Rodando o Back End (servidor)

```bash
# Instale as dependências
$ npm install ou yarn

# Rode as migrations
$ yarn typeorm migration:run

# Execute a aplicação em modo de desenvolvimento
$ yarn dev ou npm run dev

# Execute os testes
$ yarn test

# Execute os testes com Coverage
$ yarn test --coverage

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```
* Obs: Para executar os backend, crie um banco de dados.

### 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Node.js
- Babel
- TypeScript
- Postgres
- Redis

### 📕 Bibliotecas

Esse projeto foi desenvolvido com o auxílio das seguintes libs:

- Express
- Jest
- TypeORM
- multer
- jwt
- uuid
- rate-limiter-flexible
- tsyringe

### 📙 Arquitetura do Projeto

Para uma melhorar estrutura de projetos utilizamos das seguintes fundamentos:

- DDD
- TDD
- SOLID

###  📘 Padrão de Código

Para padronizar a escrita do código, utilizamos as seguinte ferramentas:

- Eslint
- Prettier
- EditorConfig

### 📝 Licença

Esse projeto está sob a licença MIT.

<hr/>

Feito por Gabriel Teixeira.
