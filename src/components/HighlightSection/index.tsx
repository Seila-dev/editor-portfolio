import styled, { keyframes } from "styled-components";

const highlightVideo = {
 
  id: "ZkYtbBloA8w",
  title: "Featured Edit of the Month",
  description:
    "A highlighted long-form project showcasing advanced pacing, cinematic transitions, and immersive storytelling. This edit represents the current peak of my editing style and production quality"
};

export default function HighlightSection() {
  return (
    <Section id="highlight">

      <Header>
        <Status>
          <span>Featured Project</span>
        </Status>

        <Title>{highlightVideo.title}</Title>

        <Subtitle>
          {highlightVideo.description}
        </Subtitle>
      </Header>

      <VideoWrapper>
        <VideoCard>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${highlightVideo.id}?controls=1&modestbranding=1&rel=0&iv_load_policy=3`}
            title={highlightVideo.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoCard>
      </VideoWrapper>

    </Section>
  );
}

/* ANIMATION */

const fadeIn = keyframes`
from {
opacity:0;
transform: translateY(20px);
}
to {
opacity:1;
transform: translateY(0);
}
`;

/* SECTION */

const Section = styled.section`
  position: relative;
  // min-height: 100vh;

  padding: 120px;
  padding-top: 150px;
  padding-bottom: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;

  background: radial-gradient(
    circle at top,
    #1a0000,
    black 60%
  );

  overflow: hidden;

  /* top fade */
  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 150px;

    background: linear-gradient(
      to top,
      rgba(0,0,0,0),
      black
    );

    pointer-events: none;
  }

  /* bottom fade */
  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 150px;

    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0),
      black
    );

    pointer-events: none;
  }

  @media (max-width:1024px){
    padding:80px 20px;
  }
`;

/* HEADER */

const Header = styled.div`
  text-align:center;
  margin-bottom:60px;
  animation:${fadeIn} .8s ease;

  max-width:800px;
`;

const Title = styled.h2`
  font-size:3rem;
  font-weight:bold;

  margin-bottom:16px;

  text-shadow:0 2px 10px rgba(0,0,0,0.9);

  @media(max-width:768px){
    font-size:2.2rem;
  }
`;

const Subtitle = styled.p`
  color: #aaa;
  line-height:1.6;
  font-size:1.2rem;
`;

const Status = styled.div`
  display:inline-flex;
  align-items:center;

  background:rgba(255,0,0,0.25);

  padding:6px 14px;
  border-radius:6px;

  margin-bottom:20px;

  span{
    color:#ff8a8a;
    font-weight:600;
  }
`;

/* VIDEO */

const VideoWrapper = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
`;

const VideoCard = styled.div`
  width:80%;
  max-width:1400px;

  aspect-ratio:16/9;

  border-radius:18px;
  overflow:hidden;

  background:#000;

  box-shadow:
    0 40px 120px rgba(0,0,0,0.8),
    0 0 80px rgba(140,0,0,0.35);

  transition:transform .4s ease, box-shadow .4s ease;

  &:hover{
    transform:translateY(-6px);

    box-shadow:
      0 60px 160px rgba(0,0,0,0.9),
      0 0 120px rgba(200,0,0,0.45);
  }

  iframe{
    width:100%;
    height:100%;
    border:none;
  }

  @media(max-width:900px){
    width:95%;
  }
`;