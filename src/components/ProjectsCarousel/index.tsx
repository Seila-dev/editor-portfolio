import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";

const shorts = [
  { id: "2mZFa1Re_1w", title: "Is THIS the BEST Crosshair in Valorant?" },
  { id: "GWwnWi2z5bc", title: "THIS ROBLOX GAME IS SCARIER THAN THE ORIGINAL" },
  { id: "xYLfinmv4pc", title: "There's NO ONE who wouldn't get scared by this!" },
  { id: "jzgCQKKUFNM", title: "Roblox Viral Short Video" },
];

export const ShortsCarousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleScrollBy = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir === "left" ? -260 : 260,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const stopDrag = () => (isDown.current = false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <Wrapper>
      <CarouselOuter>
        <ScrollArea
          ref={carouselRef}
          onMouseDown={onMouseDown}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onMouseMove={onMouseMove}
        >
          {shorts.map((short, i) => (
            <ShortCard key={`${short.id}-${i}`}>
              <iframe
                src={`https://www.youtube.com/embed/${short.id}?controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
                title={short.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </ShortCard>
          ))}
        </ScrollArea>

        {/* ARROWS (mobile visible) */}
        <ArrowOverlay>
          <ArrowButton position="left" onClick={() => handleScrollBy("left")}>
            <ChevronLeft />
          </ArrowButton>
          <ArrowButton position="right" onClick={() => handleScrollBy("right")}>
            <ChevronRight />
          </ArrowButton>
        </ArrowOverlay>
      </CarouselOuter>
    </Wrapper>
  );
};


const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.section`
  padding: 60px 0;
  animation: ${slideIn} 0.8s ease-out;
`;

const CarouselOuter = styled.div`
  position: relative;
`;

const ScrollArea = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  cursor: grab;
  padding: 8px;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  &:active {
    cursor: grabbing;
  }
`;

const ShortCard = styled.div`
  flex: 0 0 auto;
  width: 260px;
  aspect-ratio: 9 / 16;
  border-radius: 14px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-6px);
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    width: 220px;
  }
`;

const ArrowOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const ArrowButton = styled.button<{ position: "left" | "right" }>`
  pointer-events: auto;
  position: absolute;
  top: 50%;
  ${({ position }) => (position === "left" ? "left: 0;" : "right: 0;")}
  transform: translateY(-50%);

  width: 48px;
  height: 100%;

  background: linear-gradient(
    ${({ position }) =>
      position === "left"
        ? "to right, rgba(0,0,0,0.7), rgba(0,0,0,0)"
        : "to left, rgba(0,0,0,0.7), rgba(0,0,0,0)"}
  );

  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 1;
  cursor: pointer;

  @media (min-width: 769px) {
    opacity: 0;
    ${CarouselOuter}:hover & {
      opacity: 1;
    }
  }
`;
