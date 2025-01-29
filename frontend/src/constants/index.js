/*A constants folder with an index.js file containing this export is typically used for organizing and centralizing static values in a project.

Why Use a constants Folder?
Centralized Management: Instead of defining themes in multiple places, keeping them in one file makes maintenance easier.

Reusability: Any part of the application that needs themes can import them from this file.

Readability: Improves code clarity by clearly defining available options.

Scalability: If themes need to be updated, they can be modified in one place.

What Is This Code Doing?
It exports an array called THEMES, which contains a list of theme names.
These themes are likely used in a UI framework like DaisyUI, which provides pre-built themes 
for Tailwind CSS. Components in the app can reference THEMES to allow users to switch themes dynamically.
*/

export const THEMES = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
];