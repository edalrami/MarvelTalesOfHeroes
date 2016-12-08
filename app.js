const express = require("express")
// const session = require("express-session")
const dotenv = require("dotenv")
// const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
// const errorHandler = require("error-handler")
const ejs = require("ejs")

// dotenv.load({path: '.env'})

const app = express()

const routes = {
    main: require("./routes/main.js")
}

app.set('port', process.env.PORT || 8080);

app.set('views', './views')
app.set('view engine', 'ejs')
app.enable('trust proxy')
app.set('trust proxy', 1)

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static('./public'))


app.use(function(req, res, next) {
  res.successT = function(data) {
    data = data || {}
    data.success = true
    res.json(data)
  }

  res.errorT = function(error) {
    error = error.description || error

    res.json({
      success: false,
      status: 1,
      message: error
    })
  }

  res.renderT = function(template, data) {
    data = data || {}
    data.host = req.protocol + "://" + req.hostname
    data.url = data.host + req.url
    data.template = data.template || template
    data.random = Math.random().toString(36).slice(2)
    res.render(template, data)
  }

  next()
})


// GET REQUESTS (Page rendering, redirects, other non-database-modifying functions)
app.get('/', routes.main.index )
app.get('/contact', routes.main.contact)



const server = app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode: http://localhost:%s', app.get('port'), app.get('env'), app.get('port'));
})
