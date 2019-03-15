const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', function(event) {
      event.preventDefault();
      fetchNewToy();
      toyForm.style.display = 'none'
    })
  } else {
    toyForm.style.display = 'none'
  }
})

const toys = document.getElementById('toy-collection')
const TOYS_URL = "http://localhost:3000/toys"
let toyData = []

fetch(TOYS_URL)
  .then(response => response.json())
  .then(json => {
    toyData = json
    toyData.forEach(function(toy) {
      createToyCard(toy)
    })
  })

function createToyCard(data){
  let cardDiv = document.createElement('div')
  cardDiv.className = "card"

  let h2 = document.createElement('h2')
  h2.innerText = data.name

  let img = document.createElement('img')
  img.className = "toy-avatar"
  img.setAttribute('src', data.image)

  let p = document.createElement('p')
  p.innerText = `${data.likes} Likes`

  let button = document.createElement('button')
  button.className = 'like-btn'
  button.innerText = "Like <3"
  button.addEventListener("click", () => (incrementLikes(data)))


  toys.appendChild(cardDiv)
  cardDiv.appendChild(h2)
  cardDiv.appendChild(img)
  cardDiv.appendChild(p)
  cardDiv.appendChild(button)
}

function fetchNewToy() {
  let formKids = document.querySelectorAll('.add-toy-form input')
  let body = {'likes': 0}

  for (kid of formKids) {
    if (kid.name != 'submit')
      body[kid.name] = kid.value
  }

  let bodyJSON = JSON.stringify(body)

  fetch(TOYS_URL,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: bodyJSON
  })
    .then(response => response.json())
    .then(json => createToyCard(json))
}

function incrementLikes(toy) {
  let body = {likes: toy.likes += 1}
  let bodyJSON = JSON.stringify(body)
  
  fetch(TOYS_URL + "/" + toy.id, {
    method: "PATCH",
    headers: {"Content-Type": 'application/json',
    Accept: "application/json"},
    body: bodyJSON
  })
}