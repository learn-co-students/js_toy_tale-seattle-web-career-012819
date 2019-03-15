const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let form = document.getElementById('toy-form');
let addToy = false;
const TOYS = 'http://localhost:3000/toys';


// YOUR CODE HERE

addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
        toyForm.style.display = 'block';
        // submit listener here
    } else {
        toyForm.style.display = 'none';
    }
});

window.addEventListener('load', getToys());

function getToys() {
    fetch(TOYS).then((response) => response.json()).then((json) =>
        json.forEach((toy) => {
            createToyCard(toy);
        })
    );
}

function createToyCard(toy) {
    let toys = document.getElementById('toy-collection');
    let card = document.createElement('div');
    card.id = toy.id;
    card.className = 'card';

    let name = document.createElement('h2');
    name.textContent = toy.name;

    let img = document.createElement('img');
    img.className = 'toy-avatar';
    img.src = toy.image;

    let likes = document.createElement('p');
    likes.textContent = `${toy.likes} Likes`;
    likes.id = 'like-count';

    let likeButton = document.createElement('button');
    likeButton.className = 'like-btn';
    likeButton.textContent = 'Like <3';
    likeButton.onclick = (e) => {
        toy.likes++;
        console.log(toy.likes);
    };
    toys.appendChild(card);
    card.appendChild(name);
    card.appendChild(img);
    card.appendChild(likes);
    card.appendChild(likeButton);

    likeButton.addEventListener('click',(event) => {
       fetch(`${TOYS}/${toy.id}`, {
           method: 'PATCH',
           headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
           body: JSON.stringify({"likes": `${toy.likes}`})
       })
       .then(response => response.json())
       .then(json => {
          toy.likes = json["likes"]
          likes.textContent = `${toy.likes} Likes`
      })
   })
}

form.addEventListener('submit',(event) => {
   event.preventDefault();
    let newToyName = form[0].value;
    let newToyUrl = form[1].value;
    let toy = {
        name: newToyName,
        image: newToyUrl,
        likes: 0
    };
    createToyCard(toy);
    fetch(TOYS, {
        method: 'post',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(toy)
    })
    .then(response => response.json())
    .then(json => console.log(json))
})
