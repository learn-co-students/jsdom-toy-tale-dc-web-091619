let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  renderAllToys();
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {

      toyForm.style.display = 'block'
      let form = document.querySelector(".add-toy-form");
      form.addEventListener("submit", submitToyForm);
    } else {
      toyForm.style.display = 'none'
    }
  })

})

function attachingCards(toy){
  let container = document.getElementById("toy-collection");
  
  let toyCard = document.createElement('div');
  toyCard.id = `toy-${toy.id}`;
  toyCard.classList.add("card");


  let h2 = document.createElement('h2');
  h2.innerText = toy.name;

  let img = document.createElement('img');
  img.classList.add("toy-avatar");
  img.src = toy.image;
  
  let p = document.createElement('p');
  p.innerText = `${toy.likes} Likes`;
  
  let button = document.createElement('button');
  button.innerText = "Like"
  button.classList.add('like-btn');

  toyCard.appendChild(h2);
  toyCard.appendChild(img);
  toyCard.appendChild(p);
  toyCard.appendChild(button);
  container.appendChild(toyCard);
}

function renderAllToys(){

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
      .then(toyArray => toyArray.forEach(function(toy){
  
       attachingCards(toy)
  
       let button = document.querySelectorAll(".like-btn");
       // debugger
       button.forEach(function(element){
         element.addEventListener("click", updateLikes)
       })

      })
    )
}

function submitToyForm(event){
  event.preventDefault();
  console.log("You made it!")
  let name = document.getElementById("name-input").value;
  let url = document.getElementById("url-image").value;
  addAnotherToy(name, url);
}

function addAnotherToy(name, image){
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name,
      image,
      likes: 0
    })
  })
  .then(response => response.json())
    .then(function(toy){
      attachingCards(toy)

      let button = document.querySelectorAll(".like-btn");
      // debugger
      button.forEach(function(element){
        element.addEventListener("click", updateLikes)
      })
    })

      .catch(() => alert("Error with Server"))
}

function updateLikes(){
  console.log("Updating likes");
  let id = event.target.parentNode.id.split("-")[1];
  let like = event.target.previousElementSibling
  let likeCount = parseInt(event.target.previousElementSibling.innerText)
  like.innerText = `${++likeCount} Likes`

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": likeCount
    })
  })
}