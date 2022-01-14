export const getDataFromLocalStorage = (key, defaultParams) => {
    return JSON.parse(localStorage.getItem(key)) || defaultParams;
}

export const setDataToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify({...data}));
}