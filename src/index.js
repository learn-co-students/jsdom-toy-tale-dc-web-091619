let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  // .then(data => console.log(data))
  .then(data => {
    data.forEach(toy_object => rendertoy(toy_object))
  })

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
   

})

  let form = document.querySelector(".add-toy-form")
  form.addEventListener("submit",create_toy)

  })
  
function rendertoy(toy_object){
let alltoys = document.querySelector("#toy-collection")
  let toydiv = document.createElement("div")
  toydiv.classList.add("card")
  
  let header = document.createElement("h2")
  header.innerText = toy_object.name
  
  let toyimage = document.createElement("img")
  toyimage.src = toy_object.image
  toyimage.classList.add("toy-avatar")
  
  let likes = document.createElement("p")
  likes.id = `likes-${toy_object.id}`
  likes.innerText = `${toy_object.likes} likes`
  
  let likebutton = document.createElement("button") 
  likebutton.addEventListener('click',addlikes)
  likebutton.id = `toy-${toy_object.id}`
  likebutton.classList.add("like-btn")
  likebutton.innerText = "Like"

  
  toydiv.append(header, toyimage, likes, likebutton)
  alltoys.appendChild(toydiv)

}


function create_toy(event){
  event.preventDefault()
  let name_input = document.querySelector("#name_input")
  let image_input = document.querySelector("#img_input")
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name_input.value,
      "image": image_input.value,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(result => rendertoy(result))
}

function addlikes() {
  const toyId = event.target.id.split("-")[1]
  let likes = parseInt(event.target.previousElementSibling.innerText.split(' ')[0])
  likes++
  fetch(`http://localhost:3000/toys/${toyId}`,{
    method: 'PATCH',
    headers:{
      "Content-Type": "application/json",
    Accept: "appication/json"},
    body: JSON.stringify({
      likes: likes
    })
  })
  .then(response => response.json())
  .then(result => updatetoy(result))
}

function updatetoy(result) {
 let ptag = document.querySelector(`#likes-${result.id}`)
 ptag.innerText = `${result.likes} Likes`
}