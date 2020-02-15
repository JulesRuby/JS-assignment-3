//The root URL I will be using 
const baseURL = "https://pokeapi.co/api/v2/pokemon?limit=20"

//define which element to add my content to
const injectionTarget = document.querySelector('.poke-wrap')

//html syringe
let html =""

//declare url array

let firstResults = []

//declare endpoint and use it
let endPoint = null

//function to generate card data for an injection
function generateCards (name,id,sprite) {
  html = html +
  `<div class="card" onClick="window.location.href='dex.html?id=${id}'">
        <img class="poke-sprite" src="${sprite}" alt="${name}">
        <h4 class="index-no">${id}</h4>
        <h3 class="poke-name">${name}</h3>
      </div>`
}

function loopSequence() {
return new Promise ( resolve => {
  //create an array to store objects
  let disArray = []

  for(let index = 0; index < endPoint; index++) {
    let nextURL = firstResults[index].url
    fetch(nextURL)
    .then(response => response.json())
    .then(function(data2){
      console.log("hallo")
      let name = data2.name
      let id = data2.id
      let sprite = data2.sprites.front_default
      //push data to array
      disArray.push({name: name, id: id, sprite: sprite})
      //if this is the last step in the iteration, sort my data and resolve
      if(index === (endPoint - 1)) {
        disArray.sort((a, b) => (a.id > b.id) ? 1 : -1)
        resolve(disArray)
      }
    })
  }})
}
  
  
//Fetch the initial URL
function initialFetch(baseURL) {
  fetch(baseURL)
  .then(response => response.json())
  .then(function(data){
    console.log(data.results)
    firstResults = data.results
    //obtain endPoint for the iterating loop
    endPoint = firstResults.length
    
    loopSequence()
    .then(function(disArray){
      console.log("dick salad")
      for(let el of disArray) {
        // console.log(el)
        //pass array info into my cards
        generateCards(el.name,el.id,el.sprite)
      }
      //generate HTMl after
      injectionTarget.innerHTML = html
    })
  })
}
//call page population
initialFetch(baseURL)
