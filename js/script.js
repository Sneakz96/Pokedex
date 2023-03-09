// CURRENT
let currentPokemon;
// ARRAYS
let allPokemons = [];
let renderedPokemons = [];
// VARIABLES
let offset = 0;
let limit = 151;
let stepsize = 20;
// BOOLEANS
let functionBool = true;
let cardIsOpen = false;
let searched = false;
let single = false;
// SET TYPE_ICONS
let typeIcons = {
    grass: { class: 'color_bg_grass', src: './img/icons/grass.svg' },
    fire: { class: 'color_bg_fire', src: './img/icons/fire.svg' },
    water: { class: 'color_bg_water', src: './img/icons/water.svg' },
    bug: { class: 'color_bg_bug', src: './img/icons/bug.svg' },
    dark: { class: 'color_bg_dark', src: './img/icons/dark.svg' },
    dragon: { class: 'color_bg_dragon', src: './img/icons/dragon.svg' },
    electric: { class: 'color_bg_electric', src: './img/icons/electric.svg' },
    fairy: { class: 'color_bg_fairy', src: './img/icons/fairy.svg' },
    fighting: { class: 'color_bg_fighting', src: './img/icons/fighting.svg' },
    flying: { class: 'color_bg_flying', src: './img/icons/flying.svg' },
    ghost: { class: 'color_bg_ghost', src: './img/icons/ghost.svg' },
    ground: { class: 'color_bg_ground', src: './img/icons/ground.svg' },
    ice: { class: 'color_bg_ice', src: './img/icons/ice.svg' },
    poison: { class: 'color_bg_poison', src: './img/icons/poison.svg' },
    normal: { class: 'color_bg_normal', src: './img/icons/normal.svg' },
    steel: { class: 'color_bg_steel', src: './img/icons/steel.svg' },
    rock: { class: 'color_bg_rock', src: './img/icons/rock.svg' },
    psychic: { class: 'color_bg_psychic', src: './img/icons/psychic.svg' }
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
        renderedPokemons.push(currentPokemon);
    }
}

// RENDER & CREATE POKEDEX
function renderPokedex() {
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';
    for (let i = 0; i < renderedPokemons.length; i++) {
        pokedex.innerHTML += renderPokemons(renderedPokemons, i);
        checkSecondType(i);
        getPokemonType(i);
    }
}

// OPEN BIG POKEMON-CARD
function openDetailCard(id) {
    cardIsOpen = true;

    let foundPokemon = renderedPokemons.find(pokemon => pokemon['id'] === id);
    let i = renderedPokemons.findIndex(pokemon => pokemon['id'] === id);
    let pokemonCards = document.getElementById('renderedPokemonCard');

    pokemonCards.innerHTML = renderDetailCard(foundPokemon, i);
    pokemonCards.classList.remove('d-none');
    document.getElementById('pokedex').classList.add('d-none');

    checkCurrentPokemon(id);
    renderCurrentPokemon(foundPokemon, i);
}

// CHECK DATA FOR CURRENT POKEMON
function checkCurrentPokemon(id) {
    checkFirst(id);
    checkArrayLengthForSwipe();
    checkIfBigCardIsOpen();
}

// RENDER STATS FOR CURRENT POKEMON
function renderCurrentPokemon(foundPokemon, i) {
    renderPokemonAttacks(foundPokemon);
    renderPokemonAbilities(foundPokemon);
    checkSecondType(i);
    getPokemonType(i);
}

// CHECK IF A CARD IS OPEN
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

// RENDER ATTACKS OF CURRENT POKEMON 
function renderPokemonAttacks(foundPokemon) {
    let pokeAttackContainer = document.getElementById('pokemonAttacks');

    for (let i = 0; i < foundPokemon['abilities'].length; i++) {
        let abilitie = foundPokemon['abilities'][i]['ability']['name'];
        pokeAttackContainer.innerHTML += /*html*/`
        <div class="pokemon-attacks">${abilitie.replace(/^.{1}/g, abilitie[0].toUpperCase())}</div>`;
    }
}

// RENDER ABILITIES OF CURRENT POKEMON 
function renderPokemonAbilities(foundPokemon) {
    let pokeAbilitiesContainer = document.getElementById('pokemonAbilities');

    for (let i = 0; i < foundPokemon['moves'].length; i++) {
        let move = foundPokemon['moves'][i]['move']['name'];
        pokeAbilitiesContainer.innerHTML += /*html*/`
        <div class="pokemon-abilities">${move.replace(/^.{1}/g, move[0].toUpperCase())}</div>`;
    }
}

// CHECK IF THERE'S A SECOND TYPE -> WHEN YES -> ADD
function checkSecondType(i) {
    let type = allPokemons[i]['types'];
    if (type.length == 2) {
        let secondType = document.getElementById(`pokescircle_two_${i}`);
        let secType = type[1]['type']['name'];
        let typeIcon = typeIcons[secType];

        if (cardIsOpen) {
            let secondType_opened = document.getElementById(`pokescircle_opened_two_${i}`);
            let secondType_Container = document.getElementById(`secondTypeContainer_${i}`);
            secondType_Container.classList.add(typeIcon.class);
            secondType_opened.classList.remove('d-none');
            secondType_opened.classList.add(typeIcon.class);
            secondType_opened.src = typeIcon.src;
        } else {
            secondType.classList.remove('d-none');
            secondType.classList.add(typeIcon.class);
            secondType.src = typeIcon.src;
        }
    }
}

