
import styled from "styled-components";

const videos = [
  // https://youtu.be/cSo4_s9w7pw?si=8D28RWVNeFkN_Ip8
  { id: "cSo4_s9w7pw", title: "Pokopia Hunt" },
  { id: "ZkYtbBloA8w", title: "ItsPoachie video" },
  { id: "5hIW38ni1Ic", title: "Beating Pokémon Diamond with the Hardest to Catch Team!" },
  { id: "9LYEmgG8WoM", title: "ItsRJ Trial" },
  // { id: "wZ821Jh7dks", title: "Client Long-form Intro" },
  // { id: "qW6ZUokrC8M", title: "Roblox Footage Trial #2" },
];

export const LongFormVideos = () => {
  return (
    <Wrapper>
      <Grid>
        {videos.map((video) => (
          <VideoCard key={video.id}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
              title={video.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoCard>
        ))}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 40px;
`;

const Grid = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const VideoCard = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;

  border-radius: 16px;
  overflow: hidden;
  background: #000;

  box-shadow: 0 30px 70px rgba(0,0,0,0.45);

  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 40px 100px rgba(0,0,0,0.65);
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;