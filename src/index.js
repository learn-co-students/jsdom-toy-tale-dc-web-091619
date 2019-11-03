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
  getForm().addEventListener('submit', submitHandler)

})

function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then( response => response.json() )
    .then( toyArray => {
      toyArray.forEach( toy => renderToy(toy) )
    })
}

function renderToy(toy) {
  let toyCard = document.createElement('div')
  toyCard.classList.add('card')

  let toyName = document.createElement('h2')
  toyName.innerText = toy.name
  
  let toyImg = document.createElement('img')
  toyImg.classList.add("toy-avatar")
  toyImg.src = toy.image

  let toyLikes = document.createElement('p')
  toyLikes.id = `toy-${toy.id}-likes`
  toyLikes.innerText = toy.likes

  let likeBtn = document.createElement('button')
  likeBtn.id = `toy-${toy.id}-likebtn`
  likeBtn.innerText = "♥"
  likeBtn.addEventListener('click', increaseLike)
  
  toyCard.append(toyName, toyImg, toyLikes, likeBtn)
  collectionContainer().append(toyCard)
}

function submitHandler(){
  event.preventDefault()
  let newName = event.currentTarget.name.value
  let newImage = event.currentTarget.image.value
  let likes = 0
  let data = {
    name: newName,
    image: newImage,
    likes: likes
  }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then( response => response.json() )
    .then( newToy => renderToy(newToy) )
    .catch( () => alert("Whoops, something went wrong on our end") )

  event.currentTarget.reset()
}

function increaseLike(){
  let currentToyId = parseInt(event.currentTarget.id.split("-")[1]);
  let currentLikes = parseInt( document.getElementById(`toy-${currentToyId}-likes`).innerText )
  newLikes = currentLikes + 1
  
  fetch(`http://localhost:3000/toys/${currentToyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: newLikes})
  })
    .then( response => response.json() )
    .then( data => updateToyLikes(data) )

}

function updateToyLikes(data){
  let likesContainer = document.getElementById(`toy-${data.id}-likes`)
  likesContainer.innerText = data.likes
}

//_______________DOM nodes_______________
function collectionContainer(){
  return document.getElementById('toy-collection')
} 

function getForm(){
  return document.querySelector('.add-toy-form')
}





 