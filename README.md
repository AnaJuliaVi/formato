# Formato

Portal web para consulta e organização de formatos publicitários da Globo.

A aplicação apresenta os formatos disponíveis em uma interface moderna, com navegação por páginas, componentes reutilizáveis e integração com Supabase.

## Demonstração

Acesse a aplicação publicada: [formato-bay.vercel.app](https://formato-bay.vercel.app)

## Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Supabase

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/AnaJuliaVi/formato.git
cd formato
npm install
```

## Desenvolvimento

Inicie o servidor local:

```bash
npm run dev
```

Depois, acesse a URL exibida pelo Vite no terminal, normalmente `http://localhost:5173`.

## Build de produção

Para gerar a versão otimizada:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## Estrutura do projeto

```text
.
├── public/              # Arquivos públicos
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── lib/             # Integrações e bibliotecas auxiliares
│   ├── pages/           # Páginas da aplicação
│   ├── utils/           # Funções utilitárias
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Ponto de entrada
│   └── types.ts         # Tipos compartilhados
├── supabase/
│   └── migrations/      # Migrações do banco de dados
└── package.json
```

## Variáveis de ambiente

Se a integração com o Supabase for utilizada localmente, configure as variáveis necessárias em um arquivo `.env.local`, conforme a configuração do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon
```

Nunca publique chaves privadas ou credenciais no repositório.

## Contribuição

1. Crie uma branch para sua alteração.
2. Faça as mudanças e valide com `npm run build`.
3. Abra um pull request descrevendo o que foi alterado.

## Licença

Este projeto ainda não possui uma licença pública definida.
