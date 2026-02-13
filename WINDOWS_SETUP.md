# Guia do Sistema Frota 2.0

## 🚀 Instalação Super Rápida (Recomendado)

Se você quer instalar tudo de uma vez (Node.js, PostgreSQL e configurar para ligar sozinho), siga estes passos:

1.  Abra a pasta do projeto no Windows.
2.  Clique com o botão direito no arquivo `install_windows.ps1` e escolha **"Executar com o PowerShell"**.
    *   *Nota: O script pedirá permissão de Administrador para instalar os programas.*
3.  Aguarde a conclusão. O sistema instalará o Node.js, o PostgreSQL e gerará os arquivos do banco de dados (Prisma).

---

## 1. Instalação Manual (Passo a Passo)

Antes de começar, você precisará instalar as seguintes ferramentas:

### Node.js
O Node.js é o ambiente de execução JavaScript necessário para rodar o projeto.
1.  Acesse [nodejs.org](https://nodejs.org/).
2.  Baixe e instale a versão **LTS** (recomendada para a maioria dos usuários).
3.  Durante a instalação, certifique-se de que a opção "Add to PATH" esteja marcada.

### PostgreSQL
Necessário para salvar os dados de forma centralizada e confiável.
1.  Acesse [postgresql.org/download/windows](https://www.postgresql.org/download/windows/).
2.  Baixe e instale o instalador interativo da **EDB**.
3.  Durante a instalação:
    *   Defina uma senha para o usuário `postgres` (ex: `68812406`).
    *   Mantenha a porta padrão `5432`.
4.  Recomendado: Use o **pgAdmin 4** (que vem com o instalador) para gerenciar o banco.

---

## 2. Configuração do Projeto

Abra o seu terminal preferido (PowerShell, Command Prompt ou Git Bash) e siga os passos abaixo:

### Passo 1: Navegar até a pasta do projeto
```powershell
cd "C:\caminho\para\seu\projeto\frota 2.0"
```

### Passo 2: Instalar as dependências
```powershell
npm install
```

### Passo 3: Configurar o Banco de Dados
Abra o arquivo `server/.env` e configure a URL do PostgreSQL:
```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/frota2?schema=public"
```

### Passo 4: Inicializar o Banco
Execute os comandos abaixo para preparar o banco de dados:
```powershell
npx prisma generate
npx prisma migrate dev --name init
```

---

## 3. Executando o Sistema

Para que o sistema funcione com sincronização entre computadores, você agora precisa rodar o **Frontend** e o **Backend** juntos.

### Rodar o Sistema Completo
```powershell
npm start
```
Após rodar esse comando:
*   O **Frontend** estará em `http://localhost:5173`.
*   O **Backend** estará rodando na porta `5002`.

> [!IMPORTANT]
> O **PostgreSQL** deve estar rodando e o banco `frota2` deve existir.

---

## 4. Como os Dados são Salvos

Este sistema utiliza um banco de dados **PostgreSQL** para salvar os dados. Isso garante que:
*   As informações sejam persistentes e seguras.
*   Seja possível sincronizar dados entre diferentes computadores na mesma rede.

---

## 5. Resolução de Problemas Comuns no Windows

### Erro de Prisma "P1001" (Can't reach database server)
Verifique se o serviço do PostgreSQL está rodando:
1. Pressione `Win + R`, digite `services.msc` e aperte Enter.
2. Procure por `postgresql-x64-xx`.
3. Certifique-se de que o status é **Em Execução**.

### Outros Problemas
*   **Erro de Scripts Desabilitados (PowerShell):** Se o comando `npm` falhar por segurança, abra o PowerShell como Administrador e execute:
    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```
