const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


app.use(express.static('static'))
app.get('/', function(req, res) {
  res.render('index');
});

// app.get('/images/carteNoua.jpg'), function(req,res){
//   res.end('carteNoua.jpg');
// }

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})