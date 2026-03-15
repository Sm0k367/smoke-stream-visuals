import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import AudioMotionVisualizer from "../components/AudioMotionVisualizer";

const Wrapper = styled.div`
max-width: 600px;
margin: 45px auto 22px auto;
padding: 32px 10px 52px 10px;
background: #15191d;
border-radius: 19px;
box-shadow: 0 10px 40px #000b;
@media (max-width: 700px) {
max-width: 100vw;
border-radius: 0;
margin: 0;
padding: 6vw 2vw 90px 2vw;
box-shadow: none;
}
`;

const Title = styled.h1`
font-size: 2.14rem;
font-weight: 900;
text-align: center;
letter-spacing: -1.6px;
color: #64ffda;
margin-bottom: 0.5em;
`;

const AudioList = styled.div`
margin: 10px 0 23px 0;
`;

const TrackButton = styled.button`
display: block;
font-size: 1.08rem;
font-weight: 700;
width: 100%;
background: ${(props) => (props.selected ? 'linear-gradient(90deg, #ff6c52 25%, #64ffda 130%)' : '#252a2d')};
color: ${(props) => (props.selected ? '#19191c' : '#fff')};
border: 2px solid #232336;
border-radius: 10px;
padding: 13px 0;
margin-bottom: 10px;
cursor: pointer;
box-shadow: ${(props) => (props.selected ? '0 1px 14px #12e6d7bb' : '0 1px 7px #0001')};
transition: all 0.14s;
outline: none;
&:hover {
background: linear-gradient(90deg, #ff6c52 40%, #64ffda 120%);
color: #18191c;
border: 2px solid #ff6c52;
}
`;

const AudioPlayer = styled.audio`
width: 100%;
margin-top: 24px;
margin-bottom: 12px;
outline: none;
background: #181e21;
border-radius: 9px;
box-shadow: 0px 2px 18px #0002;
`;

const Credits = styled.div`
opacity: 0.7;
margin-top: 38px;
text-align: center;
font-size: 1em;
color: #a5ffef;
`;

function fetchAllAudioFiles() {
// List all your mp3 filenames exactly as shown in /public/
return [
"240.mp3", "A Musical Journey (Stereo FX Club Mix).mp3", "A Spiritual Union.mp3", "A_Spiritual_Union.mp3", "Acoustic Techno Fusion.mp3",
"Ain't That Just the Way.mp3", "All We Hear Is Dirty.mp3", "Big Smoke Stream.mp3", "Blue Money.mp3", "Breathing.mp3",
"Crunk Krunkers.mp3", "Crunk Manifesto.mp3", "Crunkadelic.mp3", "DJ Smoke Stream (1).mp3", "DJ Smoke Stream Ext (Vocals).mp3", "DJ Smoke Stream.mp3",
"Dirty Beats.mp3", "Dirty MF.mp3", "Do Ya Thang (Orion Starfall Remix).mp3", "Down South Mayhem.mp3", "Explicit Lyrics.mp3",
"F_ck a Suit and Tie.mp3", "Game.mp3", "Get Together Lucky.mp3", "Go Hard (We Funk).mp3", "Hacken Delight.mp3", "Heatwave.mp3",
"Hood Crunk Legend.mp3", "Hood Mentality.mp3", "Inferno Beat.mp3", "Insert Title Here.mp3", "It's Easter N Happy 420.mp3",
"Jail Is Hot.mp3", "Jungle Pulse.mp3", "Latex & Bass.mp3", "Let Me See You Go to Work.mp3", "Lounge (1).mp3",
"Midnight Cocaine (1).mp3", "Midnight Fix.mp3", "Rhapsody of the Moment.mp3", "Rhythm Switched__.mp3", "Shockwave.mp3",
"Slippin Sipping soda.mp3", "Slippin.mp3", "Smoken Tokens wit D Dbl G.mp3", "Smoken Tokens.mp3", "Southern Crunk Anthem.mp3",
"THE ABSOLUTE_ Presented by_ DJ SMOKE STREAM.mp3", "The 2 O'Clock Jump.mp3", "The Knickerbocker.mp3", "Thug Hood Rap Legends.mp3",
"Torus Knot.mp3", "Uptown Dreams (Are Made of This.mp3", "We Hear It All.mp3", "We shoutin' out loud.mp3", "West Side Legends.mp3",
"Within Havana Virgin.mp3", "Words pay.mp3", "Your Brand, Your Bread.mp3", "ambient.mp3", "background-music-ffmpeg.mp3", "background-music.mp3",
"dj_smoke_audio.mp3", "live_dj_set.mp3", "narration (1).mp3", "narration-gtts.mp3", "narration.mp3", "needle_drop_audio.mp3", "neon_echoes.mp3",
"smoke_stream_media (1).mp3", "smoke_stream_media.mp3", "soundtrack.mp3", "turntablism_set.mp3"
];
}

export default function Home() {
const files = fetchAllAudioFiles();
const [selected, setSelected] = useState(files[0]);
const audioRef = useRef(null);

useEffect(() => {
if (audioRef.current) {
audioRef.current.load();
audioRef.current.play().catch(() => {});
}
}, [selected]);

return (
<Wrapper>
<Title>
Epic Tech AI <span style={{ color: "#ff6c52" }}>Audio Gallery</span>
</Title>
<AudioList>
{files.map(name => (
<TrackButton
key={name}
onClick={() => setSelected(name)}
selected={selected === name}
>
{name.replace(/\.mp3$/, "")}
</TrackButton>
))}
</AudioList>
<AudioPlayer ref={audioRef} controls autoPlay>
<source src={`/${selected}`} type="audio/mp3" />
Your browser does not support the audio element.
</AudioPlayer>
<AudioMotionVisualizer audioElement={audioRef.current} />
<Credits>
Built for <a href="https://epic-tech-ai-lounge.vercel.app/">Epic Tech AI</a> by <b>SmokeStream AI</b>
</Credits>
</Wrapper>
);
}
