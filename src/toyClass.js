class Toy {
  constructor(toyJson) {
    this.id = toyJson.id;
    this.name = toyJson.name;
    this.image = toyJson.image;
    this.likes = toyJson.likes;
    Toy.all.push(this);
  }

  toyCard() {
    return `<div class="card">
    <h2>${this.name}</h2>
    <img src=${this.image} class="toy-avatar" />
    <p id ="${this.name}"> ${this.likes} Likes</p>
    <button id ="${this.name}" class="like-btn" onclick="userLike(this)">Like <3</button>
  </div>`;
  }
}
Toy.all = []
