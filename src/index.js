document.addEventListener("DOMContentLoaded", () => {
    // Challenge 1: Fetch and Render Dog Images
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const imgContainer = document.getElementById("dog-image-container");

    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(imageUrl => {
                const img = document.createElement("img");
                img.src = imageUrl; // Set the image source.
                img.alt = "A cute dog"; // Add alternative text for accessibility.
                imgContainer.appendChild(img); // Append the image to the container.
            });
        })
        .catch(error => console.error("Error fetching dog images:", error));

    // Challenge 2 and 3: Fetch, Render Breeds, and Add Click Event
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const breedList = document.getElementById("dog-breeds");
    const dropdown = document.getElementById("breed-dropdown"); // Select the dropdown

    let allBreeds = []; // To store all fetched breeds

    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message); // Store all breeds

            // Render breeds
            renderBreeds(allBreeds);

            // Add dropdown event listener for filtering
            dropdown.addEventListener("change", (event) => {
                const selectedLetter = event.target.value;
                const filteredBreeds = allBreeds.filter(breed =>
                    breed.startsWith(selectedLetter)
                );
                renderBreeds(filteredBreeds); // Re-render with filtered breeds
            });
        })
        .catch(error => console.error("Error fetching breeds:", error));

    // Function to render breeds
    function renderBreeds(breeds) {
        breedList.innerHTML = ""; // Clear existing breeds
        breeds.forEach(breed => {
            const li = document.createElement("li");
            li.textContent = breed;

            // Add click event to change font color
            li.addEventListener("click", () => {
                li.style.color = "blue"; // Change this to any color
            });

            breedList.appendChild(li);
        });
    }
});