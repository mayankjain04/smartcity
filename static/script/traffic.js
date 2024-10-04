// get user location from localstorage

let storedCoordinates = JSON.parse(localStorage.getItem('userCoordinates'));

const scriptTag = document.querySelector('script[src*="traffic.js"]');
const latitude = storedCoordinates.latitude
const longitude = storedCoordinates.longitude
const dataRadius = scriptTag.getAttribute('radius');

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

// Fetch and display traffic data
// fetch(`/traffic_data?latitude=${latitude}&longitude=${longitude}&radius=${radius}`)
//     .then(response => response.json())
//     .then(data => {
//         // Access the traffic data from the 'Results' key
//         const results = data.Results;
//         if (results && results.length > 0) {
//             const traffic_data = results[0];
//             // Access the 'flows' key within the first element of 'Results'
//             traffic_data.flows.forEach(flow => {
//                 var coordinates = flow.coordinates;
//                 var length = flow.length; 
//                 var routeName = flow.routeName;
//                 var routeLength = flow.routeLength;
//                 var jamFactor = flow.jamStatus;
//                 // select color for polylines
//                 var color = "grey";
//                 var message = "Info Unavailable";
//                 switch (true) {
//                     case (jamFactor === 10):
//                         color = "red";
//                         message = "Closed";
//                         break;
//                     case (jamFactor < 3):
//                         color = "green";
//                         message = "Open";
//                         break;
//                     case (jamFactor < 6):
//                         color = "#9ACD32";
//                         message = "Slight Traffic";
//                         break;
//                     case (jamFactor < 8):
//                         color = "yellow";
//                         message = "Moderate Traffic";
//                         break;
//                     case (jamFactor < 10):
//                         color = "orange";
//                         message = "High Traffic";
//                         break;
//                 }
//                 // at first only `Length: ${length} meters`, was added in tooltip
//                 var polyline = L.polyline(coordinates, { color: color }).addTo(map);
//                 polyline.bindTooltip(`${routeName}, ${routeLength} meters, ${message}`);
//             });
//             traffic_data.routeData.forEach(route => {
//                 // Add additional data beside the map
//                 var trafficInfo = document.getElementById('traffic-info');
//                 var info = document.createElement('div');
//                 const liveText = route.reliabilityFactor > 0.7 ? "LIVE" : "";
//                 info.classList.add('traffic-info-entry');
//                 let feedReliability = "";
//                 if (typeof route.reliabilityFactor === 'number') {
//                     feedReliability = `
//                     <p>Feed Reliability: <span class="text-success">${route.reliabilityFactor * 100}% <span id="live">${liveText}</span></span></p>
//                     `;
//                 }
//                 info.innerHTML = `
//                 <p class="text-dark">Route Name: ${route.routeName}</p>
//                 <p>Route Length: ${route.routeLength} meters</p>
//                 <p>Status: <span class="text-success">${route.status}</span></p>
//                 <p>Jam Status: <span class="text-success">${route.jamStatus * 10}%</span></p>
//                 ${feedReliability}
//                 <hr>
//             `;
//                 trafficInfo.appendChild(info);
//             })
//         }
//     })
    // .catch(error => console.error('Error fetching traffic data:', error));