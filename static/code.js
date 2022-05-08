// const { stringify } = require("nodemon/lib/utils");

const filtre = document.querySelectorAll(".filtru");
const carti = document.querySelectorAll(".carti");
console.log(filtre)

for(let i=0; i<filtre.length; i++){
    const filtru = filtre[i].classList[1];
    console.log(filtru);
    filtre[i].addEventListener("click", (e)=>{
        // e.preventDefault();
        // const filtru = e.target.dataset.filter;
        e.stopPropagation(); // pentru a putea da click pe element si sa nu se aplice codul pentru sidebar
        carti.forEach((carte)=>{
            if(filtru == "all"){
                carte.style.display = "flex";
            }
            else{
                if(carte.classList.contains(filtru)){
                    carte.style.display= "flex";
                }
                else{
                    carte.style.display="none";
                }
            }

        })
    })
}

// la click in sidebar inafara celorlalte filtre se afiseaza toate cartile
const sidebar = document.querySelectorAll(".sidenav");
sidebar[0].addEventListener("click", (e) =>{
    carti.forEach((carte)=>{
        stilCarte = getComputedStyle(carte)
        let disp = stilCarte.getPropertyValue("display");
        if(disp == "none")
        {
            console.log(disp);
            carte.style.display="flex";
        }

        // carte.style.display = 'flex';

    })
    
})

// json cu cartile citite
let cartiCitite={"nume":[], "numar": 0, "Frank Herbert":0, "Brian Herbert":0, "data":{}}

//verifica daca exista in localStorege si actualizeaza cartiCitite

if(window.localStorage.getItem('citite')!=undefined){
    cartiCitite=window.localStorage.getItem('citite');
    cartiCitite=JSON.parse(cartiCitite);
    console.log(cartiCitite);
    //adauga elementele din json in pagina
    let ol = document.querySelector("ol");
    ol.innerText='';
    for(let j=0; j<cartiCitite.nume.length; j++){
        let li = document.createElement("li");
        li.textContent=cartiCitite.nume[j] +'-'+ cartiCitite.data[cartiCitite.nume[j]];
        ol.appendChild(li);

    }
    let nrCitite = document.querySelector('.nrCitite');
    nrCitite.textContent = 'Total: ' + cartiCitite.numar.toString() + ', ' + "Frank Herbert: " + cartiCitite["Frank Herbert"] + ', ' + 'Brian Herbert: ' + cartiCitite["Brian Herbert"];
}


const citit = document.querySelectorAll(".citit");
for(let i = 0; i<citit.length; i++){
    citit[i].addEventListener("click", adaugaCitite.bind(null, i))
}

// adauga sau scoate cartile citite
// argumentul e i ul din bind
let autori = []
function adaugaCitite(i){
    // console.log(i);
    element = carti[i];
    const li = document.createElement('li');
    const lista = document.getElementById("lsCitit");
    const numeElem = element.childNodes[1].textContent;
    if(cartiCitite.nume.includes(numeElem)){
        cartiCitite.nume.splice(cartiCitite.nume.indexOf(numeElem),1);
        cartiCitite.numar -= 1;
        if(element.classList[2]=="brianHerbert"){
            cartiCitite["Brian Herbert"]-=1;
        }
        else{
            cartiCitite["Frank Herbert"]-=1;
        }
        delete cartiCitite.data[numeElem];
    }
    else{
        cartiCitite.nume.push(numeElem);
        cartiCitite.numar += 1;
        if(element.classList[2]=="brianHerbert"){
            cartiCitite["Brian Herbert"]+=1;
        }
        else{
            cartiCitite["Frank Herbert"]+=1;
        }
        const dataCurenta = new Date();
        const [day, month, year] = [dataCurenta.getDate(), dataCurenta.getMonth()+1, dataCurenta.getFullYear()];
        strData=day.toString().concat("."+ month.toString())+'.'+year.toString();
        cartiCitite.data[numeElem] = strData;
    }
    // console.log(cartiCitite.data);
    // console.log(cartiCitite);
    // console.log(Date.prototype.toTimeString())


    let ol = document.querySelector("ol");
    ol.innerText='';
    for(let j=0; j<cartiCitite.nume.length; j++){
        let li = document.createElement("li");
        li.textContent=cartiCitite.nume[j] +'-'+ cartiCitite.data[cartiCitite.nume[j]];
        ol.appendChild(li);

    }
    let nrCitite = document.querySelector('.nrCitite');
    nrCitite.textContent = 'Total: ' + cartiCitite.numar.toString() + ', ' + "Frank Herbert: " + cartiCitite["Frank Herbert"] + ', ' + 'Brian Herbert: ' + cartiCitite["Brian Herbert"];
    //salveaza JSON cu datele despre cartile citite in local storage
    window.localStorage.setItem('citite', JSON.stringify(cartiCitite));
}

// elimina ultimul element din lista

