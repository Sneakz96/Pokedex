let currentPokemon;

const allPokemons = [];

let pokemonlimit = [151];


async function init() {
    await loadPokemons();
    renderPokedex();
}


async function loadPokemons() {
    for (let i = 0; i < 50; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
    }
}


function renderPokedex() {
    let pokedex = document.getElementById('pokedex');
    for (let i = 0; i < 50; i++) {
        pokedex.innerHTML += renderPokemons(allPokemons, i);
    }
}


//OPEN BIG POKEMON-CARD
function openDetailCard(id) {
    const foundPokemon = allPokemons.find(pokemon => pokemon['id'] === id);
    const i = allPokemons.findIndex(pokemon => pokemon['id'] === id);
    console.log(foundPokemon);
    console.log(i);
    let pokemonCards = document.getElementById('renderedPokemonCards');
    renderPokemonAttacks(foundPokemon);
    pokemonCards.innerHTML = renderDetailCard(foundPokemon, i);
    pokemonCards.classList.remove('d-none');
    document.getElementById('pokedex').classList.add('d-none');
}

//CLOSE BIG POKEMON-CARD
function quitDetailCard() {
    document.getElementById('renderedPokemonCards').classList.add('d-none');
    document.getElementById('pokedex').classList.remove('d-none');
}




function renderPokemonAttacks(foundPokemon) {

    let pokeAttackContainer = document.getElementById('pokemonAttacks');
    for (let i = 0; i < foundPokemon['abilities'].length; i++) {
        pokeAttackContainer += foundPokemon['abilities'][i]['ability']['name'];
    }


    //    document.getElementById('pokemonAttacks').innerHTML += currentPokemon['moves'][0]['move']['name'] += '\xa0\xa0';
    //    document.getElementById('pokemonAttacks').innerHTML += currentPokemon['moves'][1]['move']['name'] += '\xa0\xa0';
    //    document.getElementById('pokemonAttacks').innerHTML += currentPokemon['moves'][2]['move']['name'] += '\xa0\xa0';
    //    document.getElementById('pokemonAttacks').innerHTML += currentPokemon['moves'][3]['move']['name'] += '\xa0\xa0';
    //    document.getElementById('pokemonAttacks').innerHTML += currentPokemon['moves'][4]['move']['name'] += '\xa0\xa0';
}


function renderPokemonAbilities() {

    let pokeAbilitiesContainer = document.getElementById('pokemonAttacks');
    for (let i = 0; i < foundPokemon['moves'].length; i++) {
        pokeAbilitiesContainer += foundPokemon['moves'][0]['move']['name'];
    }


    //    document.getElementById('abilities').innerHTML = currentPokemon['abilities'][0]['ability']['name'] += '\xa0\xa0';
    //    document.getElementById('abilities').innerHTML += currentPokemon['abilities'][1]['ability']['name'] += '\xa0\xa0';
    //    document.getElementById('abilities').innerHTML = currentPokemon['abilities'][2]['ability']['name'];
    //    document.getElementById('abilities').innerHTML = currentPokemon['abilities'][3]['ability']['name'];
}


function notIncluded() {
    alert('not included yet');
}

//FIRST FUNCTION FOR THE POKECARDMENU
function changeOnStats() {
    document.getElementById('statsHeader').style.textDecoration = "underline";
    document.getElementById('attacksHeader').style.textDecoration = "none";
    document.getElementById('abilitiesHeader').style.textDecoration = "none";
    document.getElementById('abilities').classList.add('d-none');
    document.getElementById('stats').classList.remove('d-none');
    document.getElementById('pokemonAttacks').classList.add('d-none');
}

//SECOND FUNCTION FOR THE POKECARDMENU
function changeOnAttacks() {
    document.getElementById('statsHeader').style.textDecoration = "none";
    document.getElementById('attacksHeader').style.textDecoration = "underline";
    document.getElementById('abilitiesHeader').style.textDecoration = "none";
    document.getElementById('abilities').classList.add('d-none');
    document.getElementById('stats').classList.add('d-none');
    document.getElementById('pokemonAttacks').classList.remove('d-none');
}

//THIRD FUNCTION FOR THE POKECARDMENU
function changeOnAbilities() {
    document.getElementById('statsHeader').style.textDecoration = "none";
    document.getElementById('attacksHeader').style.textDecoration = "none";
    document.getElementById('abilitiesHeader').style.textDecoration = "underline";
    document.getElementById('abilities').classList.remove('d-none');
    document.getElementById('stats').classList.add('d-none');
    document.getElementById('pokemonAttacks').classList.add('d-none');
}

//FUNCTION FOR SEARCHBAR
function searchPokemon() {
    value = document.getElementById('searchBar').value;
    pokemonExist = false;
    eingabe = value.toLowerCase()
    for (let i = 0; i < allPokemons.length; i++) {
        let element = allPokemons[i]['name']
        if (eingabe == element) {
            renderPokemonInfoCard(i);
            pokemonExist = true;
        }
    }
    if (pokemonExist == false) {
        alert('The Searched Pokemon is not avialable!');
        pokemonExist = false;
    }
}