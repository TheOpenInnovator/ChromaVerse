const colorInput = document.getElementById("colorInput");
const generateBtn = document.getElementById("generateBtn");
const colorPicker = document.getElementById("colorPicker");
const selectedColor = document.getElementById("selectedColor");
const modeToggle = document.getElementById("modeToggle");
const palettesContainer = document.getElementById("palettesContainer");
const snapshotModal = document.getElementById("snapshotModal");
const shareSnapshotModal = document.getElementById("shareSnapshotModal");
const closeModal = document.getElementsByClassName("close-modal")[0];
const usernameInput = document.getElementById("usernameInput");
const snapshotCanvas = document.getElementById("snapshotCanvas");
const downloadBtn = document.getElementById("downloadBtn");
const shareFacebook = document.getElementById("shareFacebook");
const shareTwitter = document.getElementById("shareTwitter");
const shareInstagram = document.getElementById("shareInstagram");
const sharePinterest = document.getElementById("sharePinterest");

let palettes = [];

// Color extraction function
function extractColors(input) {
  const colorRegex =
    /(#(?:[0-9a-f]{3}){1,2}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|[a-z]+)/gi;
  return input.match(colorRegex) || [];
}

// Color generation based on mood or theme
function generateColorsFromMood(mood) {
  const moodColors = {
    happy: ["#FFD700", "#FFA500", "#FF4500", "#FF6347", "#FF69B4"],
    calm: ["#E0FFFF", "#B0E0E6", "#87CEEB", "#4682B4", "#6495ED"],
    energetic: ["#FF0000", "#FF4500", "#FFA500", "#FFFF00", "#00FF00"],
    elegant: ["#000000", "#FFFFFF", "#C0C0C0", "#808080", "#A9A9A9"],
    natural: ["#228B22", "#32CD32", "#90EE90", "#8FBC8F", "#006400"],
  };

  return moodColors[mood.toLowerCase()] || generateRandomColors(5);
}

// Random color generation
function generateRandomColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  }
  return colors;
}

// Palette generation
function generatePalette() {
  const input = colorInput.value.trim();
  let colors;

  if (input.startsWith("#") || input.startsWith("rgb")) {
    colors = extractColors(input);
  } else if (
    ["happy", "calm", "energetic", "elegant", "natural"].includes(
      input.toLowerCase()
    )
  ) {
    colors = generateColorsFromMood(input);
  } else {
    colors = generateRandomColors(5);
  }

  const palette = {
    id: Date.now(),
    colors: colors,
  };

  palettes.unshift(palette);
  renderPalettes();
}

// Render palettes
function renderPalettes() {
  palettesContainer.innerHTML = "";
  palettes.forEach((palette) => {
    const paletteCard = document.createElement("div");
    paletteCard.className = "palette-card glassmorphism";

    const colorsDiv = document.createElement("div");
    colorsDiv.className = "palette-colors";

    palette.colors.forEach((color) => {
      const colorSwatch = document.createElement("div");
      colorSwatch.className = "color-swatch";
      colorSwatch.style.backgroundColor = color;
      colorSwatch.title = color;
      colorSwatch.addEventListener("click", () => copyToClipboard(color));
      colorsDiv.appendChild(colorSwatch);
    });

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "palette-actions";

    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Save';
    saveBtn.addEventListener("click", () => savePalette(palette));

    const shareBtn = document.createElement("button");
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share';
    shareBtn.addEventListener("click", () => openSnapshotModal(palette));

    actionsDiv.appendChild(saveBtn);
    actionsDiv.appendChild(shareBtn);

    paletteCard.appendChild(colorsDiv);
    paletteCard.appendChild(actionsDiv);
    palettesContainer.appendChild(paletteCard);
  });
}

// Copy color to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      alert(`Copied ${text} to clipboard!`);
    },
    (err) => {
      console.error("Could not copy text: ", err);
    }
  );
}

// Save palette
function savePalette(palette) {
  const savedPalettes = JSON.parse(localStorage.getItem("savedPalettes")) || [];
  savedPalettes.push(palette);
  localStorage.setItem("savedPalettes", JSON.stringify(savedPalettes));
  alert("Palette saved successfully!");
}

