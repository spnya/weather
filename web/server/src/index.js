require('dotenv').config()

const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const db = require('./db')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())
app.use(express.urlencoded({ extended: false })).use(express.json());
app.use(cors())
app.use(db())
app.use('/v/utilities', express.static(path.join(__dirname, 'public')))

var exphbs  = require('express-handlebars');

const _public = require('./routes/api/public')
const _private = require('./routes/api/private')

const v = require('./routes/v/v')

app.use('/api/public', _public)
app.use('/api/private', _private)

app.use('/', v)

const web_port = process.env.WEB_PORT
app.listen(web_port, () => console.log(`Server started on port ${web_port}`))

function exitHandler(options, err) {
  if (options.cleanup) console.log('clean');
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
  db.close()
}

process.on('exit', exitHandler.bind(null,{cleanup:true}));
