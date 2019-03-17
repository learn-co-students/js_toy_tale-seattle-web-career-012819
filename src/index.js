const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const TOYURL = "http://localhost:3000/toys";

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


// OR HERE!

fetch(TOYURL)
.then(result => {
  return result.json();
})
.then(json => {
  addNewToy(json);
})

function addNewToy(data) {
  for (toy of data) {
    //Create Elements
    const container = document.getElementById('toy-collection');
    const div = document.createElement('div');
    div.setAttribute('class', 'card');
    const h2 = document.createElement('h2');
    h2.innerText = toy.name;
    const img = document.createElement('img');
    img.setAttribute('class', 'toy-avatar');
    img.src = toy.image;
    const p = document.createElement('p');
    p.innerText = `${toy.likes} Likes`;
    const likeButton = document.createElement('button');
    likeButton.setAttribute('class', 'like-btn');
    likeButton.innerText = "Like <3";

    //Append Elements
    container.appendChild(div);
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(likeButton);
  }
}