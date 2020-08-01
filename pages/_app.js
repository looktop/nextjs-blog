import '../styles/global.css'

export default function App({ Component, pageProps }) {
    console.log('========== _app.js ==========');
    console.log('Component > ', Component);
    console.log('pageProps > ', pageProps);
    return <Component {...pageProps} />
}