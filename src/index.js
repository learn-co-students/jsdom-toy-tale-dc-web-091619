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

  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(function(toys) {
    toys.forEach(function(toy){
      renderToy(toy);
    })
  });

  getForm().addEventListener('submit', addNewToy);
})

function getForm(){
  return document.querySelector('.add-toy-form')
}

function renderToy(toy) {
  //creating all elements
  let toyCollection = document.querySelector('#toy-collection')
  let toyCard = document.createElement('div')
  toyCard.classList.add('card');
  let toyName = document.createElement('h2')
  let toyImg = document.createElement('img')
  let toyLikes = document.createElement('p')
  let toyButton = document.createElement('button')

  toyName.innerText = toy.name;
  toyImg.srcset = toy.image;
  toyImg.classList.add('toy-avatar')
  toyLikes.innerText = `${toy.likes} Likes`

  toyButton.classList.add('like-btn')
  toyButton.innerText = 'Like <3'
  toyButton.addEventListener('click', increaseLikes)

  toyCard.id = `toy-${toy.id}` //id added for better use

  //appending all elements 
  toyCard.appendChild(toyName);
  toyCard.appendChild(toyImg);
  toyCard.appendChild(toyLikes);
  toyCard.appendChild(toyButton);

  toyCollection.appendChild(toyCard);
}

function addNewToy(event){
  event.preventDefault()

  let newToyName = document.querySelector('#new-toy-name').value
  let newToyImg = document.querySelector('#new-toy-img').value

  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json", 
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: newToyName,
      image: newToyImg,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(toy => renderToy(toy))
  .catch(error => console.log(error.message));
}

function increaseLikes(event){
  let currentLikes = event.target.previousElementSibling.innerText.split(" ")[0]
  currentLikes++

  let toyId = event.target.parentElement.id.split('-')[1];


  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": currentLikes
    })
  })
  .then(response => response.json())
  .then(function(toy){
    updateDom(toy);
  })
  .catch(error => console.log(error))
}

function updateDom(toy) {
  let specificToy = document.querySelector(`#toy-${toy.id}`)

  let updatedValue = specificToy.children[2].innerText.split(" ")[0] = toy.likes + " " + specificToy.children[2].innerText.split(" ")[1]

  specificToy.children[2].innerText = updatedValue; //updates the DOM
}