// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// script for index.html

/**
 * Gives the user a random book recommendation.
 */

 
function sayRandomBook(){
    const books = [
        "Jane Eyre", "1984","Don Quixote", "The Great Gatsby", "Harry Potter and the Philosopher's Stone",
        "War and Peace", "The Alchemist", "The Lord of the Rings", "Things Fall Apart", "Lord of the Flies", "Animal Farm",
        "The Lion, The Witch, and the Wardrobe","Percy Jackson and the Lightning Thief", "Honor among thieves", "Summer Nights at the Midnight Hotel", "It", "The Hound of the Baskervilles",
    ];
 
    const chosenBook= books[Math.floor(Math.random() * books.length)];
 
    const bookContainer = document.getElementById("book-container");
    bookContainer.innerHTML = chosenBook;
 
}

/**
 * Adds a new project name, info and picture everytime the equivalent button is clicked.
 */

let project = 0;
const projects = ["This was my first ever python project. I used file handling and some basic data structures to store information from users who create accounts and then that information can later be accessed in order to gain entry into the system. Priority was also added to each user, on account creation, depending on the password strength so users with weaker passwords had access to less sensitive information.",
 "Game development is one of my stronger interests. So before I had learnt any OOLs, I used python to create the game: Draughts. Using the turtle module, I made the graphical representation of the board for the players to access. ", 
 "With the use of R, I worked with a partner and a manager to analyze various 2020 United States presidential debates with the aim of tying emotion to the particular sections of the speech from the information mined."];

function first(){
  document.getElementById("project").innerHTML = projects[0];
  document.getElementById("project-name").innerHTML = "Login System";
  image = document.getElementById("project-image");
  image.src = "/images/lock.jpg";
}

function second(){
  document.getElementById("project").innerHTML = projects[1];
  document.getElementById("project-name").innerHTML = "Draughts";
  image = document.getElementById("project-image");
  image.src = "/images/board.jpg";
}

function third(){
  document.getElementById("project").innerHTML = projects[2];
  document.getElementById("project-name").innerHTML = "Sentiment Analysis";
  image = document.getElementById("project-image");
  image.src = "/images/emotion.jpg";
}

/**
 * Alerting user of resume information
 */

function resume(){
  alert("Coming Soon...Check out my LinkedIn profile for now");
};

// script for recommendations.html

function pickForm(){
    const bookContainer = document.getElementById("book-recommendations");
    const imageContainer = document.getElementById("image-container");

    let chosenForm = document.getElementById("forms")
    if(chosenForm.value === "book") {
        bookContainer.style.visibility = "visible";
        imageContainer.style.visibility = "hidden";

    }else if(chosenForm.value === "image") {
        bookContainer.style.visibility = "hidden";
        imageContainer.style.visibility = "visible";
        fetchBlobstoreUrl();
    }
}

function getRecommendedBook(){
    fetch("/data").then(response => response.json()).then((book) => {
        console.log("Yktv");
        const foodList = document.getElementById("book-container");
        foodList.innerText="";
        foodList.appendChild(createFoodList("Title: " + book[0]));
        foodList.appendChild(createFoodList("Author: "  + book[1]));
        foodList.appendChild(createFoodList("Upvotes: " + book[2]));
        foodList.appendChild(createFoodList("Downvotes: " + book[3]));
    })
}

function createFoodList(text){
    const liElement = document.createElement("li");
    liElement.innerText = text;
    return liElement;
}

/** Shows the user the books in the datastore recommended by other users. */
function getNewBooks(){
    fetch("/data").then(response => response.json()).then((books) => {
    console.log(books);
    const bookList = document.getElementById("new-recommendations");
    bookList.innerText = "";
    for(i = 0; i < books.length; i++){
        bookList.appendChild(createFoodList(books[i]["title"] + " by " + books[i]["author"]));
    }
  })
}

/** Deletes the nulls in the datastore in the case that there happens to be any */
function deleteNulls(){
    fetch("/delete-data", {method: 'POST'});  
}

// Scripts for the blobstore API 

function fetchBlobstoreUrl() {
  	fetch("/blobstore")
        .then((response) => {
            return response.text();
        })
        .then((imageUploadUrl) => {
            const messageForm = document.getElementById('my-form');
            messageForm.action = imageUploadUrl;
        });
}


/* Editable marker that displays when a user clicks in the map. */
let editMarker;

/** Creates a map and adds it to the page. */
var map;

function createMap() {
    eiffelTower = {lat: 48.8539173,lng: 2.2957289};
    cristo = {lat: -22.951911,lng: -43.2126759,};
    buckingham= {lat: 51.5013673,lng: -0.1440787};

    map = new google.maps.Map(document.getElementById("map"), {
        center: eiffelTower,
        zoom: 10,
        });

    const centreMark = new google.maps.Location({position: eiffelTower, map: map, title: 'My gift to Paris'});
    const wonderOne = new google.maps.Location({position: cristo, map: map, title: 'Christ the Redeemer'});
    const wonderTwo = new google.maps.Location({position: buckingham, map: map, title: 'Home of Royalty'});

    // When the user clicks in the map, show a marker with a text box the user can
    // edit.
    map.addListener('click', (event) => {
    createLocationForEdit(event.latLng.lat(), event.latLng.lng());
});

  fetchLocations();
}

/** Fetches locations from the backend and adds them to the map. */
function fetchLocations() {
  fetch('/location').then(response => response.json()).then((location) => {
    location.forEach(
        (location) => {
            createLocationForDisplay(location.lat, location.lng, location.content)});
  });
}

/** Creates a location that shows a read-only info window when clicked. */
function createLocationForDisplay(lat, lng, content) {
  const location =
      new google.maps.Location({position: {lat: lat, lng: lng}, map: map});

  const infoWindow = new google.maps.InfoWindow({content: content});
  location.addListener('click', () => {
    infoWindow.open(map, location);
  });
}

/** Sends a location to the backend for saving. */
function postLocation(lat, lng, content) {
  const params = new URLSearchParams();
  params.append('lat', lat);
  params.append('lng', lng);
  params.append('content', content);

  fetch('/location', {method: 'POST', body: params});
}

/** Creates a location that shows a textbox the user can edit. */
function createLocationForEdit(lat, lng) {
  // If we're already showing an editable location, then remove it.
  if (editLocation) {
    editLocation.setMap(null);
  }

  editLocation =
      new google.maps.Location({position: {lat: lat, lng: lng}, map: map});

  const infoWindow =
      new google.maps.InfoWindow({content: buildInfoWindowInput(lat, lng)});

  // When the user closes the editable info window, remove the location.
  google.maps.event.addListener(infoWindow, 'closeclick', () => {
    editLocation.setMap(null);
  });

  infoWindow.open(map, editLocation);
}

/**
 * Builds and returns HTML elements that show an editable textbox and a submit
 * button.
 */
function buildInfoWindowInput(lat, lng) {
  const textBox = document.createElement('textarea');
  const button = document.createElement('button');
  button.appendChild(document.createTextNode('Submit'));

  button.onclick = () => {
    postLocation(lat, lng, textBox.value);
    createLocationForDisplay(lat, lng, textBox.value);
    editLocation.setMap(null);
  };

  const containerDiv = document.createElement('div');
  containerDiv.appendChild(textBox);
  containerDiv.appendChild(document.createElement('br'));
  containerDiv.appendChild(button);

  return containerDiv;
}
