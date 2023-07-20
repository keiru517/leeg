/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'main': '#111315',
                'nav': '#1A1D1F',
                'default': '#272b30',
                'primary': '#00AFFF',
                'light-gray': '#353A41',
                'success': '#34A853',
                'danger': '#E7112D'

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
                'main': '14px',
            },
            screens: {
                '3xl': '1440px'
            }
        }
        // margin: {
        // '26px': '26px'
        // }
    },
    plugins: []
}
