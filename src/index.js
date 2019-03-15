const addBtn = document.querySelector('#new-toy-btn')
const realToyForm = document.getElementsByClassName('add-toy-form')
const toyForm = document.querySelector('.container')
let addToy = false

const toysUrl = 'http://localhost:3000/toys'

window.onload = function() {getToys()};

function getToys () {
  fetch(toysUrl)
  .then(response => response.json())
  .then(json => {
    json.forEach((toy => {
      createToyCard(toy)
    }))
  })
}

function createToyCard(toy) {
  let div = document.getElementById('toy-collection')
  let card = document.createElement('div')
  card.className = 'card'

  let h2 = document.createElement('h2')
  h2.textContent = toy.name

  let img = document.createElement('img')
  img.className = 'toy-avatar'
  img.src = toy.image

  let p = document.createElement('p')
  p.textContent = toy.likes

  let button = document.createElement('button')
  button.className = 'like-btn'
  button.addEventListener('click', () => {
    increaseLikes(toy, card)
  })

  card.appendChild(h2)
  card.appendChild(img)
  card.appendChild(p)
  card.appendChild(button)
  div.appendChild(card)
}

function addNewToy() {
  let userToyInput = getUserToyInput()
  let jsonBody = JSON.stringify({
    'name': userToyInput.name,
    'image': userToyInput.image,
    'likes': 0
  })
  fetch(toysUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: jsonBody
  })
}

function getUserToyInput() {
  let name = document.getElementsByName('name')[0].value
  let image = document.getElementsByName('image')[0].value
  return newToy = {'name': name, 'image': image}
}

function increaseLikes(toy, card) {
  let toyId = toy.id
  let toyLikes = toy.likes + 1
  let TOY_URL = toysUrl + '/' + toyId
  let jsonBody = JSON.stringify({
    'likes': toyLikes
  })

  fetch(TOY_URL, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: jsonBody
  }).then(response => response.json())
  .then(json => {
    let p = card.getElementsByTagName('p')[0]
    p.textContent = toyLikes
  })
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

realToyForm[0].addEventListener('submit', () => {
  addNewToy()
})



// OR HERE!
