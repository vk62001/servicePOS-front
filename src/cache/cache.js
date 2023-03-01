export const setCacheArray = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const setCacheString =  (key, string) => {
    localStorage.setItem(key, string);
}

export  const getCacheArray = (key) => {
    let data =  localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
};

export const  getCacheString = (key) => {
    return localStorage.getItem(key);
}

export const deleteCacheKey = (key) => {
    return new Promise((resolve, reject)=> {
        try {
            localStorage.removeItem(key);
            resolve(true)
        }catch(err){
            resolve(false);
        }
    })
    
}