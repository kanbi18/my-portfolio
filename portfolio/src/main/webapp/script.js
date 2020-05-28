

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
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];
 
  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
 
  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}
 
function sayRandomQuote(){
    const quotes = [
        "Elementary, my dear Watson",
        "You miss 100% of the shots you don't take." ,
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Do not go where the path may lead, go instead where there is no path and leave a trail." ,
        "Life is really simple, but we insist on making it complicated." ,
    ];
 
    const chosenQuote= quotes[Math.floor(Math.random() * quotes.length)];
 
    const quoteContainer = document.getElementById("quote-container");
    quoteContainer.innerHTML = chosenQuote;
 
}

let project = 0;
projects = ["This was my first ever python project. I used file handling and some basic data structures to store information from users who create accounts and then that information can later be accessed in order to gain entry into the system. Priority was also added to each user, on account creation, depending on the password strength so users with weaker passwords had access to less sensitive information.",
 "Game development is one of my stronger interests. So before I had learnt any OOLs, I used python to create the game: Draughts. Using the turtle module, I made the graphical representation of the board for the players to access. ", 
 "With the use of R, I worked with a partner and a manager to analyze various 2020 United States presidential debates with the aim of trying emotion to the particular sections of the speech from the information mined."];

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