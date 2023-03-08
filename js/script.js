let currentPokemon;
let allPokemons = [];
let currentPokemons = [];
let offset = 0;
let limit = 151;
let functionBool = true;
let stepsize = 20;
let cardIsOpen = false;

let searched = false;


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
    let loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.remove('d-none');
    await loadPokemons();
    renderPokedex();
    loadingScreen.classList.add('d-none');
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
    // console.log(id);
    cardIsOpen = true;
    let foundPokemon = allPokemons.find(pokemon => pokemon['id'] === id);
    let i = allPokemons.findIndex(pokemon => pokemon['id'] === id);
    // console.log(i);
    // console.log(foundPokemon.name);
    let pokemonCards = document.getElementById('renderedPokemonCard');
    let type = allPokemons[i]['types'];
    // console.log(allPokemons[i]['types'][0]['type'].name);

    pokemonCards.innerHTML = renderDetailCard(foundPokemon, i);
    pokemonCards.classList.remove('d-none');
    document.getElementById('pokedex').classList.add('d-none');
    // checkIdForSwipe(id);
    checkFirst(id);
    checkIfBigCardIsOpen();
    renderPokemonAttacks(foundPokemon);
    renderPokemonAbilities(foundPokemon);
    checkSecondType(i);
    getPokemonType(i);
    if (type.length > 1) {
        addBgSec(i);
    }
}

// 
function checkIfBigCardIsOpen() {
    if (cardIsOpen = true) {
        document.getElementById('searchBox').classList.add('d-none');
        document.getElementById('searchText').classList.add('d-none');
    }
}

// CLOSE OVERLAY
function closeOverlay(event) {
    event.stopPropagation();
    cardIsOpen = false;
    if (!cardIsOpen) {
        quitDetailCard();
    }
}

// 
function renderPokemonAttacks(foundPokemon) {
    let pokeAttackContainer = document.getElementById('pokemonAttacks');

    for (let i = 0; i < foundPokemon['abilities'].length; i++) {
        let abilitie = foundPokemon['abilities'][i]['ability']['name'];
        pokeAttackContainer.innerHTML += /*html*/`
        <div class="pokemon-attacks">${abilitie.replace(/^.{1}/g, abilitie[0].toUpperCase())}</div>`;
    }
}

// 
function renderPokemonAbilities(foundPokemon) {
    let pokeAbilitiesContainer = document.getElementById('pokemonAbilities');

    for (let i = 0; i < foundPokemon['moves'].length; i++) {
        let move = foundPokemon['moves'][i]['move']['name'];
        pokeAbilitiesContainer.innerHTML += /*html*/`
        <div class="pokemon-abilities">${move.replace(/^.{1}/g, move[0].toUpperCase())}</div>`;
    }
}





// CLEAN CODE

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


// CLEAN CODE








// CLOSE BIG POKEMON-CARD
function quitDetailCard() {
    cardIsOpen = false;
    document.getElementById('searchBox').classList.remove('d-none');
    document.getElementById('searchText').classList.remove('d-none');
    document.getElementById('renderedPokemonCard').classList.add('d-none');
    document.getElementById('pokedex').classList.remove('d-none');
    document.getElementById('searchBar').value = '';
}

// PREFUNCTION FOR SEARCH
function getSearchedPokemon() {
    let searchInput = document.getElementById('myInput').value;
    let foundPokemonNames = namesOfAllPokemon.filter(pokemon => pokemon.includes(searchInput));
    searchPokemon(foundPokemonNames);
}

// SEARCHBAR
function searchPokemon() {
    // debugger; 
    console.log(currentPokemons);
    currentPokemons = [];
    let search = document.getElementById('searchBar').value;

    input = search.toLowerCase();
    for (let i = 0; i < allPokemons.length; i++) {
        if (allPokemons[i]['name'].includes(input)) {
            currentPokemons.push(allPokemons[i]);
        }

    }
    checkEmptySearchbar(input);
    getTypes(currentPokemons);
    // console.log('all found Pokemons:', currentPokemons);
}


function getTypes(currentPokemons) {
    for (let i = 0; i < currentPokemons.length; i++) {
        getSearchedPokemonType(i);
        // console.log('first type',allPokemons[i]['types'][0]['type']['name']);
    }
}

// GET TYPE OF SEARCHED POKEMONS
function getSearchedPokemonType(i) {
    // console.log('check:', currentPokemons[i]['name'], currentPokemons[i]['id']);
    // console.log('current Pokemon:',currentPokemons[i]['name']);
    let type = currentPokemons[i]['types'][0]['type']['name'];

    let circle = document.getElementById(`pokescircle_${i}`);
    let typeIcon = typeIcons[type];

    circle.classList.add(typeIcon.class);
    circle.src = typeIcon.src;
    // console.log('check first cirlce of:', currentPokemons[i]['name']);
    // console.log('firstType:', type);

    // console.log('check second cirlce of:', currentPokemons[i]['name']);
    checkSecond_TEST(i);
}

// CHECK IF THERE'S A SECOND TYPE -> WHEN YES -> ADD
function checkSecondType(i) {
    let type = allPokemons[i]['types'];
    let secondType = document.getElementById(`pokescircle_two_${i}`);
    if (type.length > 1) {

        let secType = type[1]['type']['name'];
        // console.log('secType:',secType);
        let typeIcon = typeIcons[secType];
        secondType.classList.remove('d-none');
        secondType.classList.add(typeIcon.class);
        secondType.src = typeIcon.src;
    } else {
        secondType.classList.add('d-none');
    }
}

// CHECK IF THERE'S A SECOND TYPE -> WHEN YES -> ADD
function checkSecond_TEST(i) {
    let type = currentPokemons[i]['types'];
    let secondType = document.getElementById(`pokescircle_two_${i}`);
    if (type.length > 1) {
        // console.log(currentPokemons[i]['name'], 'have two types');
        let secType = type[1]['type']['name'];
        // console.log('secType:',secType);
        let typeIcon = typeIcons[secType];
        secondType.classList.remove('d-none');
        secondType.classList.add(typeIcon.class);
        secondType.src = typeIcon.src;
    } else {
        secondType.classList.add('d-none');
    }
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
    currentPokemons = [];
    checkEmptySearchbar();
    console.log(currentPokemons);
    document.getElementById('searchBar').value = '';
    document.getElementById('emptyCard').classList.add('d-none');
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';
    init();
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

// 
function addBgSec(i) {
    let type = allPokemons[i]['types'][1]['type']['name'];
    let typeIcon = typeIcons[type];
    let secondTypeContainer = document.getElementById(`secondTypeContainer_${i}`);
    secondTypeContainer.classList.add(typeIcon.class);
}

// GET TYPE OF POKEMONS
function getPokemonType(i) {
    let type = allPokemons[i]['types'][0]['type']['name'];
    let circle = document.getElementById(`pokescircle_${i}`);
    let typeIcon = typeIcons[type];
    circle.classList.add(typeIcon.class);
    circle.src = typeIcon.src;
}

// LOAD PREVIOUS DATAIL_CARD
function previousPokemon(i) {
    i--;
    checkFirst(i);
    openDetailCard(allPokemons[i]['id']);
}

// CHECK IF CARD IS FIRST OF ALL
function checkFirst(i) {
    if (i <= 1) {
        let left = document.getElementById(`left`);
        left.classList.add('d-none');
    } else {
        left.classList.remove('d-none');
    }
}

// LOAD NEXT DATAIL_CARD
function nextPokemon(i) {
    i++;
    openDetailCard(allPokemons[i]['id']);
}
