// ================= GET NOVEL ID FROM URL =================
const params = new URLSearchParams(window.location.search);
const novelId = Number(params.get("id"));

// Find selected novel
const novel = novels.find(n => n.id === novelId);

// Target container
const container = document.getElementById("novelDetails");

// Display novel information
container.innerHTML = `
  <h2>${novel.title}</h2>
  <p>${novel.description}</p>
  <a href="${novel.link}" target="_blank">
    <button>Read / Buy</button>
  </a>
`;