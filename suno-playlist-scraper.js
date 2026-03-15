// suno-playlist-scraper.js
// Paste all the iframe + title + genre blocks into RAW_DATA. Run with `node suno-playlist-scraper.js`
const fs = require('fs');

// -- PASTE ALL YOUR SONG BLOCKS BELOW AS SHOWN: --
const RAW_DATA = `
<iframe src="https://suno.com/embed/ef5e6b4c-fd00-4070-ab4f-5a95f8ec5315" width="760"></iframe>
Let Me See You Go to Work
big room, tech house, hip hop

<iframe src="https://suno.com/embed/4eb5722c-08a3-48ac-81e1-8e506a2405ab" width="760"></iframe>
Low Lights, High Danger
big room, edm, cinematic

//...keep pasting more in the same pattern...
`;

const output = [];
const lines = RAW_DATA.split(/\r?\n/);
let i = 0;
while (i < lines.length) {
const line = lines[i].trim();
if (line.startsWith('<iframe') && line.includes('suno.com/embed/')) {
const m = line.match(/embed\/(.*?)\"/);
const id = m && m[1] ? m[1] : null;
let title, genres;
let j = i + 1;
while (j < lines.length && (!title || !genres)) {
const l = lines[j].trim();
if (!title && l && !l.startsWith('<')) title = l;
else if (title && l && !l.startsWith('<')) genres = l.split(/,|\//).map(s => s.trim()).filter(Boolean);
j++;
}
if (id && title && genres) {
output.push({ id, title, genres });
}
i = j;
} else {
i++;
}
}

fs.writeFileSync('playlist.json', JSON.stringify(output, null, 2));
console.log(`Wrote ${output.length} songs to playlist.json`);
