import styled from 'styled-components';
import HeroBgAnimation from '../HeroBgAnimation'
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle,SocialMediaIcons,SocialMediaIcon, ResumeButton } from './HeroStyle'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import LazyImage from '../LazyImage';
import { useTotalMergedPRs } from '../../hooks/useGithubPRs';

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 960px) {
    justify-content: center;
    text-align: center;
  }

  @media (max-width: 640px) {
    font-size: 14px;
    gap: 6px;
  }
`;

const StatBadge = styled.div`
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 600;
  white-space: nowrap;

  @media (max-width: 640px) {
    padding: 4px 10px;
    font-size: 14px;
  }
`;

const HeroSection = () => {
    const { totalMergedPRs } = useTotalMergedPRs();

    const randomNumber = Math.floor(Math.random() * 3) + 1;
    const randomImage = `Ragini ${randomNumber}.jpg`;

    return (
        <div id="about">
            <HeroContainer>
                <HeroBg>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer >
                    <HeroLeftContainer id="Left">
                        <Title>Hi, I am <br /> {Bio.name}</Title>
                        <TextLoop>
                            A
                            <Span>
                                <Typewriter
                                    options={{
                                        strings: Bio.roles,
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </Span>
                        </TextLoop>
                        <SubTitle>{Bio.description}</SubTitle>
                        {totalMergedPRs > 0 && (
                            <StatsContainer>
                                Open Source PRs Merged into Production 👉 <StatBadge>{totalMergedPRs}</StatBadge>
                            </StatsContainer>
                        )}
                        <ResumeButton href={Bio.resume} target='display'>Check Resume</ResumeButton>
                    </HeroLeftContainer>

                    <HeroRightContainer id="Right">
                        <Img as={LazyImage} src={`${process.env.PUBLIC_URL}/${randomImage}`} alt="Ragini Pandey img" />
                    </HeroRightContainer>
                </HeroInnerContainer>
            </HeroContainer>
        </div>
    )
}

export default HeroSection
