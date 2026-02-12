# Tutorial de Configuração em Windows - Frota 2.0

Este guia fornece instruções passo a passo para configurar e executar o sistema de gestão de frota em um ambiente Windows.

## 1. Pré-requisitos

Antes de começar, você precisará instalar as seguintes ferramentas:

### Node.js
O Node.js é o ambiente de execução JavaScript necessário para rodar o projeto.
1.  Acesse [nodejs.org](https://nodejs.org/).
2.  Baixe e instale a versão **LTS** (recomendada para a maioria dos usuários).
3.  Durante a instalação, certifique-se de que a opção "Add to PATH" esteja marcada.

### Git
O Git é necessário para clonar o repositório (se ainda não o fez).
1.  Acesse [git-scm.com](https://git-scm.com/).
2.  Baixe o instalador para Windows e siga as instruções padrão.

---

## 2. Configuração do Projeto

Abra o seu terminal preferido (PowerShell, Command Prompt ou Git Bash) e siga os passos abaixo:

### Passo 1: Navegar até a pasta do projeto
```powershell
cd "C:\caminho\para\seu\projeto\frota 2.0"
```

### Passo 2: Instalar as dependências
Execute o comando abaixo para baixar todas as bibliotecas necessárias:
```powershell
npm install
```

---

## 3. Executando o Sistema

### Modo de Desenvolvimento
Para rodar o sistema localmente com atualização automática ao salvar arquivos:
```powershell
npm run dev
```
Após executar, o terminal mostrará um endereço (geralmente [http://localhost:5173](http://localhost:5173)). Abra-o no seu navegador.

### Gerar Versão de Produção
Se você deseja gerar os arquivos otimizados para colocar em um servidor:
```powershell
npm run build
```
Isso criará uma pasta `dist/` com o código final.

---

## 4. Estrutura de Importação de Dados

O sistema processa arquivos CSV localmente. Para que tudo funcione corretamente, siga estas regras ao importar na página de "Importação":

1.  **Arquivos Obrigatórios:**
    *   `manifestos.csv` (contendo dados de viagens)
    *   `frete_margem.csv` (dados financeiros)
    *   `pessoas.csv` (dados de motoristas/colaboradores)
2.  **Arquivo Opcional:**
    *   `disponibilidade.csv` (ou `geral.csv`/`recados.csv`) para atualizar o status da frota.

---

## 5. Resolução de Problemas Comuns no Windows

*   **Erro de Scripts Desabilitados (PowerShell):** Se o comando `npm` falhar por segurança, abra o PowerShell como Administrador e execute:
    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```
*   **Node_modules não encontrado:** Se houver erros de compilação, apague a pasta `node_modules` e o arquivo `package-lock.json`, e execute `npm install` novamente.
*   **Porta em uso:** Se o Vite disser que a porta 5173 está ocupada, você pode tentar `npm run dev -- --port 3000`.
