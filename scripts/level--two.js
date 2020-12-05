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
    var color = '';
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
        case 'draggable-1':
          color = 'darkblue';
          break;
        case 'draggable-2':
          color = 'lightblue';
          break;
        case 'draggable-3':
          color = 'yellow';
          break;
        case 'draggable-4':
          color = 'green';
          break;
        case 'draggable-5':
          color = 'white';
          break;
        case 'draggable-6':
          color = 'red';
          break;
        default:
          break;
      }
      if (color != '') {
        this.franjasArray[index].color = color;
      }
    }
  }

  addFranja(htmldiv) {
    var objectFranja = { html: htmldiv, color: '' }
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
    this.franjasArray.forEach(
      (franja) => { colors.push(franja.color) }
    );
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
var nivel = indexBandera+1;
var banderaTrue = undefined;
var banderas = [Ecuador, Argentina, ElSalvador, Mexico, Guatemala, Paraguay, Nicaragua, Haiti, CostaRica];
var banderaSimbolos = [];
shuffle(banderas);

var color = null;

var generateBandera = () => {
  
  if (indexBandera < banderas.length-1) {
    indexBandera++;
    nivel++;
    console.log('Nivel '+nivel);
  } 
  banderaTrue = banderas[indexBandera];
  document.querySelector('#countrySelected').innerHTML = banderaTrue.nombre;
  document.querySelector('#countrySelected').style.textAlign = 'center';
  var indexSimbolo = indexBandera;
  for (let i = 0; i < 3; i++) {
    banderaSimbolos.push(banderas[indexSimbolo]);
    indexSimbolo++;
  }
  
  var extra = 0;
  shuffle(banderaSimbolos);
  console.log(banderaSimbolos);
  for (let i = 0; i < banderaSimbolos.length; i++) {
    
    var crearSimbolo = document.createElement("img");
    crearSimbolo.classList.add("simboloImage");
    crearSimbolo.id='hola'+extra;
    crearSimbolo.setAttribute('src', './data/images/countrys/'+banderaSimbolos[i].simbolo);
    crearSimbolo.setAttribute('draggable', 'true');
    crearSimbolo.setAttribute('onDragStart', 'onDragStart(event);');
    document.getElementById('simboloss').appendChild(crearSimbolo);
    extra++;
    
  }
};

function onDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  const id = event.dataTransfer.getData('text');
  const draggableElement = document.getElementById(id);
  event.currentTarget.style.backgroundColor = window.getComputedStyle(draggableElement, null).getPropertyValue("background-color");
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  const id = event.dataTransfer.getData('text');
  //console.log(id);
  //var color = event.dataTransfer.styles.width;
  //console.log(color);
  const draggableElement = document.getElementById(id);

  if (draggableElement.classList.value.includes('draggable')) {
    var color = draggableElement.style.backgroundColor;
  //console.log(color);
  const dropzone = event.target;
  dropzone.style.backgroundColor = color;
  event.dataTransfer.clearData();
  bandera.setFranja(id, dropzone);
  } else {
    console.log(draggableElement.src);
    var img = draggableElement.src;
    var crearSimbolo = document.createElement("img");
    crearSimbolo.classList.add("simboloImage");
    crearSimbolo.id='simboloBanderaImg';
    crearSimbolo.setAttribute('src', './data/images/countrys/'+draggableElement.src.slice(43));
    console.log(draggableElement.src.slice(43));
    document.getElementById('canvass').appendChild(crearSimbolo);
  }
  
}

document.querySelector('.comprobation').addEventListener("click", comprobation);

var aciertoss=0;
var puntajee = 0;

function comprobation(event) {
  console.log("Entré al evento de comprobación");

  var colors = bandera.getColors();
  var orientacionBandera = undefined;
  console.log(bandera.franjasArray[0]);
  if (bandera.franjasArray[0].html.style.display=='inline-block') {
    orientacionBandera = 'vertical'; 
  } else {
    orientacionBandera = 'horizontal'; 
  }
  if (orientacionBandera == banderaTrue.orientacion) {
    if (bandera.franjasArray.length == banderaTrue.colores.length) {
      var colorCorrecto = true;
      for (let i = 0; i < banderaTrue.colores.length; i++) {
        let color = banderaTrue.colores[i];
        if (color != colors[i]) {
          colorCorrecto = false;
        }
      }
      if (colorCorrecto) {
        alert('Felicidades');
        aciertoss++;
        console.log(aciertoss);
        if (aciertoss==3) {
          puntajee+=100;
          acabarNivel();
          if (puntajee<0) {
              puntajee=0;
          }
      }
      reset();
      generateBandera();
      } else {
        puntajee-=5;
        alert('No, asi no son los colores');
      }
    } else {
      puntajee-=5;
      alert('No es la cantidad de franjas correcta');
    }
  } else {
    alert('La orientación no es la correcta');
  }
}

