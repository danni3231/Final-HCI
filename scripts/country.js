//set info
const parts = location.search.split('-');
const index = parts[0].replace('?', '');
const country = countrys[index];

document.querySelector('.map').querySelector('img').src = country.images[0];

document.querySelector('.map__info').querySelector('h2').innerText = country.name;

const pinContainer = document.querySelector('.pin__container');
const infos = document.querySelectorAll('.card__info');

const surface = infos[0];
surface.querySelector('p').innerText = country.surface[0];
surface.querySelector('h2').innerText = country.surface[1];

const population = infos[1];
population.querySelector('p').innerText = country.population;
population.querySelector('p').style.position="absolute";
population.querySelector('p').style.zIndex ="3";

const cities = infos[2];
const citiesList = cities.querySelectorAll('li');

function createPin(city){
    const pin = document.createElement('img')
    pin.classList.add('pin');
    pin.src = "./data/images/icons/pin.png";
    pin.style.top = `${city.y}px`;
    pin.style.left = `${city.x}px`;
    pinContainer.appendChild(pin);

    const name =document.createElement("p");
    name.classList.add('pin');
    name.innerText = city.name;
    name.style.color = 'white';
    name.style.top = `${city.y}px`;
    name.style.left = `${city.x+25}px`;
    pinContainer.appendChild(name);
}

for (let index = 0; index < citiesList.length; index++) {
    citiesList[index].innerText = country.cities[index].name;
    createPin(country.cities[index]);
}
cities.querySelector('h2').innerText = country.cities[3].name;
createPin(country.cities[3]);

const languages = infos[3];
const languagesList = languages.querySelectorAll('p');
languagesList[0].innerText = country.money;
languagesList[1].innerText = country.language;
languagesList[2].innerText = country.demonym;

const tourism = infos[4];
const tourismList = tourism.querySelectorAll('li');
tourism.querySelector('p').innerText = country.tourism[0].description;

function createPlanePin(site) {
    const pin = document.createElement('img');
    pin.classList.add('pin');
    pin.classList.add('clickable');
    pin.src = "./data/images/icons/plane.png";
    pin.style.top = `${site.y}px`;
    pin.style.left = `${site.x}px`;

    pinContainer.appendChild(pin);

    pin.addEventListener('mouseover', () =>{
        const card = document.createElement('div');
        card.classList.add('pin__card');

        card.innerHTML =`
        <img src="${site.img}" alt="">
        <p>${site.name}</p>
        `;

        card.style.top = `${site.y}px`;
        card.style.left = `${site.x}px`;

        pinContainer.appendChild(card);
        
    });

    pin.addEventListener('mouseout', () =>{
        const card = document.querySelector('.pin__card');
        if(card){
            pinContainer.removeChild(card); 
        }   
    });
}

function changeFocusTourism(i) {
    for (let index = 0; index < tourismList.length; index++) {
        if(index == i){
            tourismList[index].classList.add('tourism--select');
        }else{
            tourismList[index].classList.remove('tourism--select');
        }
    }
}

for (let index = 0; index < tourismList.length; index++) {
    const site = tourismList[index];
    site.innerText = country.tourism[index].name;
    createPlanePin(country.tourism[index]);
    site.addEventListener('click',() => {
        tourism.querySelector('p').innerText = country.tourism[index].description;
        changeFocusTourism(index);
    });
}

const flag = infos[5];
const flagList = flag.querySelectorAll('img');

flagList[0].src = country.images[1];
flagList[1].src = country.images[2];

//change info
const btns = document.querySelectorAll('.card__btn');
for (const btn of btns) {

    btn.addEventListener('click', () => {

        for (const info  of infos) {
            if(info.classList[1]== btn.classList[1]){
                info.classList.remove('hidden');
            }else{
                info.classList.add('hidden');
            }
        }

    });
}

//nav action

const arrow = document.querySelector('.nav').querySelector('img');

arrow.addEventListener('click',() =>{
    window.location.href = 'home.html';
});

