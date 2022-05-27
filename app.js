
const read = require('body-parser/lib/read');
const express = require('express');
const res = require('express/lib/response');
var formidable = require('formidable');
const app = express()
var router = express.Router();

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

// ruta de create cu from
// http://localhost:3000/create
app.get('/create', function(req, res) {
  res.render('create');
});

// adauga un nou titlu de carte
app.post('/create', (req, res, next) => {
  const form = formidable({});
  console.log(req.titlu);
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    if(/^[A-Za-z\s]*$/.test(fields["titlu"])){
      res.send(`Ai adaugat o noua carte cu titlul ${fields["titlu"]}`)
      // res.json(fields);
      titlu_carti.push({"titlu": fields["titlu"], "autor": fields["autor"]})
    }
    else
      res.send("Invalid");
    // console.log(titlu_carti)
  });
});

// read ce afiseaza direct json-ul
// afiseaza noile titluri de carte adaugate
//http://localhost:3000/read
app.get('/read', function(req, res) {
  res.send(titlu_carti)
});

// ruta de update cu form
//http://localhost:3000/update
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
    if(/^[A-Za-z\s]*$/.test(fields["titlu"])){
      // fields["titlu"] -- name din input
      let ind;
      for(let i = 0; i<titlu_carti.length; i++){
        if(titlu_carti[i].titlu == fields["titlu"])
          ind = i;
        // ind = titlu_carti.indexOf(fields["titlu"]);
      }
      // res.json(fields);
      if(ind!=-1){
        let titluVechi = titlu_carti[ind].titlu;
        // fields["titluNou"] -- name din input
        titlu_carti[ind].titlu = fields["titluNou"]
        res.send(`Ai schimbat tilul cartii din ${titluVechi} in ${fields["titluNou"]}`)
      }
      else{
        res.send(`Cartea nu exista`)
      }
   }
   else
    res.send("Invalid");
   console.log(titlu_carti)
  });
});

// ruta de delete cu form
// http://localhost:3000/delete
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
    if(/^[A-Za-z\s]*$/.test(fields["titlu"])){
    // fields["titlu"] -- name din input
    // let ind = titlu_carti.indexOf(fields["titlu"]);
    let ind;
    for(let i = 0; i<titlu_carti.length; i++){
      if(titlu_carti[i].titlu == fields["titlu"])
        ind = i;
      // ind = titlu_carti.indexOf(fields["titlu"]);
    }
    if(ind!=-1){
      titlu_carti.splice(ind, 1);
      res.send(`Ai sters cartea cu titlul: ${fields["titlu"]}`)
    }
    else{
      res.send(`Cartea nu exista sau nu a poate fi stearsa`)
      
    }
  }
  else
    res.send("Invalid");
  console.log(titlu_carti)
  });
});

// ruta de delete cu parametrii prin url
// parametrul este titlul cartii care trebuie stearsa
// http://localhost:3000/delete2/ 'titlu'
app.get('/delete2/:titlu', (req, res)=>{
  console.log(req.params.titlu);
  let ind;
    for(let i = 0; i<titlu_carti.length; i++){
      if(titlu_carti[i].titlu == req.params.titlu)
        ind = i;
    }
    if(ind!=-1){
      titlu_carti.splice(ind, 1);
      res.send(`Ai sters cartea cu titlul: ${req.params.titlu}`)
    }
    else{
      res.send(`Cartea nu exista sau nu a poate fi stearsa`)
      
    }
})


// ruta de read care trimite un json cu obiecte catre javascript
// din javascript se creeaza dinamic div uri corespunzatoarea valorilor din json si se adauga in pagina


// http://localhost:3000/read2/json  - trimite json-ul
// http://localhost:3000/read2 - afiseaza elementele din json ul trimis anterior
app.get('/read2', (req, res)=>{
  res.render('read');
})

app.get('/read2/json', (req, res)=>{
  res.send(titlu_carti)
})



app.get('*', function(req, res) {
  res.render('404');
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})