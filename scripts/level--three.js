var score = 0;
var dist;
var currentCode;
var firstClick = true;
var index = 0;

const card = document.querySelector(".levelThree__card");
const btn = document.querySelector(".levelThree").querySelector('.btn');

function updateCard(site) {
    card.querySelector('img').src = site.img;
    card.querySelector('p').innerText = site.name;
}

updateCard(sites[index]);

var grid = codegrid.CodeGrid();

// initialize map 1
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

var distanceContainer = document.querySelector('.levelThree__dist')

// GeoJSON object to hold our measurement features
var geojson = {
    type: "FeatureCollection",
    features: [],
};

// Used to draw a line between points
var linestring = {
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates: [],
    },
};

map.on("load", function () {
    map.addSource("geojson", {
        type: "geojson",
        data: geojson,
    });

    // Add styles to the map

    map.addLayer({
        id: "measure-lines",
        type: "line",
        source: "geojson",
        layout: {
            "line-cap": "round",
            "line-join": "round",
        },
        paint: {
            "line-color": "#fff",
            "line-width": 2.5,
        },
        filter: ["in", "$type", "LineString"],
    });

    map.addLayer({
        id: "measure-points",
        type: "circle",
        source: "geojson",
        paint: {
            "circle-radius": 5,
            "circle-color": "#fff",
        },
        filter: ["in", "$type", "Point"],
    });

    // first point
    var point = {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [sites[index].lng, sites[index].lat],
        },
        properties: {
            id: String(new Date().getTime()),
        },
    };

    geojson.features.push(point);

    map.on("click", function (e) {
        if(firstClick){

            grid.getCode(e.lngLat.lat, e.lngLat.lng, function (error, code) {
                currentCode=code;
            });

            var features = map.queryRenderedFeatures(e.point, {
                layers: ["measure-points"],
            });
    
            // Remove the linestring from the group
            // So we can redraw it based on the points collection
            if (geojson.features.length > 1) geojson.features.pop();
    
            // If a feature was clicked, remove it from the map
            if (features.length) {
                var id = features[0].properties.id;
                geojson.features = geojson.features.filter(function (point) {
                    return point.properties.id !== id;
                });
            } else {
                var point = {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [e.lngLat.lng, e.lngLat.lat],
                    },
                    properties: {
                        id: String(new Date().getTime()),
                    },
                };
    
                geojson.features.push(point);
            }
    
            if (geojson.features.length > 1) {
                linestring.geometry.coordinates = geojson.features.map(function (
                    point
                ) {
                    return point.geometry.coordinates;
                });
    
                geojson.features.push(linestring);
    
          
                distanceContainer.innerHTML =
                    "Distancia: " +
                    turf.length(linestring).toLocaleString() +
                    "km";
                dist = turf.length(linestring);
            }
    
            map.getSource("geojson").setData(geojson);
            firstClick=false;
            btn.classList.remove('hidden');
        }

    });
});

//score

function calculateScore(dist,code) {
    console.log(code, currentCode);
    if(code==sites[index].code){
        score+=5;
    }

    if(dist<=500){
        score+=15;
        console.log('suma 15');
    }else if(dist>500 && dist<=1500){
        score+=10;
    }else if(dist>1500 && dist<=2500){
        score+=5;
    }else if(dist>2500){
        score+=0;
    }
}
//continue
btn.addEventListener("click", () => {
    index++;

    if(index<sites.length){
        distanceContainer.innerHTML = "Distancia:";
        calculateScore(dist,currentCode);

        firstClick=true;
        
        updateCard(sites[index]);
        geojson.features = [];
    
        var point = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [sites[index].lng, sites[index].lat],
            },
            properties: {
                id: String(new Date().getTime()),
            },
        };
    
        geojson.features.pop();

        map.getSource("geojson").setData(geojson);
    
        geojson.features.push(point);
        
    }else{
        //inserte codigo de continuar xd
    }

    btn.classList.add('hidden');
});
