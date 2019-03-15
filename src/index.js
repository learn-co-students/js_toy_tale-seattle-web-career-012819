window.addEventListener('load', main);

const BASEURL = 'http://localhost:3000/toys';

const toyCollection = document.getElementById('toy-collection');
const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const addToyForm = document.getElementById('add-toy-form-id');
let addToy = false;
let TOYSARRAY = [];

function main() {
	fetch(BASEURL)
		.then((result) => {
			return result.json();
		})
		.then((json) => {
			TOYSARRAY = json;
			renderToys(TOYSARRAY);
		});
}

let renderToys = (toys) => {
	toys.forEach((toy) => {
		let div = createToyDiv(toy);
		toyCollection.appendChild(div);
	});
};

function createToyDiv(toy) {
	let div = document.createElement('div');
	let h2 = document.createElement('h2');
	let img = document.createElement('img');
	let p = document.createElement('p');
	let likeButton = document.createElement('button');
	likeButton.toyID = `${toy.id}`;

	likeButton.addEventListener('click', likeDisToy);

	h2.textContent = toy.name;
	img.src = toy.image;
	p.textContent = `${toy.likes} Likes`;
	likeButton.className = 'like-btn';
	img.className = 'toy-avatar';
	div.className = 'card';
	likeButton.textContent = 'Like';

	div.appendChild(h2);
	div.appendChild(img);
	div.appendChild(p);
	div.appendChild(likeButton);

	return div;
}

function likeDisToy(event) {
	// increase the p likes
	let paragraphObject = event.target.parentNode.querySelector('p');
	let pLikesArray = paragraphObject.textContent.split(' ');
	let newLikes = parseInt(pLikesArray[0]) + 1;
	let toyID = event.target.toyID;

	fetch(BASEURL + '/' + `${toyID}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			likes: `${newLikes}`
		})
	}).then((result) => {
		paragraphObject.textContent = `${newLikes} Likes`;
	});
}

// get toy collection DONE
// iterate through array
// create div
// attach div elements
// attach div to toy collection

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

addToyForm.addEventListener('submit', (event) => {
	let nameInput = event.target.querySelector('input[name="name"]').value;
	let imageInput = event.target.querySelector('input[name="image"]').value;
	createNewToy(nameInput, imageInput);
});

function createNewToy(name, imageURL) {
	return fetch(BASEURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			name: `${name}`,
			image: `${imageURL}`,
			likes: '0'
		})
	})
		.then((result) => {
			return result.json();
		})
		.then((json) => {
			createToyDiv(json);
		});
}

// OR HERE!
