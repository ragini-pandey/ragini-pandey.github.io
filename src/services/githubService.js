import { GITHUB_USERNAME } from "../data/constants";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

const getAuthHeader = () => {
  const parts = [import.meta.env.VITE_GH_TOKEN_P1, import.meta.env.VITE_GH_TOKEN_P2];
  return "Bearer " + parts.join("");
};

export const githubGraphQL = (query) =>
  fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify({ query }),
  }).then((res) => res.json());

export const TOTAL_MERGED_PRS_QUERY = `
  query GetTotalMergedPRs {
    search(
      query: "is:pr is:merged author:${GITHUB_USERNAME} -user:${GITHUB_USERNAME}"
      type: ISSUE
      first: 1
    ) {
      issueCount
    }
  }
`;

export const buildBatchedQuery = (contributions) => {
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
