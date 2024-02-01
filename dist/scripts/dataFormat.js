
const idFormat = (num) => {
    if(num.length === 1){
        return `#00${num}`;
    }
    else if(num.length === 2){
        return `#0${num}`;
    }
    else if(num.length === 3){
        return `#${num}`;
    }
}

const nameFormat = (name) => {
    let nameArr = name.split("");
    nameArr[0] = nameArr[0].toUpperCase();
    return nameArr.join("");
}

const moveFormat = (move) => {
    let dash = false;
    let arr = [];
    for(let i = 0; i < move.length; i++)
    {
        if(move[i] === "-"){
            dash = true;
        }
    }
    if(dash){
        arr = move.split("-");
        return arr.map(w => nameFormat(w)).join(" ");
    } else{
        return nameFormat(move);
    }
}

export {idFormat, nameFormat, moveFormat }