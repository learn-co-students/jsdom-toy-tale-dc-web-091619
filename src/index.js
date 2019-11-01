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
  form = getToyForm()
  form.addEventListener('submit', addNewToy)
  })



function fetchToys() {
  fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(toysArray => {
        toysArray.forEach(toyObj => renderToys(toyObj))
      })
}
function renderToys(toyObj) {

  const toyCollection = getToyCollection()
  const toyCard = document.createElement('div')
  toyCard.classList.add( 'card')

  const header = document.createElement('h2') //create empty header
  header.innerText = toyObj.name //set innerText to toy name

  const p = document.createElement('p') //create empty p for likes
  p.innerText = `${toyObj.likes} likes` //set innerText to number likes
  //            ^^ interpolate toyObj JSON likes
  const likeButton = document.createElement('button') //create empty like likeButton
  likeButton.classList.add('like-btn') //add like-btn class
  likeButton.innerHTML = '&#9829' //extra bonus HTML for heart emoji
  likeButton.addEventListener('click', addLikes)
  likeButton.id =`toy-${toyObj.id}`

  const image = document.createElement('img') //create empty image
  image.src = toyObj.image //add image source to image
  image.classList.add("toy-avatar") //CSS for .toy-avatar fixes sizing issues by adding class tag to image tag (TIP: className overwrites classes, use classList)
  toyCard.appendChild(header) //append done header to toyCard
  toyCard.appendChild(image) //append done image to toyCard
  toyCard.appendChild(p) //append like count  to toyCard
  toyCard.appendChild(likeButton) //append like button  to toyCard
  toyCollection.appendChild(toyCard) //append toyCard to container list
}

function getToyCollection() {
  return document.getElementById("toy-collection")

}

function getToyForm() {
  return document.getElementsByClassName('add-toy-form')[0]
}
function addNewToy(event) {
  event.preventDefault()
  const newName = event.target.name.value
  const newImage = event.target.image.value
  fetch('http://localhost:3000/toys', {
    'method': 'POST',
      headers: {
      'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    body: JSON.stringify({
      'name': newName,
      'image': newImage,
      'likes': 100
    })
  })
      .then(response => response.json())
      .then(newToy => renderToys(newToy))
}

//
function updateToy(toy) {
  const toyButton = document.getElementById(`toy-${toy.id}`)
  pTag = toyButton.previousElementSibling
  pTag.innerText = `${toy.likes} Likes`
}

function addLikes(event) {

   const toyId = event.target.id.split('-')[1]

  // console.log(event)
  debugger
    let newLikes = parseInt(event.target.previousElementSibling.innerText.split(' ')[0])
  newLikes++
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({likes: newLikes})
  })
      .then(response => response.json())
      .then(result => updateToy(result))
}
// function addLikes() {
//   const toyId = event.target.id.split('-')[1]
//
//   let newLikes = parseInt(event.target.previousElementSibling.innerText.split(' ')[0])
//   newLikes++
//   fetch(`${toyUrl}/${toyId}`, {
//     method: 'PATCH',
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify( { likes: newLikes})
//   })
//       .then(response => response.json())
//       .then(result => updateToy(result))
// }

// function updateToy(toy) {
//   const toyButton = document.getElementById(`toy-${toy.id}`)
//   pTag = toyButton.previousElementSibling
//   pTag.innerText = `${toy.likes} Likes`
// }

  //   function postToy(event) {
  //     let toyCollection = document.getElementById("toy-collection")
  //     let name = event.name
  //     let image = event.image
  //     fetch('http://localhost:3000/toys', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         'name': name,
  //         'image': image,
  //         'likes': 0
  //       })
  //     })
  //         .then(result => result.json())
  //         .then(toyObj => renderToys(toyObj))
  //         .then(obj_toy => renderToys(obj_toy))
  //
  //   }
  // }


