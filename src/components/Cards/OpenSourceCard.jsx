import styled, { keyframes } from "styled-components";

const Card = styled.div`
  width: 380px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  position: relative;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
  @media (max-width: 768px) {
    width: 100%;
    max-width: 340px;
    padding: 20px 16px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const OrgLogo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.white};
  object-fit: contain;
`;

const OrgInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const OrgName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
`;

const Repo = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + 15};
  padding: 2px 8px;
  border-radius: 10px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + 20};
  margin: 4px 0;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 8px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const StatValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${({ color }) => color};
`;

const StatLabel = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 80};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const SkeletonStat = styled.div`
  width: 30px;
  height: 22px;
  border-radius: 4px;
  background: linear-gradient(90deg, ${({ theme }) => theme.bgLight} 25%, ${({ theme }) => theme.card_light || theme.bgLight} 50%, ${({ theme }) => theme.bgLight} 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const ViewMore = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  text-align: center;
  margin-top: auto;
`;

const OpenSourceCard = ({ contribution, stats, loading, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Top>
        <OrgLogo src={contribution.orgLogo} alt={contribution.org} />
        <OrgInfo>
          <OrgName>{contribution.org}</OrgName>
          <Repo>{contribution.owner}/{contribution.repo}</Repo>
        </OrgInfo>
      </Top>
      <Description>{contribution.description}</Description>
      <Tags>
        {contribution.tags?.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
      <Divider />
      <StatsRow>
        <StatItem>
          {loading ? <SkeletonStat /> : <StatValue color="#854CE6">{stats?.total || 0}</StatValue>}
          <StatLabel>Total PRs</StatLabel>
        </StatItem>
        <StatItem>
          {loading ? <SkeletonStat /> : <StatValue color="#2ea44f">{stats?.merged || 0}</StatValue>}
          <StatLabel>Merged</StatLabel>
        </StatItem>
        <StatItem>
          {loading ? <SkeletonStat /> : <StatValue color="#3b82f6">{stats?.open || 0}</StatValue>}
          <StatLabel>Open</StatLabel>
        </StatItem>
      </StatsRow>
      <ViewMore>View Pull Requests →</ViewMore>
    </Card>
  );
};

export default OpenSourceCard;
