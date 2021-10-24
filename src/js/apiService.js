const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';

const per_page = 12;

const key = '16152697-2240022566bfb10dd1cf00ec5';

function fetchPictures(searchQuery, page = 1) {
  return fetch(BASE_URL + `${searchQuery}&page=${page}&per_page=${per_page}&key=${key}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Not 2xx response');
    })
    .catch(e => console.log('No pictures on your query ', e));
}

export default { fetchPictures };
