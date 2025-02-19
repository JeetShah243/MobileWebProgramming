        
let map, infoWindow, userMarker;
function initMap()
{
  map = new google.maps.Map(document.getElementById("map"), 
    {center: { lat: 43.2387, lng: -79.8881 },
     zoom: 12,
     mapId: "MAP_ID_GOES_HERE"
  });
  getMarker("marker");
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
                let userPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                if (userMarker) userMarker.setMap(null);

                userMarker = new google.maps.marker.AdvancedMarkerElement({
                    position: userPos,
                    map: map,
                    icon: "./images/blue-dot.png",
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
    markers.length = 0;
    let type = option;
    for (let i = 0; i < locations.length; i++)
    {
        const contentString =`
        <div id="content">
            <div id="siteNotice"></div>
            <h1 id="firstHeading" class="firstHeading">${locations[i].name}</h1>
            <div id="bodyContent">
                <p><b>Type:</b> ${locations[i].type}</p>
                <p><b>Address:</b> ${locations[i].address}</p>
                <p><b>Phone:</b> ${locations[i].phone}</p>
                <p><b>Website:</b> <a href="${locations[i].website}">${locations[i].website}</a></p>
            </div>
        </div>`;
        if (type == "marker"){
            const marker = new google.maps.marker.AdvancedMarkerElement({
                position: { lat: locations[i].lat, lng: locations[i].lng },
                map: map,
                title: locations[i].name,
                category: locations[i].type
            });
            infoWindow = new google.maps.InfoWindow({
                content: contentString,
                ariaLabel: locations[i].name,
            });
            marker.addListener("click", () => {
                infoWindow.open({
                  anchor: marker,
                  map,
                });
            });
            markers.push(marker);


        }else {
            if (type == locations[i].type){
                const marker = new google.maps.marker.AdvancedMarkerElement({
                    position: { lat: locations[i].lat, lng: locations[i].lng },
                    map: map,
                    title: locations[i].name,
                    category: locations[i].type
                });
                infoWindow = new google.maps.InfoWindow({
                content: contentString,
                ariaLabel: locations[i].name,
            });
            marker.addListener("click", () => {
                infoWindow.open({
                  anchor: marker,
                  map,
                });
            });
                markers.push(marker);
            }
        }
    }
}
function clearMarkers(){
    for (let i = 0; i < markers.length; i++)
    {
        markers[i].setMap(null);
    }
}