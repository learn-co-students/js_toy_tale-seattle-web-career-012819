const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
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

// <div class="card">
//     <h2>Woody</h2>
//     <img src=toy_image_url class="toy-avatar" />
//     <p>4 Likes </p>
//     <button class="like-btn">Like <3</button>
//   </div>

// OR HERE!
const toyCollection = document.getElementById("toy-collection");
const TOY_URL = "http://localhost:3000/toys";

fetch(TOY_URL)
.then(resp => resp.json())
.then(toy =>{
  toy.forEach(newToy =>{
    createToy(newToy);
  })

})

function createToy(toy){
  const toyDiv = document.createElement("div");
  toyDiv.classList.add("card");
  const toyName = document.createElement("h2");
  const toyImg = document.createElement("img");
  toyImg.classList.add("toy-avatar");
  const toyLike = document.createElement("p");
  const toyLikeButton = document.createElement("button");
  const deleteToy = document.createElement("button");
  deleteToy.textContent="Delete it";
  toyName.textContent = `Name: ${toy.name}`;
  toyImg.src = toy.image;
  toyLike.textContent = `Likes: ${toy.likes}`;
  toyLikeButton.textContent = `Like it!`;

  deleteToy.addEventListener('click', ()=>{

    fetch(TOY_URL +`/${toy.id}`,{
      method: "DELETE",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: toy.id})
    })
    toyDiv.remove();
  })
  toyDiv.appendChild(toyImg);
  toyDiv.appendChild(toyName);
  toyDiv.appendChild(toyLike);
  toyDiv.appendChild(toyLikeButton);
  toyDiv.appendChild(deleteToy);
  toyCollection.appendChild(toyDiv);




  //**************************************************
  toyLikeButton.addEventListener('click', ()=>{
    toy.likes ++;
    fetch(TOY_URL + `/${toy.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({likes: toy.likes})
    })
    .then(resp => resp.json())
    .then(toy =>{
      toyLike.textContent = `Likes: ${toy.likes}`;
    })
  })
}

const addToyForm = document.getElementsByClassName("add-toy-form")[0];
const nameInput = document.getElementsByClassName("input-text")[0];
const urlInput = document.getElementsByClassName("input-text")[1];
addToyForm.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  fetch(TOY_URL, {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({name: nameInput.value, image: urlInput.value, likes: 0})
  })
  .then(resp => resp.json())
  .then(newToy =>{
    createToy(newToy);
  })
})
