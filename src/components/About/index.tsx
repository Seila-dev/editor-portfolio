
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import image from "../../assets/tanjiro.png";
import xIcon from "../../assets/x.avif";

/* =======================
   TYPES
======================= */
type XPost = {
    id: string;
    title: string;
    date: string;
    embedHtml: string;
};

/* =======================
   DATA
======================= */
const posts: XPost[] = [
      {
        id: "1",
        title: "just a sneak peek of an edit Im working on",
        date: "January 26, 2026",
        embedHtml: `
        <blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">just a sneak peek of an edit Im working on<a href="https://twitter.com/hashtag/dash?src=hash&amp;ref_src=twsrc%5Etfw">#dash</a> <a href="https://twitter.com/hashtag/edit?src=hash&amp;ref_src=twsrc%5Etfw">#edit</a> <a href="https://twitter.com/hashtag/roblox?src=hash&amp;ref_src=twsrc%5Etfw">#roblox</a> <a href="https://t.co/1rZi3j81d6">pic.twitter.com/1rZi3j81d6</a></p>&mdash; Async | Video Editor (@AsyncEditor) <a href="https://twitter.com/AsyncEditor/status/2015961884294316161?ref_src=twsrc%5Etfw">January 27, 2026</a></blockquote>
`,
    },
    {
        id: "2",
        title: "Built my first Video Editor Portfolio",
        date: "January 22, 2026",
        embedHtml: `
<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">Built my first Video Editor Portfolio 💪<a href="https://t.co/tRWwqZp1sR">https://t.co/tRWwqZp1sR</a><br><br>Not perfect yet, but evolving with every edit.<br>Improvement is part of the process<br><br>Consistency is everything. <a href="https://t.co/ojgTKVwziN">pic.twitter.com/ojgTKVwziN</a></p>&mdash; Async | Video Editor (@AsyncEditor) <a href="https://twitter.com/AsyncEditor/status/2014457734230348007?ref_src=twsrc%5Etfw">January 22, 2026</a></blockquote>
`,
    },
    {
        id: "3",
        title: "Made this intro for a client",
        date: "January 19, 2026",
        embedHtml: `
    <blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">Made this intro for a client<br><br>Want this editing style on your channel?<br>DM me for a free trial 💪 <a href="https://t.co/gmsur9fSV3">pic.twitter.com/gmsur9fSV3</a></p>&mdash; Async | Video Editor (@AsyncEditor) <a href="https://twitter.com/AsyncEditor/status/2013067195543179617?ref_src=twsrc%5Etfw">January 19, 2026</a></blockquote>
`,
    }
];

/* =======================
   TWITTER EMBED
======================= */
const TwitterEmbed = ({ html }: { html: string }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);

    if (!(window as any).twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const handleRendered = () => {
      setReady(true);
    };

    (window as any).twttr?.events?.bind("rendered", handleRendered);
    (window as any).twttr?.widgets?.load();

    return () => {
      (window as any).twttr?.events?.unbind("rendered", handleRendered);
    };
  }, [html]);

  return (
    <TweetSlot>
      {!ready && (
        <FakeTweet>
          <FakeHeader>
            <FakeAvatar />
            <FakeLine w="120px" />
          </FakeHeader>

          <FakeLine w="90%" />
          <FakeLine w="80%" />
          <FakeLine w="60%" />

          <FakeMedia />
        </FakeTweet>
      )}

      <RealTweet ready={ready}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </RealTweet>
    </TweetSlot>
  );
};

/* =======================
   COMPONENT
======================= */
const XPostsSection = () => {
  const [currentPost, setCurrentPost] = useState(posts[0]);

  return (
    <Section id="x">
    <Layout>
  <Left>
    <Header>
      <Title>Building in Public</Title>
      <Subtitle>My journey as a Gaming Video Editor on X</Subtitle>
    </Header>

    <Sidebar>
      <SidebarTitle>Recent posts on <ImageX src={xIcon} alt="" /></SidebarTitle>

      {posts.map(post => (
        <PostItem
          key={post.id}
          isActive={currentPost.id === post.id}
          onClick={() => setCurrentPost(post)}
        >
          <ItemTitle>{post.title}</ItemTitle>
          <ItemDate>{post.date}</ItemDate>
        </PostItem>
      ))}
    </Sidebar>
  </Left>

  <Right>
    <TwitterEmbed
      key={currentPost.id}
      html={currentPost.embedHtml}
    />
  </Right>
</Layout>
    </Section>
  );
};

export default XPostsSection;

/* =======================
   ANIMATIONS
======================= */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

