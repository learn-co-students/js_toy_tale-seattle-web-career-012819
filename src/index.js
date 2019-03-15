const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyCollection = document.getElementById("toy-collection");
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


//ask tcf about structure/contents of response
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