**Nome do Projeto:** Taki_Tiler (Server)

**Descrição do Projeto:**
O projeto Taki_Tiler (Server) é uma aplicação CRUD desenvolvida utilizando GraphQL, TypeScript, Node.js, banco de dados PostgreSQL.

**Ferramentas:**
- Graphql com Apollo Server para a camada de API
- Docker com TypeORM para gerenciamento do banco de dados PostgreSQL
- Node.js para a execução do servidor e manipulação do backend
- PostgreSQL como banco de dados principal
- Typeorm como lib para o banco de dados
- Docker para construção de containers 

**Funcionalidade da API:**
A API permite a criação, leitura, atualização e exclusão de usuários no banco de dados.

**Passos para Executar e Depurar:**

1. Clone o repositório para o diretório desejado em sua máquina.
   ```bash
   git clone https://github.com/seu-usuario/taki_tiler.git
   ```

2. Navegue até o diretório do projeto.
   ```bash
   cd taki_tiler
   ```

3. Instale as dependências do projeto utilizando o npm.
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente necessárias, como as credenciais do banco de dados e outras configurações específicas.

5. Certifique-se de ter o Node.js e o Docker instalados na sua máquina.

6. Rode o container docker no arquivo docker-compose.yml com o comando.
   ```bash
   docker compose up
   ```

**Comandos Disponíveis:**

- `npm start`: Inicia o servidor Apollo GraphQL.
- `npm test`: Executa os testes automatizados utilizando a biblioteca Chai e Mocha.

**Observações:**
Certifique-se de que o Docker está em execução para que o banco de dados PostgreSQL seja inicializado corretamente. Além disso, revise as configurações do TypeORM no arquivo de configuração para garantir a conexão adequada com o banco de dados.

Este projeto segue as melhores práticas de desenvolvimento, incluindo o uso de bibliotecas para testes, criptografia de senhas com bcrypt, verificação de estilo de código com ESLint e formatação automática com Prettier, garantindo um código limpo e organizado.

Para qualquer dúvida ou problema durante a execução ou depuração, consulte a documentação ou entre em contato com a equipe de desenvolvimento responsável pelo projeto.