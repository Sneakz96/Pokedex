function renderPokemons(allPokemons, i) {
    return `
    <div id="pokePreview_${i}" class="pokemon-preview color_bg_${allPokemons[i]['types'][0]['type']['name']}" onclick="openDetailCard(${allPokemons[i]['id']})">
    <div id="pokenumber_${i}" class="poke-number">#${allPokemons[i]['id']}</div>
    <h2 id="pokeName_${i}" class="poke-name">${allPokemons[i]['name']}</h2>
    <img id="pokePicture_${i}" class="small-pokemons" src="${allPokemons[i]['sprites']['other']['official-artwork']['front_default']}">
    <div id="poketype_${i}" class="poketype">${allPokemons[i]['types'][0]['type']['name']}</div>
    </div>`
}


function renderDetailCard(foundPokemon, i) {
    return `
    <div id="pokemonCard_${i}" class="pokemon-info-card  color_bg_${foundPokemon['types'][0]['type']['name']}">
    <img class="arrow-back"  onclick="quitDetailCard(${i})" src="./img/arrow-121-32.png">
        <div id="pokecard">
           <h2 id="pokemonName_${i}" class="poke-name">${foundPokemon['name']}</h2>
            <div class="pokemon-type-btn">
                <span id="pokemonTypes_${i}">${foundPokemon['types'][0]['type']['name']}</span>
            </div>
            <img id="pokemonImage_${i}" class="pokepic" src="${foundPokemon['sprites']['other']['official-artwork']['front_default']}">
        </div>
        <div class="info-container">
            <nav class="poke-nav">
                <a id="statsHeader" onclick="changeOnStats(${i})">Stats</a>
                <a id="attacksHeader" onclick="changeOnAttacks(${i})">Attacks</a>
                <a id="abilitiesHeader" onclick="changeOnAbilities(${i})">Abilities</a>
            </nav>
            <div id="pokemonAttacks" class="attacks d-none">
            </div>
            <div id="pokemonAbilities" class="abilities d-none">
            </div>
            <div id="stats">
                <div class="stats-class">
                    <div id="hp" class="name">${foundPokemon['stats'][0]['stat']['name']}</div>
                    <div class="progress">
                        <div id="hpBar" class="progress-bar bg-success" role="progressbar" style="width: ${foundPokemon['stats'][0]['base_stat']}%"
                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${foundPokemon['stats'][0]['base_stat']}
                        </div>
                    </div>
                </div>
                <div class="stats-class">
                    <div id="attack" class="name">${foundPokemon['stats'][1]['stat']['name']}</div>
                    <div class="progress">
                     <div id="attackBar" class="progress-bar bg-warning" role="progressbar" style="width: ${foundPokemon['stats'][1]['base_stat']}%"
                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${foundPokemon['stats'][1]['base_stat']}
                        </div>
                    </div>
                </div>
                <div class="stats-class">
                    <div id="defense" class="name">${foundPokemon['stats'][2]['stat']['name']}</div>
                    <div class="progress">
                        <div id="defenseBar" class="progress-bar bg-danger" role="progressbar" style="width: ${foundPokemon['stats'][2]['base_stat']}%"
                            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">${foundPokemon['stats'][2]['base_stat']}
                        </div>
                    </div>
                </div>
                <div class="stats-class">
                    <div id="special-attack" class="name">${foundPokemon['stats'][3]['stat']['name']}</div>
                    <div class="progress">
                        <div id="saBar" class="progress-bar bg-warning" role="progressbar" style="width: ${foundPokemon['stats'][3]['base_stat']}%"
                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${foundPokemon['stats'][3]['base_stat']}
                        </div>
                    </div>
                </div>
                    <div class="stats-class">
                    <div id="special-defense" class="name">${foundPokemon['stats'][4]['stat']['name']}</div>
                    <div class="progress">
                        <div id="sdBar" class="progress-bar bg-danger" role="progressbar" style="width: ${foundPokemon['stats'][4]['base_stat']}%"
                            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">${foundPokemon['stats'][4]['base_stat']}
                        </div>
                </div>
                </div>
                <div class="stats-class">
                    <div id="speed" class="name">${foundPokemon['stats'][5]['stat']['name']}</div>
                    <div class="progress">
                        <div id="speedBar" class="progress-bar bg-info" role="progressbar" style="width: ${foundPokemon['stats'][5]['base_stat']}%"
                            aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">${foundPokemon['stats'][5]['base_stat']}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

}