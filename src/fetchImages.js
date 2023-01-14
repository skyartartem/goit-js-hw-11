export function fetchImages(name) {
    const BASE_URL = 'https://restcountries.com/v2/name';
    
    return fetch(
      `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
    ).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    });
}