// pages/index.js
import { useState } from "react";
import styled from "styled-components";
import SongSelector from "../components/SongSelector";
import Visualizer from "../components/Visualizer";
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

const RandomButton = styled.button`
font-size: 1.6rem;
background: linear-gradient(87deg, #64ffda, #22c1c3, #ff6c52 60%);
color: #181a1f;
font-weight: 900;
border: none;
border-radius: 12px;
padding: 13px 44px;
margin: 22px 0;
cursor: pointer;
box-shadow: 0 6px 28px #ff6c5270;
letter-spacing: 0.5px;
transition: scale 0.12s;
&:hover {
scale: 1.06;
background: linear-gradient(87deg, #ff6c52, #64ffda, #22c1c3 70%);
}
`;

export default function Home() {
const [selected, setSelected] = useState(playlist[0]);

// Pick a truly random index
function pickRandomSong() {
let idx;
do {
idx = Math.floor(Math.random() * playlist.length);
} while (playlist[idx].title === selected.title && playlist.length > 1);
setSelected(playlist[idx]);
}

return (
<Wrapper>
<Title>
DJ Smoke Stream – Suno Visual Gallery
</Title>
<RandomButton onClick={pickRandomSong}>Random 🔀</RandomButton>
<SongSelector
songs={playlist}
selected={selected}
onSelect={setSelected}
/>
{/* Suno player */}
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
<Visualizer song={selected} />

<Credits>
Built for <a href="https://suno.com/@dj_smoke_stream">DJ Smoke Stream</a> by <b>SmokeStream AI</b> ⚡️
</Credits>
</Wrapper>
);
}
