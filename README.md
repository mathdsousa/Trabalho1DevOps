# Trabalho1DevOps

Este projeto foi desenvolvido na disciplina de **DevOps (2025.1)**, ofertada pelo Departamento de Computação da **UFSCar**.

A aplicação é baseada no **Catlog**, uma rede social voltada à criação de catálogos e comunidades de conteúdos diversos, de acordo com os interesses dos usuários.

Nesta etapa do projeto, realizamos a **containerização e orquestração** dos serviços utilizando **Minikube** e **Helm Charts**.

---

## Arquitetura dos Serviços

A aplicação é composta pelos seguintes microsserviços:

- **Backend**  
  Responsável pela lógica de negócio, rotas da API REST, comunicação com o banco de dados e autenticação de usuários.

- **Frontend**  
  Interface web da aplicação, desenvolvida para interação com o usuário. Realiza chamadas à API exposta pelo backend.

- **Image Service**  
  Serviço responsável por realizar o upload de imagens associadas às postagens dos usuários, armazenando os arquivos localmente ou em serviços externos.

- **Send Email**  
  Serviço de envio automático de e-mails de boas-vindas ou confirmações, disparado logo após o cadastro de um novo usuário.

- **Banco de Dados**  
  Utilizado para armazenar os dados da aplicação, como usuários, postagens, catálogos, etc. A imagem utilizada está definida no Helm Chart (`meuapp-db`).

---

## Pré-requisitos

- Docker instalado e configurado
- Minikube instalado
- Helm instalado

---

## Etapas para executar o projeto

### 1. Iniciar o Minikube

```bash
minikube start
```

Inicia a instância local do Kubernetes por meio do Minikube.

---

### 2. Configurar o ambiente Docker para usar o daemon do Minikube

```bash
eval $(minikube docker-env)
```

Permite que os builds Docker feitos localmente sejam utilizados diretamente pelo cluster do Minikube.

---

### 3. Construir as imagens dos serviços

```bash
docker build -t trabalho2devops-backend:latest ./backend
docker build -t trabalho2devops-frontend:latest ./frontend
docker build -t trabalho2devops-image-service:latest ./image-service
docker build -t trabalho2devops-send-email:latest ./send-email
```

Cria as imagens Docker dos serviços da aplicação.

---

### 4. Preparar o ambiente do Minikube

```bash
minikube image load k8s.gcr.io/ingress-nginx/controller:v1.9.4
```

Carrega a imagem do controlador de ingress NGINX no Minikube (caso necessário).

```bash
minikube addons enable ingress
minikube addons enable dashboard
minikube addons enable metrics-server
```

Ativa os seguintes add-ons do Minikube:

- `ingress`: permite acesso externo aos serviços do cluster
- `dashboard`: interface visual de gerenciamento do cluster
- `metrics-server`: coleta métricas de uso dos pods

---

### 5. Editar o arquivo de hosts

Edite o arquivo `/etc/hosts` (com privilégios de administrador) e adicione a linha abaixo:

```txt
192.168.49.2    catlog.k8s.local
```

> Verifique o IP atual do Minikube com `minikube ip`, pois pode variar a cada inicialização.

---

### 6. Instalar o Helm Chart

```bash
helm install catlog ./catlog-chart
```

Instala todos os recursos no cluster utilizando o Helm Chart localizado em `./catlog-chart`.

---

## Acesso à Aplicação

Após a instalação, a aplicação pode ser acessada via navegador através do endereço:

```bash
http://catlog.k8s.local
```

---

## Autor
Karys Barbosa e Matheus Sousa
Disciplina: DevOps
