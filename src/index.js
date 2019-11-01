// json-server --watch db.json
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

  // add all the toys
  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json()})
  .then((data) => {
    data.forEach(toy => addToyCard(toy))
  })

  // submit clicked for new toy
  document.getElementsByClassName("submit")[0]
  .addEventListener("click", addNewToySubmitted)

})


function addToyCard(toy) {
  // make new div for the toy and append it to the collection
  const toyCollection = document.getElementById("toy-collection")
  const toyDiv = document.createElement("div")
  toyDiv.classList.add("card")
  toyDiv.id = `toy-${toy.id}`
  toyCollection.appendChild(toyDiv)
  
  //give toy div h2, img, p, and a button
  const nameTag = document.createElement("h2")
  const imgTag = document.createElement("img")
  imgTag.classList.add("toy-avatar")
  const pTag = document.createElement("p")
  const likeButton = document.createElement("button")
  likeButton.classList.add("like-btn")
  likeButton.innerText = "Like <3"
  toyDiv.append(nameTag, imgTag, pTag, likeButton)

  //grab info of toy
  const name = toy.name
  const imgsrc = toy.image
  const likes = toy.likes

  //adding info into the tags
  nameTag.innerText = name
  imgTag.src = imgsrc
  pTag.innerText = `${likes} likes`

  //add eventlistner to like button
  likeButton.addEventListener("click", addOneToLikes)
}


function addNewToySubmitted(event) {
  event.preventDefault()
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: document.querySelectorAll(".input-text")[0].value,
      // or name: document.querySelectorAll(".input-text").name.value
      // above possible because tag has a name="name"
      // best practice is give tag an id or class and grab that way
      image: document.querySelectorAll(".input-text")[1].value,
      likes: 0
    })
  })
  .then(function(response) {
    return response.json()})
  .then((data) => {
    addToyCard(data)
  })
  .catch(() => alert("Something went wrong!"))
  document.querySelector(".add-toy-form").reset()
}

function addOneToLikes(event) {
  event.preventDefault()
  //grab card div
  const toyContainer = event.target.parentElement
  const toyId = toyContainer.id.split('-')[1]
  const likesTag = toyContainer.childNodes[2]
  const currentLikeCount = parseInt(likesTag.innerText.split(' ')[0], 10)
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: currentLikeCount + 1
    })
  })
  .then(function(response) {
    return response.json()})
  .then((data) => {
    likesTag.innerText = `${data.likes} likes`
  })
  .catch(() => alert("Something went wrong!"))
}
