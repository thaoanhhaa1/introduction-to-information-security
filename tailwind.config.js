/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#1DC071',
                secondary: '#6F49FD',
                'primary-extra-2': '#F1FBF7',
                'text-1': '#171725',
                'text-2': '#4B5264',
                'text-3': '#808191',
                'text-4': '#A2A2A8',
                'text-5': '#B2B3BD',
                error: '#EB5757',
            },
            backgroundImage: {
                '404-page':
                    'url("https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif")',
            },
        },
    },
    plugins: [],
};
