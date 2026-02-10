// Select DOM elements
const carousel = document.getElementById("novelCarousel");
const searchInput = document.getElementById("searchInput");
const countLabel = document.getElementById("countLabel");

// Index for current slide
let index = 0;

// Filtered novel list
let filtered = novels;

// Render novels on screen
function render() {
  carousel.innerHTML = "";

  // Slice novels in groups of 6
  filtered.slice(index, index + 6).forEach(novel => {

    // Create tile
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerHTML = `<h3>${novel.title}</h3>`;

    // Redirect on click
    tile.onclick = () => {
      window.location.href = `novel.html?id=${novel.id}`;
    };

    carousel.appendChild(tile);
  });

  // Update count label
  countLabel.textContent =
    `Showing ${filtered.length} / ${novels.length} novels`;
}

// Search functionality
searchInput.addEventListener("input", e => {
  filtered = novels.filter(novel =>
    novel.title.toLowerCase().includes(e.target.value.toLowerCase())
  );
  index = 0;
  render();
});

// Next button
document.getElementById("nextBtn").onclick = () => {
  if (index + 6 < filtered.length) {
    index += 6;
    render();
  }
};

// Previous button
document.getElementById("prevBtn").onclick = () => {
  if (index - 6 >= 0) {
    index -= 6;
    render();
  }
};

// Initial render
render();
