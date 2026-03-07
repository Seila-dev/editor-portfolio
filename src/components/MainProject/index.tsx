import { useState } from "react";
import styled from "styled-components";
import cover from "../../assets/Sukuna-wallpaper.jpg";
import ytIcon from "../../assets/youtube.png";

const shorts = [
  { id: "2mZFa1Re_1w", title: "Is THIS the BEST Crosshair in Valorant?" },
  { id: "GWwnWi2z5bc", title: "THIS ROBLOX GAME IS SCARIER THAN THE ORIGINAL" },
  { id: "xYLfinmv4pc", title: "There's NO ONE who wouldn't get scared by this!" },
];

const content = {
  id: "1",
  title: "Short-form Videos",
  coverImage: cover,
  description:
    "A selection of my short-form edits focused on high-retention pacing, dynamic transitions, and engaging visual flow. These edits are designed to maximize viewer attention and performance across platforms like YouTube Shorts, TikTok, and Reels.",
  note: "Curated selection of my best edits.",
  startDate: "2025-02",
  finishDate: "Present",
  channelLink: "https://www.youtube.com/@AsyncEditor"
};

/* SHORTS */
// const shorts = [
//   { id: "UQoCV_ZJMoE", title: "ItsPoachie Trial" },
//   { id: "wZ821Jh7dks", title: "Client Long-form Intro" },
//   { id: "63PJ4r53nCk", title: "Client Full Long-form Video" },
//   { id: "qW6ZUokrC8M", title: "Roblox Footage Trial #2" },
//   { id: "K2nubbiNrYk", title: "Roblox Intro Trial" },
//   { id: "l508d1BcUI0", title: "AMV/EDIT - Fyodor Dostoyevesky" },
// ];

export default function VideoSection() {
  return (
    <Section>
      <BackgroundBlur bg={content.coverImage || ""} />

      <Container>
        <Content>
          <Status>
            <span>In Production</span>
          </Status>

          <Header>
            <h1>{content.title}</h1>
          </Header>

          <Description>{content.description}</Description>

          <ActionMethods>
            <a
              href={content.channelLink}
              className="links"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ytIcon} alt="Youtube icon" />
              AsyncEditor
            </a>
          </ActionMethods>

          <Footer>
            <span>Recent edits, updated frequently</span>
          </Footer>
        </Content>

        <Content>
          <VideoCarousel videos={shorts} />
        </Content>
      </Container>
    </Section>
  );
}

/* ===============================
   CAROUSEL
================================ */

