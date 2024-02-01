import { pokeFavs, favoritesDiv, GetPokeImg, GetPokemonData, CreatePokemon } from "./app.js";

const UpdateFavs = async () => {
    favoritesDiv.innerHTML = "";
    for(let i = 0; i < pokeFavs.length; i++){
        let img = document.createElement("img");
        img.className = "w-28 transition duration-300 ease-out hover:scale-110";
        img.src = GetPokeImg(await GetPokemonData(pokeFavs[i]));
        img.alt = "Picture of " + pokeFavs[i];

        img.addEventListener('click', (event) => {
            CreatePokemon(pokeFavs[i]);
        })
        favoritesDiv.append(img);
    }
}

export { UpdateFavs }