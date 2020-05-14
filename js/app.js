'use strict';

var allBusMall = [];
var uniqueIndexArray = [];
var parentElement = document.getElementById('container');
var totalVotes = 0;
var names = [];
var votes = [];


function BusMallImage(name, extension){
  this.filepath = `images/${name}${extension}`;
  this.extension = extension;
  this.alt = name;
  this.title = name;
  this.votes = 0;
  this.views = 0;
  allBusMall.push(this);
}

BusMallImage.prototype.render = function(){

  var imageElement = document.createElement('img');
  imageElement.src = this.filepath;
  imageElement.alt = this.alt;
  imageElement.title = this.title;
  parentElement.appendChild(imageElement);
};

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

////////////////

var imagesFromLocalStorage = localStorage.getItem('images');
console.log('this is my images from Local Storage', imagesFromLocalStorage);

var imagesTurnedBackIntoJavaScript = JSON.parse(imagesFromLocalStorage);
console.log('my parsed images', imagesTurnedBackIntoJavaScript);

if(imagesTurnedBackIntoJavaScript !== null) {
  for(var i = 0; i < imagesTurnedBackIntoJavaScript.length; i++) {
    var newImage = new BusMallImage(imagesTurnedBackIntoJavaScript[i].title, imagesTurnedBackIntoJavaScript[i].extension);
    newImage.votes = imagesTurnedBackIntoJavaScript[i].votes;
    newImage.views = imagesTurnedBackIntoJavaScript[i].views;
  }
}
else {
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
}


////////////

function getRandomIndex(){

  var index = getRandomNumber(allBusMall.length);

  while(uniqueIndexArray.includes(index)){
    index = getRandomNumber(allBusMall.length);
  }

  uniqueIndexArray.push(index);

  if(uniqueIndexArray.length > 6){
    uniqueIndexArray.shift();
  }

  return index;
}



function getRandomNumber(max){
  return Math.floor(Math.random() * max);
}

function displayImage(){
  var index = getRandomIndex();
  allBusMall[index].render();
}


function handleClick(event){
  parentElement.textContent = '';

  var titleOfTheThingThatWasClickedOn = event.target.title;


  for(var i=0; i<allBusMall.length; i++){
    if(titleOfTheThingThatWasClickedOn === allBusMall[i].title){

      allBusMall[i].votes++;
      totalVotes++;

      if(totalVotes === 25){

        parentElement.removeEventListener('click', handleClick);
        makeNamesArray();
      }
    }
  }
  displayImage();
  displayImage();
  displayImage();

  var stringifiedImages = JSON.stringify(allBusMall);
  console.log('this is the JSON for the all images array', stringifiedImages);

  localStorage.setItem('images', stringifiedImages);

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
