import React, { useRef } from "react";
import styled from "styled-components";
// import { Code2 } from "lucide-react";
// import Star from '../../assets/stars.png'
// import UnfilledStar from '../../assets/unfilledstars.png'
import cover from "../../assets/Sukuna-wallpaper.jpg";
import ytIcon from "../../assets/youtube.png";
// (se quiser manter imagens para background blur use a mesma cover)
// import ComingSoon from "../../assets/comingsoon.png";

/**
 * Video Section - versão para vídeos horizontais (16:9)
 *
 * Observações importantes:
 * - Use IDs de vídeo do YouTube (ex: 'dQw4w9WgXcQ').
 * - O embed usa youtube-nocookie.com e params modestbranding=1, rel=0, iv_load_policy=3
 *   para reduzir elementos extras, mas não é possível remover tudo via embed (share / subscribe
 *   podem ainda aparecer em alguns casos).
 */

const content = {
  id: "1",
  title: "Editing Highlights",
  coverImage: cover,
  description:
    "A selection of my horizontal edits (16:9), with a strong focus on Roblox content. At the moment, this includes two Roblox clips and one AMV, highlighting my approach to pacing, transitions, color grading, and sound design. More projects are in production and will be added as I continue to expand my editing work.",
  note: "Curated selection of my best edits.",
  startDate: "2025-02",
  finishDate: "Present",
  channelLink: "https://www.youtube.com/@AsyncEditor"
};

const videos = [
  { id: "K2nubbiNrYk", title: "Roblox Intro Trial" },
  { id: "qW6ZUokrC8M", title: "Roblox Gameplay Footage #2" },
  { id: "l508d1BcUI0", title: "AMV/EDIT - Fyodor Dostoyevesky" },
];

export default function VideoSection() {
  return (
    <Section>
      <BackgroundBlur bg={content.coverImage || ""} />
      <Container>
        <Content>
          {content.finishDate && (
            <Status>
              <span>In Production</span>
            </Status>
          )}

          <Header>
            <h1>{content.title}</h1>
          </Header>

          {content.description && <Description>{content.description}</Description>}
          {/* 
          <Stars>
            {Array.from({ length: 5 }, (_, i) => (
              <StarImg
                key={i}
                src={i < content.rating ? Star : UnfilledStar}
                alt={i < content.rating ? "Filled star" : "Unfilled star"}
              />
            ))}
          </Stars> */}

          <ActionMethods>
            <a href={content.channelLink} className="links" target="_blank" rel="noopener noreferrer">
              <img src={ytIcon} alt="Youtube icon" />
              AsyncEditor
            </a>

            {/* <DisabledButton className="links disabled">
              <Code2 size={18} />
              No repo
            </DisabledButton> */}
          </ActionMethods>

          <Footer>
            <span>Recent edits, updated frequently</span>
          </Footer>
        </Content>

        <Content>
          <VideoCarousel videos={videos} />
        </Content>
      </Container>
    </Section>
  );
}

/* ----------------------
   VideoCarousel Component
   arrows + drag + horizontal 16:9 embeds
   ---------------------- */
function VideoCarousel({ videos }: { videos: { id: string; title: string }[] }) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // refs para estado de drag (persistente entre renders)
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleScrollBy = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth = 460; // largura aproximada do card + gap
    carouselRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const stopDrag = () => {
    isDown.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.3; // sensibilidade
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
  <CarouselOuter>
    <Carousel
      ref={carouselRef}
      onMouseDown={onMouseDown}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onMouseMove={onMouseMove}
    >
      {videos.map((v, idx) => (
        <VideoCard key={`${v.id}-${idx}`}>
          <div className="video-wrap">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${v.id}?modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`}
              title={v.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="meta">
            <h3>{v.title}</h3>
          </div>
        </VideoCard>
      ))}
    </Carousel>

    {/* OVERLAY */}
    <ArrowOverlay>
      <ArrowButton
        position="left"
        aria-label="Scroll left"
        onClick={() => handleScrollBy("left")}
      >
        <ChevronLeftIcon />
      </ArrowButton>

      <ArrowButton
        position="right"
        aria-label="Scroll right"
        onClick={() => handleScrollBy("right")}
      >
        <ChevronRightIcon />
      </ArrowButton>
    </ArrowOverlay>
  </CarouselOuter>
);
}

/* ----------------------
   Styled components (espelhando seu estilo)
   ---------------------- */

   const CarouselOuter = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ArrowOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none; /* deixa o drag funcionar */
  z-index: 10;
`;


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
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 3rem;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 1024px) {
    width: 50%;
  }
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
  font-size: 1.1rem;
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
    transition: 0.35s ease-in;
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

// const Stars = styled.div`
//   font-size: 1rem;
//   color: #ffcc00;
//   margin-bottom: 8px;
// `;

// const StarImg = styled.img`
//   width: 25px;
//   height: 25px;
//   margin-right: 4px;
// `;

// const DisabledButton = styled.span`
//   display: inline-flex;
//   align-items: center;
//   padding: 8px 12px;
//   background: #2e2e2e;
//   color: #999;
//   gap: 10px;
//   border-radius: 0.375rem;
//   font-weight: 500;
//   font-size: 14px;
//   opacity: 0.7;
//   cursor: not-allowed;
//   text-decoration: none;
// `;

/* ----------------------
   Carousel styled (horizontal videos)
   ---------------------- */

// const CarouselWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   position: relative;
//   gap: 12px;
//   width: 100%;
//   padding: 0 52px; /* espaço pras arrows */
// `;

const Carousel = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 8px;
  scroll-behavior: smooth;
  cursor: grab;
  width: 100%;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.08);
    border-radius: 8px;
  }

  &:active {
    cursor: grabbing;
  }
`;

const VideoCard = styled.div`
  flex: 0 0 auto;
  width: 420px; /* card width for desktop */
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 18px 36px rgba(0,0,0,0.45);
  transition: transform 0.24s ease;

  .video-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #000;
  }

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .meta {
    padding: 12px 14px;
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02));
    h3 {
      margin: 0;
      font-size: 14px;
      color: #e6e6e6;
      font-weight: 600;
    }
  }

  &:hover {
    transform: translateY(-6px);
  }

  @media (max-width: 1024px) {
    width: 360px;
  }

  @media (max-width: 768px) {
    width: 300px;
  }
`;

const ArrowButton = styled.button<{ position: "left" | "right" }>`
  pointer-events: auto;
  position: absolute;
  top: 50%;
  ${({ position }) =>
    position === "left" ? "left: 0;" : "right: 0;"}
  transform: translateY(-50%);

  width: 64px;
  height: 100%;

  background: linear-gradient(
    ${({ position }) =>
      position === "left"
        ? "to right, rgba(0,0,0,0.75), rgba(0,0,0,0)"
        : "to left, rgba(0,0,0,0.75), rgba(0,0,0,0)"}
  );

  border: none;
  color: white;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  transition: opacity 0.25s ease;

  svg {
    width: 28px;
    height: 28px;
  }

  ${CarouselOuter}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;


/* Simple chevrons using CSS (keeps dependency-free if lucide not desired) */
const ChevronLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


