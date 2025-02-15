export const addToFavourites = () => {
  const fullHearts = document.querySelectorAll(".heart-full-icon");
  const hearts = document.querySelectorAll(".heart-icon");
  const loadingModal = document.getElementById("loading-modal");
  const addedMessage = document.querySelector(".added-message");

  hearts.forEach((heart, i) => {
    const heartId = heart.dataset.id;

    // Check if the heart was previously marked as "favourite"
    const favouriteStatus = localStorage.getItem(`heart-${heartId}`);

    // If it's favourite, show full heart on page load
    if (favouriteStatus === "true") {
      fullHearts[i].classList.remove("hidden");
      heart.classList.add("hidden");
    }

    // Listen for clicks on the heart icon
    heart.addEventListener("click", async () => {
      try {
        // Add to favourites
        const result = await axios.put(
          "http://localhost:3000/addToFavourites",
          {
            id: heartId,
            addToFavorites: true,
          }
        );

        if (result.data.favourite) {
          // Show full heart and hide empty heart
          fullHearts[i].classList.remove("hidden");
          heart.classList.add("hidden");

          // Save to LocalStorage
          localStorage.setItem(`heart-${heartId}`, "true");
          // Loading Modal Display
          loadingModal.classList.remove("hidden");

          // Modal Message
          const modalMessage = document.createElement("div");
          modalMessage.classList.add("favourites-modal");
          modalMessage.innerHTML = `<p>Saved</p> <p><a class="favourites-list" href="/favourites">VIEW LIST</a></p>`;

          // Clear previous message and append new modal message
          addedMessage.innerHTML = "";
          addedMessage.appendChild(modalMessage);

          // Trigger animation by removing and adding the class again
          if (addedMessage) {
            addedMessage.classList.remove("hidden");

            addedMessage.offsetHeight; // This forces a reflow

            // Re-add the hidden class to reset animation
            addedMessage.classList.add("hidden");

            // Show it again with the animation after a short delay
            setTimeout(() => {
              addedMessage.classList.remove("hidden");
            }, 50); // Delay to allow the browser to recalculate
          }
        }
      } catch (error) {
        console.log(`Error:`, error);
      } finally {
        loadingModal.classList.add("hidden");
      }
    });

    // Listen for clicks on the full heart icon
    fullHearts[i].addEventListener("click", async () => {
      try {
        // Remove from favourites
        const result = await axios.put(
          "http://localhost:3000/addToFavourites",
          {
            id: heartId,
            addToFavorites: false,
          }
        );

        if (!result.data.favourite) {
          // Show empty heart and hide full heart
          fullHearts[i].classList.add("hidden");
          heart.classList.remove("hidden");

          // Remove from LocalStorage
          localStorage.setItem(`heart-${heartId}`, "false");

          const modalMessage = document.createElement("div");
          modalMessage.classList.add("favourites-modal");
          modalMessage.innerHTML = `<p>The item has been removed from favourites</p>`;

          // Clear previous message and append new modal message
          addedMessage.innerHTML = "";
          addedMessage.appendChild(modalMessage);

          // Trigger animation by removing and adding the class again
          if (addedMessage) {
            addedMessage.classList.remove("hidden");

            addedMessage.offsetHeight; // This forces a reflow

            // Re-add the hidden class to reset animation
            addedMessage.classList.add("hidden");

            // Show it again with the animation after a short delay
            setTimeout(() => {
              addedMessage.classList.remove("hidden");
            }, 50); // Delay to allow the browser to recalculate
          }
        }
      } catch (error) {
        console.log(`Error:`, error);
      }
    });
  });
};

//   addToFavourites();
