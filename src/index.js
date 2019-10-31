let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  fetchToys();
  getForm().addEventListener("submit", submitHandler)
});



function submitHandler(e) {
  e.preventDefault()
  postToy()
  getForm().reset()
}

function patchLike(event) {
  let currentLikes = event.target.previousSibling.innerText
  let newLikes = parseInt(currentLikes)
  newLikes += 1
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": newLikes
    })
  })
}

function getForm() {
  return document.querySelector('.add-toy-form')
}

function postToy() {
  let data = {"name": getForm()[0].value, "image": getForm()[1].value}
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
  .then(data => renderToys(data))
}

function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then( response => response.json() )
    .then( toyArray => {
      toyArray.forEach(toy => renderToy(toy))
    })
}

function renderToy(toy) {
  let container = document.getElementById("toy-collection")
  let toyCard = document.createElement('div')
  toyCard.classList.add("card")
  let header = document.createElement("h2")
  header.innerText = toy.name
  toyCard.appendChild(header)
  let image = document.createElement("img")
  image.classList.add("toy-avatar")
  image.src = toy.image
  toyCard.appendChild(image)
  let tag = document.createElement('p')
  tag.innerText = toy.likes
  toyCard.appendChild(tag)
  let button = document.createElement('button')
  button.classList.add("like-btn");
  button.innerText = "Like <3"
  button.id = toy.id
  button.addEventListener("click", patchLike)
  toyCard.appendChild(button)
  container.append(toyCard)
}
