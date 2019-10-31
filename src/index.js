let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  fetchToys()

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      getForm().addEventListener('submit', addNewToy)
    } else {
      toyForm.style.display = 'none'
    }
  })

})

function addNewToy(event) {
  event.preventDefault();
  
  let nameElement = document.getElementById("name-field")
  let imageElement = document.getElementById("img-url-field")

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: nameElement.value,
      image: imageElement.value,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(data => createToy(data))


  getForm().reset()
}

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => toys.forEach(toy => createToy(toy)))
}

function createToy(toy_obj) {
  // make div element
  let div = document.createElement("div")
  div.classList.add("card")
  // div.className += "card"
 
  // make h2 element
  let h2 = document.createElement('h2')
  h2.innerText = toy_obj.name
  
  // make img element
  let img = document.createElement('img')
  img.src = toy_obj.image
  img.classList.add("toy-avatar")

  // make a p element
  let p = document.createElement("p")
  p.innerText = `${toy_obj.likes} Likes`

  // make a button element
  let btn = document.createElement('button')
  btn.addEventListener("click", updateLike)
  btn.classList.add("like-btn")
  btn.id = toy_obj.id
  btn.innerText = "Like <3"

  div.append(h2,img,p,btn)

  getToyDiv().appendChild(div)

}

function updateLike(event) {
  let id = event.currentTarget.id
  let paragrah = event.currentTarget.previousSibling
  console.log(paragrah)

  let currentLike = event.currentTarget.previousSibling.innerText
  currentLike = parseInt(currentLike.split(" ")[0])
  
  currentLike += 1

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: currentLike
    })
  })
  .then(response => response.json())
  .then(data => {
    paragrah.innerText = `${data.likes} Likes`
  })
}


function getToyDiv() {
  return document.getElementById("toy-collection")
}

function getForm() {
  return document.querySelector(".add-toy-form")
}