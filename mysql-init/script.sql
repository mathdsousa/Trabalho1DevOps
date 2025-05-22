-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS usuarios CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Selecionar o banco de dados
USE usuarios;

-- Criar a tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  usuario VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  dataNascimento DATE,
  genero VARCHAR(100) NOT NULL,
  senha VARCHAR(255) NOT NULL
);

-- Criar a tabela de posts
CREATE TABLE IF NOT EXISTS post (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  texto TEXT NOT NULL,
  usuario_id INT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Criar a tabela de comentários
CREATE TABLE IF NOT EXISTS imagem (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  dados LONGBLOB NOT NULL,
  post_id INT,
  FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE
);