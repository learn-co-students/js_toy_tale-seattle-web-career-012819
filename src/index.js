const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyCollection = document.getElementById("toy-collection");
const textboxName = document.getElementById("textbox-name");
const textboxImage = document.getElementById("textbox-image");
const newToyButton = document.getElementById("new-toy-button");
let addToy = false;

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

newToyButton.addEventListener("click", (ev) => {
  ev.preventDefault();

  let name = textboxName.value;
  let image = textboxImage.value;

  addNewToy(name, image);
})

fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(json => {
  addAllToToyCollection(json);
});

function addAllToToyCollection (toys) {
  for (const toy of toys) {
    makeToyCard(toy);
  }
}

function makeToyCard(toy) {
  let id = toy["id"];
  let name = toy["name"];
  let image = toy["image"];
  let likes = toy["likes"];

  let cardDiv = document.createElement("div");
  let cardH2 = document.createElement("h2");
  let cardImg = document.createElement("img");
  let cardP = document.createElement("p");
  let cardButton = document.createElement("button");

  cardButton.addEventListener("click", () => {
    likes = addLike(likes, cardP)
    updateDatabaseLikes(toy, likes)
  });

  cardDiv.className = "card";
  cardImg.className = "toy-avatar";
  cardButton.className = "like-btn";

  cardDiv.appendChild(cardH2);
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardP);
  cardDiv.appendChild(cardButton);

  cardH2.textContent = name;
  cardImg.setAttribute("src", image);
  cardP.textContent = `${likes} likes`;
  cardButton.textContent = "Like <3";

  toyCollection.appendChild(cardDiv);
}

function addLike(likes, cardP){
  likes++;
  cardP.textContent = `${likes} likes`;
  return likes
}

function updateDatabaseLikes(toy, likes){
  let data = {"likes": likes}

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
}

function addNewToy(name, image){
  let data = {
    "name": name,
    "image": image,
    "likes": 0
  }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(json => {
    makeToyCard(json);
  })
}
