import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaPlay, FaPause, FaMusic } from "react-icons/fa";

// Animated background gradient
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

// No 'active' prop in final button DOM node
const GlowButton = styled.button.withConfig({
shouldForwardProp: (prop, defaultValidatorFn) =>
prop !== "active" && defaultValidatorFn(prop)
})`
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

const VisualizerContainer = styled.div`
width: 100%;
height: 64px;
margin: 10px 0 18px 0;
display: flex;
align-items: flex-end;
justify-content: center;
gap: 3px;
background: transparent;
`;

const Bar = styled.div`
width: 8px;
border-radius: 4px 4px 10px 10px;
background: linear-gradient(180deg, #64ffda 10%, #2b7fff 90%);
box-shadow: 0 0 7px #64ffda88;
transition: height 0.13s cubic-bezier(0.55,0,0.1,1);
`;

const files = [
"240.mp3",
"A Musical Journey (Stereo FX Club Mix).mp3",
"A Spiritual Union.mp3",
"A_Spiritual_Union.mp3",
"Acoustic Techno Fusion.mp3",
"Ain't That Just the Way.mp3",
"All We Hear Is Dirty.mp3",
"Big Smoke Stream.mp3",
"Blue Money.mp3",
"Breathing.mp3",
"Crunk Krunkers.mp3",
"Crunk Manifesto.mp3",
"Crunkadelic.mp3",
"DJ Smoke Stream (1).mp3",
"DJ Smoke Stream Ext (Vocals).mp3",
"DJ Smoke Stream.mp3",
"Dirty Beats.mp3",
"Dirty MF.mp3",
"Do Ya Thang (Orion Starfall Remix).mp3",
"Down South Mayhem.mp3",
"Explicit Lyrics.mp3",
"F_ck a Suit and Tie.mp3",
"Game.mp3",
"Get Together Lucky.mp3",
"Go Hard (We Funk).mp3",
"Hacken Delight.mp3",
"Heatwave.mp3",
"Hood Crunk Legend.mp3",
"Hood Mentality.mp3",
"Inferno Beat.mp3",
"Insert Title Here.mp3",
"It's Easter N Happy 420.mp3",
"Jail Is Hot.mp3",
"Jungle Pulse.mp3",
"Latex & Bass.mp3",
"Let Me See You Go to Work.mp3",
"Lounge (1).mp3",
"Midnight Cocaine (1).mp3",
"Midnight Fix.mp3",
"Rhapsody of the Moment.mp3",
"Rhythm Switched__.mp3",
"Shockwave.mp3",
"Slippin Sipping soda.mp3",
"Slippin.mp3",
"Smoken Tokens wit D Dbl G.mp3",
"Smoken Tokens.mp3",
"Southern Crunk Anthem.mp3",
"THE ABSOLUTE_ Presented by_ DJ SMOKE STREAM.mp3",
"The 2 O'Clock Jump.mp3",
"The Knickerbocker.mp3",
"Thug Hood Rap Legends.mp3",
"Torus Knot.mp3",
"Uptown Dreams (Are Made of This.mp3",
"We Hear It All.mp3",
"We shoutin' out loud.mp3",
"West Side Legends.mp3",
"Within Havana Virgin.mp3",
"Words pay.mp3",
"Your Brand, Your Bread.mp3",
"ambient.mp3",
"background-music-ffmpeg.mp3",
"background-music.mp3",
"dj_smoke_audio.mp3",
"live_dj_set.mp3",
"narration (1).mp3",
"narration-gtts.mp3",
"narration.mp3",
"needle_drop_audio.mp3",
"neon_echoes.mp3",
"smoke_stream_media (1).mp3",
"smoke_stream_media.mp3",
"soundtrack.mp3",
"turntablism_set.mp3"
];

// Visualizer
function AudioVisualizer({ audioRef, isPlaying }) {
const [dataArray, setDataArray] = useState(new Array(32).fill(0));
const rafId = useRef();
const analyserRef = useRef();

useEffect(() => {
if (!audioRef.current) return;

let audioCtx;
let analyser;
let source;
let stopped = false;

const setup = async () => {
audioCtx = new (window.AudioContext || window.webkitAudioContext)();
analyser = audioCtx.createAnalyser();
analyser.fftSize = 64;
source = audioCtx.createMediaElementSource(audioRef.current);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyserRef.current = analyser;
};

setup();

const update = () => {
if (!analyserRef.current) return;
const bufferLength = analyserRef.current.frequencyBinCount;
const data = new Uint8Array(bufferLength);
analyserRef.current.getByteFrequencyData(data);
setDataArray(Array.from(data));
if (!stopped) rafId.current = requestAnimationFrame(update);
};

if (isPlaying) {
audioCtx.resume && audioCtx.resume();
update();
}

return () => {
stopped = true;
if (rafId.current) cancelAnimationFrame(rafId.current);
if (audioCtx) audioCtx.close();
};
// eslint-disable-next-line
}, [audioRef, isPlaying]);

return (
<VisualizerContainer>
{dataArray.slice(0, 32).map((v, i) => (
<Bar key={i} style={{ height: `${12 + v / 1.7}px` }} />
))}
</VisualizerContainer>
);
}

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
<AudioVisualizer audioRef={audioRef} isPlaying={playing} />
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
