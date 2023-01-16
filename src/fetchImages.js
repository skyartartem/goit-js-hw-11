import axios from 'axios';
export async function fetchImages(name, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '32854135-9d23b52454b3142f3a14ae48f';
  const resp = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  // if (!resp.ok) {
  //   throw new Error(resp.statusText);
  // }
  return await resp.data;
}
