        
let map, userMarker, directionsService, directionsRenderer;
let userPos = [];
let tMarker;

function initMap()
{
  map = new google.maps.Map(document.getElementById("map"), 
    {center: { lat: 43.2387, lng: -79.8881 },
     zoom: 12,
     mapId: "MAP_ID_GOES_HERE"
  });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  getMarker("marker");

  map.addListener("dblclick", (e) => {
    TempMarker(e.latLng);
  });
}
const locations = [
    {name:"Dark Fox TCG", lat: 43.23113, lng: -79.88151, type:'TradingCard', address: "730 Upper James St, Hamilton, ON L9C 2Z9", phone: '905-385-1338', website: "http://darkfoxtcg.com" },
    {name:"Gamestop", lat: 43.22257, lng: -79.86230, type:'VideoGame', address: "999 Upper Wentworth St, Hamilton, ON L9A 4X5", phone: '905-318-6089', website: "https://www.gamestop.ca/" },
    {name:"Never Board Games Lounge", lat: 43.23849, lng: -79.84250, type:'BoardGame', address: "784 Concession St Unit 11, Hamilton, ON L8V 1C9", phone: '905-385-5454', website: "https://neverboardgames.ca/" },
    {name:"Top Games", lat: 43.23575, lng: -79.82773, type:'GameShop', address: "1099 Fennell Ave E, Hamilton, ON L8T 1S1", phone: '905-318-9812', website: "" },
    {name:"Mancala Monk Board Game Cafe", lat: 43.25626, lng: -79.82018, type:'BoardGame', address: "1229 Cannon St E, Hamilton, ON L8H 4B9", phone: '905-393-6815', website: "http://www.mancalamonk.com/" },
    {name:"1UP Games", lat: 43.27076, lng: -79.89571, type:'VideoGame', address: "777 King St W, Hamilton, ON L8S 1K2", phone: '905-228-3331', website: "https://www.1upgames.ca/" },
    {name:"Black Knight Games", lat: 43.22575, lng: -79.82979, type:'GameShop', address: "864 Mohawk Rd E, Hamilton, ON L8T 2R5", phone: '905-296-3401', website: "https://blackknightgames.ca/" },
    {name:"Breakaway Sports Cards", lat: 43.21737, lng: -79.99002, type:'TradingCard', address: "65 Wilson St W Unit 14, Ancaster, ON L9G 1N1", phone: '289-239-9544', website: "http://www.breakawaysc.com/" },
    {name:"Super Castle Video", lat: 43.23575, lng: -79.73709, type:'VideoGame', address: "221 Barton St Unit I, Stoney Creek, ON L8E 2K3", phone: '905-573-2773', website: "" },
    {name:"The Bard and Bear Games Cafe", lat: 43.26938, lng: -79.86636, type:'BoardGame', address: "237 James St N, Hamilton, ON L8R 2L2", phone: '905-523-0739', website: "https://www.thebardandbear.com/menu" },
    {name:"456 Sports Cards and Memorabilia", lat: 43.26288, lng: -79.987425, type:'TradingCard', address: "164 King St W, Hamilton, ON L8P 1A5", phone: '289-389-4477', website: "" }
];
const markers = [];
function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                if (userMarker) userMarker.setMap(null);
                const beachFlagImg = document.createElement("img");
                beachFlagImg.src =
                "./images/blue-dot.png";
                userMarker = new google.maps.marker.AdvancedMarkerElement({
                    position: userPos,
                    map: map,
                    content: beachFlagImg,
                    title: "Your Location",
                });

                map.setCenter(userPos);
            },
            () => alert("Geolocation failed.")
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}
function getMarker(option){
    clearMarkers();
    //markers.length = 0;
    let type = option;
    for (let i = 0; i < locations.length; i++)
    {
        const contentString =`
        <div id="content">
            <div id="siteNotice"></div>
            <h2 id="firstHeading" class="firstHeading">${locations[i].name}</h2>
            <div id="bodyContent">
                <p><b>Type:</b> ${locations[i].type}</p>
                <p><b>Address:</b> ${locations[i].address}</p>
                <p><b>Phone:</b> ${locations[i].phone}</p>
                <p><b>Website:</b> <a href="${locations[i].website}">${locations[i].website}</a></p>
                <button onclick="showRoute(${i})">Get Directions</button>
            </div>
        </div>`;
        if (type == "marker"){
            const marker = new google.maps.Marker({
                position: { lat: locations[i].lat, lng: locations[i].lng },
                map: map,
                title: locations[i].name,
                
            });
            let infoWindow = new google.maps.InfoWindow({
                content: contentString,
                ariaLabel: locations[i].name,
            });
            marker.addListener("click", () => {
                infoWindow.open({
                  anchor: marker
                });
            });
            markers.push(marker);


        }else {
            if (type == locations[i].type){
                const marker = new google.maps.Marker({
                    position: { lat: locations[i].lat, lng: locations[i].lng },
                    map: map,
                    title: locations[i].name,
                    
                });
                let infoWindow = new google.maps.InfoWindow({
                content: contentString,
                ariaLabel: locations[i].name,
            });
            marker.addListener("click", () => {
                infoWindow.open({
                  anchor: marker
                });
            });
                markers.push(marker);
            }
        }
    }
}
function showRoute(i) {
    if (!userPos.lat || !userPos.lng) {
        alert("Please find your location first.");
        return;
      }
    const start = userPos;
    const end = {lat:locations[i].lat, lng:locations[i].lng};
  
    directionsService
      .route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + e));
}
function TempMarker(latLng) {
    if (tMarker) {
      tMarker.setMap(null);
    }
    const redFlagImg = document.createElement("img");
    redFlagImg.src =
    "./images/red-flag.png";
    tMarker = new google.maps.Marker({
      position: latLng,
      content: redFlagImg,
      map: map,
      title: "Temporary Marker"
    });
  
    document.getElementById("lat").value = latLng.lat();
    document.getElementById("lng").value = latLng.lng();
    document.getElementById("markerForm").style.display = "block";
}
function addMarker() {
    if (!tMarker) {
      alert("Please double-click on the map to place a temporary marker first.");
      return;
    }
    document.getElementById("markerForm").style.display = "block";
  }
function saveMarker() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const website = document.getElementById("website").value;
    const type = document.getElementById("type").value;
    const lat = parseFloat(document.getElementById("lat").value);
    const lng = parseFloat(document.getElementById("lng").value);
  
    const redFlagImg = document.createElement("img");
    redFlagImg.src =
    "./images/red-flag.png";
    const newMarker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      content: redFlagImg,
      map: map,
      title: name
    });
  
    const contentString = `
      <div id="content">
        <div id="siteNotice"></div>
        <h1 id="firstHeading" class="firstHeading">${name}</h1>
        <div id="bodyContent">
          <p><b>Type:</b> ${type}</p>
          <p><b>Address:</b> ${address}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Website:</b> <a href="${website}">${website}</a></p>
        </div>
      </div>`;
  
    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: name,
    });
  
    newMarker.addListener("click", () => {
      infoWindow.open({
        anchor: newMarker,
        map,
      });
    });
  
    markers.push(newMarker);
    document.getElementById("markerForm").style.display = "none";
    tMarker.setMap(null);
    tMarker = null;
}
function clearMarkers(){
    for (let i = 0; i < markers.length; i++)
    {
        markers[i].setMap(null);
    }
}