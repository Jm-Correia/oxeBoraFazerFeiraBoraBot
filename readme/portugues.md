## About this project

(future)*[click here to Portuguese Version](/readme/portugues.md)*

### MVP
> 

### Architecture:

> This Project was planned to have a simple architecture with the matter of reaching the delivery on time, however using the good software development practices.

> Exemple:
> - Very loosely coupled between components.
> - Use of isolated functions with a single responsibility.

>
> #### Structure of directories:
>```sh
>src
>│
>└────app
>│      └───services
>│      └───schemas
>│      └───model
>│      └───infra
>│            └──config
>│            └──database
>└───main
>     └───Bot
>     └───config
>```
>
>#### Architecture Diagram:
> ![Diagrama](./assets/arquitetura.png)

### Data Base:
> It was used the mongoDb on this Project because of it is simple to work, flexible to manipulate and save Shop data.

### Libs used:
>   **Typescript:**
>My motivation in using typescript was to facilitate my understanding and help me to be more productive.
>
> **Telegraf**
> That make it simple develop and interact with telegram bots. [link](https://telegraf.js.org/)


### Executing the Project (env: Local)

> First: You need to create a file .env following the exemple (.env.example). You can see it in root dir in this project. Second: You need to create a bot and generate a token. If you don't know how to create it, [click here](https://core.telegram.org/bots)
>
> To execute this project, you need to clone or download it. Go to the directory with the files and execute the commands:
>```sh
> $ yarn or npm i
> $ yarn dev 
>```
### Deploy:

> To generate a build to this project, execute the commands:
>```sh
> $ yarn
> $ yarn build or npm build
>```
> Ready! The javascript files will be created in this directory: "/dist".
