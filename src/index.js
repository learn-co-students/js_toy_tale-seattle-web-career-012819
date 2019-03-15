const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const newToyForm = document.querySelector(".add-toy-form")
let addToy = false;

// YOUR CODE HERE

document.addEventListener("DOMContentLoaded", () => {
  const toyList = document.getElementById("toy-collection");
  const toyDiv = document.createElement("div")

  fetch("http://localhost:3000/toys")
    .then(result => {
      return result.json()
    })
    .then((toyJson) => {
      toyJson.forEach((toy) => {
        new Toy(toy);
        const allToysHTML = Toy.all
          .map((toy) => {
            return toy.toyCard()
          })
          .join("")
        toyList.innerHTML = allToysHTML;

      })
    })

  newToyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const toyNameInput = document.getElementById("new-toy-name").value
    const toyUrlInput = document.getElementById("new-toy-url").value
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyNameInput,
        image: toyUrlInput,
        likes: 0
      })
    })
      .then(request => request.json())
      .then(toyJson => {
        const newToy = new Toy(toyJson)
        toyList.innerHTML += newToy.toyCard()
      })
    event.target.reset()
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      // submit listener here
    } else {
      toyForm.style.display = "none";
    }
  })

});

function userLike(button) {
  const toyObj = Toy.all.find((toy) => {
    return toy.name == button.id
  })

  let toyLikes = toyObj.likes
  toyLikes++

  const numLikes = document.getElementById(`${button.id}`)
  numLikes.innerText = ((parseInt(numLikes.innerText)) + 1) + " Likes"
  console.log("likes updating?", numLikes)

  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {
        "likes": toyLikes
      })

  })
}






