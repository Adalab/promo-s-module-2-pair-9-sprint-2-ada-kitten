'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');


//Objetos con cada gatito
const kittenData_1 = {
    image: "https://dev.adalab.es/gato-siames.webp",
    name: "Anastacio",
    desc: "Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.",
    race: "Siamés",
};
const kittenData_2 = {
    image: "https://dev.adalab.es/sphynx-gato.webp",
    name: "Fiona",
    desc: "Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.",
    race: "Sphynx",
};
const kittenData_3 = {
    image: "https://dev.adalab.es/maine-coon-cat.webp",
    name: "Cielo",
    desc: " Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.",
    race: "Maine Coon",
};
 let kittenDataList = [];

//Funciones
// function renderKitten(kittenData) {
//     for (const kittenData of kittenDataList) {
    
//     const liElement = document.createElement('li');
//     liElement.setAttribute('class', 'card')
    
//     const articleElement = document.createElement('article');

//     const imgElement = document.createElement('img');
//     imgElement.setAttribute('class', 'card_img');
//     imgElement.setAttribute('src', kittenData.image);
//     imgElement.setAttribute('alt', 'gatito');
    
//     const h3NameElement = document.createElement('h3');
//     const h3RaceElement = document.createElement('h3');
//     const pElement = document.createElement('p');


//     articleElement.appendChild(pElement);
//     articleElement.appendChild(h3RaceElement);
//     articleElement.appendChild(h3NameElement);
//     articleElement.appendChild(imgElement);
//     liElement.appendChild(articleElement);
//     listElement.appendChild(liElement);  }
//     `<li class="card">
//     <article>
//       <img
//         class="card_img"
//         src=${kittenData.image}
//         alt="gatito"
//       />
//       <h3 class="card_title">${kittenData.name}</h3>
//       <h3 class="card_race">${kittenData.race}</h3>
//       <p class="card_description">
//       ${kittenData.desc}
//       </p>
//     </article>
//     </li>`;
//     return kitten;
// }

function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        listElement.innerHTML += renderKitten(kittenItem);
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}

//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
}

//Filtrar por descripción
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value.toLowerCase();
    const raceSearchText = input_search_race.value.toLowerCase();
     const kittenListFiltered = kittenDataList
        .filter((kittenItem) => kittenItem.race.toLowerCase().includes(raceSearchText))
        .filter((kittenItem) => kittenItem.desc.toLowerCase().includes(descrSearchText))
  renderKittenList(kittenListFiltered);
};


//Adicionar nuevo gatito
//FETCH

const GITHUB_USER = 'Cristina-F-R';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;
const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));


if (kittenListStored) {
    console.log('tengo storage');
 kittenDataList = kittenListStored;
  renderKittenList(kittenDataList);
} else {
  console.log('hago fetch');
  fetch(SERVER_URL)
    .then((response) => response.json())
    .then((data) =>{
        kittenDataList = data.results.map((kittens) => ({
            image: kittens.image,
            name: kittens.name,
            race:  kittens.race,
            desc: kittens.desc
        }))
        localStorage.setItem('kittensList', JSON.stringify(kittenDataList));
        renderKittenList(kittenDataList);
    })
    .catch((error) => {
      console.error(error);
    });
}


fetch(SERVER_URL, {
    method: 'GET',
    header8s: {'Content-Type': 'application/json'},
    })
    .then((response) => response.json())
    .then((data) =>{
        kittenDataList = data.results.map((kittens) => ({
            image: kittens.image,
            name: kittens.name,
            race:  kittens.race,
            desc: kittens.desc
        }))
        renderKittenList(kittenDataList);
    });

function resetInputs() {
  inputDesc.value = "";
  inputName.value = "";
  inputPhoto.value = "";
  inputRace.value = "";
}

function addNewKitten(event) {
  event.preventDefault();
  const valueDesc = inputDesc.value;
  const valuePhoto = inputPhoto.value;
  const valueName = inputName.value;
  const valueRace = inputRace.value;

  if (valueDesc === "" || valuePhoto === "" || valueName === "") {
    labelMessageError.innerHTML = "¡Uy! parece que has olvidado algo";
  } else if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
    labelMessageError.innerHTML = "Mola! Un nuevo gatito en Adalab!";
    let newKittenDataObject = {
      image: valuePhoto,
      name: valueName,
      desc: valueDesc,
      race: valueRace,
    };

    fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newKittenDataObject),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          kittenDataList.push(newKittenDataObject);
          localStorage.setItem(
            "kittenDataList",
            JSON.stringify(kittenDataList)
          );
          renderKittenList(kittenDataList);
        } else {
          console.error(error);
        }
      });
    resetInputs();
  }
}
  

//Mostrar el litado de gatitos en ell HTML
// renderKittenList(kittenDataList);


//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);






