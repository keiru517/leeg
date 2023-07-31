/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    ],
    theme: {
        extend: {
            colors: {
                'black': '#111315',
                'slate': '#1A1D1F',
                'charcoal': '#272b30',
                'primary': '#00AFFF',
                'dark-gray': '#353A41',
                'success': '#34A853',
                'danger': '#F70628',
                'light-gray': '#585E65',
                'middle-gray': '#494e54',
                'font-dark-gray': '#6F767E',
                'font-light-gray': '#99A1B4',
                'red-opacity-10': 'rgb(255 0 0 / 10%)'
            },
            spacing: {
                'nav-width': '1388px',
                'nav-height': '99px',
                'title-width': '348px',
                'title-height': '47px',
                'user-width': '199px',
                'user-height': '44px'
            },
            borderRadius: {
                'background': '20px',
                'default': '10px',
                'main': '14px',
            },
            screens: {
                '3xl': '1440px'
            },
            width: {
                auth:'429px'
            },
            padding: {
                default: '26px'
            }
        }
        // margin: {
        // '26px': '26px'
        // }
    },
    plugins: []
}
