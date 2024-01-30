
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

export {idFormat, nameFormat}