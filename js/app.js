// SEACH HERO 
let offset = document.querySelector('#pageOffset');
// GET ELEMENTS
let cardhero = document.getElementById('herocard');

// SEARCH
const inpSearch = document.getElementById('search-input');
const btnSearch = document.getElementById('search-button');

// DETAIL
const characterSection = document.querySelector('#detail-section');
const allMarvelSection = document.querySelector('#all-marvel-section');
const background = document.querySelector('#background');

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
                displayHeroes(e);
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
async function getHeroesById(id) {
    try {
        const response = await fetch(
            `https://gateway.marvel.com:443/v1/public/characters/${id}?${apiAutentication}`
        );
        const characterJson = await response.json();
        const character = characterJson.data.results[0];
        return character;
    } catch (error) {
        console.error('error', error);
    }
}

// HIDE SECTION
function hideSection(section) {
    section.className = 'hidden';
}

function displaySection(section, classname) {
    section.className = classname;
}

// DISPLAY ALL HEROES
const displayHeroes = (e) => {
    const imageURL = `${e.thumbnail.path}.${e.thumbnail.extension}`;
    const hero = `
        <div class="col">
        <div onclick="detailHero(${e.id})" class="card bgred rounded-3 h-100">
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
async function detailHero(id) {
    hideSection(allMarvelSection);
    hideSection(background);
    displaySection(characterSection, 'container');
    characterSection.innerHTML = '';
    const character = await getHeroesById(id);
    displayDetailSection(characterSection, character);
}

function displayDetailSection(section, character) {
    const detailContainer = document.createElement('article');
    detailContainer.innerHTML = `
	<div class="d-flex m-5 justify-content-center">
		<div class=" m-auto text-center">
				<h3 >${character.name}</h3>

			<p class="m-5 justify-content-center" >
           
				${
					character.description === ''
						? 'We are creating this character - This superhero does not have a loaded description, that is why we generate a random one.'
						: character.description
				}
			</p>
            <a href="/index.html" class=" btn btn-red fw-bold ps-5 pe-5 mt-5" style="text-shadow: 1px 1px 3px black" type="button">BACK HOME</a>
		</div>
        <div>
		<img
        class="img-thumbnail imgDetail m-auto" 
        src=${character.thumbnail.path}.${character.thumbnail.extension}
        alt=${character.name}
		/>
		</div>
        </div>
	`;
    section.appendChild(detailContainer)
};