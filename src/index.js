const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyCollection = document.querySelector('#toy-collection');
const actualToyForm = document.querySelector('.add-toy-form');
const TOY_URL = 'http://localhost:3000/toys'

let addToy = false

// YOUR CODE HERE
window.addEventListener('load', getToyFormData)

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  // addToy = !addToy
  toggleAddToyForm();
    // submit listener here
  
})

function getToyFormData() {
  console.log("on load");
  fetch(TOY_URL)
    .then(response => response.json())
    .then(json => {
      json.forEach(toy => {
        toyCollection.appendChild(buildToyCard(toy));
      })
    })
}



actualToyForm.addEventListener('submit', addToyEvent);

function addToyEvent(event) {
  event.preventDefault();
  toggleAddToyForm();
    
  const [name, imageUrl] = [].slice.call(event.target.querySelectorAll('.input-text'))
  buildNewToy(name.value, imageUrl.value);
}

function buildNewToy(name, imageUrl) {
  postToy(name, imageUrl)
  .then(response => response.json())
  .then(toy => {
    toyCollection.appendChild(buildToyCard(toy))
  });
}

function postToy(name, url) {
  const newToy = {
    name: name,
    image: url,
    likes: 0
  }
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  }
  return fetch(TOY_URL, config)
}




function buildToyCard(toy) {
  // <div class="card">
  //   <h2>Woody</h2>
  //   <img src=toy_image_url class="toy-avatar" />
  //   <p>4 Likes </p>
  //   <button class="like-btn">Like <3</button>
  // </div>
  
  const card = document.createElement('div');
  card.className = "card";

  const toyName = document.createElement('h2');
  toyName.textContent = toy.name;

  const image = document.createElement('img');
  image.src = toy.image;
  image.className = "toy-avatar";

  const likes = document.createElement('p');
  likes.textContent = `${toy.likes} Like(s)`;

  const likeButton = document.createElement('button');
  likeButton.textContent = "Like ";
  likeButton.className = "like-btn";
  likeButton.id = `${toy.id}-${toy.likes}`
  

  likeButton.addEventListener('click', patchToyEvent);

  card.appendChild(toyName);
  card.appendChild(image);
  card.appendChild(likes);
  card.appendChild(likeButton);

  return card;
}

function patchToyEvent(event) {
  let [id, likes] = event.srcElement.id.split('-')
  likes = Number(likes)
  patchToyLike(id, likes)
    .then(response => response.json())
    .then(json => event.srcElement.previousSibling.innerText = `${json.likes} Like(s)`)
    event.srcElement.disabled = true;
}

function patchToyLike(id, likes) {
  const patchToy = {
    likes: likes +1
  }
  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(patchToy)
  }
  return fetch(TOY_URL+'/'+id, config)
}

function toggleAddToyForm() {
  if (toyForm.style.display == "none") {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }    
}