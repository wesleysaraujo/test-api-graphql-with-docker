# Rodar o projeto
```docker-compose up -d```

O comando **docker-composer up -d** levanta os containers Mysql e API Node

# Popular Banco de Dados
```docker exec -i mysql-api-descomplica mysql -uroot -ppssS76TiD5 < api/db/script.sql```


# Acessando a API
Para acesso a API utilizar o endereço localhost:4000

## Consultas
* Listar todos os registros
```
query {
    students {
        name
        email
        cpf
    }
}
```
* Filtrar usuários por Nome, E-mail ou CPF
```
query($searchStudentQ: String!){
    searchStudent(q: $searchStudentQ) {
        name,
        email,
        cpf
    }
}
```
* Inserir novo registro no banco
```
mutation CreateStudentMutation(
    $createStudentName: String!, 
    $createStudentEmail: String!, 
    $createStudentCpf: String!) {
    createStudent(
        name: $createStudentName, 
        email: $createStudentEmail, 
        cpf: $createStudentCpf) {
        name
        email
        cpf
    }
}
```

## Proxy Reverso
Não consegui implementar nenhuma solução automatizada para o proxy reverso, mas o basico do basico, seria:
* criar um arquivo api-descomplica.test.conf em /etc/nginx/conf.d
```sudo nano /etc/nginx/conf.d/api-descomplica.test.conf```
* Colocar o seguinte conteúdo no arquivo:
```
server {
    listen 80;

    server_name api-descomplica.test;

    location / {
        proxy_pass http://127.0.0.1:4000/;
    }
}
```
* Salvar o arquivo usando o CTRL + O
* Testar a configuração do nginx com:
``sudo nginx -t``
* Restartar o Nginx:
```sudo systemctl restart nginx```

## Visualizar logs da API
Para viusalizar os logs de execução da API, basta rodar o comando:
```docker logs -f ID_DO_CONTAINER_NODEJS```

## Possíveis refatoração do código
* É possível refatorar esse código de forma que ele fique modularizado, criando modules do graphql separando as typesdefs por schemas com extensão .gql
* Também é necessário refatorar o dataset/Student.js pois acredito que o pacote mysql2 talvez não seja o melhor pacote para um projeto melhor estruturado
