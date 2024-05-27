let kittens = []


/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Confused",
    affection: 3, 
    img: 'cat-7563332_1280.png',
  }

  findKittenByName(kitten.name)
  kittens.push(kitten)
  saveKittens()
  form.reset()
  document.getElementById('addKitten')?.classList.toggle("hidden")
}

function findKittenByName(name) {
  let cat = kittens.find(kittens => kittens.name == name)
  if (cat != undefined){
    throw new Error("Invalid Kitten Name")
  }
  return(cat)

}

function showKittenForm() {
  document.getElementById('addKitten')?.classList.toggle("hidden")
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if(storedKittens) {
    kittens = storedKittens
  }
  drawKittens()
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenListElement = document.getElementById("kittens")
  let kittenMoodElement = document.getElementById("kittens")
  
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    kittensTemplate += `
    
    <div id="kitten" class="d-flex align-items-center flex-wrap "jersey-15-regular"">
    <img id="kittenPicture" src="cat-7563332_1280.png" height="200" alt="Moody Kittens">
    </div>
    
    <div>
      <p class="catName jersey-15-regular">${kitten.name}</p>
      <b class="jersey-15-regular">Mood: ${kitten.mood}  </b>
      <p id="affectionCount" class="jersey-15-regular">Affection: ${kitten.affection}  </p>
      <input type="button" class="button jersey-15-regular" : hover : focus value="PET" onclick="pet('${kitten.id}')">
      <input type="button" class="button jersey-15-regular" : hover : focus  value="Give Catnip" onclick="catnip('${kitten.id}')">
    </div>
    
    `
  })
  kittenListElement.innerHTML = kittensTemplate
 
  
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  let cat = kittens.find(kittens => kittens.id == id)
  if (cat == -1){
    throw new Error("Invalid Kitten Id")
  }
  return(cat)
  saveKittens()
  
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let kitten = findKittenById(id)
  
  if(Math.random() >= 0.5){
    kitten.affection ++
  }else{
    kitten.affection -= 1
  }
  drawKittens()
setKittenMood(kitten)
//changeKittenPicture(kitten)

console.log(kitten)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  kitten.mood = "Tolerant"
  kitten.affection = 5
  drawKittens()
  setKittenMood(kitten)
  //changeKittenPicture(kitten)
  console.log(kitten)
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if(kitten.affection >= 5){
    kitten.mood = "Happy"
    let image = document.getElementById('kittenPicture')
    image.src = 'cat-7563332_1280.png'
  }else{
    kitten.mood = "Annoyed"
    let image = document.getElementById('kittenPicture')
    image.src = 'b6cca355c8343e0cb7b3c80ba0e04ff4.jpg'
}
}








function changeKittenPicture(kitten){
  
  if(kitten.affection <= 5){
    let img = document.getElementById('kittenPicture')
    img = "b6cca355c8343e0cb7b3c80ba0e04ff4.jpg"
    drawKittens()
  }
  
  saveKittens()
}




/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  document.getElementById('clearKittens')
  kittens.splice(0, kittens.length)
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
  document.getElementById('welcome')?.classList.toggle("hidden")
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens()
drawKittens()