function VideoCarousel({ videos }: { videos: { id: string; title: string }[] }) {
  const [active, setActive] = useState(0);

  const prev = () => {
    setActive((p) => (p - 1 + videos.length) % videos.length);
  };

  const next = () => {
    setActive((p) => (p + 1) % videos.length);
  };

  const getOffset = (index: number) => {
    const length = videos.length;
    const diff = index - active;

    if (diff > length / 2) return diff - length;
    if (diff < -length / 2) return diff + length;

    return diff;
  };

  return (
    <CarouselOuter>
      <CarouselViewport>
        {videos.map((video, index) => {
          const offset = getOffset(index);

          return (
            <ShortCard key={video.id} offset={offset}>
<iframe
  src={`https://www.youtube-nocookie.com/embed/${video.id}?controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
  title={video.title}
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
            </ShortCard>
          );
        })}
      </CarouselViewport>

      <ArrowButton position="left" onClick={prev}>
        <ChevronLeftIcon />
      </ArrowButton>

      <ArrowButton position="right" onClick={next}>
        <ChevronRightIcon />
      </ArrowButton>
    </CarouselOuter>
  );
}

/* ===============================
   STYLES
================================ */
const CarouselOuter = styled.div`
  position: relative;
  width: 100%;
  margin-top: 0px;
`;

const CarouselViewport = styled.div`
  position: relative;
  width: 100%;

  height: clamp(500px, 80vh, 720px);

  display: flex;
  align-items: center;
  justify-content: center;

  perspective: 1600px;
  overflow: hidden;


  @media (max-width: 768px) {
  height: 80vh;
}

@media (max-width: 480px) {
  height: 800px;
}
`;

const ShortCard = styled.div<{ offset: number }>`
  position: absolute;

  width: ${({ offset }) => (offset === 0 ? "min(360px, 80vw)" : "min(220px, 60vw)")};
  aspect-ratio: 9 / 16;

  border-radius: 18px;
  overflow: hidden;
  background: #000;

  transition: all 0.6s cubic-bezier(.22,.61,.36,1);

  transform: ${({ offset }) =>
    `translateX(${offset * 220}px) scale(${offset === 0 ? 1 : 0.75})`};

  opacity: ${({ offset }) => (offset === 0 ? 1 : 0.45)};

  z-index: ${({ offset }) => 10 - Math.abs(offset)};

  filter: ${({ offset }) => (offset === 0 ? "none" : "blur(3px)")};

  pointer-events: ${({ offset }) => (offset === 0 ? "auto" : "none")};

  box-shadow: ${({ offset }) =>
    offset === 0
      ? "0 40px 100px rgba(0,0,0,0.9)"
      : "0 20px 40px rgba(0,0,0,0.4)"};

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;
const ArrowButton = styled.button<{ position: "left" | "right" }>`
  position: absolute;
  top: 0;
  ${({ position }) => (position === "left" ? "left: 0;" : "right: 0;")}

  width: 120px;
  height: 100%;

  border: none;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 10;

  transition: background .25s;

  svg{
    width:48px;
    height:48px;
  }


  @media (max-width:768px){
    width:80px;
  }
`;

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22">
    <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" fill="none"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22">
    <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" fill="none"/>
  </svg>
);

/* layout */

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  padding: 60px 150px;
  width: 100%;
  color: white;
  padding-top: 150px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.7);
  background: linear-gradient(to bottom right, #0f0f0f, black);

  /* Fade IN (top) */
  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0) 0%,
      black 100%
    );
    z-index: 2;
    pointer-events: none;
  }

  /* Fade OUT (bottom) 👇 */
  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      black 100%
    );
    z-index: 2;
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    padding: 40px 20px;

    &::before,
    &::after {
      z-index: 0;
    }
  }
`;

const BackgroundBlur = styled.div<{ bg?: string }>`
  position: absolute;
  inset: 0;
  background-image: ${({ bg }) => (bg ? `url(${bg})` : "none")};
  background-size: cover;

  /* Desktop: personagem mais à esquerda */
  background-position: 25% center;

  opacity: 0.295;
  filter: blur(0px);
  transform: scale(1);

  /* Tablet */
  @media (max-width: 1024px) {
    background-position: 35% center;
  }

  /* Mobile */
  @media (max-width: 768px) {
    background-position: 20% center;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 3rem;
  z-index: 0;
  position: relative;

  @media(max-width: 1200px){
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 0.25rem;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: white;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);

    @media (min-width: 1024px) {
      font-size: 3rem;
    }
  }

  a {
    color: #d1d5db;
    transition: color 0.2s;

    &:hover {
      color: #3b82f6;
    }
  }
`;
const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  background: rgba(255, 8, 8, 0.42);
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;

  span {
    color: rgb(246, 119, 119);
    font-weight: 500;
  }
`;

const Description = styled.p`
  color: #d1d5db;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 1.2rem;
  max-width: 42rem;
`;

const Footer = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ActionMethods = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
  width: fit-content;

  .links {
    background: #e200000a;
    border: 1px solid gray;
    color: #fff;
    text-decoration: none;
    width: 100%;
    gap: 8px;
    max-width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-weight: 600;
    padding: 12px 24px;
    margin: 10px 0;
    cursor: pointer;
    animation: fade-up 0.5s 0.4s backwards;
    transition: 0.2s ease-in;
    &:hover {
      background: #d60000;
      border-color: #d60000;
    }
  }

  .links.secondary {
    background: transparent;
    border: 2px solid var(--primary);

    &:hover {
      background: var(--primary);
      color: white;
    }
  }

  .links img{
    width: 30px;
    height: 30px;
  }

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;