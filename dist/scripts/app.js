import { idFormat, nameFormat, moveFormat } from "./dataFormat.js";
import { BodyColor } from "./bodyColor.js";
import { AddType } from "./addType.js";
import { CheckFav } from "./localStorage.js";
import { UpdateFavs } from "./updateFav.js";
import { Evolutions } from "./addEvolutions.js";

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
let favoritesDivBtn = document.getElementById("favoritesDivBtn");

let pokeFavs = [];
let currentPokemon = "";

if (localStorage.getItem("pokemonFavorites")) {
    pokeFavs = JSON.parse(localStorage.getItem("pokemonFavorites"));
}



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
    pokemonData.moves.map(m => moveArr.push(moveFormat(m.move.name)));
    console.log(moveArr);
    return moveArr.join(", ");

}

const GetPokeAbilities = (pokemonData) => {
    let abilityArr = [];
    pokemonData.abilities.map(a => abilityArr.push(moveFormat(a.ability.name)));
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
    let evolArr = [];
    let id = pokemonData.id;
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + id)
    const data = await promise.json();

    const promise2 = await fetch(data.evolution_chain.url);
    const data2 = await promise2.json();
    if (data2.chain.evolves_to.length !== 0) {
        data2.chain.evolves_to.map(key => {
            let arr = [];
            arr.push(data2.chain.species.name);
            if (key.species.name === "wormadam") {
                arr.push(413);
            } else {
                arr.push(key.species.name);
            }
            evolArr.push(arr);
        })
        if (data2.chain.evolves_to.every(ev => ev.evolves_to.length !== 0)) {
            for (let i = 0; i < data2.chain.evolves_to.length; i++) {
                data2.chain.evolves_to[i].evolves_to.map(vol => {
                    let arr2 = [];
                    arr2.push(data2.chain.evolves_to[0].species.name);
                    arr2.push(vol.species.name);
                    evolArr.push(arr2);
                })
            }

        }
        return evolArr;
    }

}

const CreatePokemon = async (pokemon) => {
    userInput.value = "";
    currentPokemon = pokemon.toString().toLowerCase();
    let data = await GetPokemonData(pokemon);
    if (data) {
        pokeTypeDiv.innerHTML = "";
        pokeImg.src = GetPokeImg(data);
        pokeShinyImg.src = GetShinyPokeImg(data);
        pokeName.textContent = GetPokeName(data);
        pokeId.textContent = GetPokeNum(data);
        pokeLocation.textContent = await GetPokeLocation(data);
        pokeAbilities.textContent = GetPokeAbilities(data);
        pokeMoves.textContent = GetPokeMoves(data);
        flavorText.textContent = await GetPokeFlavorText(data);
        flavorText2.textContent = await GetPokeFlavorText(data);
        body.className = "bg-repeat " + await GetPokeColor(data);
        let typeArr = GetPokeTypes(data);
        typeArr.map(type => AddType(type));
        CheckFav(pokemon, pokeFavs);
        UpdateFavs();
        Evolutions(await GetPokeEvolution(data));
    } else {
        alert("Enter a pokemon name / id that's within gen 1 - 5");
    }
}

UpdateFavs();

CreatePokemon("squirtle");

userInput.addEventListener('keydown', async (event) => {
    if (event.key === "Enter") {
        if (event.target.value.toLowerCase() === "wormadam" || event.target.value === "413") {
            CreatePokemon(413);
        } else {
            let data = await GetPokemonData(event.target.value.toLowerCase());
            CreatePokemon(data.species.name);
        }

    }
})

searchBtn.addEventListener('click', async (event) => {
    if (userInput.value.toLowerCase() === "wormadam" || userInput.value === "413") {
        CreatePokemon(413);
    } else {
        let data = await GetPokemonData(userInput.value.toLowerCase());
        CreatePokemon(data.species.name);
    }
})

randomBtn.addEventListener('click', async (event) => {
    let randomNum = Math.floor(Math.random() * 649) + 1;
    let nam = await GetPokemonData(randomNum);
    CreatePokemon(nam.species.name.toString());
})

pokeImg.addEventListener('click', (event) => {
    pokeImg.className = "md:w-[550px] h-auto w-72 cursor-pointer transition duration-300 hover:scale-110 hidden";
    pokeShinyImg.className = "md:w-[550px] h-auto w-72 cursor-pointer transition duration-300 hover:scale-110";
})

pokeShinyImg.addEventListener('click', (event) => {
    pokeImg.className = "md:w-[550px] h-auto w-72 cursor-pointer transition duration-300 hover:scale-110";
    pokeShinyImg.className = "md:w-[550px] h-auto w-72 cursor-pointer transition duration-300 hover:scale-110 hidden";
})

favoritesBtn.addEventListener('click', (event) => {
    if (favoritesBtn.alt === "heart outline") {
        console.log("added");
        favoritesBtn.src = "./assets/icons8-heart-64.png";
        favoritesBtn.alt = "heart";
        pokeFavs.push(currentPokemon);
        localStorage.setItem("pokemonFavorites", JSON.stringify(pokeFavs));
        UpdateFavs();
    } else if (favoritesBtn.alt === "heart") {
        console.log("deleted");
        favoritesBtn.src = "./assets/heartoutline.png";
        favoritesBtn.alt = "heart outline";
        let index = pokeFavs.indexOf(currentPokemon);
        pokeFavs.splice(index, 1);
        localStorage.setItem("pokemonFavorites", JSON.stringify(pokeFavs));
        UpdateFavs();
    }
})
await GetPokeEvolution(await GetPokemonData("burmy"));


export { pokeTypeDiv, favoritesBtn, pokeFavs, GetPokemonData, GetPokeImg, CreatePokemon, favoritesDiv, GetPokeEvolveImg, GetPokeEvolution, evolutionDiv }