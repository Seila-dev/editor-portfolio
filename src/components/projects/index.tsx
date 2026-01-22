import styled, { keyframes } from "styled-components";
import { ShortsCarousel } from "../ProjectsCarousel";
import VideoSection from "../MainProject";
import shortsBg from "../../assets/kokushibo-hd.jpg";
import shortsMobileBg from "../../assets/lua-sangrenta-3.jfif";

const Projects = () => {

  return (
    <div>
      <Section id="videos">
        <Content>
          <VideoSection />
        </Content>
      </Section>
      <OtherProjectsSection id="shorts">
        <Header>
          <Title>Shorts Videos</Title>
          <Subtitle>This section features my short-form video edits, created for quick and engaging vertical content. These projects focus on sharp cuts, strong pacing, and sound design to deliver maximum impact in a short timeframe. More shorts are currently in production and will be added regularly.</Subtitle>
        </Header>
        <ShortsCarousel />
      </OtherProjectsSection>
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
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const OtherProjectsSection = styled.div`
  position: relative;
  margin-top: 60px;
  min-height: 100vh;
  padding: 100px 150px;
  overflow: hidden;
      background-image: url(${shortsBg});
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
    // margin-bottom: 00px;
    animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h2`
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 10px;
    background: var(--white);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
`;

const Subtitle = styled.p`
  color: #d1d5db;
  line-height: 1.6;
  font-size: 1.1rem;
  max-width: 42rem; 
`;