// url destino: https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=a6cbb63939c6bb41f89092331e8246b9&hash=4ad0b35656da2eddf174505d3d41b2c9
// SEACH HERO 
// let searchHero = '' //// nameStartsWith=${searchHero}&

// GET ELEMENTS
let cardhero = document.getElementById('herocard')

// SEARCH
let search = document.getElementById('search-input');

// GET HEROES
const publicKey = "a6cbb63939c6bb41f89092331e8246b9";
const hash = "4ad0b35656da2eddf174505d3d41b2c9";
const apiAutentication = `ts=1&apikey=${publicKey}&hash=${hash}`;

const getAllHeroes = (offset) => {
    URL = `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&offset=${offset}&${apiAutentication}`;
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            data.data.results.forEach(e => {
                displayHeroes(e)
            });
        })
        .catch(err => console.log(err));
};
getAllHeroes(0);

// DISPLAY HEROES
const displayHeroes = (e) => {
    const imageURL = `${e.thumbnail.path}.${e.thumbnail.extension}`;
    const hero = `
                <div class="col">
                <div class="card bgred rounded-3 h-100">
                    <img style="height:100%" src="${imageURL}" class="card-img-top" alt="${e.name}">
                    <div class="card-body text-center">
                        <h3 class="card-title">${e.name}</h3>
                    </div>
                </div>
                </div>`;
    cardhero.insertAdjacentHTML('beforeEnd', hero);
};

const getHeroesByName = search => {
    URLName = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&orderBy=name&offset=${offset}&${apiAutentication}`
};