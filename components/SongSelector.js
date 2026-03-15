import styled from "styled-components";

const Row = styled.div`
display: flex;
align-items: center;
margin: 30px 0 24px 0;
gap: 18px;
`;

const Select = styled.select`
font-size: 1.3rem;
padding: 10px 18px;
border-radius: 10px;
background: #232336;
color: #fff;
border: 1.5px solid #444;
min-width: 280px;
outline: none;
`;

const Meta = styled.div`
font-size: 1.05em;
opacity: 0.75;
margin-left: 8px;
`;

function getUniqueKey(song, idx) {
// Always unique: prioritize id, then fallback to title, then array index
return `${song.id || ""}-${song.title || ""}-${idx}`;
}

export default function SongSelector({ songs, selected, onSelect }) {
return (
<Row>
<Select
value={selected.id}
onChange={e => {
const song = songs.find(s => s.id === e.target.value);
onSelect(song || songs[0]);
}}
>
{songs.map((song, idx) => (
<option key={getUniqueKey(song, idx)} value={song.id}>
{song.title}
</option>
))}
</Select>
<Meta>
{selected.genres?.length
? selected.genres.map(g => (
<span key={g} style={{ marginRight: 8, color: "#64ffda" }}>
#{g}
</span>
))
: null}
</Meta>
</Row>
);
}
