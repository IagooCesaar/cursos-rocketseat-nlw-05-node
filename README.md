# Chat via Sockets
>Aplicação construída durante a 5ª semana Next Level Week da Rocketseat ( NLW#05 )

Será contruída durante esta semana (de 19 a 25/04) uma aplicação para envio de mensagens em tempo real, como um Chat.

> A aplicação ainda está em construção!

## Composição da semana

- Aula 1 - Fundamentos do NodeJS
- Aula 2 - Primeiro contato com banco de dados (TypeORM + SQLite 3)
- Aula 3 - Separando regra de negócio e relacionamentos (um pra um, muitos para um)
- Aula 4 - Introdução ao protocolo WebSocket
- Aula 5 - Finalizando a aplicação

## Desafio pessoal

Sou aluno do [Ignite](https://help.rocketseat.com.br/hc/pt-br/articles/1500003228822-O-que-%C3%A9-o-Ignite-), programa de aceleração para devs,  focado em preparar profissionais completos(as) para o mercado, treinando skills técnicas e comportamentais de forma intensiva e prática. 

Para praticar os conhecimentos adquiridos, me desafiei a construir a mesma aplicação do NLW#05 aplicando o conteúdo visto durante o bootcamp.

Além da organização do projetos, utilizando os princípios do SOLID, e também o Design Patter Singleton, minhas alterações no projeto até o momento foram:

- Banco de dados: ao invés de SQLite, utilizarei o Postgres
- Infraestutura: utilizarei contêiners Docker para instanciar o banco de dados
- mais validações de integridade

# Como executar o projeto

## Requisitos

Será necessário possuir instalado na máquina:

- Node > 12.x.x
- Yarn
- Docker
- Docker-Compose

Cumprindo estes requisitos, siga os passos:

## Faça clone do projeto para sua máquina

Utilize comandos git para clonar o projeto, como o exemplo utilizando SSH:

``
git clone git@github.com:IagooCesaar/cursos-rocketseat-nlw-05-node.git "minha pasta"
``
## Instalando dependências do projeto

Via terminal, navegue até a pasta criada, onde foi depositado o clone do projeto, e execute o comando `yarn`. Todas as dependências do projeto serão instaladas.

## Preparando o banco de dados

Ainda no terminal, execute o comando `docker-compose up -d` para instanciar o banco de dados. Se esta for a primeira vez que esteja criando um container com a imagem `postgres` este procedimento poderá levar alguns minutos.

Uma vez que o banco de dados esteja em execução, execute o comando `yarn typeorm migration:run`. Este comando fará com que todos os objetos de banco de dados sejam criados.

Você poderá comprovar a criação desses objetos acessando o banco de dados, utilizando o [Beekeeper Studio](https://www.beekeeperstudio.io/).

Exemplo:
![Parâmetros para Beekeeper](https://user-images.githubusercontent.com/12894025/115475374-d5358700-a215-11eb-99ef-6bdaf1311fe2.png)


## Executando o projeto

Agora com todas as dependências disponíveis, para executar o projeto em ambiente de *desenvolvimento* execute o comando `yarn dev`. O serviço será iniciado na porta *3333*. Você poderá utilizar o [Insomnia](https://insomnia.rest/download) (ou qualqer software similar, como o Postman) para acessar os recursos desta API.

Com a aplicação em funcionamento, utilize o seu browser favorito para acessar página de clientes em [http://localhost:3333/pages/client](http://localhost:3333/pages/client) e a página de administradores em [http://localhost:3333/pages/admin](http://localhost:3333/pages/admin)

# Como executar os testes

Para executar os testes será necessário primeiramente seguir os passos anteriores para ter todas as dependências disponíveis.

O próximo passo será criar um banco de  dados exclusivo para testes. Para isto, iremos utilizar a instância de Postgres existente que subimos com o Docker.

Com o Beekeeper, conecte-se ao banco de dados. Acesse o menu `File > New Tab`. Escreva a instrução `create database nlw05_test` e clique no botão **Run**. A mensagem  _Query Executed Successfully. No Results_ deverá ser apresentada.

Com nosso banco de dados criado, de volta ao terminal, execute o comando `yarn test`. Serão executados os **testes unitários** e os **testes de integração**.

# Diagrama das entidadas do banco de dados

![Diagrama](https://github.com/IagooCesaar/cursos-rocketseat-nlw-05-node/blob/main/diagrama.png?raw=true)

# Cobertura de testes

![Cobertura de testes](https://user-images.githubusercontent.com/12894025/116007233-257d6200-a5e5-11eb-8255-c52ca50ab975.jpg)

Após executar os testes, inicie a aplicação e acesse a rota http://localhost:3333/api-coverage/index.html
