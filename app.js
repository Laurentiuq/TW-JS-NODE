
const express = require('express');
const res = require('express/lib/response');
var formidable = require('formidable');
const app = express()
var rtr = express.Router();

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
      titlu_carti.splice(ind);
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


app.delete('/delete2', (req, res)=>{
  console.log('dfds');
  res.send("DELETE");
})

// app.get('*', function(req, res) {
//   res.render('404');
// });



// app.get('/images/carteNoua.jpg'), function(req,res){
//   res.end('carteNoua.jpg');
// }

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})