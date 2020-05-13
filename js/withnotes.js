'use strict';

// Big goal: Render three images to the DOM
//  //  1. Create a constructor function
//  //  //  1a.Keys of filepath, name, alt, title, and push the instances into an array
//  //  //  1b. Create a global array to store object info
//  //  2. Select a random image from the array
//  //  //  2a. Utilize a helper function to generate a random number between zero and the length of the array.
//  //  //  2b. Render the object instances at their unique index positions to the DOM
//  //  //  3. Create another function responsible for making sure that the numbers dont repeat/ AKA images do not repeat themselves and are properly cycled through.
//  //  //  4. Create an event listener and handler responsible for when the user clicks/votes for a specific image to render 3 new images when the click is 'heard'.
//  //  //  5. Create a function to log views and votes on each image, *User only has 25 votes before voting is closed*


//1a. Create the constructor function/Object:
//This object is responsible for representing a single image that will be rendered to the DOM.
//(constructor function name: BusMallImage - parameters/keys will be "name" and "extension", to simplify. We can make the alt and title draw from the image's file name.
//  // By creating "this.votes/views" and setting the value to zero, we are beginning the process of a running count for each image to have total votes/views of zero (doing prep work for a later function to utilize and increment those values. Each image will ihave a unique vote/view count so it will need to be added.)
// adding the directive for a global array to be pushed up

//  //  //  //  //  //  //  //  //  //  //  //  //  //  //

var allBusMall = [];
var uniqueIndexArray = []; //3a.
var parentElement = document.getElementById('container');
//4ab. ^
var totalVotes = 0;
var names = [];
var votes = [];

// 1.Create a constructor function
function BusMallImage(name, extension){
  this.filepath = `images/${name}${extension}`; // 1a.
  this.alt = name;
  this.title = name;
  this.votes = 0;
  this.views = 0;
  allBusMall.push(this); // 1b. all info will be pushed into an array
}

// 4. Create a prototype function that renders the index we found in steps 2 & 3 to the document, with properties like alt and title.
//  //  4a. Append that image to the parent Element by:
//  //  //  4ab.Creating a global variable for the parent element (section)
//  //  //  4b. Appending the created index to the parent element (the section we added in the HTML)
BusMallImage.prototype.render = function(){

  var imageElement = document.createElement('img');
  imageElement.src = this.filepath;
  imageElement.alt = this.alt;
  imageElement.title = this.title;
  parentElement.appendChild(imageElement);
};

//1c. instances of our constructor v
new BusMallImage('bag', '.jpg');
new BusMallImage('banana', '.jpg');
new BusMallImage('bathroom', '.jpg');
new BusMallImage('boots', '.jpg');
new BusMallImage('breakfast', '.jpg');
new BusMallImage('bubblegum', '.jpg');
new BusMallImage('chair', '.jpg');
new BusMallImage('cthulhu', '.jpg');
new BusMallImage('dog-duck', '.jpg');
new BusMallImage('dragon', '.jpg');
new BusMallImage('pen', '.jpg');
new BusMallImage('pet-sweep', '.jpg');
new BusMallImage('scissors', '.jpg');
new BusMallImage('shark', '.jpg');
new BusMallImage('sweep', '.png');
new BusMallImage('tauntaun', '.jpg');
new BusMallImage('unicorn', '.jpg');
new BusMallImage('usb', '.gif');
new BusMallImage('water-can', '.jpg');
new BusMallImage('wine-glass', '.jpg');

//  2. Select a random image from the array
//  //  2a. Utilize a helper function to generate a random number between zero and the length of the array. You can test this by going into the console and running the function name with a max number.
//  //  2b. Create the function that will select the random number. It is going to:
//  //  //  //  Call the helper function to generate a random number (Call getRandomNumber)
//  //  //  //  Go through the length of the global array (allBusMall) we created that holds all of the instances of the BusMallImage object.
//  3. Create another function to make sure that the numbers/images do not repeat themselves.
//  //  3a. Create an empty array that responsible for holding only unique indexes. -->  var uniqueIndexArray = [];
//  //  3b. Create a while loop that utilizes the javascript method "includes", ( '.includes' will look into an array and tell you if that array includes a value.) to ensure that the index generated is unique and will push an index if it is unique.
//  //  3c. Once the array is more than 6 items long, we need to shift from the beginning. Use an 'if' statement to say that if the uniqueIndexArray is greater than 6, shift(remove from the beginning)
//  //  3d. Return the unique number in variable index.
//  //  3e. Move the uniqueIndexArray to a global spot so that each time the function getRandomIndex is run, it pushes to the same array that isn't changed each time you run the function.
//  4. Render the object instances at their unique index positions to the DOM

//2b.
function getRandomIndex(){

  var index = getRandomNumber(allBusMall.length);
  // 2b1 & 2b2 ^

  // 3b. v
  while(uniqueIndexArray.includes(index)){
    index = getRandomNumber(allBusMall.length);
  }

  uniqueIndexArray.push(index);
  // 3c. v
  if(uniqueIndexArray.length > 6){
    uniqueIndexArray.shift();
  }
  // 3d. v
  return index;
}




//2a.
// |
// v
function getRandomNumber(max){
  return Math.floor(Math.random() * max);
}

function displayImage(){
  var index = getRandomIndex();
  allBusMall[index].render();
}

//  //  //  4. Create an event listener and handler responsible for when the user clicks/votes for a specific image to render 3 new images when the click is 'heard'.
//  //  //  5. Create a function to log views and votes on each image, *User only has 25 votes before voting is closed*


function handleClick(event){
  // first - empty everything out
  parentElement.textContent = '';

  // figure out what was clicked
  var titleOfTheThingThatWasClickedOn = event.target.title;

  // loop through all of my object instance to compare titles so that I can find the one that was clicked on
  for(var i=0; i<allBusMall.length; i++){
    if(titleOfTheThingThatWasClickedOn === allBusMall[i].title){
      // when found, add a vote.
      allBusMall[i].votes++;
      totalVotes++;

      if(totalVotes === 25){
        // the event listener will be turned off after 25 clicks
        parentElement.removeEventListener('click', handleClick);
        makeNamesArray();
      }
    }
  }
  displayImage();
  displayImage();
  displayImage();
}

displayImage();
displayImage();
displayImage();

parentElement.addEventListener('click', handleClick);
function makeNamesArray(){
  for(var i=0; i<allBusMall.length; i++){
    names.push(allBusMall[i].title);
    votes.push(allBusMall[i].votes);
  }

  generateChart();
}

function generateChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

