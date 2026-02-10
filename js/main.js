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

// Calculate how many tiles fit in the carousel container for different screen sizes
function getVisibleCount() {
  const carouselWidth = document.querySelector(".carousel-container").offsetWidth;
  const tile = document.querySelector(".tile");

  // Fallback if tiles are not rendered yet
  if (!tile) return 1;

  const tileWidth = tile.offsetWidth + 20; // 20 = padding in CSS
  return Math.floor(carouselWidth / tileWidth) || 1;
}


// Next button
document.getElementById("nextBtn").onclick = () => {
  const visibleCount = getVisibleCount();

  // Move forward by number of visible tiles
  if (index + visibleCount < filtered.length) {
    index += visibleCount;
  } else {
    // Snap to last valid position
    index = filtered.length - visibleCount;
  }

  // Prevent negative index
  if (index < 0) index = 0;

  render();
};


// Previous button
document.getElementById("prevBtn").onclick = () => {
  const visibleCount = getVisibleCount();

  // Move backward by number of visible tiles
  index -= visibleCount;

  // Prevent going below zero
  if (index < 0) index = 0;

  render();
};

// Re-render carousel when screen size changes
window.addEventListener("resize", () => {
  const visibleCount = getVisibleCount();

  // Clamp index so it stays valid
  if (index + visibleCount > filtered.length) {
    index = Math.max(0, filtered.length - visibleCount);
  }

  render();
});


// Initial render
render();
