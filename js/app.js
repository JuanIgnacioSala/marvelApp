// url destino: https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=a6cbb63939c6bb41f89092331e8246b9&hash=4ad0b35656da2eddf174505d3d41b2c9
// SEACH HERO 
let offset = document.querySelector('#pageOffset');
// GET ELEMENTS
let cardhero = document.getElementById('herocard')

// SEARCH
const inpSearch = document.getElementById('search-input')
const btnSearch = document.getElementById('search-button');

// DETAIL
const characterSection = document.querySelector('#character-section');
const allMarvelSection = document.querySelector('#all-marvel-section')

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

// GET HEROES BY NAME 
const getHeroesByName = (search, offset) => {
    URLName = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&orderBy=name&offset=${offset}&${apiAutentication}`
    fetch(URLName)
        .then(response => response.json())
        .then(data => {
            cardhero.innerHTML = '';
            data.data.results.forEach(e => {
                displayHeroes(e)
            });
        })
        .catch(err => console.log(err));
};

// GET HEROES BY ID 



// DISPLAY ALL HEROES
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


// SEARCH BY NAME 
inpSearch.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        offset.textContent = 1;
        prevP.disabled = true;
        nextP.disabled = true;
        let data = e.target.value
        getHeroesByName(data.trim());
    }
});

btnSearch.addEventListener('click', (e) => {
    if (inpSearch != '') {
        offset.textContent = 1;
        prevP.disabled = true;
        nextP.disabled = true;
        getHeroesByName(inpSearch.value);
    }
})


// PAGINATION
nextP = document.getElementById('next-page')
prevP = document.getElementById('prev-page')
let contador = 1;
offsetPage = 0;
getAllHeroes(offsetPage);

nextP.addEventListener('click', e => {
    contador++;
    offset.textContent = contador;
    offsetPage = (contador - 1) * 20;
    cardhero.innerHTML = '';
    getAllHeroes(offsetPage);
});

prevP.addEventListener('click', e => {
    if (contador > 1) {
        contador--;
        offset.textContent = contador;
        offsetPage = (contador - 1) * 20;
        cardhero.innerHTML = '';
        getAllHeroes(offsetPage);
    }
});

// DETAIL PAGE
const getHeroesById = (id) => {
    URLId = `https://gateway.marvel.com:443/v1/public/characters/${id}?${apiAutentication}`
    fetch(URLId)
        .then(response => response.json())
        .then(data => {
            const character = data.data.results[0]
            return character
        })
        .catch(err => console.log(err));
};

function detailHero(id) {
    hideSection(allMarvelSection);
    displaySection(characterSection, 'character-container');
    characterSection.innerHTML = '';
    const character = getCharacterById(id);
    displayDetailSection(characterSection, character);
}

function displayDetailSection(section, character) {
    const detailContainer = document.createElement('article');
    detailContainer.innerHTML = `
	<div class="character-section">
		<div class="character-description">
			<div class="character-text-container">
				<h3 class="character-name">${character.name}</h3>
			</div>
			<p>
				${
					character.description === ''
						? 'We are creating this character. No description available yet. We promise that we are working very hard to achieve it.'
						: character.description
				}
			</p>
		</div>
		<img
			class="img"
			src=${character.thumbnail.path}.${character.thumbnail.extension}
			alt=${character.name}
		/>
	</div>
	<a href="index.html" class="regular-button back-home-btn">Back home</a>
	`;
    section.appendChild(detailContainer)
};