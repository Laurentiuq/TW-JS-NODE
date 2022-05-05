const filtre = document.querySelectorAll(".filtru");
const carti = document.querySelectorAll(".carti");

console.log(filtre)

for(i=0; i<filtre.length; i++){
    filtre[i].addEventListener("click", (e)=>{
        e.preventDefault();
        const filtru = e.target.dataset.filter;
        console.log(filtru);
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