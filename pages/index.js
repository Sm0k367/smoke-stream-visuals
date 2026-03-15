import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
max-width: 600px;
margin: 45px auto 32px auto;
padding: 32px 10px 54px 10px;
background: #15191d;
border-radius: 19px;
box-shadow: 0 10px 40px #000b;
color: #fff;
`;
const Title = styled.h1`
font-size: 2rem;
text-align: center;
color: #64ffda;
`;

const FileList = styled.div`
margin: 20px 0 29px 0;
`;

const TrackButton = styled.button`
display: inline-block;
font-size: 1rem;
font-weight: 700;
background: ${(props) => (props.active ? 'linear-gradient(90deg, #ff6c52 0%, #64ffda 100%)' : '#232336')};
color: ${(props) => (props.active ? '#19191c' : '#fff')};
border: 1.5px solid #242436;
border-radius: 12px;
padding: 10px 20px;
margin: 4px 5px 10px 0;
cursor: pointer;
box-shadow: ${(props) => (props.active ? '0 1px 10px #12e6d7aa' : '0 1px 7px #0001')};
transition: background 0.11s;
outline: none;
`;

const AudioPlayer = styled.audio`
width: 100%;
margin-top: 24px;
margin-bottom: 14px;
background: #161e21;
border-radius: 10px;
`;

const Credits = styled.div`
opacity: 0.8;
margin-top: 32px;
text-align: center;
font-size: 1em;
color: #a5ffef;
`;

const files = [
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

export default function Home() {
const [selected, setSelected] = useState(files[0]);
const audioRef = useRef(null);

useEffect(() => {
if (audioRef.current) {
audioRef.current.load();
// Some browsers will block autoplay, so manual click needed at first
}
}, [selected]);

// Builds the full URL as used in GitHub (!)
const mp3Url = `/${encodeURIComponent(selected).replace(/%20/g, ' ')}`;

return (
<Wrapper>
<Title>
Epic Tech AI <span style={{ color: "#ff6c52" }}>MP3 Playback Debug</span>
</Title>
<div style={{
margin: "16px 0 16px 0", background: "#222a3132", borderRadius: 7, padding: "8px 10px", color: "#fff", fontWeight: 700
}}>
If you click a title below and **hear nothing or see 404**, click the "Fallback: direct mp3 link" to test. If link fails, file is missing or your deploy isn't synced. If it plays in-browser, your player will work too.
</div>
<FileList>
{files.map(name => (
<div key={name} style={{ marginBottom: 7 }}>
<TrackButton onClick={() => setSelected(name)} active={selected === name}>
{name.replace(/\.mp3$/, "")}
</TrackButton>
<a href={`/${encodeURIComponent(name)}`} target="_blank" rel="noopener noreferrer"
style={{
fontSize: "0.95em",
marginLeft: 12,
color: "#64ffda",
textDecoration: "underline"
}}>
Fallback: direct mp3 link
</a>
</div>
))}
</FileList>
<AudioPlayer ref={audioRef} controls autoPlay>
<source src={`/${selected}`} type="audio/mp3" />
Your browser does not support the audio element.
</AudioPlayer>
<Credits>
If the direct mp3 link works but player does not, refresh and tap to play manually.<br />
<span style={{fontSize:"0.86em"}}>If still silent, your file is missing or named wrong in /public/</span>
</Credits>
</Wrapper>
);
}
