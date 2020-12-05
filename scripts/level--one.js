function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

class Bandera {
    constructor() {
        this.franjasArray = [];
    }

    setFranja(id, htmlref) {
        var color = "";
        var index = -1;
        for (let i = 0; i < this.franjasArray.length; i++) {
            let franja = this.franjasArray[i];
            if (franja.html == htmlref) {
                index = i;
                i = this.franjasArray.length;
            }
        }
        if (index != -1) {
            switch (id) {
                case "draggable-1":
                    color = "darkblue";
                    break;
                case "draggable-2":
                    color = "lightblue";
                    break;
                case "draggable-3":
                    color = "yellow";
                    break;
                case "draggable-4":
                    color = "green";
                    break;
                case "draggable-5":
                    color = "white";
                    break;
                case "draggable-6":
                    color = "red";
                    break;
                default:
                    break;
            }
            if (color != "") {
                this.franjasArray[index].color = color;
            }
        }
    }

    addFranja(htmldiv) {
        var objectFranja = { html: htmldiv, color: "" };
        this.franjasArray.push(objectFranja);
    }

    removeFranja(htmlref) {
        var index = -1;
        for (let i = 0; i < this.franjasArray.length; i++) {
            let franja = this.franjasArray[i];
            if (franja.html == htmlref) {
                index = i;
                i = this.franjasArray.length;
            }
        }
        if (index != -1) {
            this.franjasArray.splice(index, 1);
        }
    }

    getColors() {
        var colors = [];
        this.franjasArray.forEach((franja) => {
            colors.push(franja.color);
        });
        return colors;
    }

    getStripes() {
        var stripess = [];
        stripess = this.franjasArray;
        return stripess;
    }
}

var bandera = new Bandera();
var indexBandera = -1;
var nivel = indexBandera + 1;
var banderaTrue = undefined;
var banderas = [
    Colombia,
    Argentina,
    Bolivia,
    Peru,
    Guatemala,
    Venezuela,
    Ecuador,
    Mexico,
];
shuffle(banderas);

var color = null;

var generateBandera = () => {
    if (indexBandera < banderas.length - 1) {
        indexBandera++;
        nivel++;
        console.log("Nivel " + nivel);
    }
    banderaTrue = banderas[indexBandera];
    //document.querySelector('#countrySelected').innerHTML = banderaTrue.nombre;
    //document.querySelector('#countrySelected').style.textAlign = 'center';
};

function createCanvass(pais) {
    var countryContainer = document.createElement("div");
    countryContainer.classList.add("canvass");
    //countryContainer.setAttribute('ondragover', 'onDragOver(event);');
    document.querySelector(".siluetas").appendChild(countryContainer);
    var image = document.createElement("img");
    //console.log(image);
    image.classList.add("imagesSiluetas");
    image.setAttribute(
        "src",
        "./data/images/level1/BanderasPaises/" + pais.silueta
    );
    document.querySelector(".canvass").appendChild(image);
    var countryText = document.createElement("span");
    //console.log(countryText);
    countryText.classList.add("countryName");
    //countryText.innerText = pais.nombre;
    document.querySelector(".canvass").appendChild(countryText);
}
var flagContainer = document.createElement("div");
function createFlags(pais) {
    flagContainer.classList.add("draggable");
    document.querySelector(".banderas").appendChild(flagContainer);
    var image = document.createElement("img");
    image.classList.add("imagesFlags");
    image.setAttribute(
        "src",
        "./data/images/level1/BanderasPaises/" + pais.bandera
    );
    document.querySelector(".draggable").appendChild(image);
}

var managerDrag = new DragAndDrop();
var banderasArray = [];

for (let i = 0; i < 3; i++) {
    //console.log(banderas[i]);
    createCanvass(banderas[i]);
    banderasArray.push(banderas[i]); //For para las banderas correctas
}

for (let i = 0; i < 5; i++) {
    banderasArray.push(banderas[i + 3]); //For para las banderas de relleno
}

shuffle(banderasArray);
for (let i = 0; i < banderasArray.length; i++) {
    createFlags(banderasArray[i]);
}

var siluetas_mapas = document.querySelectorAll(".imagesSiluetas");
var banderas_mapas = document.querySelectorAll(".draggable");
var nombres_mapas = document.querySelectorAll(".countryName");

managerDrag.addDrag(banderas_mapas);
managerDrag.addDrop(siluetas_mapas);

managerDrag.setOnDrog((elementoDrop, elementoDrag) => {
    var territorio = undefined;
    var banderaa = undefined;
    var elemDrag = undefined;
    var elemDrop = undefined;
    //console.log(elementoDrop.src.slice(41));
    //console.log(elementoDrag);
    //console.log(elementoDrop);

    for (let i = 0; i < banderas.length; i++) {
        if (banderas[i].bandera == elementoDrag.src.slice(56)) {
            //console.log('La bandera pertenece a '+banderas[i].nombre);
            banderaa = banderas[i];
        }
    }

    for (let i = 0; i < banderas.length; i++) {
        if (banderas[i].silueta == elementoDrop.src.slice(56)) {
            //console.log('El territorio pertenece a '+banderas[i].nombre);
            territorio = banderas[i];
            elemDrop = banderas[i];
        }
    }

    //console.log('Puse la bandera de '+'pais'+' sobre el territorio de '+'pais');
    lvl1comprobation(banderaa, territorio, elemDrop);
});

function lvl1comprobation(bandera, territorio, dragElem) {
    if (bandera == territorio) {
        for (let i = 0; i < managerDrag.drops.length; i++) {
            if (managerDrag.drops[i].src.includes(bandera.nombre)) {
                managerDrag.drops[i].src =
                    "./data/images/level1/BanderasPaises/" +
                    dragElem.siluetaPintada;
                managerDrag.drops[i].nextSibling.innerText = dragElem.nombre;
            }
        }
    } else {
        alert("Nonas sigue intentando");
    }
}

//actions
document
    .querySelector("nav")
    .querySelector("img")
    .addEventListener("click", function () {
        window.location.href = "home.html";
    });

document
    .querySelector(".instrucciones")
    .querySelector(".btn")
    .addEventListener("click", () => {
        document.querySelector(".instrucciones").style.display = "none";
        document.querySelector(".contentLevel1").style.display = "flex";
    });
