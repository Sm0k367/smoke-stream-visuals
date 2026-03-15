import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
return (
<Html lang="en">
<Head>
<meta charSet="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="Epic Tech AI Visuals: AI-powered, genre-mapped, audio-reactive music gallery for Suno & all creative musicians." />
<meta property="og:title" content="Epic Tech AI Visuals" />
<meta property="og:description" content="Every Suno track. Every genre. Every visual mind-blowing. Remix and share instantly." />
<meta property="og:image" content="/logo.svg" />
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Epic Tech AI Visuals" />
<meta name="twitter:description" content="Remix, randomize, and share your Suno songs and AI audio-visuals instantly." />
<link rel="icon" href="/favicon.svg" />
<meta name="theme-color" content="#64ffda" />
</Head>
<body>
<Main />
<NextScript />
</body>
</Html>
);
}
