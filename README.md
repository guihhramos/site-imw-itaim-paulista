# Igreja Metodista Wesleyana do Itaim Paulista - Portal Web

Sistema web completo para gerenciamento de avisos e informações da Igreja Metodista Wesleyana do Itaim Paulista, com painel administrativo integrado.

## 🏗️ Arquitetura

O projeto é dividido em duas partes principais:

### Backend (Spring Boot)
- **Localização:** `/src`
- **Porta:** 8080
- **Banco de Dados:** PostgreSQL
- **Funcionalidades:**
  - Autenticação e autorização
  - API REST para gerenciamento de avisos
  - Endpoints públicos e privados
  - CORS configurado

### Frontend (React + TypeScript)
- **Localização:** `/igreja-frontend`
- **Porta:** 5173
- **Framework:** Vite + React 19
- **Estilo:** Tailwind CSS v4
- **Funcionalidades:**
  - Homepage pública com avisos
  - Painel administrativo protegido
  - Design responsivo
  - Logo e identidade visual da IMW

## 📋 Pré-requisitos

- Java 17+
- Node.js 22+
- PostgreSQL 12+
- npm ou yarn

## 🚀 Instalação e Execução

### 1. Configurar o Backend

```bash
# Criar banco de dados PostgreSQL
createdb imwitaimpaulista_db

# Navegar para o diretório raiz do projeto
cd igrejaapi_fixed

# Compilar e executar o backend
./gradlew bootRun
```

O backend estará disponível em: `http://localhost:8080`

### 2. Configurar o Frontend

```bash
# Navegar para o diretório do frontend
cd igreja-frontend

# Instalar dependências
npm install

# Criar arquivo .env com a configuração
cp .env.example .env

# Iniciar o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

## 📝 Endpoints da API

### Públicos

- **GET** `/api/avisos/public` - Listar avisos públicos
- **POST** `/api/auth/login` - Fazer login

### Administrativos (Requer Autenticação)

- **GET** `/api/avisos` - Listar todos os avisos
- **GET** `/api/avisos/{id}` - Obter aviso por ID
- **POST** `/api/avisos` - Criar novo aviso
- **PUT** `/api/avisos/{id}` - Atualizar aviso
- **DELETE** `/api/avisos/{id}` - Excluir aviso

## 🔐 Autenticação

A autenticação é feita via HTTP Basic Auth. Para acessar o painel administrativo:

1. Registre um novo usuário admin:
```bash
curl -X POST http://localhost:8080/api/auth/register-admin \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "senha123"}'
```

2. Faça login no painel web com as credenciais

## 🎨 Identidade Visual

- **Cores Principais:**
  - Azul IMW: `#003D82`
  - Vermelho IMW: `#E31E24`
  - Laranja Complementar: `#F39200`

- **Logo:** Localizada em `/igreja-frontend/src/assets/logo_imw.png`

## 📱 Informações da Igreja

- **Nome:** Igreja Metodista Wesleyana do Itaim Paulista
- **Endereço:** Rua Rio Manuel Alves, 175 - Vila Itaim, São Paulo, SP 08190-450
- **Telefone:** +55 (11) 96031-0331
- **Email:** itaimpaulista.imw3@gmail.com
- **Região:** 3ª Região Eclesiástica

### Horários de Culto

- **Quinta-feira:** 20h - Culto
- **Domingo:**
  - 08h30 - Escola Bíblica Dominical (EBD)
  - 17h - EBD
  - 18h - Culto de Adoração

## 🔗 Redes Sociais

- Instagram: [@imw_itaimpaulista](https://www.instagram.com/imw_itaimpaulista/)
- Facebook: [IMW Itaim Paulista](https://www.facebook.com/IMWItaimPaulista/)
- WhatsApp: [Contato](https://wa.me/5511960310331)

## 📦 Build para Produção

### Backend
```bash
./gradlew build
```

### Frontend
```bash
cd igreja-frontend
npm run build
```

Os arquivos compilados estarão em `/igreja-frontend/dist`

## 🛠️ Troubleshooting

### Erro de CORS
Certifique-se de que o backend está rodando em `http://localhost:8080` e o frontend em `http://localhost:5173`

### Erro de Conexão com Banco de Dados
Verifique se o PostgreSQL está rodando e as credenciais em `application.properties` estão corretas

### Erro de Módulos não Encontrados (Frontend)
Execute `npm install` novamente no diretório `/igreja-frontend`

## 📄 Licença

Este projeto é desenvolvido para a Igreja Metodista Wesleyana do Itaim Paulista.

## 👥 Suporte

Para dúvidas ou sugestões, entre em contato através do email: `itaimpaulista.imw3@gmail.com`
