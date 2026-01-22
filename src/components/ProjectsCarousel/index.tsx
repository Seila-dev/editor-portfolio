import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
// import { ChevronLeft, ChevronRight } from "lucide-react";

const shorts = [
  {
    id: "xYLfinmv4pc",
    title: "There's NO ONE who wouldn't get scared by this!",
  },
  {
    id: "jzgCQKKUFNM",
    title: "Roblox Viral Short Video",
  },
];

export const ShortsCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  // const handleScroll = (direction: "left" | "right") => {
  //   if (!carouselRef.current) return;

  //   carouselRef.current.scrollBy({
  //     left: direction === "left" ? -320 : 320,
  //     behavior: "smooth",
  //   });
  // };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDown = true;
    startX = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft = carouselRef.current.scrollLeft;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !carouselRef.current) return;
    e.preventDefault();

    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.3;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Wrapper>
      {/* <ArrowButton position="left" onClick={() => handleScroll("left")}>
        <ChevronLeft size={20} />
      </ArrowButton> */}

      <ScrollArea
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {shorts.map((short, index) => (
          <ShortCard key={`${short.id}-${index}`}>
            <iframe
              src={`https://www.youtube.com/embed/${short.id}?controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
              title={short.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </ShortCard>
        ))}
      </ScrollArea>

      {/* <ArrowButton position="right" onClick={() => handleScroll("right")}>
        <ChevronRight size={20} />
      </ArrowButton> */}
    </Wrapper>
  );
};

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  position: relative;
  gap: 12px;
  padding: 60px 0;
  animation: ${slideIn} 0.8s ease-out;
`;

const ScrollArea = styled.div`
  display: flex;
  gap: 28px;
  overflow-x: auto;
  scroll-behavior: smooth;
  cursor: grab;

  &::-webkit-scrollbar {
    display: none;
  }

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
  transition: transform 0.3s ease;

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

// const ArrowButton = styled.button<{ position: "left" | "right" }>`
//   background: #1a1a1a;
//   border: 1px solid #333;
//   color: white;
//   padding: 8px;
//   position: absolute;
//   top: 50%;
//   ${({ position }) => (position === "left" ? "left: -2%;" : "right: -2%;")}
//   transform: translateY(-50%);
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 2;
//   cursor: pointer;
//   transition: background 0.2s;

//   &:hover {
//     background: #333;
//   }
// `;
