let dataMap = new Map();

const setValue = (key,value)=>{
    dataMap.set(key,value);
}

const getValue = (key)=>{
    return dataMap.get(key)
}

const getMap = ()=> {
    return dataMap
}

module.exports = {
    setValue,
    getValue,
    getMap
}