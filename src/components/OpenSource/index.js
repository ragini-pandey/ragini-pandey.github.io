import styled from "styled-components";
import { openSourceContributions } from "../../data/constants";
import OpenSourceCard from "../Cards/OpenSourceCard";
import OpenSourceDetails from "../OpenSourceDetails";
import { CodeTitle } from "../Experience";
import { useOpenSourcePRs } from "../../hooks/useGithubPRs";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 40px 0px 80px 0px;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 10px 0px 100px 0;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 28px;
  flex-wrap: wrap;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const StatBadge = styled.div`
  background: #10b98120;
  color: #10b981;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
`;

const OpenSource = () => {
  const { prData, totalMergedPRs, loading } = useOpenSourcePRs();
  const [openModal, setOpenModal] = useState({ state: false, contribution: null });

  return (
    <Container id="opensource">
      <Wrapper>
        <CodeTitle>
          &lt; <span>Open Source Contributions</span> /&gt;
        </CodeTitle>
        {totalMergedPRs > 0 && (
          <StatsContainer>
            Total Merged PRs 👉 <StatBadge>{totalMergedPRs}</StatBadge>
          </StatsContainer>
        )}
        <CardContainer>
          {openSourceContributions.map((contribution) => (
            <OpenSourceCard
              key={contribution.id}
              contribution={contribution}
              stats={prData[contribution.id]}
              loading={loading}
              onClick={() =>
                setOpenModal({ state: true, contribution: { ...contribution, ...prData[contribution.id] } })
              }
            />
          ))}
        </CardContainer>
      </Wrapper>
      {openModal.state && (
        <OpenSourceDetails openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </Container>
  );
};

export default OpenSource;
