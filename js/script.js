let currentPokemon;
let allPokemons = [];
let currentPokemons = [];
let offset = 0;
let limit = 151;
let functionBool = true;
let stepsize = 20;

// INIT FUNCTION AT ONLOAD
async function init() {
    document.getElementById('loadingScreen').classList.remove('d-none');
    await loadPokemons();
    renderPokedex();
    document.getElementById('loadingScreen').classList.add('d-none');
}

// LOAD POKEMONS FROM API
async function loadPokemons() {
    console.log('Loading called');
    for (let i = offset; i < offset + limit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
        currentPokemons.push(currentPokemon);
    }
    console.log('Loading rdy');
}

// RENDER & CREATE POKEDEX
function renderPokedex() {
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';
    for (let i = 0; i < currentPokemons.length; i++) {
        pokedex.innerHTML += renderPokemons(currentPokemons, i);
        getPokemonType(i);
    }
}

// OPEN BIG POKEMON-CARD
function openDetailCard(id) {
    let foundPokemon = allPokemons.find(pokemon => pokemon['id'] === id);
    let i = allPokemons.findIndex(pokemon => pokemon['id'] === id);
    let pokemonCards = document.getElementById('renderedPokemonCards');

    pokemonCards.innerHTML = renderDetailCard(foundPokemon, i);
    pokemonCards.classList.remove('d-none');
    document.getElementById('pokedex').classList.add('d-none');

    renderPokemonAttacks(foundPokemon);
    renderPokemonAbilities(foundPokemon);
    getPokemonType(i);
}

// 
function renderPokemonAttacks(foundPokemon) {
    let pokeAttackContainer = document.getElementById('pokemonAttacks');

    for (let i = 0; i < foundPokemon['abilities'].length; i++) {
        const abilitie = foundPokemon['abilities'][i]['ability']['name'];
        pokeAttackContainer.innerHTML += /*html*/`
        <div class="pokemon-attacks">${abilitie.replace(/^.{1}/g, abilitie[0].toUpperCase())}</div>`;
    }
}

// 
function renderPokemonAbilities(foundPokemon) {
    let pokeAbilitiesContainer = document.getElementById('pokemonAbilities');

    for (let i = 0; i < foundPokemon['moves'].length; i++) {
        const move = foundPokemon['moves'][i]['move']['name'];
        pokeAbilitiesContainer.innerHTML += /*html*/`
        <div class="pokemon-abilities">${move.replace(/^.{1}/g, move[0].toUpperCase())}</div>`;
    }
}

// FIRST FUNCTION FOR THE POKECARDMENU
function changeOnStats() {
    document.getElementById('statsHeader').style.textDecoration = "underline";
    document.getElementById('attacksHeader').style.textDecoration = "none";
    document.getElementById('abilitiesHeader').style.textDecoration = "none";
    document.getElementById('pokemonAbilities').classList.add('d-none');
    document.getElementById('stats').classList.remove('d-none');
    document.getElementById('pokemonAttacks').classList.add('d-none');
}

// SECOND FUNCTION FOR THE POKECARDMENU
function changeOnAttacks() {
    document.getElementById('statsHeader').style.textDecoration = "none";
    document.getElementById('attacksHeader').style.textDecoration = "underline";
    document.getElementById('abilitiesHeader').style.textDecoration = "none";
    document.getElementById('pokemonAbilities').classList.add('d-none');
    document.getElementById('stats').classList.add('d-none');
    document.getElementById('pokemonAttacks').classList.remove('d-none');
}

// THIRD FUNCTION FOR THE POKECARDMENU
function changeOnAbilities() {
    document.getElementById('statsHeader').style.textDecoration = "none";
    document.getElementById('attacksHeader').style.textDecoration = "none";
    document.getElementById('abilitiesHeader').style.textDecoration = "underline";
    document.getElementById('pokemonAbilities').classList.remove('d-none');
    document.getElementById('stats').classList.add('d-none');
    document.getElementById('pokemonAttacks').classList.add('d-none');
}

// CLOSE BIG POKEMON-CARD
function quitDetailCard() {
    document.getElementById('renderedPokemonCards').classList.add('d-none');
    document.getElementById('pokedex').classList.remove('d-none');
}

