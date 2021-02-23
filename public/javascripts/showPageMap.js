mapboxgl.accessToken = mapTOken;
const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/outdoors-v11", // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
});


new mapboxgl.Marker({
    color: "#3f65b0",
    draggable: false
}).setLngLat(campground.geometry.coordinates)
    .addTo(map);

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h8>${campground.title}</h8><p>${campground.location}</p> `))
    .addTo(map);

console.log(marker.getPopup()); // return the popup instance