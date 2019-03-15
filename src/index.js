const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


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


  cardDiv.appendChild(h2)
  cardDiv.appendChild(img)
  cardDiv.appendChild(p)
  cardDiv.appendChild(button)
  toys.appendChild(cardDiv)
}

