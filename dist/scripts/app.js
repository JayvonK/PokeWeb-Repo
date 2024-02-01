import { idFormat, nameFormat } from "./dataFormat.js";
import { BodyColor } from "./bodyColor.js";
import { AddType } from "./addType.js";

let pokeImg = document.getElementById("pokeImg");
let userInput = document.getElementById("userInput");
let searchBtn = document.getElementById("searchBtn");
let randomBtn = document.getElementById("randomBtn");
let favoritesBtn = document.getElementById("favoritesBtn");
let favoritesDiv = document.getElementById("favoritesDiv");
let flavorText = document.getElementById("flavorText");
let pokeId = document.getElementById("pokeId");
let pokeName = document.getElementById("pokeName");
let pokeTypeDiv = document.getElementById("pokeTypeDiv");
let pokeLocation = document.getElementById("pokeLocation");
let pokeAbilities = document.getElementById("pokeAbilities");
let pokeMoves = document.getElementById("pokeMoves");
let flavorText2 = document.getElementById("flavorText2");
let evolutionDiv = document.getElementById("evolutionDiv");
let body = document.getElementById("body");
let pokeShinyImg = document.getElementById("pokeShinyImg");

const GetPokemonData = async (pokemon) => {
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    const data = await promise.json();
    const promise2 = await fetch(data.species.url);
    const data2 = await promise2.json();
    switch (data2.generation.name.toString()) {
        case "generation-i":
            return data;
            break;
        case "generation-ii":
            return data;
            break;
        case "generation-iii":
            return data;
            break;
        case "generation-iv":
            return data;
            break;
        case "generation-v":
            return data;
            break;
    }
}

const GetPokeImg = (pokemonData) => {
    return pokemonData.sprites.other["official-artwork"].front_default;
}

const GetShinyPokeImg = (pokemonData) => {
    return pokemonData.sprites.other["official-artwork"].front_shiny;
}

const GetPokeEvolveImg = (pokemonData) => {
    return pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default;;
}

const GetPokeTypes = (pokemonData) => {
    let pokeTypes = [];
    pokemonData.types.map(t => pokeTypes.push(t.type.name.toString()));
    return pokeTypes;
}

const GetPokeName = (pokemonData) => {
    return nameFormat(pokemonData.species.name.toString());
}


const GetPokeNum = (pokemonData) => {
    return idFormat(pokemonData.id.toString());
}

const GetPokeFlavorText = async (pokemonData) => {
    let id = pokemonData.id;
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + id)
    const data = await promise.json();
    let arr = data.flavor_text_entries;
    let index = arr.findIndex(text => text.language.name === "en");
    return arr[index].flavor_text;
}

const GetPokeMoves = (pokemonData) => {
    let moveArr = [];
    pokemonData.moves.map(m => moveArr.push(m.move.name));
    return moveArr.join(", ");

}

const GetPokeAbilities = (pokemonData) => {
    let abilityArr = [];
    pokemonData.abilities.map(a => abilityArr.push(a.ability.name));
    return abilityArr.join(", ");
}

const GetPokeLocation = async (pokemonData) => {
    let id = pokemonData.id;
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`);
    const data = await promise.json();

    if (data.toString() === "") {
        return "N/A";
    } else {
        const promise2 = await fetch(data[0].location_area.url);
        const data2 = await promise2.json();
        if (data2.names.toString() === "") {
            return data2.location.name;
        } else {
            return data2.names[0].name;
        }
    }
}

const GetPokeColor = async (pokemonData) => {
    let id = pokemonData.id;
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + id)
    const data = await promise.json();
    return BodyColor(data.color.name.toString());
}


const GetPokeEvolution = async (pokemonData) => {
    let id = pokemonData.id;
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + id)
    const data = await promise.json();

    const promise2 = await fetch(data.evolution_chain.url);
    const data2 = await promise2.json();
}

const CreatePokemon = async (pokemon) => {
    let data = await GetPokemonData(pokemon);
    if (data) {
        pokeTypeDiv.innerHTML = "";
        console.log(data);
        pokeImg.src = GetPokeImg(data);
        pokeShinyImg.src = GetShinyPokeImg(data);
        pokeName.textContent = GetPokeName(data);
        pokeId.textContent = GetPokeNum(data);
        pokeLocation.textContent = await GetPokeLocation(data);
        pokeAbilities.textContent = GetPokeAbilities(data);
        pokeMoves.textContent = GetPokeMoves(data);
        flavorText.textContent = await GetPokeFlavorText(data);
        flavorText2.textContent = await GetPokeFlavorText(data);
        body.className = "bg-no-repeat " + await GetPokeColor(data);
        let typeArr = GetPokeTypes(data);
        typeArr.map(type => AddType(type));
    }else {
        alert("Enter a pokemon name / id that's within gen 1 - 5");
    }

}

userInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        CreatePokemon(event.target.value);
    }
})

searchBtn.addEventListener('click', (event) => {
    if (userInput.value) {
        CreatePokemon(userInput.value);
    }
})

randomBtn.addEventListener('click', (event) => {
    let randomNum = Math.floor(Math.random() * 649) + 1;
    CreatePokemon(randomNum);
})

pokeImg.addEventListener('click', (event) => {
    pokeImg.className = "md:w-[550px] h-auto w-[330px] transition duration-300 hover:scale-110 hidden";
    pokeShinyImg.className = "md:w-[550px] h-auto w-[330px] transition duration-300 hover:scale-110";
})

pokeShinyImg.addEventListener('click', (event) => {
    pokeImg.className = "md:w-[550px] h-auto w-[330px] transition duration-300 hover:scale-110";
    pokeShinyImg.className = "md:w-[550px] h-auto w-[330px] transition duration-300 hover:scale-110 hidden";
})

// console.log(GetPokeTypes(await GetPokemonData("charizard")));


export { pokeTypeDiv }