// Run with: GITHUB_TOKEN=<token> node scripts/fetch-github-data.js
// In GitHub Actions, GITHUB_TOKEN is provided automatically.

const fs = require("fs");
const path = require("path");

const GITHUB_USERNAME = "ragini-pandey";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error("❌ GITHUB_TOKEN env var is required.");
  process.exit(1);
}

const repos = [
  { id: 0, owner: "freeCodeCamp", repo: "freeCodeCamp" },
  { id: 1, owner: "PostHog",      repo: "posthog"       },
  { id: 2, owner: "elastic",      repo: "eui"           },
  { id: 3, owner: "stylelint",    repo: "stylelint"     },
  { id: 4, owner: "jestjs",       repo: "jest"          },
];

// Build a single batched GraphQL query using aliases — 1 request instead of 11!
function buildQuery() {
  const prFields = `
    nodes {
      ... on PullRequest {
        number
        title
        url
        state
        createdAt
        mergedAt
        labels(first: 10) { nodes { name } }
      }
    }
  `;

  const repoAliases = repos.flatMap(({ owner, repo }) => {
    const alias = `${owner}_${repo}`.replace(/[^a-zA-Z0-9_]/g, "_");
    return [
      `${alias}_open: search(query: "is:pr author:${GITHUB_USERNAME} repo:${owner}/${repo} is:open", type: ISSUE, first: 100) { ${prFields} }`,
      `${alias}_merged: search(query: "is:pr author:${GITHUB_USERNAME} repo:${owner}/${repo} is:merged", type: ISSUE, first: 100) { ${prFields} }`,
    ];
  });

  return `{
    total: search(query: "is:pr is:merged author:${GITHUB_USERNAME} -user:${GITHUB_USERNAME}", type: ISSUE, first: 1) {
      issueCount
    }
    ${repoAliases.join("\n    ")}
  }`;
}

async function fetchGitHubData() {
  console.log("🔍 Fetching GitHub PR data via GraphQL...");

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query: buildQuery() }),
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error("GraphQL errors:", JSON.stringify(json.errors, null, 2));
    throw new Error("GraphQL query returned errors");
  }

  const { data } = json;
  const totalMergedPRs = data.total.issueCount;
  const prData = {};

  for (const { id, owner, repo } of repos) {
    const alias = `${owner}_${repo}`.replace(/[^a-zA-Z0-9_]/g, "_");

    const openPRs = (data[`${alias}_open`]?.nodes || []).map((pr) => ({
      title: pr.title,
      number: pr.number,
      link: pr.url,
      status: "Open",
      createdAt: pr.createdAt,
      labels: pr.labels.nodes.map((l) => l.name),
    }));

    const mergedPRs = (data[`${alias}_merged`]?.nodes || []).map((pr) => ({
      title: pr.title,
      number: pr.number,
      link: pr.url,
      status: "Merged",
      createdAt: pr.createdAt,
      mergedAt: pr.mergedAt,
      labels: pr.labels.nodes.map((l) => l.name),
    }));

    const allPRs = [...openPRs, ...mergedPRs].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    prData[id] = {
      prs: allPRs,
      total: allPRs.length,
      merged: mergedPRs.length,
      open: openPRs.length,
    };

    console.log(`   ✓ ${owner}/${repo}: ${allPRs.length} PRs (${mergedPRs.length} merged, ${openPRs.length} open)`);
  }

  console.log(`   ✓ Total merged PRs across all repos: ${totalMergedPRs}`);

  const output = {
    totalMergedPRs,
    prData,
    fetchedAt: new Date().toISOString(),
  };

  const outputPath = path.join(__dirname, "../src/data/githubData.json");
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`✅ Written to ${outputPath}`);
}

fetchGitHubData().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
