let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyFormHolder = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormHolder.style.display = 'block'
    } else {
      toyFormHolder.style.display = 'none'
    }
  })
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', createToy )
})

fetch(`http://localhost:3000/toys`)
  .then(response => response.json())
  .then(json => getToys(json))

const getToys = json => {
  json.forEach(renderToy)
}

let likesObj = {}

const renderToy = toy => {
  const resultsDiv = document.querySelector("#toy-collection");
  let toyHolder = document.createElement("div")
  toyHolder.classList.add("card")
  toyHolder.id = `toy-id-${toy.id}`
  toyHolder.innerHTML = `<h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" /> 
  <p>${toy.likes}</p>
  <button class="like-btn" onclick="addLike(event)">Like <3</button>`
  resultsDiv.append(toyHolder)
  likesObj[`${toy.id}`] = toy.likes
}

const createToy = (e) => {
  e.preventDefault()
  let nameVal = e.target[0].value;
  let imgVal = e.target[1].value;

  let data = { name: nameVal, image: imgVal, likes: 0 }

  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
  .then(renderToy)
}

function addLike(e) {
  card = e.target.parentElement
  cardId = card.id.split("-")[2]
  likesObj[`${cardId}`]++
  let likeCount = likesObj[`${cardId}`]
  data = {likes: likeCount}
  fetch(`http://localhost:3000/toys/${cardId}`,{
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json',
      Accept: "application/json" 
    },
    body: JSON.stringify(data)
  })
  card.querySelector("p").innerText = `${likeCount}`
}