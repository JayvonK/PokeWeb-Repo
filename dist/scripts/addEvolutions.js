import { GetPokeEvolveImg, GetPokemonData, evolutionDiv, CreatePokemon } from "./app.js";

const Evolutions = (array) => {
    
    evolutionDiv.innerHTML = "";
    if (array.length === 0) {
        evolutionDiv.innerText = "No Evolutions";
    } else {
        array.map(pokemon => {
            CreateEvolutions(pokemon[0], pokemon[1]);
        })
    }
}

const CreateEvolutions = async (pokemon1, pokemon2) => {
    let button = document.createElement("button");
    button.className = "bg-black bg-opacity-50 hover:bg-opacity-25 md:w-28 md:h-28 w-20 h-20 rounded-[50px] flex justify-center items-center";

    let img = document.createElement("img");
    img.className = "md:w-20 w-12";
    img.src = GetPokeEvolveImg(await GetPokemonData(pokemon1));
    img.alt = "pokemon evolution";

    button.append(img);

    button.addEventListener('click', (event) => {
        CreatePokemon(pokemon1);
    })

    let arrow = document.createElement("img");
    arrow.className = "w-12 md:mx-10 mx-5";
    arrow.src = "./assets/ArrowRight.png";
    arrow.alt = "picture of arrow";

    let button2 = document.createElement("button");
    button2.className = "bg-black bg-opacity-50 hover:bg-opacity-25 md:w-28 md:h-28 w-20 h-20 rounded-[50px] flex justify-center items-center";

    let img2 = document.createElement("img");
    img2.className = "md:w-20 w-12";
    img2.src = GetPokeEvolveImg(await GetPokemonData(pokemon2));
    img2.alt = "pokemon evolution";

    button2.append(img2);

    button2.addEventListener('click', (event) => {
        CreatePokemon(pokemon2);
    })

    let div = document.createElement("div");
    div.className = "flex justify-start items-center md:mb-8 mb-4";

    div.append(button);
    div.append(arrow);
    div.append(button2);
    evolutionDiv.append(div);
}

export { Evolutions }