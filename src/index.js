let addToy = false

document.addEventListener("DOMContentLoaded", ()=> {
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

  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toyArray => toyArray.forEach(toy => renderToys(toy)))

  const getForm = document.querySelector("form")
  getForm.addEventListener("submit", submitHandler)
  getForm.reset()

})

function renderToys(toy) {
  const toyCollection = document.querySelector('#toy-collection')
  const toyDiv = document.createElement("div")
  toyDiv.id = `toy-${toy.id}`
  toyDiv.classList.add("card")
  toyCollection.append(toyDiv)

  const toyHtag = document.createElement("h2") 
  toyHtag.innerText = toy.name 
  toyDiv.append(toyHtag)

  const toyImg = document.createElement("img")
  toyDiv.append(toyImg)
  toyImg.src = toy.image
  toyImg.classList.add("toy-avatar")

  const toyP = document.createElement("p")
  toyP.innerText = `${toy.likes} Likes`
  toyDiv.append(toyP)

  const likeButton = document.createElement("button")
  likeButton.classList.add("like-btn")
  likeButton.innerText = "Like <3"
  toyDiv.append(likeButton)
  likeButton.addEventListener("click", clickHandler)
}

function submitHandler(e) {
  e.preventDefault
  postToys(e)
}

function postToys(e) {
  let data = {
      name: e.target.name.value,
      image: e.target.image.value ,
      likes: 0
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  }

  fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(data => renderToys(data))
}

function clickHandler(e) {
  e.preventDefault
  increaseLikes(e)
}

function increaseLikes(e) {
  const currentLike = e.target.parentElement
  const currentLikePtag = currentLike.children[2]
  let numberOfLikes = currentLikePtag.innerText.split(" ")[0]
  numberOfLikes = parseInt(numberOfLikes) + 1
  currentLikePtag.innerText = `${numberOfLikes} Likes`
  debugger 
  let id = currentLike.id.split("-")[1]

  let data = {
    likes: numberOfLikes
  }

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  }
  
  fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then(resp => resp.json())
    .then(data => renderToys(data))
}