/* =======================
   STYLES
======================= */
const Section = styled.section`
  position: relative;
  min-height: 100vh;
  padding: 150px 150px 60px;
  color: white;
  background: linear-gradient(to left, #030033, #000, transparent);
  overflow: hidden;
  display: flex;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to bottom, rgba(0,0,0,.9), transparent 80%),
      url(${image});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: left;
    opacity: 0.6;
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 0;
  }

  @media (max-width: 1024px) {
    padding: 120px 20px 40px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 100px;
  width: 100%;
  max-width: 1400px;
  min-height: calc(100vh - 210px); /* desconta o padding */
  align-items: center;
  justify-items: center;

  @media (max-width: 1440px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
    
`;

const Left = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;


const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;


const Header = styled.div`
  margin-bottom: 60px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 700;
  background: var(--primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

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

// const Content = styled.div`
//   display: flex;
//   flex-direction: row-reverse;
//   gap: 80px;
//   max-width: 1400px;

//   @media (max-width: 1024px) {
//     flex-direction: column;
//   }
// `;

// const Main = styled.div`
//   flex: 1.2;
//   animation: ${slideIn} 0.8s ease-out 0.2s both;
// `;

const Sidebar = styled.div`
  flex: 1;
  animation: ${slideIn} 0.8s ease-out 0.4s both;
`;


// const Embed = styled.div`
//   margin: 20px 0 30px;
//   transform: scale(0.88);
//   transform-origin: top left;
//   width: 113%;

//   iframe {
//     border-radius: 12px;
//   }
// `;

// const LazyWrapper = styled.div`
//   min-height: 420px;
// `;

const SidebarTitle = styled.h4`
  font-size: 22px;
  margin-bottom: 20px;
  color: white;
`;

const PostItem = styled.div<{ isActive?: boolean }> `padding: 22px; border-left: 2px solid ${({ isActive }) => (isActive ? "var(--primary-light);" : "rgba(255, 0, 0, 0.3)")}; background: ${({ isActive }) => isActive ? "linear-gradient(135deg, rgb(120, 0, 0), transparent)" : "transparent"}; cursor: pointer; transition: 0.4s; &:hover { border-color: var(--primary-light); } ;`

const ItemTitle = styled.h5`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const ItemDate = styled.span`
  font-size: 12px;
  color: #c9c9c9;
`;


// const Skeleton = styled.div`
//   width: 100%;
//   height: 420px;
//   border-radius: 12px;
//   background: linear-gradient(
//     90deg,
//     rgba(255,255,255,0.05) 25%,
//     rgba(255,255,255,0.12) 37%,
//     rgba(255,255,255,0.05) 63%
//   );
//   background-size: 400% 100%;
//   animation: shimmer 1.4s ease infinite;

//   @keyframes shimmer {
//     0% { background-position: 100% 0; }
//     100% { background-position: 0 0; }
//   }
// `;

// const FadeWrapper = styled.div<{ isVisible: boolean }>`
//   opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
//   transition: opacity 0.4s ease;
// `;

const TweetSlot = styled.div`
  position: relative;
  width: 100%;
  max-width: 520px; /* 👈 controle real */
  height: 520px;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
    min-height: 480px;
  }
`;

const RealTweet = styled.div<{ ready: boolean }>`
  opacity: ${({ ready }) => (ready ? 1 : 0)};
  transition: opacity 0.4s ease;
  z-index: 1;

  /* centro perfeito */
  display: flex;
  justify-content: center;

  /* escala suave baseada na tela */
  transform: scale(1);
  transform-origin: top center;

  iframe {
    border-radius: 14px;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    transform: scale(0.98);
  }
  @media (max-width: 500px) {
    transform: scale(0.9);
  }
`;

/* ===== Fake Tweet ===== */
const FakeTweet = styled.div`
  position: absolute;
  inset: 0;
  padding: 20px;
  border-radius: 16px;
  background: #000;
  border: 1px solid rgba(255,255,255,0.08);
  z-index: 2;
`;

const FakeHeader = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const FakeAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #222;
`;

const shimmer = keyframes`
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
`;

const FakeLine = styled.div<{ w?: string }>`
  height: 14px;
  width: ${({ w }) => w || "100%"};
  background: linear-gradient(90deg, #222 25%, #333 37%, #222 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s infinite;
`;

const FakeMedia = styled.div`
  margin-top: 14px;
  width: 100%;
  height: 260px;
  border-radius: 14px;
  background: #222;
`;

const ImageX = styled.img`
  width: 28px;
    height: 28px;
    vertical-align: middle;
    margin-left: 4px;
`;