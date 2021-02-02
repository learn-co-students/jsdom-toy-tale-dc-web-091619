let addToy = false;
const d = document
const url = 'http://localhost:3000/toys'
const toyCollectionDiv = d.getElementById('toy-collection')
const addToyBtn = d.getElementById('submit-toy')
const addToyForm = d.getElementsByClassName('add-toy-form')[0]
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    d.getElementsByName('name')
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      addToyForm.addEventListener('submit', (e) => {
       let name =  e.target.name.value
        let image = e.target.image.value

        addToyEvent(e, name, image)

        toyFormContainer.style.display = "none";

      }
    )
    }else {
      toyFormContainer.style.display = "none";
    }
console.log(addToyForm.submit)

  }
  /*
  FETCH
  On the index.html page, there is a div with the id "toy-collection."

When the page loads,
 X make a 'GET' request to fetch all the toy objects.
 X With the response data, make a <div class="card"> for each toy
 X and add it to the toy-collection div.
 */

  );
  console.log('Dom content loaded')
  fetchCall()

});

const fetchCall = (e) => {
  console.log('fetch call to '+ url)
   fetch(url)
       .then(r => r.json())
       .then(dat => {
         dat.forEach(t => (
             createCard(t)
         ))
       })


}
const createCard = (t) => {
// console.log('create card '+ t.id)
  let cardDiv = d.createElement('div')
  let h2 = d.createElement('h2')
  let img = d.createElement('img')
  let p = d.createElement('p')
  let btn = d.createElement('button')
  cardDiv.id = t.id
  cardDiv.className = 'card'

  h2.innerText = t.name

  img.src = t.image
  img.className = 'toy-avatar'

  p.innerText = t.likes

  btn.className = 'like-btn'
  btn.innerText = '<3'
  cardDiv.append(h2,img,p,btn)
  let id = t.id
  let likes = t.likes
  btn.addEventListener('click',(e) => {
    addLikeEvent(e,id,likes)
  })
  toyCollectionDiv.appendChild(cardDiv)
}

const addLikeEvent = (e, id, likes) => {
  fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
    body: JSON.stringify({
      "likes": likes+1
    })})
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}
const addToyEvent = (e, name,image) => {
  e.preventDefault()
  fetch(url, {
    method: 'POST',
    headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
    body: JSON.stringify({
      "likes": 0,
      'name': name,
      'image': image
  })})
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
      })
      .catch(error => {
        console.error('Error:', error);
      });


}





