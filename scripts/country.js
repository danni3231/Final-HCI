//set info
const parts = location.search.split('-');
const index = parts[0].replace('?', '');
const country = countrys[index];

document.querySelector('.map').querySelector('img').src = country.images[0];

document.querySelector('h2').innerText = country.name;

const infos = document.querySelectorAll('.card__info');

const surface = infos[0];
surface.querySelector('p').innerText = country.surface[0];
surface.querySelector('h2').innerText = country.surface[1];

const population = infos[1];
population.querySelector('p').innerText = country.population;

const cities = infos[2];
const citiesList = cities.querySelectorAll('li');
for (let index = 0; index < citiesList.length; index++) {
    citiesList[index].innerText = country.cities[index];
}
cities.querySelector('h2').innerText = country.cities[3];

const languages = infos[3];
const languagesList = languages.querySelectorAll('p');
languagesList[0].innerText = country.money;
languagesList[1].innerText = country.language;
languagesList[2].innerText = country.demonym;

const tourism = infos[4];
const tourismList = tourism.querySelectorAll('li');
for (let index = 0; index < tourismList.length; index++) {
    tourismList[index].innerText = country.tourism[index].name;
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

