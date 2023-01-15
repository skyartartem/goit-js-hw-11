export async function fetchImages(name) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '32854135-9d23b52454b3142f3a14ae48f'
    const resp = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return await resp.json();
}