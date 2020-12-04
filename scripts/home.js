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