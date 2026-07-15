<div align="center">

# 🏠 Controle de Gastos Residenciais

**Uma aplicação Fullstack para organizar e acompanhar as finanças do seu lar.**

[![.NET](https://img.shields.io/badge/.NET-10-512BD4?style=flat&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=flat&logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/sql-server)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📖 Sobre o Projeto

O **Controle de Gastos Residenciais** é um sistema completo para famílias e domicílios que desejam organizar suas finanças de forma simples e transparente. A aplicação permite cadastrar os moradores de uma casa, registrar as receitas e despesas de cada um, e acompanhar em tempo real o saldo individual de cada pessoa, além do fechamento financeiro geral do domicílio.

O projeto foi construído com uma arquitetura em camadas bem definida no back-end (Controllers, Repositories, DTOs e Mappers) e uma interface front-end limpa e direta, priorizando clareza de dados sobre complexidade visual — o objetivo é que qualquer pessoa da casa consiga usar sem fricção.

---

## ✨ Funcionalidades Principais

- 👨‍👩‍👧 **Gestão de moradores** — cadastro, listagem e exclusão de pessoas do domicílio, com exclusão em cascata de suas transações vinculadas.
- 💰 **Registro de receitas e despesas** — lançamento de transações financeiras associadas a cada morador.
- ⚖️ **Regras de negócio de domínio** — moradores menores de 18 anos só podem registrar despesas, garantindo consistência com a realidade financeira de cada perfil.
- 📊 **Fechamento de saldos** — cálculo automático do total de receitas, despesas e saldo de cada pessoa, além do saldo consolidado de toda a casa.
- ⚡ **Persistência real** — todos os dados são armazenados em SQL Server e permanecem disponíveis entre reinicializações da aplicação.

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)

### Back-end
- [C#](https://learn.microsoft.com/dotnet/csharp/)
- [ASP.NET Core (.NET 10)](https://dotnet.microsoft.com/apps/aspnet)
- [Entity Framework Core](https://learn.microsoft.com/ef/core/)

### Banco de Dados
- [SQL Server](https://www.microsoft.com/sql-server)

### Infraestrutura
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Multi-stage build (imagens otimizadas de produção)
- [Nginx](https://nginx.org/) (servindo o front-end estático)

---

## 🚀 Como Executar

### ✅ Pré-requisitos

Você **só precisa ter instalado**:

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

> ⚠️ **Não é necessário instalar** SDK do .NET, Node.js ou SQL Server na sua máquina. Todo o ambiente — API, front-end e banco de dados — está 100% conteinerizado e isolado, rodando de forma independente do seu sistema operacional.

### 📦 Passo a passo

**1. Clone o repositório:**

```bash
git clone https://github.com/JoaoPaulo-Costa01/Residential-Project
cd Residential-Project
```

**2. Suba todos os containers com um único comando:**

```bash
docker compose up --build
```

Esse comando vai construir as imagens do back-end (multi-stage build), do front-end (build estático servido via Nginx) e provisionar o container do SQL Server automaticamente, aplicando as migrations do Entity Framework Core na primeira inicialização.

**3. Acesse a aplicação:**

Abra o seu navegador e acesse a interface do sistema em:
👉 **[http://localhost:5173](http://localhost:5173)**

Pronto! A aplicação estará totalmente funcional, com o front-end consumindo a API e os dados persistidos no SQL Server em execução no Docker. Todo o teste da aplicação pode ser feito diretamente por essa interface visual, sem a necessidade de acessar as rotas do back-end manualmente.

| Serviço | URL |
|---|---|
| 🌐 Front-end (React) | [http://localhost:5173](http://localhost:5173) |
| 🔌 API (ASP.NET Core) | [http://localhost:7254](http://localhost:7254) |

---

## 📄 Licença

Este projeto está disponível sob a licença MIT.
