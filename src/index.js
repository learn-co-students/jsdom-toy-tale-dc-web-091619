let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener("submit", addNewToy)
    } else {
      toyForm.style.display = 'none'
    }
  })

  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toyObjArr => {
      toyObjArr.forEach(toyObj=> renderToy(toyObj))
    })
  
  let buttonArr = document.querySelectorAll(".like-btn")
  buttonArr.forEach(button=>{
    button.addEventListener("click", addLike)
  })
})

function addLike(event){
  let toyId = event.target.parentNode.id
  let toyCard = document.getElementById(toyId)
  let numOfLikes = Number(toyCard.getElementsByTagName("p")[0].innerText.split(" ")[0])
  let newLikes = numOfLikes + 1
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({"likes": newLikes})
  }
  
  fetch(`http://localhost:3000/toys/${toyId}`, configObj)
    .then(response=>response.json())
    .then(json=>updateLikes(json))

}

function updateLikes(updatedJson){
  let card = document.getElementById(updatedJson.id)
  let numLikes = card.getElementsByTagName("p")[0]
  numLikes.innerText = `${updatedJson.likes} Fan${ Number(updatedJson.likes)>1 ? "s": ""}`
}

function renderToy(toyObj){
  const toyCollection = document.getElementById("toy-collection")
  
  const card = document.createElement("div")
  card.classList.add("card")
  card.id = toyObj.id

  const header= document.createElement("h2")
  header.innerText = toyObj.name

  const image = document.createElement("img")
  image.classList.add("toy-avatar")
  image.src = toyObj.image

  const likes = document.createElement("p")
  likes.innerText = `${toyObj.likes} Fan${ Number(toyObj.likes)>1 ? "s": ""}`

  const toyButton = document.createElement("button")
  toyButton.innerText="THIS DEFINITELY A BUTTON"
  toyButton.classList.add("like-btn")
  toyButton.addEventListener("click", addLike)
  
  toyCollection.appendChild(card)
  card.appendChild(header)
  card.appendChild(image)
  card.appendChild(likes)
  card.appendChild(toyButton)
}

function addNewToy(event){
  
  event.preventDefault();
  
  const toyForm = document.querySelector('.add-toy-form')
  const toyName = toyForm.name.value
  const toyImageUrl = toyForm.image.value
  const data = {name: toyName, image: toyImageUrl}
  
  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({name: toyName, image: toyImageUrl, likes: 0})
  }
  
  fetch("http://localhost:3000/toys", configurationObject)
    .then(response => response.json())
    .then(toy => renderToy(toy))

}
