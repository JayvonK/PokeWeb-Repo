
const BodyColor = (color) => {
    switch (color) {
        case "red":
            return "bg-pokeRed";
            break;
        case "blue":
            return "bg-pokeBlue";
            break;
        case "white":
            return "bg-pokeWhite";
            break;
        case "black":
            return "bg-pokeBlack";
            break;
        case "pink":
            return "bg-pokePink";
            break;
        case "purple":
            return "bg-pokePurple";
            break;
        case "green":
            return "bg-pokeGreen";
            break;
        case "gray":
            return "bg-pokeGray";
            break;
        case "brown":
            return "bg-pokeBrown";
            break;
        case "yellow":
            return "bg-pokeYellow";
            break;
    }
}

export { BodyColor }