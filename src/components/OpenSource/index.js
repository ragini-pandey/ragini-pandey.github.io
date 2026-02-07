import { useState, useEffect } from "react";
import styled from "styled-components";
import { openSourceContributions } from "../../data/constants";
import OpenSourceCard from "../Cards/OpenSourceCard";
import OpenSourceDetails from "../OpenSourceDetails";
import { CodeTitle } from "../Experience";

const GITHUB_USERNAME = "ragini-pandey";

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

const OpenSource = () => {
  const [prData, setPrData] = useState({});
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, contribution: null });

  useEffect(() => {
    const fetchAllPRs = async () => {
      const results = {};
      await Promise.all(
        openSourceContributions.map(async (contrib) => {
          const { owner, repo, id } = contrib;
          try {
            // Fetch both open and closed PRs by this user
            const [openRes, closedRes] = await Promise.all([
              fetch(
                `https://api.github.com/search/issues?q=type:pr+author:${GITHUB_USERNAME}+repo:${owner}/${repo}+state:open&per_page=100`
              ),
              fetch(
                `https://api.github.com/search/issues?q=type:pr+author:${GITHUB_USERNAME}+repo:${owner}/${repo}+state:closed&per_page=100`
              ),
            ]);
            const openData = await openRes.json();
            const closedData = await closedRes.json();

            const openPRs = (openData.items || []).map((pr) => ({
              title: pr.title,
              number: pr.number,
              link: pr.html_url,
              status: "Open",
              createdAt: pr.created_at,
              labels: pr.labels?.map((l) => l.name) || [],
            }));

            const closedPRs = (closedData.items || [])
              .filter((pr) => pr.pull_request?.merged_at)
              .map((pr) => ({
                title: pr.title,
                number: pr.number,
                link: pr.html_url,
                status: "Merged",
                createdAt: pr.created_at,
                mergedAt: pr.pull_request?.merged_at,
                labels: pr.labels?.map((l) => l.name) || [],
              }));

            const allPRs = [...openPRs, ...closedPRs].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            results[id] = {
              prs: allPRs,
              total: allPRs.length,
              merged: allPRs.filter((p) => p.status === "Merged").length,
              open: allPRs.filter((p) => p.status === "Open").length,
            };
          } catch {
            results[id] = { prs: [], total: 0, merged: 0, open: 0 };
          }
        })
      );
      setPrData(results);
      setLoading(false);
    };

    fetchAllPRs();
  }, []);

  return (
    <Container id="opensource">
      <Wrapper>
        <CodeTitle>
          &lt; <span>Open Source Contributions</span> /&gt;
        </CodeTitle>
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
