//map initialize
mapboxgl.accessToken =
    "pk.eyJ1IjoiZGFubmkzMjMxIiwiYSI6ImNraTRvcTNiZDIzNmsyeHFxdXE3MWl6dm8ifQ.r3ENeSElmiaqu9j3mU-UEw";
var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/danni3231/cki4qsimi3hfr1apa3a7qcs6d", // stylesheet location
    center: [-74.5, -15], // starting position [lng, lat]
    zoom: 2.6, // starting zoom
});

map.dragRotate.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disableRotation();
map.scrollZoom.disable();
map.dragPan.disable();

//go to country

var grid = codegrid.CodeGrid();

var countryIndex = 0;

function validateCountry(code) {
    var validate = false;

    for (const country of countrys) {
        if (country.code === code) {
            countryIndex = countrys.indexOf(country);
            validate = true;
        }
    }

    return validate;
}

map.on("click", function (e) {
    // The event object (e) contains information like the

    grid.getCode(e.lngLat.lat, e.lngLat.lng, function (error, code) {
        if (validateCountry(code)) {
            console.log(countryIndex);
            window.location.href = `country.html?${countryIndex}-${code}`;
        } else {
            alert("Pais no disponible");
            console.log(code);
        }
    });
});

//go to levels

const levels = document.querySelectorAll('.level');
console.log(levels);

for (const level of levels) {
    btn = level.querySelector('img');
    btn.addEventListener('click', ()=> {
        var levelIndex = level.classList[1];
        window.location.href = `${levelIndex}.html`

    });
};

//get user information


const points = document.querySelectorAll('.points');

console.log();
usersRef
.doc(localStorage.getItem('userID'))
.get()
.then((snapshot)=>{
    const user = snapshot.data();
    points[0].querySelector('p').innerText = `${user.level1}/100`;
    if(user.level1 != 0){
        points[0].querySelector('div').style.width = `${user.level1}%`;
        points[0].querySelector('div').style.backgroundColor = '#F88000';
    }

    points[1].querySelector('p').innerText = `${user.level2}/100`;
    if(user.level2 != 0){
        points[1].querySelector('div').style.width = `${user.level2}%`;
        points[1].querySelector('div').style.backgroundColor = '#079DAB';
    }

    points[2].querySelector('p').innerText = `${user.level3}/100`;
    if(user.level3 != 0){
        points[2].querySelector('div').style.width = `${user.level3}%`;
        points[2].querySelector('div').style.backgroundColor = '#FECF5D';
    }
})