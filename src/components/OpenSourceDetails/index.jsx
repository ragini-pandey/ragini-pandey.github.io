import { CloseRounded } from "@mui/icons-material";
import { Modal } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: top;
  justify-content: center;
  overflow-y: scroll;
  transition: all 0.5s ease;
`;

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  border-radius: 16px;
  margin: 50px 12px;
  height: min-content;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
`;

const OrgLogo = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.white};
  object-fit: contain;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const OrgName = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  @media only screen and (max-width: 600px) {
    font-size: 22px;
  }
`;

const RepoLink = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Desc = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  margin: 8px 0 16px 0;
  line-height: 1.6;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 16px 0;
  gap: 8px;
`;

const Tag = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  padding: 4px 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary + 20};
`;

const StatsBar = styled.div`
  display: flex;
  gap: 20px;
  padding: 16px 0;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + 20};
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const StatText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
`;

const StatCount = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 12px;
`;

const PRList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
`;

const PRItem = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-decoration: none;
  padding: 12px 14px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bg};
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary + 12};
    transform: translateX(4px);
  }
`;

const StatusIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 2px;
  font-size: 12px;
  color: white;
  background-color: ${({ status }) =>
    status === "Merged"
      ? "#2ea44f"
      : status === "Open"
      ? "#3b82f6"
      : "#6e7681"};
`;

const PRInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const PRTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.4;
  @media only screen and (max-width: 600px) {
    font-size: 13px;
  }
`;

const PRMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const PRNumber = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const PRDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary + 70};
`;

const PRStatus = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  color: ${({ status }) =>
    status === "Merged"
      ? "#2ea44f"
      : status === "Open"
      ? "#3b82f6"
      : "#6e7681"};
  background-color: ${({ status }) =>
    status === "Merged"
      ? "#2ea44f18"
      : status === "Open"
      ? "#3b82f618"
      : "#6e768118"};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 12px 0 0 0;
  gap: 12px;
`;

const Button = styled.a`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary + 99};
  }
  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const statusIcons = {
  Merged: "✓",
  Open: "●",
  Closed: "✕",
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const OpenSourceDetails = ({ openModal, setOpenModal }) => {
  const contribution = openModal?.contribution;
  if (!contribution) return null;

  const prs = contribution.prs || [];
  const merged = prs.filter((p) => p.status === "Merged");
  const open = prs.filter((p) => p.status === "Open");

  return (
    <Modal
      open={true}
      onClose={() => setOpenModal({ state: false, contribution: null })}
    >
      <Container>
        <Wrapper>
          <CloseRounded
            style={{
              position: "absolute",
              top: "10px",
              right: "20px",
              cursor: "pointer",
            }}
            onClick={() => setOpenModal({ state: false, contribution: null })}
          />
          <Header>
            <OrgLogo src={contribution.orgLogo} alt={contribution.org} />
            <HeaderInfo>
              <OrgName>{contribution.org}</OrgName>
              <RepoLink
                href={`https://github.com/${contribution.owner}/${contribution.repo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contribution.owner}/{contribution.repo}
              </RepoLink>
            </HeaderInfo>
          </Header>
          <Desc>{contribution.description}</Desc>
          <Tags>
            {contribution.tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
          <StatsBar>
            <StatItem>
              <StatDot color="#854CE6" />
              <StatText>
                <StatCount>{prs.length}</StatCount> Total
              </StatText>
            </StatItem>
            <StatItem>
              <StatDot color="#2ea44f" />
              <StatText>
                <StatCount>{merged.length}</StatCount> Merged
              </StatText>
            </StatItem>
            <StatItem>
              <StatDot color="#3b82f6" />
              <StatText>
                <StatCount>{open.length}</StatCount> Open
              </StatText>
            </StatItem>
          </StatsBar>

          {prs.length > 0 && (
            <>
              <SectionTitle>Pull Requests</SectionTitle>
              <PRList>
                {prs.map((pr, index) => (
                  <PRItem
                    key={index}
                    href={pr.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <StatusIcon status={pr.status}>
                      {statusIcons[pr.status] || "●"}
                    </StatusIcon>
                    <PRInfo>
                      <PRTitle>{pr.title}</PRTitle>
                      <PRMeta>
                        <PRNumber>#{pr.number}</PRNumber>
                        <PRStatus status={pr.status}>{pr.status}</PRStatus>
                        <PRDate>{formatDate(pr.createdAt)}</PRDate>
                      </PRMeta>
                    </PRInfo>
                  </PRItem>
                ))}
              </PRList>
            </>
          )}

          <ButtonGroup>
            <Button
              href={`https://github.com/${contribution.owner}/${contribution.repo}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Repository
            </Button>
          </ButtonGroup>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default OpenSourceDetails;
