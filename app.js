
const express = require('express')
var formidable = require('formidable');
const app = express()
const port = 3000
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

titlu_carti = []

app.use(express.static('static'))
app.get('/', function(req, res) {
  res.render('index');
});

// ruta de create
http://localhost:3000/create
app.get('/create', function(req, res) {
  res.render('create');
});

// adauga un nou titlu de carte
app.post('/create', (req, res, next) => {
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.send(`Ai adaugat o noua carte cu titlul ${fields["titlu"]}`)
    // res.json(fields);
    titlu_carti.push(fields["titlu"])
    console.log(titlu_carti)
  });
});

// afiseaza noile titluri de carte adaugate
//http://localhost:3000/read
app.get('/read', function(req, res) {
  res.send(titlu_carti)
});

// ruta de update
app.get('/update', function(req, res) {
  res.render('update');
});


app.post('/update', (req, res, next) => {
  const form = formidable({});

  form.parse(req, (err, fields) => {
    if (err) {
      next(err);
      return;
    }
    // fields["titlu"] -- name din input
    let ind = titlu_carti.indexOf(fields["titlu"]);
    // res.json(fields);
    if(ind!=-1){
      let titluVechi = titlu_carti[ind]
      // fields["titluNou"] -- name din input
      titlu_carti[ind] = fields["titluNou"]
      res.send(`Ai schimbat tilul cartii din ${titluVechi} in ${fields["titluNou"]}`)
    }
    else{
      res.send(`Cartea nu exista`)
    }
    console.log(titlu_carti)
  });
});

// ruta de delete
app.get('/delete', function(req, res) {
  res.render('delete');
});

app.post('/delete', (req, res, next) => {
  const form = formidable({});

  form.parse(req, (err, fields) => {
    if (err) {
      next(err);
      return;
    }
    // fields["titlu"] -- name din input
    let ind = titlu_carti.indexOf(fields["titlu"]);
    if(ind!=-1){
      titlu_carti.splice(ind);
      res.send(`Ai sters cartea cu titlul: ${fields["titlu"]}`)
    }
    else{
      res.send(`Cartea nu exista sau nu a poate fi stearsa`)
    }
    console.log(titlu_carti)
  });
});


app.get('*', function(req, res) {
  res.render('404');
});



// app.get('/images/carteNoua.jpg'), function(req,res){
//   res.end('carteNoua.jpg');
// }

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})