"use client";

import styled from "styled-components";
import ytIcon from "../../assets/youtube.png";
import xIcon from "../../assets/x.avif";
import discordIcon from "../../assets/discord.png";
import { useState } from "react";
import { toast } from "sonner";

export const SocialFooter = () => {
  const [isDiscordOpen, setIsDiscordOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const discordNick = "iamnotasync";

  const closeDiscordPopup = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsDiscordOpen(false);
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

  return (
    <>
      <SectionTransition />

      <FooterContainer id="socialmedia">
        <FooterContent>
          <SocialSection>
            <h2>Social Media</h2>
            <p>Find me on social networks and follow my work</p>

            <SocialGrid>
              {/* YOUTUBE */}
              <SocialLink
                href="https://www.youtube.com/@AsyncEditor"
                target="_blank"
                rel="noopener noreferrer"
                className="youtube"
              >
                <img src={ytIcon} alt="YouTube" />
                <div className="social-info">
                  <span className="social-name">YouTube</span>
                  <span className="social-desc">
                    Overall shorts and videos
                  </span>
                </div>
              </SocialLink>

              {/* X */}
              <SocialLink
                href="https://x.com/AsyncEditor"
                target="_blank"
                rel="noopener noreferrer"
                className="x"
              >
                <img src={xIcon} alt="X" />
                <div className="social-info">
                  <span className="social-name">X</span>
                  <span className="social-desc">
                    Updates, progress and career
                  </span>
                </div>
              </SocialLink>

              {/* DISCORD (BUTTON) */}
              <SocialLink
                as="button"
                type="button"
                className="discord"
                onClick={() => setIsDiscordOpen(true)}
              >
                <img src={discordIcon} alt="Discord" />
                <div className="social-info">
                  <span className="social-name">Discord</span>
                  <span className="social-desc">Feel free to DM me here</span>
                </div>
              </SocialLink>
            </SocialGrid>
          </SocialSection>

          <FooterBottom>
            <p>© 2026 Henry (Async). Video Editor for Youtubers and Streamers</p>
            <span>Built by me with ❤️ and lots of code</span>
          </FooterBottom>
        </FooterContent>
      </FooterContainer>

      {/* DISCORD POPUP (exemplo simples) */}
      {isDiscordOpen && (
    <DiscordOverlay
        $closing={isClosing}
        onClick={closeDiscordPopup}
    >
        <DiscordPopup
            $closing={isClosing}
            onClick={(e) => e.stopPropagation()}
        >
            <h2 onClick={handleCopyDiscord}>{discordNick}</h2>
            <p>Click to copy</p>
        </DiscordPopup>
    </DiscordOverlay>
)}
    </>
  );
};



    const SectionTransition = styled.div`
    position: relative;
    width: 100%;
    height: 0px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
    z-index: 1;
    margin-top: -1px;
`;

    const FooterContainer = styled.footer`
    background: linear-gradient(135deg, #1a1a1a 0%, #000 100%);
    color: white;
    padding: 80px 0 40px;
    position: relative;
    
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--primary), transparent);
    }
`;

    const FooterContent = styled.div`
    // max-width: 1200px;
    margin: 0 auto;
    padding: 0 150px;

    @media (max-width: 1024px) {
        padding: 0 40px;
    }

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`;

    const SocialSection = styled.div`
    // text-align: center;
    margin-bottom: 60px;

    h2 {
        font-size: 48px;
        margin-bottom: 15px;
        background: linear-gradient(45deg, var(--primary), var(--primary-light));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: fade-up 0.5s 0.2s backwards;
    }

    p {
        font-size: 20px;
        color: #c2c2c2;
        margin-bottom: 50px;
        animation: fade-up 0.5s 0.4s backwards;
    }

    @media (max-width: 768px) {
        h2 {
            font-size: 32px;
        }
        
        p {
            font-size: 18px;
        }
    }
`;

    const SocialGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    // max-width: 800px;
    // margin: 0 auto;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

    const SocialLink = styled.a`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  font-family: inherit;
  outline: none;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: 0 20px 40px rgba(134, 1, 243, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 4px;
  }

  img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    border-radius: 10px;
  }

  .social-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
    gap: 5px;
  }

  .social-name {
    font-size: 20px;
    font-weight: 600;
  }

  .social-desc {
    font-size: 14px;
    color: #c2c2c2;
  }

  &.discord:hover {
    border-color: rgb(0, 41, 131);
    box-shadow: 0 20px 40px rgba(0, 119, 181, 0.3);
  }

  &.x:hover {
    border-color: #bababacc;
    box-shadow: 0 20px 40px rgba(126, 126, 126, 0.3);
  }

  &.youtube:hover {
    border-color: #ff0000;
    box-shadow: 0 20px 40px rgba(255, 0, 0, 0.3);
  }
`;

    const FooterBottom = styled.div`
    text-align: center;
    padding-top: 40px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    animation: fade-up 0.5s 0.8s backwards;

    p {
        font-size: 16px;
        color: #c2c2c2;
        margin-bottom: 10px;
    }

    span {
        font-size: 14px;
        color: var(--primary-light);
    }

    @media (max-width: 768px) {
        margin-bottom: 70px;
        p {
            font-size: 14px;
        }
        
        span {
            font-size: 12px;
        }
    }
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

const DiscordPopup = styled.div<{ $closing: boolean }>`
  background: #1e1f22;
  border-radius: 12px;
  padding: 40px 50px;
  text-align: center;
  border: 1px solid #2b2d31;

  animation: ${({ $closing }) =>
    $closing ? "slideDown 0.25s ease forwards" : "slideUp 0.25s ease forwards"};

  h2 {
    font-size: 48px;
    color: #5865f2;
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