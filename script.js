// JavaScript

// Globala variabler
var inputElem;     //array innehållande input-rutorna
var msgElem;       //elementet som meddelandde visas med
var fruitNames;    //1-indexerad array med frukternas namn
var fruitNr;       //indexerar fruitNames, representerar vald frukt
var selFruitsElem; //elementet för att innehålla 1-9 fruktbilder

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt koppling avfunktioner till knapparna.
function init() {
	//initialiserar inputElem[] med element
    inputElem = [];
    inputElem[1] = document.getElementById("inputNumber");
    inputElem[2] = document.getElementById("inputName");
    inputElem[3] = document.getElementById("inputAmount");

    msgElem = document.getElementById("message");
    
    
    document.getElementById("btnShow").onclick = showFruit;
    document.getElementById("btnCheck").onclick = checkName;
    document.getElementById("btnAdd").onclick = addFruits;


    fruitNames = ["ingen frukt", "äpple", "banan", "citron", "apelsin", "päron"];
    fruitNr = 0;

    selFruitsElem = document.getElementById("selectedFruits")
} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad


//hämtar ett tal från ett talfält och kontrollerar att det ligger inom given gräns
// om ja, returnera värde avrundat till heltal
function getNr(elemNr, high){
    let nr; //hämtas för att behandlas, eventuellt korrigeras, och returneras

    nr = inputElem[elemNr].value;
    
    if (isNaN(nr)) {
        msgElem.innerHTML = `${nr} är inte ett tal`;
        return null;
    }
    else if (nr > high || nr < 1) {
        msgElem.innerHTML = `${nr} ligger utanför gränserna`;
        return null;
    }
    nr = Math.round(nr);
    inputElem[elemNr].value = nr;
    return nr;
}

//visar en av fem bilder på frukt beroende på siffran i första fältet
function showFruit(){
    let nr;       //nummer som hämtas från första rutan, bestämmer vilken frukt som visas
    let fruitUrl; //url till fruktbilden som ska visas

    //hämta angivet nummer på frukt, om giltigt: ersätt <img>#fruitImg.src med
    //korrekt bild-url
    nr = getNr(1, 5);
    if (nr != null) {
        fruitUrl = `pics/fruit${nr}.jpg`;
        document.getElementById("fruitImg").src = fruitUrl;  

        fruitNr = nr; //fruitNr: global variabel för senare använding
    }
}

//jämför namn på frukt och det namn som matats in, visar lämpligt meddelande
function checkName(){
    let name; //inmatat fruktnamn
    name = inputElem[2].value;

    //kontrollerar att frukt valts
    if (fruitNr == 0){
        msgElem.innerHTML = "välj en frukt först";
        return;
    }
    
    //visar relevant meddelande
    if (name == fruitNames[fruitNr]) {
        msgElem.innerHTML = "wow, du kände igen en frukt";
    }
    else{
        msgElem.innerHTML = "otroligt, du lyckades inte identifiera frukten";
    }
}

// genererar HTML-kod som visar det givna antalet av den valda fruktens bild
function addFruits() {
    let amount;   //inmatat antal frukter
    let imgList;  //textsträng med HTML-kod som ska läggas in i selectedFruits
    let fruitUrl; //url till fruktbilden som ska visas
    let altText;  //alttext för de visade filerna

    //kontrollerar att frukt valts
    if(fruitNr == 0){
        msgElem.innerHTML = "välj en frukt först"; //visar errormeddelande
        return;
    }
    
    imgList = "";
    fruitUrl = `pics/fruit${fruitNr}`; //fruitNumber: tal, syftar på vald frukt
    altText = fruitNames[fruitNr];     

    //hämtar inmatat tal från formulär, om giltigt: generera HTML-kod för
    //givet antal img-taggar med korrekt url och alt-text för vald frukt
    amount = getNr(3, 9);
    if (amount != null) {
        for (let i = 0; i < amount; i++) {
            imgList += `<img src="${fruitUrl}.jpg" alt="${altText}">`;
        }
        
        selFruitsElem.innerHTML = imgList;
    }
}