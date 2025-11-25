/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Solita Core Neutrals
                'solita-black': '#282828',
                'solita-light-grey': '#E6E6E6',
                'solita-mid-grey': '#828282',
                'solita-dark-grey': '#505050',
                // Solita Accent Colors
                'solita-green': '#576449',
                'solita-ochre': '#DA9353',
                'solita-red': '#D04848',
            },
            fontFamily: {
                sans: ['Sharp Sans', 'Century Gothic', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
