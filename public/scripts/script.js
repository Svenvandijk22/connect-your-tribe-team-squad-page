document.addEventListener("DOMContentLoaded", () => {

  const kaarten = document.querySelectorAll(".fifa-kaart");
  const team = document.getElementById("team");

  kaarten.forEach((kaart) => {
    kaart.style.cursor = "pointer";

    kaart.addEventListener("click", () => {

      const img = kaart.querySelector("img");
      const idEl = kaart.querySelector(".id");

      const src = img?.src;
      const name = img?.alt || "Onbekend";
      const id = idEl?.textContent?.trim();

      // voorkom dubbel toevoegen
      if (id && team.querySelector(`[data-id="${id}"]`)) return;

      const li = document.createElement("li");

      // 🔥 zelfde styling als galerij
      li.classList.add("fifa-kaart");

      if (id) li.dataset.id = id;

      li.innerHTML = `
        <p class="id">${id}</p>
        <img src="${src}" alt="${name}">
      `;

      team.appendChild(li);
    });
  });

});

