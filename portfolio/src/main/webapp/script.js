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
