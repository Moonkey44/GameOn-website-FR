class user{
    constructor(firstName="",lastName="",email="",birthdate="",quantity=0,location="",checkbox1=true,checkbox2=false){
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
let locationChecked ="";

const content = document.getElementsByClassName("content");
const modalBody = document.getElementsByClassName("modal-body");
const checkboxIcon = document.getElementsByClassName("checkbox-icon");
const modalClose = document.querySelector(".close");

const errorColor = "#e54858";
const validColor = "#279e7a";
let firstValidation = false;
let lastValidation = false;
let emailValidation = false;
let birthdayValidation = false;
let quantityValidation = false;
let locationValidation = false;
let checkboxValidation = false; 
const locationInput =[formData[5].children[0],formData[5].children[2],formData[5].children[4],formData[5].children[6],formData[5].children[8],formData[5].children[10]];
const entriesInput = [firstEntry,lastEntry,emailEntry,birthdateEntry,quantityEntry];
let userInformation=[];

//Définition de nos fonctions de test
function validTest(event,index){
    event.target.style.animation = "none";
    event.target.style.background = validColor;
    event.target.style.border = validColor;
    if(event.target.name === "last"){
        event.target.setCustomValidity("");
        formData[1].removeAttribute("data-error");
        lastValidation = true;
    }
    if(event.target.name === "birthdate"){
        event.target.setCustomValidity("");
        formData[3].removeAttribute("data-error");
        birthdayValidation = true;
    }
    else{
        formData[index].removeAttribute("data-error");
        if(event.target.name === "first"){
            firstValidation = true;
        }
        if(event.target.name === "email"){
            emailValidation = true;
        }
        if(event.target.name === "quantity"){
            quantityValidation = true;
        }
    }
}

function errorTest(event, index){
    event.target.style.animation = "errorInput 100ms 3";
    event.target.style.background = errorColor;
    event.target.style.border = errorColor;
    //Réglage du bug validationMessage non configurée pour l'input "Nom"
    if(event.target.value.length === 1 && event.target.name === "last"){
        event.target.setCustomValidity("Veuillez allonger ce texte pour qu'il comporte au moins 2 caractères. Il en compte actuellement un seul.");
        formData[1].setAttribute("data-error-visible","true");
        formData[1].setAttribute("data-error",event.target.validationMessage);
    }
    else{
        formData[index].setAttribute("data-error-visible","true");
        formData[index].setAttribute("data-error",event.target.validationMessage);
    }
}

function emptyTest(event,index){
    if(event.target.value === ""){
        event.target.style.animation = "none";
        event.target.style.background = "white";
        if(event.target.name === "last"){
            event.target.setCustomValidity("");
            formData[1].setAttribute("data-error-visible",false);
            formData[1].removeAttribute("data-error");
        }
        formData[index].setAttribute("data-error-visible",false);
        formData[index].removeAttribute("data-error");
    }
}

function resetForm(){
    content[0].style.margin = "5% auto";
    modalbg.style.display = "none";
    thanksDivElt.style.display ="none";
    modalBody[0].style.display = "block";
    //Si la checkbox est activé ou non à la fermeture alors on reset la case à sa valeur initiale
    if(checkbox1.checked === false){
        checkboxIcon[6].style.animation = "none";
        checkboxIcon[6].style.background = "#c4c4c4";
    }
    if(checkbox1.checked === true){
        checkboxIcon[6].style.background = "#c4c4c4";
        checkbox1.checked = false;
    }
    for(let index=0;index < 6;index++){
        if(locationInput[index].checked === true){
            locationInput[index].checked = false;
        }
    }
    for(entry of entriesInput){
        entry.value = "";
        entry.style.background = "white";
        entry.style.animation = "none";
    }
    for(data of formData){
        if(data.getAttribute("data-error")){
            data.removeAttribute("data-error");
        }
    }
}

function addUser(userObject){
    userInformation.push(userObject);
}

//Reset et ferme la modale
modalClose.addEventListener("click", function(){
    resetForm();
});

//Test visuel de nos inputs au changement de focus
formData.forEach((input) => input.addEventListener("change",function textIsValid(event){
    //Inputs du prénom et du nom 
    if(event.target.name === "first" || event.target.name === "last"){
        if(event.target.value.length < 2 && event.target.value.length != 0){
            errorTest(event,0);
        }
        if(event.target.value.length >= 2){
            validTest(event,0);
        }
        emptyTest(event,0);
    }
    //Input de l'email
    if(event.target.name === "email"){
        if(event.target.validity.valid === true){
            validTest(event,2);
        }
        if(event.target.validity.valid === false){
            errorTest(event,2);
        }
        emptyTest(event,2);
    }
    //Input de la date de naissance
    if(event.target.name === "birthdate"){
        let regexBirthday = new RegExp("^.{4}-.{2}-.{2}$");
        let validBirthday = regexBirthday.test(event.target.value);
        if(validBirthday){
            validTest(event,3);
        }
        if(validBirthday === false){
            if(event.target.value === event.target.defaultValue){
                event.target.setCustomValidity("Veuillez saisir une valeur valide. Le champ n'est pas complet ou contient une date non valide.");
            }
            else{
                event.target.setCustomValidity("Veuillez saisir une valeur valide au format : JJ/MM/AAAA");
            }
            errorTest(event,3);
        }
    }
    //Input du nombre de tournois fait par l'utilisateur
    if(event.target.name === "quantity"){
        //Si l'élément est un entier ou vide
        if(Number.isInteger(parseInt(event.target.value)) || event.target.value === ""){
            if(event.target.validity.valid){
                validTest(event,4);
            }
            if(event.target.validity.valid === false && event.target.value != event.target.defaultValue){
                errorTest(event,4);
            }
            emptyTest(event,4);
        }
        //A revoir avec mon mentor
        /*else if(String.isInteger(event.target.value)){
            event.target.validationMessage = "Le valeur saisie n'est pas un nombre";
            errorTest(event,4);
        }*/
    }
    if(event.target.name === "location"){
        if(event.target.checked){
            formData[5].removeAttribute("data-error");
            locationValidation = true;
        }
        else{
            locationValidation = false;
        }
    }
    if(event.target.id === "checkbox1"){
        if(event.target.checked === false){
            checkboxIcon[6].style.animation = "errorInput 100ms 3";
            checkboxIcon[6].style.background = errorColor;
            formData[6].setAttribute("data-error-visible",true);
            formData[6].setAttribute("data-error","Les conditions d'utilisation sont obligatoires ! Veuillez cocher le case correspondante.");
            checkboxValidation = false;
        }
        if(event.target.checked){
            checkboxIcon[6].style.animation = "none";
            checkboxIcon[6].style.background = validColor;
            formData[6].removeAttribute("data-error");
            checkboxValidation = true;
        }
    }
}));

const thanksElt = document.createElement("p");
const thanksDivElt = document.createElement("div");
thanksElt.textContent = "Merci ! Votre réservation a été reçue.";
thanksDivElt.setAttribute("class","thanks-div");
thanksDivElt.style.display = "none";
thanksDivElt.appendChild(thanksElt);
content[0].appendChild(thanksDivElt);

async function validate(event){
    event.preventDefault();
    if(locationInput[0].checked ===false && locationInput[1].checked ===false && locationInput[2].checked ===false && locationInput[3].checked ===false && locationInput[4].checked ===false && locationInput[5].checked ===false){
        formData[5].setAttribute("data-error-visible",true);
        formData[5].setAttribute("data-error","Veuillez choisir une option de localisation !");
        locationValidation = false;
    }
    if(formData[6].children[0].checked === false){
        checkboxIcon[6].style.animation = "errorInput 100ms 3";
        checkboxIcon[6].style.background = errorColor;
        formData[6].setAttribute("data-error-visible",true);
        formData[6].setAttribute("data-error","Les conditions d'utilisation sont obligatoires ! Veuillez cocher la case correspondante.");
        checkboxValidation = false;
    }
    if (firstValidation && lastValidation && emailValidation && birthdayValidation && quantityValidation && locationValidation && checkboxValidation) {
        console.log("Formulaire Validé !");
        modalBody[0].style.display = "none";
        content[0].style.margin = "20% auto";
        thanksDivElt.style.height = "150px";
        thanksElt.style.fontSize = "22px";
        thanksElt.style.textAlign= "center";
        thanksElt.style.margin = "15% auto 0 auto";
        thanksDivElt.style.display = "block";
        for(let index=0;index < locationEntry.length;index++){
            if(locationEntry[index].checked){
                locationChecked = locationEntry[index].value;
            }
        }
        const newUser = new user(firstEntry.value,lastEntry.value,emailEntry.value,birthdateEntry.value,quantityEntry.value,locationChecked,checkbox1.checked,checkbox2.checked);
        addUser(newUser);
        console.log(userInformation);
    }
};





