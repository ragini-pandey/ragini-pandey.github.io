import { useState, useEffect } from "react";
import styled from "styled-components";
import { openSourceContributions } from "../../data/constants";
import OpenSourceCard from "../Cards/OpenSourceCard";
import OpenSourceDetails from "../OpenSourceDetails";
import { CodeTitle } from "../Experience";

const GITHUB_USERNAME = "ragini-pandey";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const githubGraphQL = (query) =>
  fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  }).then((res) => res.json());

const buildBatchedQuery = (contributions) => {
  const repoFields = contributions
    .map(
      ({ id, owner, repo }) => `
    openPRs_${id}: search(
      query: "is:pr is:open author:${GITHUB_USERNAME} repo:${owner}/${repo}"
      type: ISSUE
      first: 100
    ) {
      nodes {
        ... on PullRequest {
          title
          number
          url
          createdAt
          labels(first: 10) { nodes { name } }
        }
      }
    }
    mergedPRs_${id}: search(
      query: "is:pr is:merged author:${GITHUB_USERNAME} repo:${owner}/${repo}"
      type: ISSUE
      first: 100
    ) {
      nodes {
        ... on PullRequest {
          title
          number
          url
          createdAt
          mergedAt
          labels(first: 10) { nodes { name } }
        }
      }
    }`
    )
    .join("\n");

  return `
    query GetOpenSourceContributions {
      totalMergedPRs: search(
        query: "is:pr is:merged author:${GITHUB_USERNAME} -user:${GITHUB_USERNAME}"
        type: ISSUE
        first: 1
      ) {
        issueCount
      }
      ${repoFields}
    }
  `;
};

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
  const [prData, setPrData] = useState({});
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, contribution: null });
  const [totalMergedPRs, setTotalMergedPRs] = useState(0);

  useEffect(() => {
    const fetchAllPRs = async () => {
      try {
        const query = buildBatchedQuery(openSourceContributions);
        const { data, errors } = await githubGraphQL(query);

        if (errors) {
          console.error("GraphQL errors:", errors);
        }

        setTotalMergedPRs(data?.totalMergedPRs?.issueCount || 0);

        const results = {};
        openSourceContributions.forEach(({ id }) => {
          const openNodes = data?.[`openPRs_${id}`]?.nodes || [];
          const mergedNodes = data?.[`mergedPRs_${id}`]?.nodes || [];

          const openPRs = openNodes.map((pr) => ({
            title: pr.title,
            number: pr.number,
            link: pr.url,
            status: "Open",
            createdAt: pr.createdAt,
            labels: pr.labels?.nodes?.map((l) => l.name) || [],
          }));

          const mergedPRs = mergedNodes.map((pr) => ({
            title: pr.title,
            number: pr.number,
            link: pr.url,
            status: "Merged",
            createdAt: pr.createdAt,
            mergedAt: pr.mergedAt,
            labels: pr.labels?.nodes?.map((l) => l.name) || [],
          }));

          const allPRs = [...openPRs, ...mergedPRs].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          results[id] = {
            prs: allPRs,
            total: allPRs.length,
            merged: mergedPRs.length,
            open: openPRs.length,
          };
        });

        setPrData(results);
      } catch (error) {
        console.error("GraphQL fetch failed:", error);
        const results = {};
        openSourceContributions.forEach(({ id }) => {
          results[id] = { prs: [], total: 0, merged: 0, open: 0 };
        });
        setPrData(results);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPRs();
  }, []);

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
