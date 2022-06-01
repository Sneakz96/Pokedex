let currentPokemon;
let allPokemons = [];
let currentPokemons = [];
let offset = 0;
let limit = 151;
let functionBool = true;

//INIT FUNCTION ---> ONLOAD
async function init() {
    document.getElementById('loadingScreen').classList.remove('d-none');
    await loadPokemons();
    renderPokedex();
    document.getElementById('loadingScreen').classList.add('d-none');
}

//LOAD POKEMONS FROM API
async function loadPokemons() {
    for (let i = offset; i < offset + limit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
        currentPokemons.push(currentPokemon);
        console.log(currentPokemon);
    }
}

//RENDER & CREATE POKEDEX
function renderPokedex() {
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';
    for (let i = 0; i < currentPokemons.length; i++) {
        pokedex.innerHTML += renderPokemons(currentPokemons, i);
    }
}

//OPEN BIG POKEMON-CARD
function openDetailCard(id) {
    const foundPokemon = allPokemons.find(pokemon => pokemon['id'] === id);
    const i = allPokemons.findIndex(pokemon => pokemon['id'] === id);
    let pokemonCards = document.getElementById('renderedPokemonCards');

    pokemonCards.innerHTML = renderDetailCard(foundPokemon, i);
    pokemonCards.classList.remove('d-none');
    document.getElementById('pokedex').classList.add('d-none');

    renderPokemonAttacks(foundPokemon);
    renderPokemonAbilities(foundPokemon);
}


function renderPokemonAttacks(foundPokemon) {
    let pokeAttackContainer = document.getElementById('pokemonAttacks');

    for (let i = 0; i < foundPokemon['abilities'].length; i++) {
        const abilitie = foundPokemon['abilities'][i]['ability']['name'];
        pokeAttackContainer.innerHTML += /*html*/`
        <div class="pokemon-attacks">${abilitie.replace(/^.{1}/g, abilitie[0].toUpperCase())}</div>`;
    }
}



function renderPokemonAbilities(foundPokemon) {
    let pokeAbilitiesContainer = document.getElementById('pokemonAbilities');

    for (let i = 0; i < foundPokemon['moves'].length; i++) {
        const move = foundPokemon['moves'][i]['move']['name'];
        pokeAbilitiesContainer.innerHTML += /*html*/`
        <div class="pokemon-abilities">${move.replace(/^.{1}/g, move[0].toUpperCase())}</div>`;
    }
}

//FIRST FUNCTION FOR THE POKECARDMENU
function changeOnStats() {
    document.getElementById('statsHeader').style.textDecoration = "underline";
    document.getElementById('attacksHeader').style.textDecoration = "none";
    document.getElementById('abilitiesHeader').style.textDecoration = "none";
    document.getElementById('pokemonAbilities').classList.add('d-none');
    document.getElementById('stats').classList.remove('d-none');
    document.getElementById('pokemonAttacks').classList.add('d-none');
}

//SECOND FUNCTION FOR THE POKECARDMENU
function changeOnAttacks() {
    document.getElementById('statsHeader').style.textDecoration = "none";
    document.getElementById('attacksHeader').style.textDecoration = "underline";
    document.getElementById('abilitiesHeader').style.textDecoration = "none";
    document.getElementById('pokemonAbilities').classList.add('d-none');
    document.getElementById('stats').classList.add('d-none');
    document.getElementById('pokemonAttacks').classList.remove('d-none');
}

//THIRD FUNCTION FOR THE POKECARDMENU
function changeOnAbilities() {
    document.getElementById('statsHeader').style.textDecoration = "none";
    document.getElementById('attacksHeader').style.textDecoration = "none";
    document.getElementById('abilitiesHeader').style.textDecoration = "underline";
    document.getElementById('pokemonAbilities').classList.remove('d-none');
    document.getElementById('stats').classList.add('d-none');
    document.getElementById('pokemonAttacks').classList.add('d-none');
}

//CLOSE BIG POKEMON-CARD
function quitDetailCard() {
    document.getElementById('renderedPokemonCards').classList.add('d-none');
    document.getElementById('pokedex').classList.remove('d-none');
}

//PREFUNCTION FOR SEARCH
async function getSearchedPokemon() {
    let searchInput = document.getElementById('myInput').value;
    let foundPokemonNames = namesOfAllPokemon.filter(pokemon => pokemon.includes(searchInput));
    searchPokemon(foundPokemonNames);
}

//FUNCTION FOR SEARCHBAR
async function searchPokemon() {
    currentPokemons = [];
    let search = document.getElementById('searchBar').value;

    input = search.toLowerCase();
    for (let i = 0; i < allPokemons.length; i++) {
        if (allPokemons[i]['name'].includes(input)) {
            currentPokemons.push(allPokemons[i]);
        }
    }
    renderPokedex();
}

function clearSearchbar() {
    document.getElementById('searchBar').value = '';
}

//FUNCTION US NOT INCLUDED
function notIncluded() {
    alert('not included yet');
}

let stepsize = 20;
window.onscroll = async function scroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && functionBool) {
        functionBool = false;
        limit = limit + stepsize;
        await loadMorePokemons();
        functionBool = true;
    }
};


async function loadMorePokemons() {
    for (let i = limit - stepsize; i < limit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
        currentPokemons.push(currentPokemon);
        console.log(currentPokemon.length);
        pokedex.innerHTML += renderPokemons(currentPokemons, i);
    }
}