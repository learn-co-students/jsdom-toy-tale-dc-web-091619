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
  fetchToys()
  const newForm = document.getElementById("newToy")
  newForm.addEventListener("submit", submitToy)

})

function fetchToys(){
    fetch(" http://localhost:3000/toys")
    .then(res => res.json())
    .then(toyObj => {
        toyObj.forEach((toy) => {
            displayToy(toy)
        })
        })
    }


function displayToy(toy){
const collection = document.getElementById("toy-collection")
const card = document.createElement("div")
card.classList.add("card")
collection.appendChild(card)

document.getElementsByClassName("card")
const toyName = document.createElement("h2")
toyName.innerText = toy.name 

const toyImg = document.createElement("img")
toyImg.className = "toy-avatar"
toyImg.src = toy.image

const toyLikes = document.createElement("p")
toyLikes.innerText = `${toy.likes} Likes`

const likeButton = document.createElement("button")
likeButton.className = "like-btn"
likeButton.id = toy.id
likeButton.addEventListener("click", likeToy)
card.append(toyName, toyImg, toyLikes, likeButton)
likeButton.innerText = "Like <3"
}

function submitToy(event){
  event.preventDefault()
  const name = document.getElementById("toy-name").value
  const image = document.getElementById("toy-img").value
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({name: name, image: image, likes: 0})
  })
  .then(res => res.json())
    .then(toy => {
            displayToy(toy)
        })
        document.getElementById("newToy").reset()
}

function likeToy(event){
 const id = event.target.id 
 let likeCount = parseInt(event.target.previousElementSibling.innerText)
 likeCount++
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes: likeCount})
  })
.then(res => res.json())
.then(res => updateToy(res))
}
function updateToy(res){
  const toyButton = document.getElementById(`${res.id}`)
  let ulikes = toyButton.previousElementSibling
  ulikes.innerText = `${res.likes} Likes`  
}