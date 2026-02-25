const breedInput = document.getElementById("breedInput");
    const breedList = document.getElementById("breedList");
    const showBtn = document.getElementById("showBtn");
    const dogImage = document.getElementById("dogImage");
    const message = document.getElementById("message");

    let imageInterval = null;
    let breeds = [];

    // Load all breeds for autocomplete
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(res => res.json())
      .then(data => {
        breeds = Object.keys(data.message);
        breeds.forEach(breed => {
          const option = document.createElement("option");
          option.value = breed;
          breedList.appendChild(option);
        });
      });

    function loadRandomImage(breed) {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(res => res.json())
        .then(data => {
          dogImage.src = data.message;
        });
    }

    showBtn.addEventListener("click", () => {
      const breed = breedInput.value.toLowerCase().trim();

      // Stop previous image loop
      if (imageInterval) {
        clearInterval(imageInterval);
      }

      if (!breeds.includes(breed)) {
        message.textContent = "No such breed";
        dogImage.src = "";
        return;
      }

      message.textContent = "";
      loadRandomImage(breed);

      imageInterval = setInterval(() => {
        loadRandomImage(breed);
      }, 5000);
    });
