        
let map;
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
    {name:"Dark Fox TCG", lat: 43.23749, lng: -79.88335, type:"TradingCard" },
    {name:"Gamestop", lat: 43.22248, lng: -79.86138, type:"VideoGame" },
    {name:"Never Board Games Lounge", lat: 43.25226, lng: -79.84558, type:"BoardGame" },
    {name:"Top Games", lat: 43.23575, lng: -79.82773, type:"GameShop" },
    {name:"Mancala Monk Board Game Cafe", lat: 43.25626, lng: -79.82018, type:"BoardGame" },
    {name:"1UP Games", lat: 43.27076, lng: -79.89571, type:"VideoGame" },
    {name:"Black Knight Games", lat: 43.22575, lng: -79.82979, type:"GameShop" },
    {name:"Breakaway Sports Cards", lat: 43.23125, lng: -79.98772, type:"TradingCard" },
    {name:"Super Castle Video", lat: 43.23575, lng: -79.73709, type:"VideoGame" },
    {name:"The Bard and Bear Games Cafe", lat: 43.26938, lng: -79.86636, type:"BoardGame" },
    {name:"456 Sports Cards and Memorabilia", lat: 43.26288, lng: -79.987425, type:"TradingCard" }
];
function getLocation(){}
function getMarker(option){
    clearMarkers();
    let type = option;
    for (let i = 0; i < locations.length; i++)
    {
        if (type == "marker"){
            const marker = new google.maps.Marker({
                position: { lat: locations[i].lat, lng: locations[i].lng },
                map: map,
                title: locations[i].name,
                category: locations[i].type
            });
        }else {
            if (type == locations[i].type){
                const marker = new google.maps.Marker({
                    position: { lat: locations[i].lat, lng: locations[i].lng },
                    map: map,
                    title: locations[i].name,
                    category: locations[i].type
                });
            }
        }
    }
}
function clearMarkers(){
    for (let i = 0; i < locations.length; i++)
    {
        locations[i].setMap(null);
    }
}