const express = require('express')
const cors = require('cors')
const app = express()
const authorization = require('./middleware/auth') 
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization']
}));

app.use(cookieParser()); 
app.use(express.json()) 

app.get('/', (req, res) => {
  // console.info('Cookies: ', req.cookies); // Maintenant, vous pouvez accéder aux cookies ici
  res.send('Hello World, Welcome to my Todo API!')
})


const router = require('./router/routes');
app.use('/', router);

app.listen(5000, () => {
  console.info('Serveur démarré sur http://localhost:5000')
})
