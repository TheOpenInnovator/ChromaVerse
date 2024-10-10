# ChromaVerse

---
**Description**  
The ChromaVerse is a sophisticated web application that allows users to generate and compare color palettes based on hex values, random inputs, or mood-based descriptions. Users can generate multiple palettes, view individual color details, download the palettes, and compare them in a side-by-side view. The design is sleek and professional, featuring hover effects, color previews, and advanced download capabilities for both color palettes and gradients.

---

### **Features**

1. **Multiple Hex Input**: Users can enter multiple hex values separated by commas to generate individual color swatches and a gradient.
2. **Auto-detection of Colors**: Enter any text or mood description, and the system will attempt to extract relevant hex values or generate colors based on the input.
3. **Circle Color Display**: Each generated color is displayed in a circular swatch for better visualization.
4. **Gradient Generation**: A gradient of all generated colors is automatically provided.
5. **Color Download**: Download the entire palette or the generated gradient as a PNG image.
6. **Hex Value Display**: Display individual hex values for each color in the palette, with a "Copy" button to easily copy the hex code.
7. **Hover Effects**: Enhanced hover effects make the individual colors pop when hovered over, improving the user experience.
8. **Color Selector**: A color picker tool is available, allowing users to manually select colors and display their hex values in real-time.
9. **Multiple Palettes**: Generate multiple palettes in succession. Each palette has an option to delete it, with an alert message for confirmation.
10. **Compare Palettes**: Add palettes to a "Compare List" to visually compare different color combinations in a side-by-side view.
11. **Remove & Clear All Palettes**: Users can remove individual palettes from the compare list or clear all palettes with an alert confirmation before clearing.
12. **Download Compare List**: Download all palettes in the compare list as a single PNG image.
13. **Professional Styling**: Advanced UI design with modern CSS techniques such as glassmorphism, smooth transitions, and responsive design ensures the app looks polished and professional.

---

### **How to Use**

1. **Enter Hex Values**: In the input field, you can enter one or more hex values separated by commas. Optionally, enter text descriptions or moods, and the system will auto-detect and generate colors for you.
2. **Generate Palette**: Click the "Generate" button to generate a color palette. Colors are displayed as circular swatches, and a gradient of all colors is also shown.
3. **Hover Over Colors**: Move your mouse over the individual colors to see enhanced previews and view the respective hex codes.
4. **Download Options**: Use the provided buttons to download either the generated color palette or the gradient as a PNG file.
5. **Copy Hex Values**: Copy individual hex codes using the "Copy" button next to each color.
6. **Add to Compare List**: Click "Add to Compare List" to move the generated palette to a comparison section.
7. **Compare & Delete Palettes**: View and compare multiple palettes, remove individual palettes, or clear all with a confirmation alert.
8. **Download Compare List**: After comparing palettes, download them all as a single PNG image for future reference.

---

### **Installation Instructions**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/color-palette-generator.git
   cd color-palette-generator
   ```

2. **Open `index.html`** in your browser:
   ```bash
   open index.html
   ```

---

### **File Structure**

```
color-palette-generator/
├── index.html   # Main HTML file
├── style.css    # CSS file for styling the UI
├── script.js    # JavaScript file for functionality
```

---

### **Code Overview**

#### **HTML**
- The HTML provides the structure for the input field, buttons, color display, compare list, and download options.
- It uses `<input>`, `<button>`, `<div>`, and `<canvas>` elements to structure the UI and interact with JavaScript for functionality.

#### **CSS**
- The CSS includes advanced styles for hover effects, glassmorphism, dark mode support, responsive design, and other modern UI elements.
- Colors are controlled using CSS variables, making it easy to switch between light and dark modes.
  
#### **JavaScript**
- JavaScript is used to generate color palettes from user input, handle hex value extraction, manage the compare list, enable downloading of images, and add interactivity such as hover effects and alerts.
- The code leverages canvas for rendering images for download and clipboard API for copying hex values.

---

### **Technologies Used**
1. **HTML5**: Provides the structure for the application.
2. **CSS3**: Responsible for responsive design, hover effects, and the modern glassmorphic style.
3. **JavaScript**: Handles logic for generating palettes, extracting colors, downloading images, and interactivity.
4. **Canvas API**: Used to generate downloadable PNG images of color palettes and gradients.

---

### **License**
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---