const eliminaElement = document.querySelector(".elimina");
eliminaElement.addEventListener('click', elimina=>{
    let nume =[cartiCitite.nume[cartiCitite.nume.length-1]];
    delete cartiCitite.data[cartiCitite.nume[cartiCitite.nume.length-1]];
    cartiCitite.nume.pop();
    let ol = document.querySelector("ol");
    ol.innerText='';
    // modifica numarul de carti citite
    if(cartiCitite.numar>0){
        cartiCitite.numar -= 1;
        for(let j = 0; j<carti.length; j++){
            if(carti[j].childNodes[1].innerText==nume){
                if(carti[j].classList[2]=='brianHerbert' && cartiCitite["Brian Herbert"]>0){;
                    cartiCitite["Brian Herbert"]-=1;
                }
                else if(carti[j].classList[2]=='frankHerbert' && cartiCitite["Frank Herbert"]>0){
                    cartiCitite["Frank Herbert"]-=1;
                }
            }
        }
    }
    for(let j=0; j<cartiCitite.nume.length; j++){
        let li = document.createElement("li");
        li.textContent=cartiCitite.nume[j]+'-'+ cartiCitite.data[cartiCitite.nume[j]];
        ol.appendChild(li);
    }
    let nrCitite = document.querySelector('.nrCitite');
    nrCitite.textContent = 'Total: ' + cartiCitite.numar.toString() + ', ' + "Frank Herbert: " + cartiCitite["Frank Herbert"] + ', ' + 'Brian Herbert: ' + cartiCitite["Brian Herbert"];
    //salveaza JSON cu datele despre cartile citite in local storage
    window.localStorage.setItem('citite', JSON.stringify(cartiCitite));
})


//light/dark mode

const darkLight = document.querySelector('.darkLight');
const body = document.querySelector('body');

if(window.localStorage.getItem('darkLight')!='undefined'){
    if(window.localStorage.getItem('darkLight') == 'dark')
    {
        body.style.backgroundColor = 'rgb(47,35,35)';
        darkLight.innerText="light";
    }
    else if(window.localStorage.getItem('darkLight') == 'light')
    {
        body.style.backgroundColor='rgb(218, 218, 235)';
        darkLight.innerText='dark';
    }
}

darkLight.addEventListener('click', fchange=>{
    if(body.style.backgroundColor == 'rgb(218, 218, 235)'){
        body.style.backgroundColor = 'rgb(47,35,35)';
        darkLight.innerText="light";
        window.localStorage.setItem('darkLight', 'dark');
    }
    else{
        body.style.backgroundColor='rgb(218, 218, 235)';
        darkLight.innerText='dark';
        window.localStorage.setItem('darkLight', 'light');
    }
})

//la apasare pe original se sterge din local storage informatia despre dark sau light mode

const original = document.querySelector('.reseteazaDarkLight')
original.addEventListener('click', del=>{
        window.localStorage.removeItem('darkLight');
        body.style.backgroundColor='white';
})
const reseteaza = document.querySelector('.reseteazaTot');
reseteaza.addEventListener('click', del=>{
    cartiCitite={"nume":[], "numar": 0, "Frank Herbert":0, "Brian Herbert":0, "data":{}}
    window.localStorage.clear();
    let ol = document.querySelector("ol");
    ol.innerText='';
    let nrCitite = document.querySelector('.nrCitite');
    nrCitite.textContent='';
})


//setTimeout is setInterval

function urmatoareCarte(){
    let carteNoua = document.createElement('div');
    carteNoua.innerText="Urmatoare carte:"
    let imagineCarte = document.createElement('img');
    imagineCarte.src="./images/carteNoua.jpg";
    carteNoua.appendChild(imagineCarte);
    carteNoua.setAttribute('class', 'carti carteNoua');
    let produse = document.querySelector('.produse');
    produse.appendChild(carteNoua);
}

function stergeUrmatoareCarte(){
    let carteNoua = document.querySelector('.carteNoua');
    carteNoua.remove();
}

urmatoareCarte();
setTimeout(stergeUrmatoareCarte, 10000);

function potiSaCitesti(){
    let cartiNecitite = [];
    let toateCartile = [];
    for(let i=0; i<carti.length;i++){
        if(cartiCitite.nume.includes(carti[i].childNodes[1].innerText)==0)
        {
            cartiNecitite.push(carti[i].childNodes[1].innerText);
        }
    }
    toateCartile = toateCartile.concat(cartiNecitite);
    toateCartile = toateCartile.concat(cartiCitite.nume);
    let ind = Math.floor(Math.random() * toateCartile.length);
    if(cartiNecitite.includes(toateCartile[ind])){
        let deCitit = document.querySelector(".deCitit");
        deCitit.childNodes[1].innerText = "Poti sa citesti " + toateCartile[ind];
        // deCitit.innerText = "Poti sa citesti " + toateCartile[ind];
    }
    else{
        let deCitit = document.querySelector(".deCitit");
        deCitit.childNodes[1].innerText = "Poti sa recitesti " + toateCartile[ind];
        // deCitit.innerText = "Poti sa citesti " + toateCartile[ind];
    }
}

setInterval(potiSaCitesti, 1000);





