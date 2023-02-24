let card = document.querySelector('.card');
let itemCard = document.querySelector('.item-card');

itemCard.addEventListener('click', (e) => {
    e.preventDefault();
    if (card.style.right == '-500px') {
        card.style.right = 0;
    } else { card.style.right = `-500px`; }
})

let cakeData = [];
let cakeContainer = document.querySelector('.items-container');
let search = document.getElementById('search');
let decroissant = document.getElementById('desc');
let croissant = document.getElementById('crois');


console.log(search);
let order = 'croissant';
async function fetchData() {
    await fetch('../../javascriptE-vente/client/assets/data/data.json')
        .then((res) => res.json())
        .then((data) => (cakeData = data))
        .catch((err) => console.log(err));
}

async function displayCakes() {
    await fetchData();
    console.log(cakeData);
    cakeContainer.innerHTML =
        cakeData
            .filter(
                (cake) =>
                    cake.name.includes(search.value))
            .sort((a, b) => {
                if (order === "croissant") {
                    return a.price - b.price;
                } else if (order === "decroissant") {
                    return b.price - a.price;
                }
            })
            .map((cake) => (
                `<div class="cake" data-id='${cake.id}'>
               <img src='./client/assets/layout/img/${cake.image}'>
               <p>${cake.name}</p>
               <strong>${cake.price} francs</strong>
             </div>`
            )).join('');
    let cardNav = document.querySelector('.card-nav');
    let cakeDiv = document.querySelectorAll('.cake');

    const storageData = () => {
        localStorage.dataset = cardNav.textContent;
    }
    cakeDiv.forEach((onCake) => {
        onCake.addEventListener('click', (e) => {
            const id = onCake.dataset.id;
            let article = cakeData.filter((cake) => cake.id == id);
            console.log(article);
            console.log(article[id]);
            alert('gateaux enregistré avec success!');
            cardNav.innerHTML += article.map((article) => (`
                    <div class="card-item">
                    <div class="image">
                        <img src="./assets/layout/img/${article.image}" alt="article du pannier">
                    </div>
                    <div class="text">
                        <p>${article.name}</p>
                        <strong>${article.price} francs</strong>
                    </div>
                </div>`
            ));
            storageData();

        })
    })
}
console.log(decroissant);
decroissant.addEventListener('click', (e) => {
    e.preventDefault();
    order = "decroissant";
    displayCakes();
})
crois.addEventListener('click', (e) => {
    e.preventDefault();
    order = "croissant";
    displayCakes();
})
search.addEventListener('input', displayCakes);
window.addEventListener('load', displayCakes);

