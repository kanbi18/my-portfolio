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
    bookContainer.innerHTML = chosenbook;
 
}


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

function recommendation() {
  alert("This page is your way to give to me and others!");
};


function createBookList(text){
    const liElement = document.createElement("li");
    liElement.innerText = text;
    return liElement;
}

/** Shows the user the books in the datastore recommended by other users. */
function getNewBooks(){
    const range = document.getElementById("range").value;
    const url = (`/data/?range=${range}`);
    fetch(url).then(response => response.json()).then((books) => {
    console.log(books);
    const bookList = document.getElementById("new-recommendations");
    bookList.innerText = "";
    for(i = 0; i < books.length; i++){
        bookList.appendChild(createBookList(books[i]["title"] + " by " + books[i]["author"]));

    }
  })
}

/** Deletes the nulls in the datastore in the case that there happens to be any */
function deleteNulls(){
    fetch("/delete-data", {method: 'POST'});  
}

// Scripts for the blobstore API 

function fetchBlobstoreUrl() {
  fetch('/blobstore')
      .then((response) => {
        return response.text();
      })
      .then((imageUploadUrl) => {
        const messageForm = document.getElementById('image-form');
        messageForm.action = imageUploadUrl;
      });
}


function createImageList(source) {
    const imgElement = document.createElement("img");
    imgElement.src = source;
    return imgElement;
}

/** Shows the user the images in the datastore recommended by other users. */
function getAllImages() {
    fetch("/image").then(response => response.json()).then((images) => {
    console.log(images);
    const imageList = document.getElementById("all-images");
    imageList.innerText = "";
    for(i = 0; i < images.length; i++){
        imageList.appendChild(createImageList(images[i]["uploadUrl"]));
    }
  })
}

