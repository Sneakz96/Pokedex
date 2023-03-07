let currentPokemon;
let allPokemons = [];
let currentPokemons = [];
let offset = 0;
let limit = 151;
let functionBool = true;
let stepsize = 20;
let cardIsOpen = false;
let typeIcons = {
    grass: { class: 'color_bg_grass', src: 'img/icons/grass.svg' },
    fire: { class: 'color_bg_fire', src: 'img/icons/fire.svg' },
    water: { class: 'color_bg_water', src: 'img/icons/water.svg' },
    bug: { class: 'color_bg_bug', src: 'img/icons/bug.svg' },
    dark: { class: 'color_bg_dark', src: 'img/icons/dark.svg' },
    dragon: { class: 'color_bg_dragon', src: 'img/icons/dragon.svg' },
    electric: { class: 'color_bg_electric', src: 'img/icons/electric.svg' },
    fairy: { class: 'color_bg_fairy', src: 'img/icons/fairy.svg' },
    fighting: { class: 'color_bg_fighting', src: 'img/icons/fighting.svg' },
    flying: { class: 'color_bg_flying', src: 'img/icons/flying.svg' },
    ghost: { class: 'color_bg_ghost', src: 'img/icons/ghost.svg' },
    ground: { class: 'color_bg_ground', src: 'img/icons/ground.svg' },
    ice: { class: 'color_bg_ice', src: 'img/icons/ice.svg' },
    poison: { class: 'color_bg_poison', src: 'img/icons/poison.svg' },
    normal: { class: 'color_bg_normal', src: 'img/icons/normal.svg' },
    steel: { class: 'color_bg_steel', src: 'img/icons/steel.svg' },
    rock: { class: 'color_bg_rock', src: 'img/icons/rock.svg' },
    psychic: { class: 'color_bg_psychic', src: 'img/icons/psychic.svg' }
};

// INIT FUNCTION AT ONLOAD
async function init() {
    document.getElementById('loadingScreen').classList.remove('d-none');
    await loadPokemons();
    renderPokedex();
    document.getElementById('loadingScreen').classList.add('d-none');
    console.log(cardIsOpen);
}

// LOAD POKEMONS FROM API
async function loadPokemons() {
    for (let i = offset; i < offset + limit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
        currentPokemons.push(currentPokemon);
    }
}

// RENDER & CREATE POKEDEX
function renderPokedex() {
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';
    for (let i = 0; i < currentPokemons.length; i++) {
        pokedex.innerHTML += renderPokemons(currentPokemons, i);
        checkSecondType(i);
        getPokemonType(i);
    }
}

// OPEN BIG POKEMON-CARD
function openDetailCard(id) {
    cardIsOpen = true;
    let foundPokemon = allPokemons.find(pokemon => pokemon['id'] === id);
    let i = allPokemons.findIndex(pokemon => pokemon['id'] === id);
    let pokemonCards = document.getElementById('renderedPokemonCards');
    let type = allPokemons[i]['types'];
    let card = `pokemonCard_${i}`;
    pokemonCards.innerHTML = renderDetailCard(foundPokemon, i);
    pokemonCards.classList.remove('d-none');
    document.getElementById('pokedex').classList.add('d-none');
    // event.stopPropagation();
    renderPokemonAttacks(foundPokemon);
    renderPokemonAbilities(foundPokemon);
    checkSecondType(i);
    getPokemonType(i);
    console.log(cardIsOpen);
    console.log(card);
    if (type.length > 1) {
        addBgSec(i);
    }
}
function func1(event) {
    event.stopPropagation();
    console.log('overlay open?:',cardIsOpen);
    cardIsOpen = false;
    if (!cardIsOpen) {
        console.log('close overlay',cardIsOpen);
        quitDetailCard();
    }
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
    cardIsOpen = false;
    document.getElementById('renderedPokemonCards').classList.add('d-none');
    document.getElementById('pokedex').classList.remove('d-none');
    console.log(cardIsOpen);
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

// CHECK IF THERE'S A SECOND TYPE -> WHEN YES -> ADD
function checkSecondType(i) {
    let type = allPokemons[i]['types'];
    let secondType = document.getElementById(`pokescircle_two_${i}`);
    if (type.length > 1) {
        let secType = type[1]['type']['name'];
        let typeIcon = typeIcons[secType];
        secondType.classList.remove('d-none');
        secondType.classList.add(typeIcon.class);
        secondType.src = typeIcon.src;
    }
}

function addBgSec(i) {
    let type = allPokemons[i]['types'][1]['type']['name'];
    let typeIcon = typeIcons[type];
    let secondTypeContainer = document.getElementById(`secondTypeContainer_${i}`);
    secondTypeContainer.classList.add(typeIcon.class);
    // secondTypeContainer.classList.add(  allPokemons[i]['types'][0]['type']['name']);
    console.log(secondTypeContainer);
    console.log(i);
}

// GET TYPE OF POKEMONS
function getPokemonType(i) {
    let type = allPokemons[i]['types'][0]['type']['name'];
    let circle = document.getElementById(`pokescircle_${i}`);
    let typeIcon = typeIcons[type];
    circle.classList.add(typeIcon.class);
    circle.src = typeIcon.src;
}

//
function previosPokemon(i) {
    console.log('previosPokemon', i - 1);
}

// 
function nextPokemon(i) {
    console.log('nextPokemon', i++);
}
