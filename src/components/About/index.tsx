import { useState } from "react";
import styled, { keyframes } from "styled-components";

/* =======================
   TYPES
======================= */
type Client = {
  id: string;
  name: string;
  avatar: string;
  subscribers: string;
  description: string;
  banner: string;
};

/* =======================
   DATA
======================= */
const clients: Client[] = [
  {
    id: "1",
    name: "TheZikzip",
    avatar: "/clients/zikzip.jpg",
    banner: "/clients/zikzip-banner.jpg",
    subscribers: "120K subscribers",
    description: "Valorant creator focused on high-retention short form edits."
  },
  {
    id: "2",
    name: "WarOnRoot",
    avatar: "/clients/root.jpg",
    banner: "/clients/root-banner.jpg",
    subscribers: "85K subscribers",
    description: "Roblox content creator focused on fast paced content."
  },
  {
    id: "3",
    name: "ExampleCreator",
    avatar: "/clients/example.jpg",
    banner: "/clients/example-banner.jpg",
    subscribers: "240K subscribers",
    description: "Gaming creator focused on viral short form content."
  }
];

/* =======================
   COMPONENT
======================= */
const ClientsSection = () => {
  const [currentClient, setCurrentClient] = useState(clients[0]);

  return (
    <Section id="clients">
      <Layout>

        <Left>
          <Header>
            <Title>My Clients</Title>
            <Subtitle>
              Creators I've worked with as a Video Editor
            </Subtitle>
          </Header>

          <Sidebar>

            {clients.map(client => (
              <ClientItem
                key={client.id}
                isActive={client.id === currentClient.id}
                onClick={() => setCurrentClient(client)}
              >

                <ClientAvatar src={client.avatar} />

                <ClientInfo>
                  <ClientName>{client.name}</ClientName>
                  <ClientSubs>{client.subscribers}</ClientSubs>
                </ClientInfo>

              </ClientItem>
            ))}

          </Sidebar>
        </Left>

        <Right>

          <Preview>

            <Banner src={currentClient.banner} />

            <PreviewContent>

              <PreviewAvatar src={currentClient.avatar} />

              <PreviewText>
                <PreviewName>{currentClient.name}</PreviewName>
                <PreviewSubs>{currentClient.subscribers}</PreviewSubs>

                <PreviewDescription>
                  {currentClient.description}
                </PreviewDescription>
              </PreviewText>

            </PreviewContent>

          </Preview>

        </Right>

      </Layout>
    </Section>
  );
};

export default ClientsSection;

/* =======================
   ANIMATIONS
======================= */

const fadeIn = keyframes`
from {opacity:0; transform:translateY(20px);}
to {opacity:1; transform:translateY(0);}
`;

const slideIn = keyframes`
from {opacity:0; transform:translateX(-20px);}
to {opacity:1; transform:translateX(0);}
`;

/* =======================
   STYLES
======================= */

const Section = styled.section`
min-height:100vh;
padding:150px 150px 60px;
color:white;

background:
radial-gradient(circle at 20% 40%, rgba(255,0,0,0.25), transparent 40%),
linear-gradient(to right,#000,#180000);

display:flex;
overflow:hidden;

@media(max-width:1024px){
padding:120px 20px 40px;
}
`;

const Layout = styled.div`
display:grid;
grid-template-columns:1fr 1.2fr;
gap:100px;
max-width:1400px;
width:100%;
margin:auto;

align-items:center;

@media(max-width:1024px){
grid-template-columns:1fr;
gap:60px;
}
`;

const Left = styled.div`
display:flex;
flex-direction:column;
`;

const Right = styled.div`
display:flex;
justify-content:center;
`;

const Header = styled.div`
margin-bottom:50px;
animation:${fadeIn} .8s ease-out;
`;

const Title = styled.h2`
font-size:48px;
font-weight:700;

background:linear-gradient(90deg,#ff2a2a,#ff7b00);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
`;

const Subtitle = styled.p`
color:#d1d5db;
margin-top:10px;
`;

/* SIDEBAR */

const Sidebar = styled.div`
animation:${slideIn} .8s ease-out .2s both;
`;

const ClientItem = styled.div<{isActive:boolean}>`
display:flex;
gap:14px;
align-items:center;

padding:18px;

border-left:2px solid ${({isActive}) =>
isActive ? "#ff3c3c" : "rgba(255,0,0,.3)"};

background:${({isActive}) =>
isActive
? "linear-gradient(135deg,rgba(255,0,0,.35),transparent)"
: "transparent"};

cursor:pointer;
transition:.3s;

&:hover{
border-color:#ff3c3c;
}
`;

const ClientAvatar = styled.img`
width:46px;
height:46px;
border-radius:50%;
object-fit:cover;
`;

const ClientInfo = styled.div`
display:flex;
flex-direction:column;
`;

const ClientName = styled.h4`
font-size:15px;
font-weight:600;
`;

const ClientSubs = styled.span`
font-size:12px;
color:#aaa;
`;

/* PREVIEW */

const Preview = styled.div`
width:520px;
background:#0b0b0b;
border-radius:18px;
overflow:hidden;

border:1px solid rgba(255,0,0,.25);

box-shadow:
0 0 30px rgba(255,0,0,.25);

animation:${fadeIn} .6s ease;
`;

const Banner = styled.img`
width:100%;
height:180px;
object-fit:cover;
`;

const PreviewContent = styled.div`
display:flex;
gap:20px;
padding:25px;
`;

const PreviewAvatar = styled.img`
width:70px;
height:70px;
border-radius:50%;
`;

const PreviewText = styled.div`
display:flex;
flex-direction:column;
`;

const PreviewName = styled.h3`
font-size:22px;
font-weight:700;
`;

const PreviewSubs = styled.span`
color:#ff5c5c;
font-size:13px;
margin-bottom:10px;
`;

const PreviewDescription = styled.p`
color:#bbb;
line-height:1.5;
font-size:14px;
`;