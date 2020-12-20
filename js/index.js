const url = "http://localhost:3000/monsters"
const urlOne = "http://localhost:3000/monsters?_limit=50&_page="
const urlTwo = "http://localhost:3000/monsters?_limit=50&_page=2"
//***** DOM Element *******

const monContainer = document.querySelector('div#monster-container')
const newMonForm = document.querySelector('form#new-monster-form')
const btnFwd = document.querySelector('button#forward')
let pageNum = 1
const btnBack = document.querySelector('button#back')

//*****EVENT Handlers*******

newMonForm.addEventListener('submit', function(event) {
    event.preventDefault()
    const name = newMonForm.name.value 
    const age = newMonForm.age.value 
    const description = newMonForm.description.value 

    const newMonObj = {
        name: name, 
        age: age,
        description: description
    }

    createMonster(newMonObj)
})

btnFwd.addEventListener('click', function(event) {
    nextPage()
    })

btnBack.addEventListener('click', function(event) {
    backPage()
})

//******Render Functions******

function renderMonster(monsterObj) {
    
    let div = document.createElement('div')
    div.classList.add('monster-card')
    div.dataset.id = monsterObj.id 
    div.innerHTML = `
    <h1 class="name">${monsterObj.name}</h1>
    <p class="age">
        Age: ${monsterObj.age}
      </p>
      <p class="description">${monsterObj.description}</p>
      `
      monContainer.append(div)
}
//*****Fetch Functions *******

function nextPage() {
    pageNum ++
    renderPage()
}

function backPage() {
    pageNum --
    renderPage()
}

function getMonsters() {
    fetch(`${urlOne}${pageNum}`)
    .then(r => r.json())
    .then(monstersArray => {
        monstersArray.forEach(monsterObj => {
            renderMonster(monsterObj)
        })
})
}

function createMonster(monsterObj) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(monsterObj),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}

function renderPage() {
    fetch(`${url}/${pageNum}`)
.then(response => response.json())
.then(data => getMonsters(data))
}
//******Initial Render ******

// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.

getMonsters()