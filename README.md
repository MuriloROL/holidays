# 🎉 Feriados Nacionais

Uma aplicação web moderna e elegante para explorar feriados nacionais de diferentes países ao redor do mundo. Desenvolvida com design minimalista inspirado no **liquid glass** da Apple, utilizando efeitos de glassmorphism.

![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Características

- 🎨 **Design Glassmorphism**: Interface minimalista com efeitos de vidro fosco (liquid glass)
- 🌓 **Tema Claro/Escuro**: Alternância manual entre temas com persistência no localStorage
- 🌍 **Múltiplos Países**: Explore feriados de diversos países ao redor do mundo
- ⚡ **Performance**: Utiliza React Query para cache e gerenciamento de estado
- 📱 **Responsivo**: Design totalmente adaptável para todos os dispositivos
- 🎭 **Animações Suaves**: Transições elegantes em todas as interações
- ♿ **Acessível**: Implementado com boas práticas de acessibilidade

## 🚀 Tecnologias

- **Next.js 15.3.5** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização utilitária
- **TanStack Query** - Gerenciamento de estado e cache
- **Nager Date API** - API pública de feriados

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd holidays
```

2. Instale as dependências:
```bash
npm install
```

## 🏃 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
holidays/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal com ThemeProvider
│   │   ├── page.tsx             # Página inicial
│   │   └── globals.css          # Estilos globais com glassmorphism
│   ├── components/
│   │   ├── holidayApp.tsx       # Componente principal da aplicação
│   │   ├── HolidayCard.tsx      # Card de feriado com glassmorphism
│   │   ├── CountrySelect.tsx    # Select customizado de países
│   │   ├── ThemeToggle.tsx      # Botão de alternância de tema
│   │   └── ThemeProviderWrapper.tsx
│   └── contexts/
│       └── ThemeContext.tsx      # Contexto de tema
├── public/                      # Arquivos estáticos
└── package.json
```

## 🎨 Design

O projeto utiliza um design minimalista com efeitos de **glassmorphism**:

- **Backdrop Filter**: Efeitos de blur e saturação para criar o efeito de vidro
- **Transparências**: Camadas semi-transparentes para profundidade visual
- **Gradientes Sutis**: Backgrounds com gradientes suaves
- **Sombras Leves**: Sombras difusas para elevação dos elementos
- **Bordas Finas**: Bordas sutis para definir os elementos

### Tema Claro
- Background: Gradiente azul claro
- Cards: Branco semi-transparente com blur
- Texto: Tons escuros para contraste

### Tema Escuro
- Background: Gradiente azul escuro
- Cards: Preto semi-transparente com blur
- Texto: Tons claros para contraste

## 🔌 API

O projeto utiliza a [Nager Date API](https://date.nager.at/) para buscar informações sobre feriados:

- **Endpoint de Países**: `https://date.nager.at/api/v3/AvailableCountries`
- **Endpoint de Feriados**: `https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}`

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 📝 Licença

Este projeto é privado.

## 👨‍💻 Autor

Murilo Rodrigues Lima
---

**Nota**: Este projeto foi criado para fins educacionais e demonstração de design moderno com glassmorphism.
