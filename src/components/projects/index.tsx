import styled, { keyframes } from "styled-components";
import { LongFormVideos } from "../ProjectsCarousel";
import VideoSection from "../MainProject";
import shortsBg from "../../assets/kokushibo-hd.jpg";
import shortsMobileBg from "../../assets/lua-sangrenta-3.jfif";
import HighlightSection from "../HighlightSection";

const Projects = () => {

  return (
    <div>
      <HighlightSection />
      <OtherProjectsSection id="videos">



  <Header style={{ marginTop: "120px" }}>
    <Title>Long-form Videos</Title>
    <Subtitle>
      Full-length YouTube edits and client projects focused on storytelling,
      pacing, and immersive editing. These videos highlight more complex
      structures, transitions, and narrative flow.
    </Subtitle>
  </Header>

  <LongFormVideos />
</OtherProjectsSection>
      <Section id="shorts">
        <Content>
          <VideoSection />
        </Content>
      </Section>
    </div>
  );
};

export default Projects;

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  color: white;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const OtherProjectsSection = styled.div`
  position: relative;
  margin-top: 60px;
  min-height: 100vh;
  padding: 100px 150px;
  overflow: hidden;
      background-image: url(${shortsMobileBg});
      background-position: right;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.95;
    z-index: 0;

  /* Background image */
  // &::before {
  //   content: "";
  //   position: absolute;
  //   inset: 0;
  //   background-image: url(${shortsBg});
  //   background-position: center;
  //   background-size: cover;
  //   background-repeat: no-repeat;
  //   opacity: 0.95;
  //   z-index: 0;
  //   transform: scale(1.05);
  // }

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


  /* Dark overlay */
  &::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.95)
  );
  z-index: 1;
}

  /* Content above background */
  > * {
    position: relative;
    z-index: 2;
  }

  @media (max-width: 1024px) {
    padding: 80px 20px;
  }
  @media (max-width: 768px) {    
    background-image: url(${shortsMobileBg});

      &::after {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15)
  );
}
  }
`;

const Header = styled.div`
  margin-bottom: 48px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h2`
    font-size: 2rem;
    font-weight: bold;
    color: white;
    margin-bottom: 1rem;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);

    @media (min-width: 1024px) {
      font-size: 3rem;
    }
`;

const Subtitle = styled.p`
  color: #d1d5db;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 1.2rem;
  max-width: 42rem;
`;