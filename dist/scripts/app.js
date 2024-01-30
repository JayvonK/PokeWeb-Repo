let pokeImg = document.getElementById("pokeImg");
let pokeTypes = [];

const GetPokemonData = async (pokemon) => {
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    const data = await promise.json();
    return data;
}

const GetPokeImg = async (pokemonData) => {
    return pokemonData.sprites.other["official-artwork"].front_default;
}

const GetPokeEvolveImg = async (pokemonData) => {
    return pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default;;
}

const GetPokeTypes = async (pokemonData) => {
    pokeTypes = [];
    pokemonData.types.map(t => {
        console.log(t.type.name);
        pokeTypes.push(t.type.name);
    })
    console.log(pokeTypes);
}

const GetPokeName = async (pokemonData) => {
    return pokemonData.species.name;
}

