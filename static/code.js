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

const citit = document.querySelectorAll(".citit");
for(let i = 0; i<citit.length; i++){
    citit[i].addEventListener("click", adaugaCitite.bind(null, i))
}

// adauga sau scoate cartile citite
// argumentul e i ul din bind
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

}

// elimina ultimul element din lista

const eliminaElement = document.querySelector(".elimina");
eliminaElement.addEventListener('click', elimina=>{
    delete cartiCitite.data[cartiCitite.nume[cartiCitite.nume.length-1]];
    cartiCitite.nume.pop();
    let ol = document.querySelector("ol");
    ol.innerText='';
    // modifica numarul de carti citite
    if(cartiCitite.numar>0){
     cartiCitite.numar -= 1;
        if(element.classList[2]=="brianHerbert"){
            cartiCitite["Brian Herbert"]-=1;
        }
        else{
            cartiCitite["Frank Herbert"]-=1;
        }
    }
    for(let j=0; j<cartiCitite.nume.length; j++){
        let li = document.createElement("li");
        li.textContent=cartiCitite.nume[j]+'-'+ cartiCitite.data[cartiCitite.nume[j]];
        ol.appendChild(li);
    }
    let nrCitite = document.querySelector('.nrCitite');
    nrCitite.textContent = 'Total: ' + cartiCitite.numar.toString() + ', ' + "Frank Herbert: " + cartiCitite["Frank Herbert"] + ', ' + 'Brian Herbert: ' + cartiCitite["Brian Herbert"];
})


//light/dark mode

const darkLight = document.querySelector('.darkLight');
darkLight.addEventListener('click', fchange=>{
    const body = document.querySelector('body');
    if(body.style.backgroundColor == 'rgb(218, 218, 235)'){
        body.style.backgroundColor = 'rgb(47,35,35)';
        darkLight.innerText="light";
    }
    else{
        body.style.backgroundColor='rgb(218, 218, 235)';
        darkLight.innerText='dark';
    }
})




