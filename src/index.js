const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyURL = "http://localhost:3000/toys";
const toyName = document.getElementsByName("name")[0];
const toyImage = document.getElementsByName("image")[0];
const addToyForm = document.querySelector(".add-toy-form");



// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    addToyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      fetch(toyURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": `${toyName.value}`,
          "image": `${toyImage.value}`,
          "likes": 0
        })
      })
      .then(results => {
        return results.json();
      })
      .then(json => {
        const createJson = [json];
        addNewToy(createJson);
      })
    });
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

fetch(toyURL)
.then(result => {
  return result.json();
})
.then(json => {
  addNewToy(json);
})

function addNewToy(data) {
  //Create Elements
  data.forEach((toy) => {
    const container = document.getElementById('toy-collection');
    const div = document.createElement('div');
    div.setAttribute('class', 'card');
    div.setAttribute('id', toy.id);
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
  
    //Increase Likes Event Listener
    likeButton.addEventListener('click', () => {
      addLike(toy);
    })
  })
  
}


function addLike(toy) {
  const body = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes++
    })
  }

  let p = document.getElementById(`${toy.id}`).querySelector('p');
  
  fetch(toyURL + `/${toy.id}`, body)
  .then(results => {
    return results.json();
  })
  .then(json => {
    p.innerText = `${json.likes} Likes`;
  })
}