// PREFUNCTION FOR SEARCH
async function getSearchedPokemon() {
    let searchInput = document.getElementById('myInput').value;
    let foundPokemonNames = namesOfAllPokemon.filter(pokemon => pokemon.includes(searchInput));
    searchPokemon(foundPokemonNames);
}

// FUNCTION FOR SEARCHBAR
async function searchPokemon() {
    currentPokemons = [];
    let search = document.getElementById('searchBar').value;

    input = search.toLowerCase();
    for (let i = 0; i < allPokemons.length; i++) {
        if (allPokemons[i]['name'].includes(input)) {
            currentPokemons.push(allPokemons[i]);
        }
    }
    checkEmptySearchbar();
}

// 
function checkEmptySearchbar() {
    if (currentPokemons.length === 0) {
        document.getElementById('emptyCard').classList.remove('d-none');
    } else {
        document.getElementById('emptyCard').classList.add('d-none');
    }
    renderPokedex();
}

// CLEAR OUT SEARCHBAR
function clearSearchbar() {
    init();
    document.getElementById('emptyCard').classList.add('d-none');
    document.getElementById('searchBar').value = '';
}

// ONSCROLL FUNCTION
window.onscroll = async function scroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && functionBool) {
        functionBool = false;
        limit = limit + stepsize;
        await loadMorePokemons();
        functionBool = true;
    }
};

// FUNCTION AUTOMATICALLY LOAD NEXT POKEMONS
async function loadMorePokemons() {
    for (let i = limit - stepsize; i < limit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
        currentPokemons.push(currentPokemon);
        pokedex.innerHTML += renderPokemons(currentPokemons, i);
        getPokemonType(i);
    }
}

// function carousel() {
//     let myCarousel = document.getElementById('carousel');
//     let carousel = new bootstrap.Carousel(myCarousel, {
//         interval: 2000,
//         wrap: false
//     })
// }

function getPokemonType(i) {
    let type = allPokemons[i]['types'][0]['type']['name'];
    let circle = document.getElementById(`pokescircle_${i}`);
    if (type == 'grass') {
        circle.classList.add('color_bg_grass');
        circle.src = "img/icons/grass.svg";
    }
    if (type == 'fire') {
        circle.classList.add('color_bg_fire');
        circle.src = "img/icons/fire.svg";
    }
    if (type == 'water') {
        circle.classList.add('color_bg_water');
        circle.src = "img/icons/water.svg";
    }
    if (type == 'bug') {
        circle.classList.add('color_bg_bug');
        circle.src = "img/icons/bug.svg";
    }
    if (type == 'dark') {
        circle.classList.add('color_bg_dark');
        circle.src = "img/icons/dark.svg";
    }
    if (type == 'dragon') {
        circle.classList.add('color_bg_dragon');
        circle.src = "img/icons/dragon.svg";
    }
    if (type == 'electric') {
        circle.classList.add('color_bg_electric');
        circle.src = "img/icons/electric.svg";
    }
    if (type == 'fairy') {
        circle.classList.add('color_bg_fairy');
        circle.src = "img/icons/fairy.svg";
    }
    if (type == 'fighting') {
        circle.classList.add('color_bg_fighting');
        circle.src = "img/icons/fighting.svg";
    }
    if (type == 'flying') {
        circle.classList.add('color_bg_flying');
        circle.src = "img/icons/flying.svg";
    }
    if (type == 'ghost') {
        circle.classList.add('color_bg_ghost');
        circle.src = "img/icons/ghost.svg";
    }
    if (type == 'ground') {
        circle.classList.add('color_bg_ground');
        circle.src = "img/icons/ground.svg";
    }
    if (type == 'ice') {
        circle.classList.add('color_bg_ice');
        circle.src = "img/icons/ice.svg";
    }
    if (type == 'poison') {
        circle.classList.add('color_bg_poison');
        circle.src = "img/icons/poison.svg";
    }
    if (type == 'normal') {
        circle.classList.add('color_bg_normal');
        circle.src = "img/icons/normal.svg";
    }
    if (type == 'steel') {
        circle.classList.add('color_bg_steel');
        circle.src = "img/icons/steel.svg";
    }
    if (type == 'rock') {
        circle.classList.add('color_bg_rock');
        circle.src = "img/icons/rock.svg";
    }
    if (type == 'psychic') {
        circle.classList.add('color_bg_psychic');
        circle.src = "img/icons/psychic.svg";
    }
}