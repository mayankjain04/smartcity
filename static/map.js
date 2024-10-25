const latitude = 23.863733;
const longitude = 78.808491;
const dataRadius = 1000;

// Initialize the map
var map = L.map('map').setView([latitude, longitude], 13);

// Set up the OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Add a circle to indicate the radius of the area
var radius = dataRadius;
L.circle([latitude, longitude], {
    color: 'blue',
    fillColor: '#blue',
    fillOpacity: 0.1,
    radius: radius
}).addTo(map);

// Add a marker for the user's location
L.marker([latitude, longitude]).addTo(map)
    .bindPopup('You are here')