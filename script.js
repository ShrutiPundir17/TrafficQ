
const map = L.map('map').setView([28.6139, 77.2090], 12);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors',
}).addTo(map);


const trafficLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19,
}).addTo(map);


document.getElementById('trafficToggle').addEventListener('click', function() {
  if (map.hasLayer(trafficLayer)) {
    map.removeLayer(trafficLayer);
  } else {
    map.addLayer(trafficLayer);
  }
});


document.getElementById('getRoute').addEventListener('click', function() {
  const start = document.getElementById('start').value;
  const destination = document.getElementById('destination').value;

  if (start && destination) {
    
    if (window.route) {
      map.removeLayer(window.route);
    }

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start), 
        L.latLng(destination), 
      ],
      routeWhileDragging: true,
    }).addTo(map);

    window.route = routingControl.getPlan().getRoute();


    fetchRouteDetails(start, destination, routingControl);
  } else {
    alert('Please enter both start and destination.');
  }
});

function fetchRouteDetails(start, destination, routingControl) {
  const routeDetails = `
    <h3>Route Details</h3>
    <p><strong>Start:</strong> ${start}</p>
    <p><strong>Destination:</strong> ${destination}</p>
    <p><strong>Duration:</strong> ${routingControl.getRoutes()[0].summary.totalDuration / 60} minutes</p>
    <p><strong>Distance:</strong> ${routingControl.getRoutes()[0].summary.totalDistance / 1000} km</p>
  `;
  document.getElementById('routeDetails').innerHTML = routeDetails;
}
