// pages/index.js
import { useState } from "react";
import styled from "styled-components";
import SongSelector from "../components/SongSelector";
import Visualizer from "../components/Visualizer";

// Import playlist (may need to use require in some environments)
import playlist from "../public/playlist.json";

const Wrapper = styled.div`
max-width: 950px;
margin: 40px auto 0 auto;
padding: 28px 18px 60px 18px;
background: rgba(22,22,33,0.95);
border-radius: 24px;
box-shadow: 0 10px 32px #000a;
`;

const Title = styled.h1`
font-size: 2.5rem;
font-weight: 900;
letter-spacing: -2px;
margin-bottom: 0.2em;
`;

const Credits = styled.div`
opacity: 0.7;
margin-top: 38px;
text-align: right;
`;

export default function Home() {
const [selected, setSelected] = useState(playlist[0]);

return (
<Wrapper>
<Title>
DJ Smoke Stream – Suno Visual Gallery
</Title>
<SongSelector
songs={playlist}
selected={selected}
onSelect={setSelected}
/>

{/* Suno player (iframe only, NO children inside iframe!) */}
{selected.id && (
<div>
<iframe
src={`https://suno.com/embed/${selected.id}`}
width="760"
height="240"
frameBorder="0"
allow="autoplay; encrypted-media; fullscreen"
allowFullScreen
loading="lazy"
style={{ borderRadius: 12, margin: "20px 0" }}
title={selected.title}
/>
</div>
)}
{/* Fallback: direct Suno page link if no embed available */}
{!selected.id && (
<div style={{ marginBottom: 24 }}>
<a
href={`https://suno.com/song/${encodeURIComponent(selected.title.replace(/\s+/g, "-").toLowerCase())}`}
target="_blank"
rel="noopener noreferrer"
style={{ color: "#64ffda", fontWeight: 700, fontSize: 22 }}
>
Listen on Suno
</a>
</div>
)}
{/* 3D/FFT/Custom Visualizer */}
<Visualizer song={selected} />

<Credits>
Built for <a href="https://suno.com/@dj_smoke_stream">DJ Smoke Stream</a> by <b>SmokeStream AI</b> ⚡️
</Credits>
</Wrapper>
);
}
