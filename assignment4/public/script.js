const breedInput = document.getElementById('breed-input');
const breedsList = document.getElementById('breeds');
const showBtn = document.getElementById('show-btn');
const img = document.getElementById('dog-img');
const error = document.getElementById('error');

let intervalId = null;

/* Load breeds from local API */
fetch('/breeds')
  .then(res => res.json())
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed;
      breedsList.appendChild(option);
    });
  });

showBtn.addEventListener('click', () => {
  const breed = breedInput.value.toLowerCase();

  if (intervalId) clearInterval(intervalId);

  fetchImage(breed);
  intervalId = setInterval(() => fetchImage(breed), 5000);
});

function fetchImage(breed) {
  fetch(`/image/${breed}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        error.textContent = 'No such breed';
        img.src = '';
        clearInterval(intervalId);
      } else {
        error.textContent = '';
        img.src = data.message;
      }
    });
}