// Open snapshot modal
function openSnapshotModal(palette) {
  SnapshotModal.style.display = "block";
  // Add event listener for the username input field
  usernameInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission if within a form
      const username = usernameInput.value.trim();
      renderSnapshotCanvas(palette, username);
      usernameInput.blur(); // Remove focus from the input field
    }
  });
  // Enter Button Event Listner 
  let enterBtn = document.getElementById("enterBtn");
  enterBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    renderSnapshotCanvas(palette, username); // Pass the last palette and username to the render function
  });

  // Delete Button Event Listener
  let deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", () => {
    const username = '';
    usernameInput.value = '';
    renderSnapshotCanvas(palette, username); // Pass the last palette and username to the render function
  });

  // Edit Button Event Listener
  let editBtn = document.getElementById("editBtn");
  editBtn.addEventListener("click", () => {
    const currentUsername = usernameInput.value.trim();
    usernameInput.value = currentUsername;
    usernameInput.focus();
    usernameInput.select();

    // Update the snapshot when the user finishes editing
    usernameInput.addEventListener("blur", () => {
      const newUsername = usernameInput.value.trim();
      if (newUsername !== currentUsername) {
        renderSnapshotCanvas(palette, newUsername);
      }
    });
  });
  renderSnapshotCanvas(palette);
}

function openSnapshotModal(palette) {
  shareSnapshotModal.style.display = "flex";
  renderSnapshotCanvas(palette);
}

// Render snapshot canvas
function renderSnapshotCanvas(palette, username) {
  const ctx = snapshotCanvas.getContext("2d");
  const width = 600;
  const height = 400;
  snapshotCanvas.width = width;
  snapshotCanvas.height = height;

  // Background
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.fillStyle = "#333";
  ctx.font = "bold 24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("ChromaVerse Palette", width / 2, 40);

  // Username
  let userName;
  if (username) {
    userName = username;
  } else {
    userName = "Anonymous";
  }
  ctx.font = "16px Arial";
  ctx.fillText(`Created by: ${userName}`, width / 2, 70);

  // Color swatches
  const swatchSize = 80;
  const startX = (width - swatchSize * palette.colors.length) / 2;
  const startY = 100;

  palette.colors.forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.fillRect(startX + index * swatchSize, startY, swatchSize, swatchSize);

    ctx.fillStyle = "#333";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      color,
      startX + index * swatchSize + swatchSize / 2,
      startY + swatchSize + 20
    );
  });

  // Website URL
  ctx.fillStyle = "#666";
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.fillText("www.chromaverse.com", width / 2, height - 20);
}

// Download snapshot
function downloadSnapshot() {
  const dataUrl = snapshotCanvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "chromaverse_palette.png";
  link.click();
}

// Share on social media
function shareOnSocialMedia(platform) {
  const dataUrl = snapshotCanvas.toDataURL("image/png");
  let shareUrl;

  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        dataUrl
      )}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=Check%20out%20my%20ChromaVerse%20palette!&url=${encodeURIComponent(
        dataUrl
      )}`;
      break;
    case "instagram":
      alert(
        "To share on Instagram, please download the image and upload it manually to your Instagram account."
      );
      return;
    case "pinterest":
      shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
        window.location.href
      )}&media=${encodeURIComponent(
        dataUrl
      )}&description=My%20ChromaVerse%20Palette`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank");
  }
}

// Event listeners
generateBtn.addEventListener("click", generatePalette);

colorPicker.addEventListener("input", (e) => {
  selectedColor.textContent = e.target.value;
  selectedColor.style.backgroundColor = e.target.value;

  const rValue = parseInt(e.target.value.slice(1, 3), 16);

  selectedColor.style.color = rValue <= 128 ? 'white' : 'black';
});

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const icon = modeToggle.querySelector("i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});

closeModal.addEventListener("click", () => {
  shareSnapshotModal.style.display = "none";
});

downloadBtn.addEventListener("click", downloadSnapshot);

shareFacebook.addEventListener("click", () => shareOnSocialMedia("facebook"));
shareTwitter.addEventListener("click", () => shareOnSocialMedia("twitter"));
shareInstagram.addEventListener("click", () => shareOnSocialMedia("instagram"));
sharePinterest.addEventListener("click", () => shareOnSocialMedia("pinterest"));

// Color harmonization function
function harmonizeColors(baseColor, count = 5) {
  const hsl = hexToHSL(baseColor);
  const harmonizedColors = [];

  for (let i = 0; i < count; i++) {
    const newHue = (hsl.h + i * (360 / count)) % 360;
    harmonizedColors.push(hslToHex(newHue, hsl.s, hsl.l));
  }

  return harmonizedColors;
}

// Helper functions for color conversion
function hexToHSL(hex) {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substr(1, 2), 16);
    g = parseInt(hex.substr(3, 2), 16);
    b = parseInt(hex.substr(5, 2), 16);
  }
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Initialize the app
function init() {
  const savedPalettes = JSON.parse(localStorage.getItem("savedPalettes")) || [];
  palettes = savedPalettes;
  renderPalettes();
}

init();

