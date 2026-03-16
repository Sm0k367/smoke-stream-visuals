import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaPlay, FaPause, FaMusic } from "react-icons/fa";

const gradientMove = keyframes`
0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
`;

const AnimatedBG = styled.div`
min-height: 100vh;
padding: 0;
margin: 0;
background: linear-gradient(270deg, #15191d, #140043, #2b7fff, #ff55e1, #15191d);
background-size: 1500% 1500%;
animation: ${gradientMove} 23s ease-in-out infinite;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
`;

const PlayerContainer = styled.div`
z-index: 2;
max-width: 630px;
margin: 56px auto 32px auto;
padding: 42px 24px 48px 24px;
background: rgba(16, 20, 24, 0.92);
border-radius: 2rem;
box-shadow: 0 12px 60px #000d, 0 0 8px 2px #64ffdade;
color: #fff;
filter: drop-shadow(0 2px 5px #1d293670);
`;

const NeonTitle = styled.h1`
font-size: 2.4rem;
text-align: center;
margin-bottom: 1.3rem;
color: #ff55e1;
letter-spacing: 1.5px;
text-shadow: 0 0 9px #2b7fffcc, 0 0 21px #ff55e166;
`;

const FilesFlex = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
margin: 18px 0 22px 0;
gap: 13px;
`;

const GlowButton = styled.button`
font-size: 1.09rem;
font-weight: 700;
border-radius: 15px;
background: ${(props) =>
props.active
? "linear-gradient(90deg, #ff55e1 0%, #2b7fff 80%)"
: "#181f2a99"};
color: ${(props) => (props.active ? "#19191c" : "#fff")};
border: ${(props) =>
props.active ? "2.5px solid #2b7fff" : "1.5px solid #333749"};
box-shadow: ${(props) =>
props.active
? "0 0 18px #66f6ffd6, 0 0 8px #ff55e1"
: "0 1.1px 7px #0001"};
padding: 10px 19px;
margin-bottom: 7px;
margin-right: 2px;
margin-left: 0;
cursor: pointer;
transition: background 0.15s, box-shadow 0.2s;
outline: none;
position: relative;
&:hover {
background: #64ffda33;
color: #151c1c;
box-shadow: 0 2px 24px #ff55e199;
}
`;

const NowPlaying = styled.div`
font-size: 1.25rem;
margin: 1.5rem 0 0.8rem 0;
font-weight: 600;
letter-spacing: 0.08em;
color: #64ffda;
display: flex;
align-items: center;
gap: 11px;
text-shadow: 0 0 17px #2b7fff33;
`;

const AudioPlayer = styled.audio`
width: 100%;
margin-top: 16px;
margin-bottom: 24px;
border-radius: 11px;
background: #181d1d;
box-shadow: 0 2px 27px #2b7fff33;
`;

const files = [
"240.mp3",
"A Musical Journey (Stereo FX Club Mix).mp3",
// ... (leave the full mp3 list here just as before)
"turntablism_set.mp3"
];

export default function Home() {
const [selected, setSelected] = useState(files[0]);
const [playing, setPlaying] = useState(false);
const audioRef = useRef(null);

useEffect(() => {
setPlaying(false);
if (audioRef.current) {
audioRef.current.load();
}
}, [selected]);

const handlePlayPause = () => {
if (!audioRef.current) return;
if (playing) {
audioRef.current.pause();
setPlaying(false);
} else {
audioRef.current.play();
setPlaying(true);
}
};

return (
<AnimatedBG>
<PlayerContainer>
<NeonTitle>
<FaMusic style={{ marginRight: 11, color: "#64ffda" }} />
Epic Tech AI Neon MP3 Player
</NeonTitle>
<FilesFlex>
{files.map((name) => (
<GlowButton
key={name}
onClick={() => setSelected(name)}
active={selected === name}
>
{name.replace(/\.mp3$/, "")}
</GlowButton>
))}
</FilesFlex>
<NowPlaying>
<span>Now Playing:</span>
<span style={{ color: "#fff", fontWeight: 700 }}>
{selected.replace(/\.mp3$/, "")}
</span>
</NowPlaying>
<AudioPlayer
ref={audioRef}
controls
onPlay={() => setPlaying(true)}
onPause={() => setPlaying(false)}
>
<source src={`/${selected}`} type="audio/mp3" />
Your browser does not support the audio element.
</AudioPlayer>
<GlowButton
style={{ minWidth: 80, fontSize: "1.2em", marginTop: 12 }}
onClick={handlePlayPause}
active={playing}
>
{playing ? <FaPause /> : <FaPlay />}
{playing ? " Pause" : " Play"}
</GlowButton>
</PlayerContainer>
</AnimatedBG>
);
}
