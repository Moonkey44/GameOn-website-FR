class user{
    constructor(firstName,lastName,email,birthdate,quantity = 0,location,checkbox1 = true,checkbox2){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthdate = birthdate;
        this.quantity = quantity;
        this.location = location;
        this.checkbox1 = checkbox1;
        this.checkbox2 = checkbox2;
    }   
}

//Définition de nos constantes représentant un ou plusieurs éléments du DOM
const firstEntry = document.getElementById("first");
const lastEntry = document.getElementById("last");
const emailEntry = document.getElementById("email");
const birthdateEntry = document.getElementById("birthdate");
const quantityEntry = document.getElementById("quantity");
const checkbox1 = document.getElementById("checkbox1");

const locationEntry = document.getElementsByName("location");

const content = document.getElementsByClassName("content");
const modalBody = document.getElementsByClassName("modal-body");
const checkboxIcon = document.getElementsByClassName("checkbox-icon");
const modalClose = document.querySelector(".close");

const errorColor = "#fe142f";
const validColor = "#279e7a";
let globalValidation = false;

//Définition de nos fonctions de test
function validTest(event){
    event.target.style.animation = "none";
    event.target.style.background = validColor;
    event.target.style.border = validColor;
    globalValidation = true;
}

function errorTest(event){
    event.target.style.animation = "errorInput 100ms 3";
    event.target.style.background = errorColor;
    event.target.style.border = errorColor;
    //Réglage du bug validationMessage non configurée pour l'input "Nom"
    if(event.target.value.length == 1 && event.target.name === "last"){
        alert("Veuillez allonger ce texte pour qu'il comporte au moins 2 caractères. Il en compte actuellement un seul.");
    }else{ 
        alert(event.target.validationMessage);
    }
    globalValidation = false;
}

function emptyTest(event){
    if(event.target.value === ""){
        event.target.style.animation = "none";
        event.target.style.background = "white";
        globalValidation = false;
    }
}

const entriesInput = [firstEntry,lastEntry,emailEntry,birthdateEntry,quantityEntry];
function resetAlert(){
    for(entry of entriesInput){
        entry.value = "";
        entry.style.background = "white";
        entry.style.animation = "none";
    }
    modalbg.style.display = "none";
    thanksDivElt.style.display ="none";
    modalBody[0].style.display = "block";
    //Si la checkbox n'est pas activé à la fermeture alors on la réactive
    if(checkbox1.checked === false){
        checkbox1.checked = true;
    }
    if(checkbox1.checked === true){
        checkboxIcon[6].style.animation = "none";
        checkboxIcon[6].style.background = validColor;
    }
}

//Reset et ferme la modale
modalClose.addEventListener("click", function(e){
    resetAlert();
});

//Test visuel de nos inputs au changement de focus
formData.forEach((input) => input.addEventListener("change",function textIsValid(event){
    //Inputs du prénom et du nom 
    if(event.target.name === "first" || event.target.name === "last"){
        if(event.target.value.length < 2 && event.target.value.length != 0){
            errorTest(event);
        }
        if(event.target.value.length >= 2){
            validTest(event);
        }
        emptyTest(event);
    }
    //Input de l'email
    if(event.target.name === "email"){
        if(event.target.validity.valid === true){
            validTest(event);
        }
        if(event.target.validity.valid === false && event.target.value != event.target.defaultValue){
            errorTest(event);
        }
        emptyTest(event);
    }
    //Input de la date de naissance
    if(event.target.name === "birthdate"){
        //regex a revoir
        event.target.pattern = "/(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\d\d/";
        if(event.target.validity.valid == true){
            validTest(event);
        }
        if(event.target.validity.valid == false){
            errorTest(event);
        }
    }
    //Input du nombre de tournois fait par l'utilisateur
    if(event.target.name === "quantity"){
        //Si l'élément est un entier ou vide
        if(Number.isInteger(parseInt(event.target.value)) || event.target.value === ""){
            if(event.target.validity.valid == true){
                validTest(event);
            }
            if(event.target.validity.valid === false && event.target.value != event.target.defaultValue){
                errorTest(event);
            }
            if(event.target.value === ""){
                emptyTest(event);
            }
        }
    }
        //Revoir peut être un test sur la localisation 
    //Test visuel de la checkbox obligatoire 
    if(event.target.id === "checkbox1"){
        if(event.target.checked === false){
            checkboxIcon[6].style.animation = "errorInput 100ms 3";
            checkboxIcon[6].style.background = errorColor;
            alert(event.target.validationMessage);
        }
        if(event.target.checked === true){
            checkboxIcon[6].style.animation = "none";
            checkboxIcon[6].style.background = validColor;
        }
    }
}));

const thanksElt = document.createElement("p");
const thanksDivElt = document.createElement("div");
thanksElt.textContent = "Merci ! Votre réservation a été reçue !";
thanksDivElt.setAttribute("class","thanks-div");
thanksDivElt.style.display = "none";
thanksDivElt.appendChild(thanksElt);
content[0].appendChild(thanksDivElt);

async function validate(event){
    try{
        if (globalValidation === true) {
            event.preventDefault();
            console.log("Formulaire Validé !");
            modalBody[0].style.display = "none";
            thanksDivElt.style.display = "block";
            return globalValidation;
        }
    }
    catch(event){
        throw new Error(event.message);
    }
    return false;  
};





