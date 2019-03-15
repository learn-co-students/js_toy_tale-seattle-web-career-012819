const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
// global toy url
const TOYS_URL = 'http://localhost:3000/toys';
let addToy = false;

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

function fetchToy() {
	fetch(TOYS_URL)
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			json.forEach((toyObject) => {
				createToyCard(toyObject);
			});
		});
}

function createToyCard(toyObject) {
	// target toy collection
	let toyCollection = document.getElementById('toy-collection');
	// create toy card elements
	let card = document.createElement('div');
	card.className = 'card';
	//heading
	let toyName = document.createElement('h2');
	toyName.innerText = toyObject.name;
	//image
	let image = document.createElement('img');
	image.className = 'toy-avatar';
	image.src = toyObject.image;
	//likes
	let likes = document.createElement('p');
	likes.innerText = `${toyObject.likes} like(s)`;
	let likeButton = document.createElement('button');
	likeButton.className = 'like-button';
	likeButton.textContent = 'Like <3';
	//like button likes things
	likeButton.addEventListener('click', ()=>{
		toyObject.likes++;
		likes.innerText = `${toyObject.likes} like(s)`;
		patchLikeData(toyObject);
	});
	//append
	card.appendChild(toyName);
	card.appendChild(image);
	card.appendChild(likes);
	card.appendChild(likeButton);
	//append to toy collection
	toyCollection.appendChild(card);
}

function createNewToy(){
	const createToyForm = document.getElementsByClassName('add-toy-form')[0];
	createToyForm.addEventListener('submit', (event)=>{
		event.preventDefault();
		let newToyName = document.getElementById('toy-name').value
		let newToyUrl = document.getElementById('toy-url').value
		//front end validation
		if ((newToyUrl === "") || (newToyName === "")){
			alert("new toys need a name and an image url");
		}else{
			let newToy = {
				name: newToyName,
				image: newToyUrl,
				likes: 0
			};
			//create and persists toy
			sendToyData(newToy);
			createToyCard(newToy);
		}
	})
}

function sendToyData(toyObject) {
  return fetch(TOYS_URL,{
		method: "POST",
		headers:
		{
		  "Content-Type": "application/json",
		  Accept: "application/json"
		},
		body: JSON.stringify(toyObject)
	})
	.then((response)=>{
		return response.json();
	});
}

function patchLikeData(toyObject) {
  fetch(`${TOYS_URL}/${toyObject.id}`,{
		method: "PATCH",
		headers:
		{
		  "Content-Type": "application/json",
		  Accept: "application/json"
		},
		body: JSON.stringify(toyObject)
	});
}
createNewToy();
fetchToy();
