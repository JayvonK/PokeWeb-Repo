import { pokeTypeDiv } from "./app.js"
import { nameFormat } from "./dataFormat.js";

const AddType = (type) => {
    let p = document.createElement("p");
    p.className = "px-4 py-2 chakraBold md:text-3xl text-2xl";
    p.textContent = nameFormat(type);

    let button = document.createElement("button");
    switch (type) {
        case "normal":
            button.className = "bg-normal rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "water":
            button.className = "bg-water rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "fighting":
            button.className = "bg-fighting rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "flying":
            button.className = "bg-flying rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "poison":
            button.className = "bg-poison rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "ground":
            button.className = "bg-ground rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "rock":
            button.className = "bg-rock rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "bug":
            button.className = "bg-bug rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "ghost":
            button.className = "bg-ghost rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "steel":
            button.className = "bg-steel rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "fire":
            button.className = "bg-fire rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "grass":
            button.className = "bg-grass rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "electric":
            button.className = "bg-electric rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "psychic":
            button.className = "bg-psychic rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "ice":
            button.className = "bg-ice rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "dragon":
            button.className = "bg-dragon rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "dark":
            button.className = "bg-dark rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "fairy":
            button.className = "bg-fairy rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "unknown":
            button.className = "bg-unknown rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "shadow":
            button.className = "bg-shadow rounded-[50px] drop-shadow-lg mr-3";
            break;
    }

    button.append(p);

    pokeTypeDiv.append(button);
}

export {AddType}