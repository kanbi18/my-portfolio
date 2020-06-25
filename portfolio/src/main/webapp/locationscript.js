// scripts for locations.html

function pageInfo(){
  alert("This page includes places on my bucket list! And....");
};

/** Creates a map and adds it to the page. */
var map;

function createMap() {
    eiffelTower = {lat: 48.8539173, lng: 2.2957289};
    cristo = {lat: -22.951911, lng: -43.2126759,};
    buckingham= {lat: 51.5013673, lng: -0.1440787};
    macchuPicchu = {lat: -13.1631412, lng: -72.5449629};
    greatWallOfChina = {lat: 40.4319118, lng: 116.5681862};
    gizaPyramid = {lat: 29.9792391, lng: 31.1320132};
    babylonGarden = {lat: 36.1692233, lng: -86.7899747};
    artemisTemple = {lat: 37.9493622,lng: 27.3627619};
    petraJordan = {lat: 30.3206451,lng: 35.4744003};


    map = new google.maps.Map(document.getElementById("map"), {center: eiffelTower, zoom: 10,});
    marker.addListener('click', toggleBounce);

    const centreMark = new google.maps.Marker({position: eiffelTower, map: map, title: 'My gift to Paris', animation: google.maps.Animation.DROP});
    const wonderOne = new google.maps.Marker({position: cristo, map: map, title: 'Christ the Redeemer', animation: google.maps.Animation.BOUNCE});
    const wonderTwo = new google.maps.Marker({position: buckingham, map: map, title: 'Home of Royalty', animation: google.maps.Animation.DROP});
    const wonderThree = new google.maps.Marker({position: macchuPicchu, map: map, title: 'Aliens created this', animation: google.maps.Animation.BOUNCE});
    const wonderFour = new google.maps.Marker({position: greatWallOfChina, map: map, title: 'This wall is bigger than your average wall', animation: google.maps.Animation.DROP});
    const wonderFive = new google.maps.Marker({position: babylonGarden, map: map, title: 'The gardens do be hanging', animation: google.maps.Animation.BOUNCE});
    const wonderSix = new google.maps.Marker({position: gizaPyramid, map: map, title: 'Ancient Nubia Legacy', animation: google.maps.Animation.DROP});
    const wonderSeven = new google.maps.Marker({position: artemisTemple, map: map, title: 'Temple of the coolest Greek god', animation: google.maps.Animation.BOUNCE});
    const WonderEight = new google.maps.Marker({position: petraJordan, map: map, title: 'Petra', animation: google.maps.Animation.DROP});
}

