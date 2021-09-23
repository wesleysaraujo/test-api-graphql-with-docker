CREATE DATABASE IF NOT EXISTS
    api_descomplica;
USE api_descomplica;

CREATE TABLE IF NOT EXISTS students (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY `email_UNIQUE` (`email`),
    UNIQUE KEY `cpf_UNIQUE` (`cpf`)
);

INSERT INTO students VALUE(0,'Maria Marta de Medeiros', 'marta.maria@gmail.com', '85030254420');
INSERT INTO students VALUE(0,'Joao Paulo Ferreira de Melo', 'ferreira.paulo@gmail.com', '01197224700');
INSERT INTO students VALUE(0,'Maurício Souza de Alencar', 'mauricio_souza@gmail.com', '75991208743');
INSERT INTO students VALUE(0,'João Neto Frederico Batista', 'netojohn@gmail.com', '18056647783');
INSERT INTO students VALUE(0,'Marcelo Queiroz de Galvão', 'mqueirozgalv@gmail.com', '55805693437');
INSERT INTO students VALUE(0,'Joana Prado Costa e Silva', 'joanapradofeit@gmail.com', '91416938680');
INSERT INTO students VALUE(0,'Marta Algusta Santos Macedo', 'santosmacedomarta@gmail.com', '87102586809');