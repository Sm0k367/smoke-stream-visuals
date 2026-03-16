import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaPlay, FaPause, FaMusic } from "react-icons/fa";

// (styles unchanged — cut for brevity in this reply)
// ... [Keep the styled components code as above] ...

// Visualizer with SINGLE media source connection only!
function AudioVisualizer({ audioRef, isPlaying }) {
const [dataArray, setDataArray] = useState(new Array(32).fill(0));
const rafId = useRef();
const audioCtxRef = useRef();
const analyserRef = useRef();

useEffect(() => {
if (!audioRef.current || audioCtxRef.current) return; // Only on mount!

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 64;
const source = audioCtx.createMediaElementSource(audioRef.current);
source.connect(analyser);
analyser.connect(audioCtx.destination);

audioCtxRef.current = audioCtx;
analyserRef.current = analyser;

return () => {
audioCtx.close();
};
}, [audioRef]);

useEffect(() => {
let stopped = false;
const update = () => {
if (!analyserRef.current) return;
const bufferLength = analyserRef.current.frequencyBinCount;
const data = new Uint8Array(bufferLength);
analyserRef.current.getByteFrequencyData(data);
setDataArray(Array.from(data));
if (!stopped && isPlaying) rafId.current = requestAnimationFrame(update);
};
if (isPlaying) update();
return () => {
stopped = true;
if (rafId.current) cancelAnimationFrame(rafId.current);
};
}, [isPlaying]);

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
