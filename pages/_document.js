import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
return (
<Html lang="en">
<Head>
<meta charSet="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="Epic Tech AI Visuals: AI-powered, genre-mapped, audio-reactive music gallery for Suno & all creative musicians. Remix and enjoy every song in 3D." />
<meta property="og:title" content="Epic Tech AI Visuals" />
<meta property="og:description" content="Remix, randomize, and see every beat in animated 3D. Suno x Epic Tech AI's music gallery and open mic hub." />
<meta property="og:image" content="/og-preview.svg" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://epic-tech-ai-lounge.vercel.app/" />
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Epic Tech AI Visuals" />
<meta name="twitter:description" content="Every Suno track. Every genre. Every visual mind-blowing. Remix and share instantly." />
<meta name="twitter:image" content="/og-preview.svg" />
<link rel="icon" href="/favicon.svg" />
<meta name="theme-color" content="#64ffda" />
<link rel="apple-touch-icon" href="/logo.svg" />
</Head>
<body>
<Main />
<NextScript />
</body>
</Html>
);
}
