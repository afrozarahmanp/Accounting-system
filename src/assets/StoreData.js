
const addToDb = id => {
    let allGroups = getGroups();
    // add quantity
    const quantity = allGroups[id];
    if (!quantity) {
        allGroups[id] = 1;
    }
    else {
        const newQuantity = quantity + 1;
        allGroups[id] = newQuantity;
    }
    localStorage.setItem('group-data', JSON.stringify(allGroups));
}

const removeFromDb = id => {
    const allGroups = getGroups();
    if (id in allGroups) {
        delete allGroups[id];
        localStorage.setItem('group-data', JSON.stringify(allGroups));
    }
}

const getGroups = () => {
    let allGroups = {};

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('group-data');
    if (storedCart) {
        allGroups = JSON.parse(storedCart);
    }
    return allGroups;
}

const deleteAllGroups = () => {
    localStorage.removeItem('group-data');
}

export {
    addToDb,
    removeFromDb,
    getGroups,
    deleteAllGroups
}