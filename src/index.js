const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const submitToyBtn = document.querySelector(".add-toy-form")
let addToy = false

// YOUR CODE HERE

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

document.addEventListener("DOMContentLoaded", fetchToys)
submitToyBtn.addEventListener('submit', addNewToy)

function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => {
    json.forEach(toy => {
      appendToy(toy);
    })
  })
}

function addLike(e, toy){
  let newAmountOfLikes = toy.likes + 1
  let newLikesBody = {
    'likes': (newAmountOfLikes)
  }

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newLikesBody)
  }).then(document.querySelector(`[like-id="${toy.id}"]`).textContent = `${newAmountOfLikes} Likes` )
}


function addNewToy(e){
  e.preventDefault()
  let inputBox = document.getElementsByClassName('input-text')
  let fetchBody = {
    name: `${inputBox[0].value}`,
    image: `${inputBox[1].value}`,
    likes: 0
  }
  fetch('http://localhost:3000/toys',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(fetchBody)

  }).then(response => response.json())
    .then(json => {
      appendToy(json)
  })

}

function appendToy(toy){
  let mainDiv = document.createElement('div');
  mainDiv.setAttribute('data-id', toy.id)
  mainDiv.className = 'card';

  let heading = document.createElement('h2');
  heading.textContent = toy.name;
  mainDiv.appendChild(heading)

  let toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.className = 'toy-avatar'
  mainDiv.appendChild(toyImage)

  let paragraph = document.createElement('p')
  paragraph.textContent = `${toy.likes} Likes`;
  paragraph.setAttribute("like-id", toy.id)
  mainDiv.appendChild(paragraph)

  let toyButton = document.createElement('button');
  toyButton.textContent = "Like <3";
  toyButton.className = "like-btn";
  mainDiv.appendChild(toyButton);

  toyButton.addEventListener('click', function(e){
    e.preventDefault();
    addLike(e, toy);
  })

  document.getElementById('toy-collection').appendChild(mainDiv)

}



// OR HERE!
