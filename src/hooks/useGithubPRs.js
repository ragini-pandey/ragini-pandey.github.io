import { useState, useEffect } from "react";
import { openSourceContributions } from "../data/constants";
import { githubGraphQL, TOTAL_MERGED_PRS_QUERY, buildBatchedQuery } from "../services/githubService";

export const useTotalMergedPRs = () => {
  const [totalMergedPRs, setTotalMergedPRs] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    githubGraphQL(TOTAL_MERGED_PRS_QUERY)
      .then(({ data }) => {
        setTotalMergedPRs(data?.search?.issueCount || 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { totalMergedPRs, loading };
};

export const useOpenSourcePRs = () => {
  const [prData, setPrData] = useState({});
  const [totalMergedPRs, setTotalMergedPRs] = useState(0);
  const [loading, setLoading] = useState(true);

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

  return { prData, totalMergedPRs, loading };
};
