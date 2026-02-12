# Guia do Sistema Frota 2.0

## 🚀 Instalação Super Rápida (Recomendado)

Se você quer instalar tudo de uma vez (Node.js, MongoDB e configurar para ligar sozinho), siga estes passos:

1.  Abra a pasta do projeto no Windows.
2.  Clique com o botão direito no arquivo `install_windows.ps1` e escolha **"Executar com o PowerShell"**.
    *   *Nota: O script pedirá permissão de Administrador para instalar os programas.*
3.  Aguarde a conclusão. O sistema instalará o Node.js, o MongoDB e criará um atalho para iniciar automaticamente com o Windows.

---

## 1. Instalação Manual (Passo a Passo)

Antes de começar, você precisará instalar as seguintes ferramentas:

### Node.js
O Node.js é o ambiente de execução JavaScript necessário para rodar o projeto.
1.  Acesse [nodejs.org](https://nodejs.org/).
2.  Baixe e instale a versão **LTS** (recomendada para a maioria dos usuários).
3.  Durante a instalação, certifique-se de que a opção "Add to PATH" esteja marcada.

### MongoDB
Necessário para salvar os dados de forma centralizada.
1.  Acesse [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).
2.  Baixe e instale o **MongoDB Community Server**.
3.  Recomendado: Instale também o **MongoDB Compass** (interface visual) para ver os dados.

---

## 2. Configuração do Projeto

Abra o seu terminal preferido (PowerShell, Command Prompt ou Git Bash) e siga os passos abaixo:

### Passo 1: Navegar até a pasta do projeto
```powershell
cd "C:\caminho\para\seu\projeto\frota 2.0"
```

### Passo 2: Instalar as dependências
Execute o comando abaixo para baixar as bibliotecas do Frontend e do Backend:
```powershell
npm install
```

---

## 3. Executando o Sistema

Para que o sistema funcione com sincronização entre computadores, você agora precisa rodar o **Frontend** e o **Backend** juntos.

### Rodar o Sistema Completo
```powershell
npm start
```
Após rodar esse comando:
*   O **Frontend** estará em `http://localhost:5173` (e no seu IP de rede).
*   O **Backend** estará rodando na porta `5002`.

> [!IMPORTANT]
> O **MongoDB** deve estar rodando no computador principal (servidor). Por padrão, o sistema tenta se conectar em `mongodb://localhost:27017/frota2`.

### Acessar de outros dispositivos
No navegador do outro computador/tablet, use o endereço de rede mostrado no terminal:
`http://192.168.x.x:5173`

> [!TIP]
> **Dica de IP no Windows:** Para descobrir o IP do seu computador manualmente, abra o Prompt de Comando e digite `ipconfig`. Procure por "Endereço IPv4" na sua conexão ativa.

---

## 4. Gerar Versão de Produção

O sistema processa arquivos CSV localmente. Para que tudo funcione corretamente, siga estas regras ao importar na página de "Importação":

1.  **Arquivos Obrigatórios:**
    *   `manifestos.csv` (contendo dados de viagens)
    *   `frete_margem.csv` (dados financeiros)
    *   `pessoas.csv` (dados de motoristas/colaboradores)
2.  **Arquivo Opcional:**
    *   `disponibilidade.csv` (ou `geral.csv`/`recados.csv`) para atualizar o status da frota.

---

## 5. Como os Dados são Salvos

Este sistema foi projetado para ser **privado e local**. Isso significa que:
*   Os arquivos que você importa **não** são enviados para um servidor na internet.
*   Os dados ficam salvos apenas no **navegador** do computador onde você fez a importação (usando o recurso *LocalStorage*).

### Por que não sincroniza entre computadores?
Como não existe um banco de dados central (nuvem), se você importar um arquivo no "Computador A", o "Computador B" não verá essa mudança automaticamente.

**Como manter sincronizado:**
Sempre que houver novos dados, a importação deve ser feita no dispositivo que você pretende usar para visualização, ou em todos os dispositivos que precisam dos dados atualizados.

---

## 6. Resolução de Problemas Comuns no Windows

### Erro de "Conexão Recusada" na Rede
Se você consegue acessar no computador principal mas em outros dispositivos dá "Conexão Recusada", siga estes passos:

1.  **Liberar no Firewall do Windows:**
    *   Vá em **Iniciar** > **Segurança do Windows**.
    *   Clique em **Firewall e proteção de rede**.
    *   Clique em **Permitir um aplicativo pelo firewall**.
    *   Clique em **Alterar configurações** (pode pedir senha de admin).
    *   Procure por `Node.js JavaScript Runtime` na lista e certifique-se de que as caixas **Privada** e **Pública** estejam marcadas.
    *   Se não estiver na lista, clique em **Permitir outro aplicativo...** e aponte para o executável do Node (geralmente em `C:\Program Files\nodejs\node.exe`).

2.  **Verificar Perfil de Rede:**
    *   Vá em **Configurações** > **Rede e Internet** > **Status**.
    *   Clique em **Propriedades** da sua conexão atual.
    *   Certifique-se de que o Perfil de Rede está definido como **Privado**. Se estiver como "Público", o Windows bloqueia a maioria das conexões de entrada por segurança.

3.  **Reiniciar o Servidor:**
    *   Após alterar as configurações, feche o terminal no computador principal e rode novamente: `npm run dev -- --host`

### Outros Problemas
*   **Erro de Scripts Desabilitados (PowerShell):** Se o comando `npm` falhar por segurança, abra o PowerShell como Administrador e execute:
    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```
*   **Node_modules não encontrado:** Se houver erros de compilação, apague a pasta `node_modules` e o arquivo `package-lock.json`, e execute `npm install` novamente.
