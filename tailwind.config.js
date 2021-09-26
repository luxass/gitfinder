module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundColor: {
                "light-blue": "#1e2a47",
                "dark-blue": "#141d2f",
                "darker-blue": "#141d2f"
            },
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
