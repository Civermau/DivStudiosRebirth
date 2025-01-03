document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tabs li");
  const tabContent = document.getElementById("tabContent");

  // Set first tab as active
  setActiveTab(tabs[0]);

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveTab(tab);
    });
  });

  function setActiveTab(clickedTab) {
    // Remove active class from all tabs
    tabs.forEach((tab) => tab.classList.remove("is-active"));

    // Add active class to clicked tab
    clickedTab.classList.add("is-active");

    // Update content based on selected tab
    const selectedTab = clickedTab.querySelector("a").textContent;
    updateTabContent(selectedTab);
  }

  async function updateTabContent(tabName) {
    switch (tabName) {
      case "Participantes":
        try {
          const response = await fetch("/Events/NoMansLand/players.json");
          const data = await response.json();
          const storedPage = localStorage.getItem("currentPage");
          displayPlayers(data.players, storedPage ? parseInt(storedPage) : 1);
        } catch (error) {
          console.error("Error loading players:", error);
          tabContent.innerHTML = "<p>Error loading players</p>";
        }
        break;

      case "Reglas":
        tabContent.innerHTML =
          '<img src="/Images/NoMansLand/Rules.png" alt="Rules Image">';
        // Remove existing animation classes
        tabContent
          .querySelector("img")
          .classList.remove("animate__animated", "animate__zoomIn");
        // Add animation classes again
        tabContent
          .querySelector("img")
          .classList.add("animate__animated", "animate__zoomIn");
        break;

      case "Mods":
        const carousel = document.createElement("div");
        carousel.id = "mods-carousel";
        carousel.classList.remove("animate__animated", "animate__fadeIn");
        carousel.classList.add("animate__animated", "animate__fadeIn");

        const carouselItems = [
          {
            image: "https://media.forgecdn.net/attachments/305/549/snorkel.png",
          },
          {
            image:
              "https://media.forgecdn.net/attachments/510/121/newscreenshot1.png",
          },
          {
            image:
              "https://media.forgecdn.net/attachments/393/726/screenshot4.png",
          },
          {
            image: "/Images/NoMansLand/Mods/1.png",
          },
          {
            image: "/Images/NoMansLand/Mods/2.png",
          },
          {
            image:
              "https://i.tlauncher.org/images/emotecraft-mod-screenshots-2.jpg",
          },
          {
            image:
              "https://www.9minecraft.net/wp-content/uploads/2019/06/Health-Overlay-mod-for-minecraft-01.jpg",
          },
          {
            image:
              "https://journeymap.readthedocs.io/en/latest/_images/waypoint1.png",
          },
          {
            image:
              "https://media.forgecdn.net/attachments/903/124/morearmors-1.png",
          },
          {
            image: "/Images/NoMansLand/Mods/3.jpg",
          },
          {
            image: "/Images/NoMansLand/Mods/4.png",
          },
          {
            image: "/Images/NoMansLand/Mods/5.webp",
          },
          {
            image:
              "https://media.forgecdn.net/attachments/description/547224/description_89313efd-bb4d-48e6-bd61-414b3eda4a85.png",
          },
          {
            image:
              "https://media.forgecdn.net/attachments/300/239/skrin-gejmpleya-2.png",
          },
        ];

        carouselItems.forEach((item) => {
          const carouselItem = document.createElement("div");
          carouselItem.classList.add("carousel-item");

          const carouselImage = document.createElement("img");
          carouselImage.src = item.image;
          carouselImage.alt = item.title;

          const carouselTitle = document.createElement("h2");
          carouselTitle.textContent = item.title;

          const carouselDescription = document.createElement("p");
          carouselDescription.textContent = item.description;

          carouselItem.appendChild(carouselImage);
          carousel.appendChild(carouselItem);
        });

        tabContent.innerHTML = "";
        tabContent.appendChild(carousel);

        const description = document.createElement("p");
        description.innerHTML =
          'Este es el modpack del evento para que puedas disfrutar de la experiencia cuando desees. Puedes descargarlo <a href="https://www.mediafire.com/file/qullnpabf5tka4u/NoMan%2527sLand.gz/file">aquí</a>.';
        description.classList.add("description-text");
        tabContent.appendChild(description);

        tabContent.classList.add("carousel-container");

        bulmaCarousel.attach("#mods-carousel", {
          slidesToScroll: 1,
          slidesToShow: 1,
          infinite: true,
          autoplay: true,
        });
        break;

      case "Información general":
        tabContent.innerHTML =
          '<img src="/Images/NoMansLand/GeneralInfo.png" alt="GI Image">';
        tabContent
          .querySelector("img")
          .classList.remove("animate__animated", "animate__zoomIn");
        tabContent
          .querySelector("img")
          .classList.add("animate__animated", "animate__zoomIn");
        break;
    }
  }

  function displayPlayers(players, page = 1) {
    const playerGrid = document.createElement("div");
    playerGrid.className = "player-grid";
    // Store the current page number in localStorage
    localStorage.setItem("currentPage", page);
  // Calculate the number of pages
  const pageSize =
    window.innerWidth >= 1024 ? 10 : window.innerWidth >= 768 ? 6 : 4; // Number of players per page based on screen size
    const totalPages = Math.ceil(players.length / pageSize);

    // When the page loads, check if there's a stored page number
    window.addEventListener("resize", () => {
        const storedPage = parseInt(localStorage.getItem("currentPage"));
        const pageSize =
          window.innerWidth >= 1024 ? 10 : window.innerWidth >= 768 ? 6 : 4;
        const totalPages = Math.ceil(players.length / pageSize);
  
        if (storedPage > totalPages) {
          localStorage.setItem("currentPage", totalPages);
          displayPlayers(players, totalPages);
        } else {
          displayPlayers(players, storedPage);
        }
      });
    // Create pagination links
    const pagination = document.createElement("nav");
    pagination.className = "pagination is-centered";
    pagination.setAttribute("role", "navigation");
    pagination.setAttribute("aria-label", "pagination");

    // Create page number links
    const paginationList = document.createElement("ul");
    paginationList.className = "pagination-list";
    for (let i = 1; i <= totalPages; i++) {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.className = "pagination-link";
      if (i === page) link.classList.add("is-current");
      link.textContent = i;
      link.addEventListener("click", (event) => {
        event.preventDefault();
        displayPlayers(players, i);
      });
      listItem.appendChild(link);
      paginationList.appendChild(listItem);
    }
    pagination.appendChild(paginationList);
    // Display players for the selected page
    displayPlayersPage(players, page, pageSize);

    // Append pagination to the tab content
    tabContent.appendChild(pagination);

    // Function to display players for a specific page
    function displayPlayersPage(players, page, pageSize) {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const playersPage = players.slice(start, end);

      // Clear the player grid
      playerGrid.innerHTML = "";

      playersPage.forEach((player) => {
        const playerCard = document.createElement("a");
        playerCard.href = player.twitch
          ? `https://twitch.tv/${player.twitch}`
          : player.youtube
          ? `https://www.youtube.com/${player.youtube}`
          : "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        playerCard.target = "_blank";
        playerCard.className = `player-card animate__animated animate__fadeInUp ${player.status}`;
        playerCard.rel = "noopener noreferrer";

        const playerCardInner = document.createElement("div");
        playerCardInner.className = "player-card-inner";

        const playerImage = document.createElement("img");
        playerImage.src = `https://mc-heads.net/avatar/${player.username}`;
        playerImage.alt = `${player.username}'s avatar`;

        const playerName = document.createElement("h3");
        playerName.className = "player-name";
        playerName.textContent = player.username;

        const playerQuote = document.createElement("p");
        playerQuote.className = "player-quote";
        playerQuote.textContent = player.quote || "uwu";

        playerCardInner.appendChild(playerImage);

        // Add overlay if player is dead
        if (player.status === "dead") {
          const overlay = document.createElement("div");
          overlay.className = "overlay";
          playerCardInner.appendChild(overlay);
        }

        // Add overlay if player is a winner
        if (player.status === "winner") {
          const overlay = document.createElement("div");
          overlay.className = "overlay";
          playerCardInner.appendChild(overlay);
        }

        playerCardInner.appendChild(playerName);
        playerCardInner.appendChild(playerQuote);
        playerCard.appendChild(playerCardInner);
        playerGrid.appendChild(playerCard);
      });

      tabContent.innerHTML = "";
      tabContent.appendChild(playerGrid);
    }
  }

  // Load initial content
  updateTabContent("Participantes");
});
