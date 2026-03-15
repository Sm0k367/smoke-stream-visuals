// pages/_app.js
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html, body {
padding: 0; margin: 0;
font-family: 'Inter', 'system-ui', sans-serif;
background: #0b0b0c;
color: #fff;
min-height: 100vh;
font-size: 18px;
}
*, *:before, *:after { box-sizing: border-box; }
a { color: #64ffda; text-decoration: none; }
a:hover { text-decoration: underline; }
`;

const theme = {
accent: "#64ffda",
background: "#0b0b0c",
border: "#232336",
}

export default function App({ Component, pageProps }) {
return (
<ThemeProvider theme={theme}>
<GlobalStyle />
<Component {...pageProps} />
</ThemeProvider>
);
}
