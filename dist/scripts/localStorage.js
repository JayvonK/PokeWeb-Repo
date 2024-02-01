import { favoritesBtn } from "./app.js"

const CheckFav = (pokemon, array) => {
        if(array.includes(pokemon.toString())){
            favoritesBtn.src = "./assets/icons8-heart-64.png";
            favoritesBtn.alt = "heart";
        } else {
            favoritesBtn.src = "./assets/heartoutline.png";
            favoritesBtn.alt = "heart outline";
        }
}

export { CheckFav }