function acabarNivel(event) {
  console.log('Final del nivel');
  document.querySelector(".instrucciones").style.display = "none";
  document.querySelector(".game2").style.display = "none";
  document.querySelector(".finalizarNivel").style.display = "flex";
  document.querySelector(".puntajee").innerText=puntajee+' puntos';
}

document.querySelector('.aumFranjas').addEventListener("click", moreStripes);
function moreStripes(event) {
  if (bandera.franjasArray.length < 5) {
    //console.log("Entré al evento de aumentar franjas");
    var stripe = document.createElement("div");
    stripe.classList.add("dropzone");
    stripe.classList.add("franja");
    stripe.setAttribute('ondragover', 'onDragOver(event);');
    stripe.setAttribute('ondrop', 'onDrop(event);');
    document.getElementById('canvass').appendChild(stripe);
    bandera.addFranja(stripe);
    
    for (let i = 0; i < bandera.franjasArray.length; i++) {
      var altura = 100/bandera.franjasArray.length;
      bandera.franjasArray[i].html.style.height=altura+'%';
      //console.log('stripe '+ i +'tiene altura '+altura+'%, lo cual representa '+bandera.franjasArray[i].html.style.height+'px');
    }
  } else {
    console.log('No se pueden tener mas de 5 franjas');
  }
}

document.querySelector('.disFranjas').addEventListener("click", lessStripes);
function lessStripes(event) {
  console.log("Entré al evento de disminuir franjas");
  //document.querySelector('.dropzone').remove();
  var elem = document.querySelector('.dropzone:last-child');
  if (elem != undefined) {
    bandera.removeFranja(elem);
    elem.remove();
  }
  for (let i = 0; i < bandera.franjasArray.length; i++) {
    var altura = 100/bandera.franjasArray.length;
    bandera.franjasArray[i].html.style.height=altura+'%';
    //console.log('stripe '+ i +'tiene altura '+altura+'%, lo cual representa '+bandera.franjasArray[i].html.style.height+'px');
  }
}

document.querySelector('.horizontal').addEventListener("click", transformHorizontal);
function transformHorizontal(event) {
  for (let i = 0; i < bandera.franjasArray.length; i++) {
    var altura = 100/bandera.franjasArray.length;
    bandera.franjasArray[i].html.style.display='block';
    bandera.franjasArray[i].html.style.flexBasis='100%';
    bandera.franjasArray[i].html.style.flexGrow='1';
    bandera.franjasArray[i].html.style.height=altura+'%';
    bandera.franjasArray[i].html.style.width='100%';
  }
}

document.querySelector('.vertical').addEventListener("click", transformVertical);
function transformVertical(event) {
  for (let i = 0; i < bandera.franjasArray.length; i++) {
    var ancho = 100/bandera.franjasArray.length;
    bandera.franjasArray[i].html.style.display='inline-block';
    bandera.franjasArray[i].html.style.flexBasis='100%';
    bandera.franjasArray[i].html.style.flexGrow='1';
    bandera.franjasArray[i].html.style.width=ancho+'%';
    bandera.franjasArray[i].html.style.height='100%';
  }
}

function reset(event) {
  transformHorizontal();
  document.querySelector('#simboloBanderaImg').parentNode.removeChild(document.querySelector('#simboloBanderaImg'));
  for (let i = 0; i < bandera.franjasArray.length+2; i++) {
    lessStripes();   
  }
  for (let i = 0; i < banderaSimbolos.length; i++) {
    document.querySelector('#hola'+i).parentNode.removeChild(document.querySelector('#hola'+i));
  }
    banderaTrue = undefined;
    banderas = [Ecuador, Argentina, ElSalvador, Mexico, Guatemala];
    banderaSimbolos = [];
}

generateBandera();

document.querySelector('nav').querySelector('img').addEventListener('click', function(){
  window.location.href = 'home.html'
})

//actions

document
    .querySelector(".instrucciones")
    .querySelector(".btn")
    .addEventListener("click", () => {
        document.querySelector(".instrucciones").style.display = "none";
        document.querySelector(".game2").style.display = "flex";
    });
    document
    .querySelector(".finalizarNivel")
    .querySelector(".btnFinal")
    .addEventListener("click", () => {
        window.location.href = "home.html";
    });