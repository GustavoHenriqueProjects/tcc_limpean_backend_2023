/**
 *  Se for programar em js é recomentado usar o :
 *  npx eslint --init para javascript, ele ajuda a manter o código limpo.
 * 
 *  npm init
 *
 *  npm add express
 *
 *  npm add -D  typescript @types/express ts-node-dev
 *
 *  npm add cors
 * 
 *  npm add -D @types/cors
 *  tsc --init
 *
 *  npm run dev
 *
 *  "scripts": {
 *  "dev": "ts-node-dev --transpile-only src/index.ts"
 *  },
 * 
 *  Para converte em js: npm i tsup -D 
 *  Configura o package.json
 *  Para inicializar npm run build
 * 
 * npm install jsonwebtoken
 * npm install @types/jsonwebtoken
 * 
 *  Para rodar node ./dist/app.js
 */

const express = require('express')

const port = process.env.PORT || 8080

const cors = require('cors')

import { server } from './server/server'

const app = express();

//Configuração do cors
const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, OPTIONS'
}

app.use(cors(corsOptions))
  
app.use(server)

app.listen(port, () => console.log('Servidor Aguardando requisições na porta 8080'))