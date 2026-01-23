import styled from "styled-components"
import backgroundVideo from '../../assets/blood-moon.jpg'
import ytIcon from '../../assets/yt-icon.png'
import xIcon from '../../assets/x.avif'
import discordIcon from '../../assets/discord.png'
import gmailIcon from '../../assets/gmail.png'
import Projects from "../projects"
import { useEffect, useState } from "react"
// import cvDownload from '../../assets/ErickOliveiraRodrigues_TechLeadFullStack_PT_8.pdf'
import { TechSlider } from "../TechSlider"
import XPostsSection from "../About"
import { SocialFooter } from "../SocialMedia"
// import { Background } from "../BackgroundEclipse"
import { toast } from "sonner";

interface MouseMovements {
    clientX: number;
    clientY: number;
}

const DISCORD_COLOR = "#5865f2";
const GMAIL_COLOR = "#ea4335";

export const Main = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isDiscordOpen, setIsDiscordOpen] = useState(false);
    const [isGmailOpen, setIsGmailOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const discordNick = "iamnotasync";
    const gmailNick = "henryisnotaeditor@gmail.com";

    useEffect(() => {
        const handleMouseMove = (e: MouseMovements) => {
            setCursorPosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [])

    useEffect(() => {
        const handleMouseMove = (e: MouseMovements) => {
            const { clientX, clientY } = e;
            const offsetX = (clientX - window.innerWidth / 2) * 0.05;
            const offsetY = (clientY - window.innerHeight / 2) * 0.05;
            document.querySelector('.character img')?.setAttribute(
                'style',
                `transform: translate(${offsetX}px, ${offsetY}px)`
            );
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const closeDiscordPopup = () => {
    setIsClosing(true);

    setTimeout(() => {
        setIsDiscordOpen(false);
        setIsClosing(false);
    }, 250);
};

const closeGmailPopup = () => {
    setIsClosing(true);

    setTimeout(() => {
        setIsGmailOpen(false);
        setIsClosing(false);
    }, 250);
};

const handleCopyDiscord = () => {
    navigator.clipboard.writeText(discordNick);

    closeDiscordPopup();

    setTimeout(() => {
        toast.success("Discord username copied!", {
            description: "You can now paste it on Discord 👾",
        });
    }, 260);
};

const handleCopyGmail = () => {
    navigator.clipboard.writeText(gmailNick);

    closeGmailPopup();

    setTimeout(() => {
        toast.success("Email copied!", {
            description: "You can now paste it into Gmail 📧",
        });
    }, 260);
};

        return (
            <>
                {/* <Background /> */}
                <Introduction id="home">
                    <div className="info">
                        <p>Hey, i'm</p>
                        <h1>Async</h1>
                        <span> &gt; <strong>Video Editor</strong> for YouTubers and Streamers</span>
                        <div className="cv-style">
                            <a href="https://x.com/AsyncEditor" className="download-cv links" target="_blank" rel="noopener noreferrer">
                                <img src={xIcon} alt="Icon Linkedin" />
                                Connect with me on X
                            </a>
                            <button
                                className="second-cta links"
                                onClick={() => setIsDiscordOpen(true)}
                            >
                                <img src={discordIcon} alt="Discord icon" />
                                DM me on Discord
                            </button>
                        </div>
                    </div>

                    <div className="arrow">
                        <p>↓</p>
                    </div>
                    <div className="social-media">
                        <a href="https://www.youtube.com/@AsyncEditor/videos" className="logo" target="_blank" rel="noopener noreferrer">
                            <img src={ytIcon} alt="Youtube icon" />
                        </a>
                        <a href="https://www.linkedin.com/in/erickrodrigues-dev/" className="logo" target="_blank" rel="noopener noreferrer">
                            <img src={xIcon} alt="X icon" />
                        </a>
                        <button className="logo" onClick={() => setIsDiscordOpen(true)}>
                            <img src={discordIcon} alt="Discord icon" />
                        </button>
                        <button className="logo gmail" onClick={() => setIsGmailOpen(true)}>
                            <img src={gmailIcon} alt="Gmail icon" />
                        </button>
                    </div>
                </Introduction>
                <SectionTransition />
                <TechSlider />
                <Projects />
                <XPostsSection /> 
                <SocialFooter />
                <BackgroundPrompt>
                    {/* <video src={backgroundVideo} autoPlay muted loop></video> */}
                    {/* <img src={backgroundVideo} alt="" /> */}
                </BackgroundPrompt>
                <CursorDot style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}></CursorDot>
                <CursorOutline style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}></CursorOutline>
                {isDiscordOpen && (
                    <DiscordOverlay
                        $closing={isClosing}
                        onClick={closeDiscordPopup}
                    >
                        <DiscordPopup
                            $closing={isClosing}
                            $color={DISCORD_COLOR}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 onClick={handleCopyDiscord}>{discordNick}</h2>
                            <p>Click to copy</p>
                        </DiscordPopup>
                    </DiscordOverlay>
                )}
                {isGmailOpen && (
                    <DiscordOverlay
                        $closing={isClosing}
                        onClick={closeGmailPopup}
                    >
                        <DiscordPopup
                            $closing={isClosing}
                            $color={GMAIL_COLOR}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 onClick={handleCopyGmail}>{gmailNick}</h2>
                            <p>Click to copy</p>
                        </DiscordPopup>
                    </DiscordOverlay>
                )}
            </>
        )
    }


    const CursorDot = styled.div`
    width: 5px;
    height: 5px;
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 9;
    pointer-events: none;
    @media(max-width: 768px){
        display: none;
    }
`

    const CursorOutline = styled.div`
    width: 30px;
    height: 30px;
    border: 2px solid hsla(0, 0%, 100%, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 8;
    pointer-events: none;
    transition: left 0.1s ease, top 0.1s ease;

    @media(max-width: 768px){
        display: none;
    }
`

    const Introduction = styled.main`
  display: flex;
  align-items: center;
  padding: 0 150px;
  height: 78vh;
  margin-bottom: 0; 
  position: relative;
  z-index: 1;
  width: 100%;
  background-image: url(${backgroundVideo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 20%;
  background-color: transparent;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.610);
    z-index: -1; 
  }
  &::before {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, black 100%);
    z-index: 2;
    pointer-events: none;
  }
    .info p{
        font-size: 24px;
        color: #c2c2c2;
    }
    .info h1{
        font-size: 60px;
        margin-bottom: 10px;
    }
    .info span{
        // color: var(--primary-light);
        color: #ff5353;
        font-size: 24px;
    }
    .info *{
        animation: fade-up 0.5s 0.4s backwards;
    }
    .info .cv-style{
        margin-top: 25px;
    }
    .info .links{
        // background: var(--primary);
        background: #fff;
        color: #000;
        width: 100%;
        max-width: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #fff;
        border-radius: 5px;
        font-weight: 600;
        padding: 12px 24px;
        margin: 10px 0;
        cursor: pointer;
        animation: fade-up 0.5s 0.4s backwards;
        transition: 0.35s ease-in;
        &:hover{
            background: black;
            color: white;
        }
    }
    .info .links img{
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
    .links.second-cta {
      background: transparent;
      color: white;
      border: 1px solid gray;

      &:hover {
        background: rgb(0, 41, 131);
        color: white;
        }
    }

    .arrow {
        position: absolute;
        left: 50%;
        bottom: 100px;
        animation: anima-seta 2000ms ease-in-out infinite;
        opacity: 0;
    }


    .social-media{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // background-color: #000000;
        border-radius: 10px 0 0 10px;
        position: absolute;
          background-color: #171717;
          opacity: 0.7;
            border: 1px solid gray;
            border-right: none;
        right: 0;
        z-index: 999999;
        animation: fade-up 0.5s 0.4s backwards;
        transition: opacity 0.4s ease-in-out;
        &:hover{
            opacity: 1;
        }
    }
    .social-media .logo{
        padding: 10px;
        cursor: pointer;
        border: none;
    }
    .social-media .logo img{
        width: 50px;
        height: 50px;
    }
    .social-media .logo.gmail img{
        max-height: 30px;
    }
    .social-media button{
        background: transparent;
    }

    @media (max-width: 1024px) {
        padding: 40px 20px;
    }

    @media(max-width: 768px){
        background-position: 70%;
        padding: 40px 10px 10px 10px;

        .info h1{
            font-size: 40px;
        }
        .social-media {
            bottom: 0;
            position: fixed;
            width: 100%;
            justify-content: center;
            flex-direction: row;
            // background: rgba(134, 1, 243, 0.26);
            background: rgba(243, 9, 1, 0.16);
            border-radius: 0;
        }
        .arrow {
            left: 43%;
        }
    }
    @media(max-width: 380px){
    background-image: url(${backgroundVideo});
        &::after {
            background-color: rgba(0, 0, 0, 0.6); 
        }

        .info h1{
            font-size: 32px;
        }
        .info span{
            font-size: 15px;
        }
        .info p{
            font-size: 20px;
        }
    }
`


    const BackgroundPrompt = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    z-index: -999;
    width: 100%;
    height: 100%;
    background-color: black;
    img{
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        opacity: 0.675;
    }
`

    const SectionTransition = styled.div`
  position: relative;
  width: 100%;
  height: 0px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
  z-index: 1;
  margin-top: -1px; 
`;

    const DiscordOverlay = styled.div<{ $closing: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999999;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;

  animation: ${({ $closing }) =>
            $closing ? "fadeOut 0.25s ease forwards" : "fadeIn 0.25s ease forwards"};

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

const DiscordPopup = styled.div<{ $closing: boolean; $color: string }>`
  background: #1e1f22;
  border-radius: 12px;
  padding: 40px 50px;
  text-align: center;
  border: 1px solid #2b2d31;

  animation: ${({ $closing }) =>
            $closing ? "slideDown 0.25s ease forwards" : "slideUp 0.25s ease forwards"};

  h2 {
    font-size: 48px;
    color: ${({ $color }) => $color};
    cursor: pointer;
    user-select: none;
    transition: 0.2s ease;

    &:hover {
        transform: scale(1.05);
    }
 }

  p {
    margin-top: 10px;
    font-size: 22px;
    color: #989a9c;
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(20px);
      opacity: 0;
    }
  }
`;