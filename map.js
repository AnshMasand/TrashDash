const firebaseConfig = {
  apiKey: "AIzaSyClMhEEWKhE5uz5DApq1Y58uVRqWTg1Luo",
  authDomain: "trashdash-d3508.firebaseapp.com",
  databaseURL: "https://trashdash-d3508-default-rtdb.firebaseio.com",
  projectId: "trashdash-d3508",
  storageBucket: "trashdash-d3508.appspot.com",
  messagingSenderId: "729752667316",
  appId: "1:729752667316:web:b46a5026c54eee676743e1"
};

firebase.initializeApp(firebaseConfig);

var contactFormDB=firebase.database().ref('geolocation')


function initMap() {
  btn = document.getElementById('button'),   
  map = new google.maps.Map(document.getElementById('map'),{
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
    mapId: '431ceab9b72a10f0'
  });

  initControl(map);
  

}

function addMarker1() {
    let marker = new google.maps.Marker({
        map: map,
        position: map.getCenter(),

    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

function initControl(map) {
    // Create the control element
    var controlDiv = document.createElement('div');
    controlDiv.id = 'custom-control';
    controlDiv.style.padding = '10px';
    
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to find your location';
    controlUI.innerHTML = '<span style="font-size: 18px; font-weight: bold;">My Location</span>';
    controlDiv.appendChild(controlUI);
  
    // Style the control button with CSS
    var controlCSS = document.createElement('style');
    controlCSS.type = 'text/css';
    controlCSS.innerHTML = '#custom-control:hover { background-color: #f2f2f2; }';
    controlCSS.innerHTML += '#custom-control:active { background-color: #e6e6e6; }';
    controlCSS.innerHTML += '#custom-control span { display: inline-block; vertical-align: middle; margin-left: 8px; }';
    controlCSS.innerHTML += '#custom-control img { display: inline-block; vertical-align: middle; }';
    controlUI.appendChild(controlCSS);
  
    // Add the control to the map
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    controlUI.addEventListener('click', function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
      
            // Create a marker for the current location
            var marker = new google.maps.Marker({
              position: pos,
              map: map,
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              }
            });
      
            // Center the map on the current location
            map.setCenter(pos);
          });
        } else {
          // Browser doesn't support Geolocation
          alert('Geolocation is not supported by this browser.');
        }
      });
}

window.initMap = initMap;
