// Panic Button Modal Trigger
function triggerEmergencyModal() {
    const modal = document.getElementById('panic-modal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('panic-modal');
    modal.style.display = 'none';
}

// Send Panic Alert using Twilio SMS API
// async function sendAlert() {
//     const location = await getLocation();

//     // Example: Send SMS using Twilio API
//     const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
//         method: 'POST',
//         headers: {
//             'Authorization': 'Basic ' + btoa('YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN'),
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: new URLSearchParams({
//             From: '+1234567890', // Your Twilio number
//             To: '+911234567890', // Emergency contact number
//             Body: `Emergency! Help needed at location: Latitude = ${location.lat}, Longitude = ${location.lon}.`
//         })
//     });

//     const result = await response.json();
//     document.getElementById('alert-msg').innerText = result.message || "Alert Sent!";
//     closeModal();
// }

// Call Emergency Services
function callEmergency(number) {
    window.location.href = `tel:${number}`;
}

// Share Location
// async function shareLocation() {
//     const location = await getLocation();
//     const locationMsg = `Location shared: Latitude = ${location.lat}, Longitude = ${location.lon}`;
//     document.getElementById('location-msg').innerText = locationMsg;

//     // Example API integration to share location
//     await fetch('https://api.example.com/shareLocation', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(location),
//     });
// }

// Get Location
async function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }),
                () => reject({ lat: 0, lon: 0 })
            );
        } else {
            reject({ lat: 0, lon: 0 });
        }
    });
}

// Load Dynamic Safety Tips from API
function loadSafetyTips() {
    // const response = await fetch('https://api.example.com/safety-tips');
    // const tips = await response.json();
    const tipsList = document.getElementById('dm-tips-list');
    // tipsList.innerHTML = '';
    var tips = ['Always keep a pepper spray or a stun gun on you.', 'Always remember the contact info of family members, local authorities, police station']
    tips.forEach(tip => {
        const li = document.createElement('li');
        li.innerText = tip;
        tipsList.appendChild(li);
    });
}

// Initialize Google Maps for Safe Spaces
// let map;
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 12,
//     });
// }

// Find Nearby Safe Spaces using Google Places API
function findSafeSpaces() {
    document.querySelector('#map').classList.remove('d-none')
    document.querySelector('#map').classList.add('d-flex')

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
}
//     const location = await getLocation();
//     const service = new google.maps.places.PlacesService(map);
//     const request = {
//         location: new google.maps.LatLng(location.lat, location.lon),
//         radius: '2000', // 2 km radius
//         type: ['police', 'hospital'],
//     };

//     service.nearbySearch(request, (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//             results.forEach((place) => {
//                 const marker = new google.maps.Marker({
//                     position: place.geometry.location,
//                     map: map,
//                     title: place.name,
//                 });
//             });
//             map.setCenter(request.location);
//         }
//     });
// }


