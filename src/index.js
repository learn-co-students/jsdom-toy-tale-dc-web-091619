let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  //const toys = document.getElementById('toy-collection');
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  
  toyForm.addEventListener("submit", addToys)
  
  fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    json.forEach((toy) => renderToys(toy))
  })
})


function renderToys(toy) {
  const toys = document.getElementById("toy-collection");
  const likeButton = document.createElement('button');
  likeButton.addEventListener("click", increaseLikes);
  likeButton.classList.add('like-btn')
  likeButton.id = toy.id
  const new_toy = document.createElement('div');
  new_toy.classList.add('card');
  const toy_likes = document.createElement('p');
  const name = document.createElement('h2')
  const pic = document.createElement('img')
  pic.classList.add('toy-avatar')
  name.innerText = toy.name
  likeButton.innerHTML = 'Like'
  pic.src = toy.image
  toy_likes.innerText = `${toy.likes} Likes`
  toys.appendChild(new_toy);
  new_toy.appendChild(name);
  new_toy.appendChild(pic);
  new_toy.appendChild(toy_likes)
  new_toy.appendChild(likeButton);
  //new_toy.innerHTML = "hello";
  
}

function addToys() {
  const toy_name = document.getElementById("toy_name").value
  const toy_image = document.getElementById("toy_image").value
  const configObj = {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toy_name, 
      image: toy_image, 
      likes: 0})
    }
  
  fetch('http://localhost:3000/toys', configObj)
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    json.forEach((toy) => renderToys(toy))
  })
}

function increaseLikes() {
  const current_likes = parseInt(event.target.parentNode.getElementsByTagName('p')[0].innerHTML.split(" ")[0], 10)
  const likes = event.target.parentNode.getElementsByTagName('p')[0].innerHTML
  //debugger
  const configObj = {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
    body: JSON.stringify({
      likes: current_likes + 1}
    )}
  fetch(`http://localhost:3000/toys/${event.target.id}`, configObj)
  .then(function(response){
    return response.json()
  })
  .then(function(json) {
    updateLikes(json)
  })
};


function updateLikes(toy) {
  const toy_button = document.getElementById(`${toy.id}`)
  const toy_likes = toy_button.parentNode.getElementsByTagName('p')[0];
  toy_likes.innerHTML = `${toy.likes} Likes`  
}
