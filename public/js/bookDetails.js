// BookDetailsPage

export const setUpBookDetails = () => {
  const description = document.querySelector(".details-description");

  if (description && description.textContent.length > 500) {
    const originalText = description.textContent; // Save the full text
    const partialText = originalText.slice(0, 500) + "... "; // Trimmed text

    // Set initial truncated text
    description.textContent = partialText;

    // Check if buttons already exist to avoid duplicates
    let readMoreBtn = description.querySelector(".read-more-btn");
    let readLessBtn = description.querySelector(".read-less-btn");

    if (!readMoreBtn) 
      // Create "Read More" button
      readMoreBtn = document.createElement("button");
      readMoreBtn.classList.add("description-buttons", "read-more-btn");
      readMoreBtn.textContent = "Read More";
      description.appendChild(readMoreBtn);
    }

    if (!readLessBtn) {
      // Create "Read Less" button
      readLessBtn = document.createElement("button");
      readLessBtn.classList.add(
        "description-buttons",
        "read-less-btn",
        "hidden"
      );
      readLessBtn.textContent = "Read Less";
      description.appendChild(readLessBtn);
    }

    // "Read More" button click event
    readMoreBtn.addEventListener("click", () => {
      description.textContent = originalText;
      readMoreBtn.classList.add("hidden");
      readLessBtn.classList.remove("hidden");
      description.appendChild(readLessBtn);
    });

    // "Read Less" button click event
    readLessBtn.addEventListener("click", () => {
      description.textContent = partialText;
      readLessBtn.classList.add("hidden");
      readMoreBtn.classList.remove("hidden");
      description.appendChild(readMoreBtn);
    });
  }

  // Editing and Deleting book functionalities
  const editBtn = document.querySelector(".edit-btn");
  const saveBtn = document.querySelector(".save-btn");
  const editInput = document.querySelector(".edit-input");
  const bookDescription = document.querySelector(".details-description");

  editBtn.addEventListener("click", () => {
    bookDescription.classList.add("hidden");
    editInput.classList.remove("hidden");
    editBtn.classList.add("hidden");
    saveBtn.classList.remove("hidden");
  });

  saveBtn.addEventListener("click", async () => {
    const inputValue = editInput.value.trim();
    const bookId = saveBtn.dataset.id;
    try {
      const result = await axios.put(
        `http://localhost:3000/editBook/${bookId}`,
        {
          newDescription: inputValue,
        }
      );
      if (result.data.editedDescription) {
        bookDescription.textContent = result.data.editedDescription;
        bookDescription.classList.remove("hidden");
        editInput.classList.add("hidden");
        editBtn.classList.remove("hidden");
        saveBtn.classList.add("hidden");
        setupReadMoreFeature();
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  });

  // Deleting Book
  const showModal = () => {
    document.querySelector(".modal").classList.remove("hidden");
  };

  const closeModal = () => {
    document.querySelector(".modal").classList.add("hidden");
  };
  const deleteBtn = document.querySelector(".delete-btn");
  const modalDeleteBtn = document.querySelector(".btn-delete");
  const modalCancelBtn = document.querySelector(".cancel-btn");
  const closeIcon = document.querySelector(".close-icon");

  deleteBtn.addEventListener("click", () => {
    showModal(); //Opening Modal
  });

  closeIcon.addEventListener("click", () => {
    // Closing Modal
    closeModal();
  });
  modalCancelBtn.addEventListener("click", () => {
    // Closing Modal
    closeModal();
  });

  document.addEventListener("click", (event) => {
    const modal = document.querySelector(".modal");
    console.log(event.target);
    if (event.target === modal) closeModal();
  });

  modalDeleteBtn.addEventListener("click", async () => {
    const bookId = modalDeleteBtn.dataset.id;
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteBook/${bookId}`
      );

      if (response.data.deletedBook) {
        window.location.href = "/";
      } else {
        console.log("Failed to delete item");
      }
    } catch (error) {
      console.log("Error deleting book:", error);
    }
  });
};
