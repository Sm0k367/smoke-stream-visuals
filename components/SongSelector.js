import styled from "styled-components";

const Row = styled.div`
display: flex;
align-items: center;
margin: 26px 0 28px 0;
gap: 13px;
flex-wrap: wrap;
@media (max-width: 700px) {
flex-direction: column;
gap: 8px;
align-items: stretch;
}
`;

const Select = styled.select`
font-size: 1.16rem;
padding: 11px 17px;
border-radius: 9px;
background: #232336;
color: #fff;
border: 1.63px solid #464646;
min-width: 215px;
outline: none;
font-weight: 700;
box-shadow: 0 2px 13px #1e505530;
`;

const GenreTag = styled.span`
display: inline-block;
border-radius: 8px;
padding: 5px 11px 5px 9px;
margin: 0 4px 0 0;
font-size: 1em;
font-weight: 500;
background: linear-gradient(97deg, #181d1e, #191f21 75%);
border: 1.9px solid #64ffda;
color: #64ffda;
text-shadow: 0 1px 5px #12f4a155;
opacity: 0.92;
`;

const AudioBadge = styled.span`
display: inline-block;
font-size: 0.98em;
font-weight: 600;
color: #ff6c52;
border-radius: 8px;
background: #231;
padding: 3px 12px 3px 9px;
border: 1.2px solid #ff6c52;
margin-left: 4px;
opacity: 0.92;
`;

function getUniqueKey(song, idx) {
return `${song.id || ""}-${song.title || ""}-${idx}`;
}

export default function SongSelector({ songs, selected, onSelect }) {
return (
<Row>
<Select
value={selected.id || selected.title}
onChange={e => {
const song = songs.find(s => (s.id || s.title) === e.target.value);
onSelect(song || songs[0]);
}}
>
{songs.map((song, idx) => (
<option key={getUniqueKey(song, idx)} value={song.id || song.title}>
{song.title}
</option>
))}
</Select>
<div>
{selected.genres?.length
? selected.genres.map(g => (
<GenreTag key={g}>{g}</GenreTag>
))
: null}
{selected.audio &&
<AudioBadge>mp3</AudioBadge>
}
</div>
</Row>
);
}
