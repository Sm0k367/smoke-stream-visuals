import styled from "styled-components";

const Wrapper = styled.div`
max-width: 640px;
margin: 40px auto 0 auto;
padding: 42px 18px 70px 18px;
background: #10161a;
border-radius: 18px;
box-shadow: 0 8px 40px #0009;
color: #fff;
@media (max-width: 700px) {
padding: 7vw 2vw 85px 2vw;
max-width: 98vw;
border-radius: 0;
box-shadow: none;
}
`;

const Heading = styled.h1`
font-size: 2.19rem;
font-weight: 900;
color: #64ffda;
letter-spacing: -1.8px;
margin-bottom: 0.4em;
`;

const Hero = styled.div`
font-size: 1.34em;
font-weight: 600;
margin: 18px 0;
color: #ff6c52;
`;

const Art = styled.img`
display: block;
width: 260px;
margin: 26px auto 20px auto;
`;

const LinkRow = styled.div`
text-align: center;
margin-top: 28px;
font-size: 1.14em;
`;

export default function About() {
return (
<Wrapper>
<Heading>About Epic Tech AI Visuals</Heading>
<Hero>
Welcome to the most addictive open AI music gallery on the web.<br />
Every song visualized with 3D generative art, Suno AI, and pure community energy.
</Hero>
<Art src="/logo.svg" alt="Epic Tech AI Visuals logo" />

<div>
• <b>Remix</b> and randomize your tracks & visuals<br />
• <b>Share</b> your gallery, playlists, and event links<br />
• <b>Build</b> your own or collaborate:
<LinkRow>
<a href="https://github.com/Sm0k367/smoke-stream-visuals" style={{
color: "#64ffda", fontWeight: 900, margin: "0 15px"
}}>GitHub Repo</a>
<a href="https://epic-tech-ai-lounge.vercel.app/" style={{
color: "#ff6c52", fontWeight: 900, margin: "0 15px"
}}>Main Lounge</a>
</LinkRow>
</div>

<div style={{ marginTop: 34, opacity: 0.84 }}>
Made with ❤️ by Epic Tech AI + SmokeStream AI<br/>
<i>“Remix the future, see music in motion.”</i>
</div>
</Wrapper>
);
}
