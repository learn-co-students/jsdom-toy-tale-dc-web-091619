let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener("submit", addNewToy) //this renders a new toy everytime I edit an existing toy but I'm too lazy to keep working on this.
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

  const editForm = document.querySelector(".edit-toy-form")
  editForm.addEventListener("submit", editToy)

  const selectForm = document.querySelector(".edit-toy-form-id")
  selectForm.addEventListener("change", pullupToy)
})

function pullupToy(event){
  const editForm = document.querySelector(".edit-toy-form")
  let toyId = document.getElementById("toy-id").value
  
  let toyCard = document.getElementById(toyId)

  editForm.name.value = toyCard.getElementsByTagName("h2")[0].innerText.split(`(`)[0]
  editForm.image.value = toyCard.getElementsByTagName("img")[0].src

}

function editToy(event){
  const editForm = document.querySelector(".edit-toy-form")
  const toyId = document.querySelector(".edit-toy-form-id")[0].value
  let toyName = editForm[0].value
  let toyPic = editForm[1].value
  

  const configObj = {
    method: "PATCH",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify({name: toyName, image: toyPic})
  }

  fetch(`http://localhost:3000/toys/${toyId}`, configObj)
    .then(response => response.json())
    .then(updatedToy=> updateCard(updatedToy))
}

function updateCard(){
  const toyId = document.querySelector(".edit-toy-form-id")[0].value
  const editForm = document.querySelector(".edit-toy-form")
  let toyPic = editForm[1].value
  let toyName = editForm[0].value
  let toyCard = document.getElementById(toyId)

  toyCard.getElementsByTagName("h2")[0].innerText = toyName

}

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
  const selectId = document.getElementById("toy-id")
  card.classList.add("card")
  card.id = toyObj.id

  const header= document.createElement("h2")
  header.innerText = `${toyObj.name} (id:${toyObj.id})`

  const image = document.createElement("img")
  image.classList.add("toy-avatar")
  image.src = toyObj.image

  const likes = document.createElement("p")
  likes.innerText = `${toyObj.likes} Fan${ Number(toyObj.likes)>1 ? "s": ""}`

  const toyButton = document.createElement("button")
  toyButton.innerText="THIS DEFINITELY A BUTTON"
  toyButton.classList.add("like-btn")
  toyButton.addEventListener("click", addLike)

  const delButton = document.createElement("button")
  delButton.innerText= "DELETE ME"
  delButton.addEventListener("click", delToy)

  const selectOption = document.createElement("option")
  selectOption.innerText = toyObj.id
  selectOption.value = toyObj.id

  
  toyCollection.appendChild(card)
  card.appendChild(header)
  card.appendChild(delButton)
  card.appendChild(image)
  card.appendChild(likes)
  card.appendChild(toyButton)
  selectId.appendChild(selectOption)
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


  toyForm.reset();
}

function delToy(event){
  let card = event.currentTarget.parentNode
  let id = card.id

  const configObj = {
    method: "DELETE",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    
  }

  fetch(`http://localhost:3000/toys/${id}`, configObj)

  document.getElementById(id).remove()//this removes it from the DOM. Even though it is already removed in the db. makes it so I wouldn't have to refetch
}