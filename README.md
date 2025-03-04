# ecommercebebidas
# NestJS E-Commerce API

Este projeto é uma API de e-commerce construída com **NestJS**. Ele oferece funcionalidades básicas para gerenciar **usuários**, **produtos**, **pedidos** e **pagamentos**, incluindo integração com o **Stripe** para processamento de pagamentos e autenticação via **JWT**.

## Funcionalidades

1. **Gerenciamento de Usuários**:
   - Criação de usuários.
   - Autenticação e login via JWT.
   - Busca de usuários por ID ou email.

2. **Gerenciamento de Produtos**:
   - Criação de novos produtos.
   - Consulta de todos os produtos.

3. **Gerenciamento de Pedidos**:
   - Criação de pedidos com itens do carrinho.
   - Atualização de estoque ao realizar um pedido.

4. **Pagamentos**:
   - Processamento de pagamentos via **Stripe**.

5. **Autenticação**:
   - Proteção de rotas via **JWT** com guardas de autenticação.

## Tecnologias

- **NestJS**: Framework para construção da API.
- **Prisma**: ORM para banco de dados.
- **Stripe**: Serviço para processamento de pagamentos.
- **JWT (JSON Web Tokens)**: Autenticação segura.
- **bcryptjs**: Criptografia de senhas.
- **PostgreSQL**: Banco de dados relacional.

## Requisitos

- Node.js (versão 14 ou superior).
- Banco de dados PostgreSQL.
- Chave de API do Stripe.

## Instalação

1. Clone este repositório para sua máquina:

    ```bash
    git clone https://github.com/seu-usuario/ecommerce-api.git
    cd ecommerce-api
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure o banco de dados e as variáveis de ambiente:
   - Crie um arquivo `.env` com a configuração do banco de dados e a chave secreta do JWT.
   - Exemplo de `.env`:

    ```env
    DATABASE_URL=postgresql://usuario:senha@localhost:5432/db_ecommerce
    JWT_SECRET=seu-segredo-jwt
    STRIPE_SECRET_KEY=sua-chave-secreta-do-stripe
    ```

4. Rode as migrações do Prisma:

    ```bash
    npx prisma migrate dev
    ```

5. Execute a aplicação:

    ```bash
    npm run start:dev
    ```

## Endpoints

### Usuários

- **POST /users**: Criar um novo usuário.
- **GET /users**: Buscar todos os usuários.
- **GET /users/:id**: Buscar um usuário por ID.
- **GET /users/email/:email**: Buscar um usuário pelo email.

### Produtos

- **POST /products**: Criar um novo produto.
- **GET /products**: Listar todos os produtos.

### Pedidos

- **POST /orders**: Criar um novo pedido.

### Pagamentos

- **POST /payments**: Processar o pagamento.

### Autenticação

- **POST /auth/login**: Realizar login e obter o token JWT.

## Estrutura do Projeto

- **src/products/products.service.ts**: Lógica para gerenciamento de produtos.
- **src/users/users.service.ts**: Lógica para gerenciamento de usuários.
- **src/orders/orders.service.ts**: Lógica para gerenciamento de pedidos.
- **src/payments/payments.service.ts**: Lógica para integração com Stripe e processamento de pagamentos.
- **src/auth/auth.service.ts**: Lógica de autenticação de usuários.
- **src/auth/jwt.strategy.ts**: Estratégia de autenticação JWT.
- **src/auth/auth.guard.ts**: Proteção de rotas com autenticação.
- **src/prisma/prisma.service.ts**: Serviço para interação com o banco de dados via Prisma.

## Modelos

### Produto

```ts
model Product {
  id          Int         @id @default(autoincrement())
  name        String
  description String
  price       Float
  quantity    Int
  createdAt   DateTime    @default(now())
  orderItems  OrderItem[] // Relacionamento com itens de pedidos
}
```

### Pedido

```ts
model Order {
  id          Int         @id @default(autoincrement())
  userId      Int
  total       Float
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  user        User        @relation(fields: [userId], references: [id])
  products    OrderItem[] // Relacionamento com itens de pedidos
}
```

### Item do Pedido

```ts
model OrderItem {
  id          Int         @id @default(autoincrement())
  productId   Int
  orderId     Int
  quantity    Int
  product     Product     @relation(fields: [productId], references: [id])
  order       Order       @relation(fields: [orderId], references: [id])
}
```

### Usuário

```ts
model User {
  id          Int         @id @default(autoincrement())
  email       String      @unique
  password    String
  name        String
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  orders      Order[]     // Relacionamento com pedidos
}
```

## Autenticação

O projeto usa **JWT** para autenticação de usuários. A estratégia de JWT é implementada na classe `JwtStrategy`. Para acessar rotas protegidas, é necessário incluir o **token JWT** no cabeçalho da requisição.

### Exemplo de Header de Autorização

```bash
Authorization: Bearer <seu-token-jwt>
```

## Contribuindo

Se você deseja contribuir para este projeto, siga estas etapas:

1. Faça o **fork** deste repositório.
2. Crie uma nova **branch** para sua modificação.
3. Faça as alterações necessárias e **commit** suas mudanças.
4. Envie um **pull request** para revisar suas alterações.

## Licença

Este projeto está licenciado sob a **MIT License**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Este README fornece uma visão geral sobre o funcionamento da API de e-commerce e como configurá-la e usá-la.