// CHANGE OF ACTIVE INFO
function changeInfo(param){
    toggleSectionVisibility(param);
}
changeInfo('stats');
changeInfo('attacks');
changeInfo('abilities');

/**
 * sectionId OF CURRENT POKEMON 
 * @param {'stats'} sectionId 
 * @param {'attacks'} sectionId 
 * @param {'abilities'} sectionId 
 */
function toggleSectionVisibility(sectionId) {
    let activeSectionId = `${sectionId}Header`;
    let inactiveSectionIds = ['statsHeader', 'attacksHeader', 'abilitiesHeader'].filter(id => id !== activeSectionId);
    let visibleSectionId = `pokemon${sectionId.charAt(0).toUpperCase()}${sectionId.slice(1)}`;
    let hiddenSectionIds = ['pokemonStats', 'pokemonAttacks', 'pokemonAbilities'].filter(id => id !== visibleSectionId);

    inactiveSectionIds.forEach(id => {
        document.getElementById(id).style.textDecoration = 'none';
    });
    hiddenSectionIds.forEach(id => {
        document.getElementById(id).classList.add('d-none');
    });
    document.getElementById(activeSectionId).style.textDecoration = 'underline';
    document.getElementById(visibleSectionId).classList.remove('d-none');
}

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

// GET TYPE OF POKEMONS
async function getPokemonType(i) {
    let type = allPokemons[i]['types'][0]['type']['name'];
    let circle = document.getElementById(`pokescircle_${i}`);
    let typeIcon = typeIcons[type];

    if (cardIsOpen) {
        let circle_opened = document.getElementById(`pokescircle_opened_one_${i}`);
        circle_opened.classList.add(typeIcon.class);
        circle_opened.src = typeIcon.src;
    } else {
        circle.classList.add(typeIcon.class);
        circle.src = typeIcon.src;
    }
}

// SEARCHBAR
function searchPokemon() {
    renderedPokemons = [];
    let search = document.getElementById('searchBar').value;
    let input = search.toLowerCase();

    for (let i = 0; i < allPokemons.length; i++) {
        if (allPokemons[i]['name'].includes(input)) {
            renderedPokemons.push(allPokemons[i]);
        }
    }

    checkEmptySearchbar(input);
    getTypes();
}

// GET TYPES OF SEARCHED POKEMONS -> ARRAY CHANGED
function getTypes() {
    for (let i = 0; i < renderedPokemons.length; i++) {
        getSearchedPokemonType(i);
        checkSecondTypeOnDetailCard(i);
    }
}

// GET TYPE OF SEARCHED POKEMONS
function getSearchedPokemonType(i) {
    searched = true;
    let type = renderedPokemons[i]['types'][0]['type']['name'];
    let circle = document.getElementById(`pokescircle_${i}`);
    let typeIcon = typeIcons[type];

    circle.classList = [];
    circle.classList.add('class-circle', typeIcon.class);
    circle.src = typeIcon.src;
}

// CHECK IF THERE'S A SECOND TYPE -> WHEN YES -> ADD
function checkSecondTypeOnDetailCard(i) {
    let type = renderedPokemons[i]['types'];
    let secondType = document.getElementById(`pokescircle_two_${i}`);
    if (type.length == 2) {
        let secType = type[1]['type']['name'];
        let typeIcon = typeIcons[secType];
        secondType.classList = [];
        secondType.classList.add('class-circle', typeIcon.class);
        secondType.src = typeIcon.src;
    } else {
        secondType.classList.add('d-none');
    }
}

// CHECK ARRAY LENGTH OF SEARCHED/FOUND POKEMONS
// SET BOOLEAN
function checkArrayLengthForSwipe() {
    if (renderedPokemons.length == 1) {
        console.log(renderedPokemons);
        single = true;
    } else {
        single = false;
    }
    checkSingle();
}

// CHECK FOUND POKEMON IS ALONE IN ARRAY 
// -> WHEN YES DISPLAY NONE TO ARROWS
function checkSingle() {
    if (single) {
        // LEFT
        let left = document.getElementById(`left`);
        left.classList.add('d-none');
        //RIGHT
        let right = document.getElementById(`right`);
        right.classList.add('d-none');
    }
}

// CHECK IF SEARCHBAR VALUE == 0
function checkEmptySearchbar() {
    if (renderedPokemons.length === 0) {
        document.getElementById('emptyCard').classList.remove('d-none');
        searched = false;
    } else {
        document.getElementById('emptyCard').classList.add('d-none');
    }
    renderPokedex();
}

// CLEAR OUT SEARCHBAR -> SET LENGTH/VALUE = 0
function clearSearchbar() {
    renderedPokemons = [];
    checkEmptySearchbar();
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
        renderedPokemons.push(currentPokemon);
        pokedex.innerHTML += renderPokemons(renderedPokemons, i);
        await getPokemonType(i);
    }
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

// LOAD PREVIOUS DATAIL_CARD
function previousPokemon(i) {
    i--;
    checkFirst(i);
    openDetailCard(renderedPokemons[i]['id']);
}

// LOAD NEXT DATAIL_CARD
function nextPokemon(i) {
    i++;
    openDetailCard(renderedPokemons[i]['id']);
    checkMax();
}

// CHECK IF LIMIT OF ARRAY IS REACHED
function checkMax(i) {
    let right = document.getElementById(`right`);
    if (i >= renderedPokemons.length) {
        right.classList.add('d-none');
    } else {
        right.classList.remove('d-none');
    }
}