let addToy = false;
const toyUrl = 'http://localhost:3000/toys';


document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;

    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  });
  toyList();
  form = getToyForm();
  form.addEventListener('submit', addNewToy)
});


function toyList(){
  fetch(toyUrl)

      .then(response => response.json())
      .then(allToys => {
        allToys.forEach(toy => displayToy(toy))
      } )
}


function displayToy(toy){
 let toyContainer = document.getElementById("toy-collection");
 let toyCard = document.createElement("div");
 toyCard.className= "card";

  let toyName = document.createElement("h2");

  toyName.innerText = toy.name;

  toyCard.appendChild(toyName);
  toyContainer.appendChild(toyCard);

  let toyImage = document.createElement("img");
  toyImage.classList.add("toy-avatar");
  toyImage.src = toy.image;
  toyCard.appendChild(toyImage);


  let toyLikes = document.createElement("p");
  toyLikes.innerText = `${toy.likes} likes`;


  let toyBtn = document.createElement("button");
  toyBtn.innerText = "Like";

  toyBtn.addEventListener("click", addLikes);
  toyBtn.id =`toy-${toy.id}`;

  toyCard.append(toyLikes, toyBtn)


}



function getToyForm() {
  return document.getElementsByClassName("add-toy-form")[0]
}



function addNewToy(event){
  event.preventDefault();

  const newName = event.target.name.value;
  const newImage = event.target.image.value;


  fetch(toyUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: newName,
      image: newImage,
      likes: 0
    })
  })
      .then(response => response.json())
      .then(newToy => displayToy(newToy));
  getToyForm().reset()

}



function addLikes(event){
  const toyId = event.target.id.split('-')[1];

  let newLikes = parseInt(event.target.previousElementSibling.innerText.split(' ')[0])
  newLikes++;

  fetch(`${toyUrl}/${toyId}`, {

    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify( { likes: newLikes})
  })
      .then(response => response.json())
      .then(result => updateToy(result))
}

function updateToy(toy) {
  const toyButton = document.getElementById(`toy-${toy.id}`);
  pTag = toyButton.previousElementSibling;
  pTag.innerText = `${toy.likes} Likes`
}

