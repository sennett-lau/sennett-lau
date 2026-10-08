// Inline markup: **strong**, [label](url). Parsed by src/lib/rich.ts.
// Structure and wording from Sennett (2026-10-07): what I am + where I studied,
// what I focus on, then the AI-native shift. Tool-by-tool career detail lives in
// Experience; keep this short.
export const ABOUT = [
  '**Full-stack developer** based in Hong Kong and Tokyo. Graduated from City University of Hong Kong with a BSc in Computer Science, then from The **University of Hong Kong** with a **Master of Artificial Intelligence** in 2026.',
  'Focusing on designing and building **web-based applications** across the whole software development life cycle: from frontend to backend infrastructure, and from CI/CD pipelines to deployment.',
  'Over the past few years, AI has changed the way development gets done. Working as an **AI-native builder**, often setting up and refining the ** AI Development Life Cycle** with agent-friendly toolings and environment, where agents take part in **implementation, testing, debugging, refinemnet and more, improving the application iteratively**. With such, working on **multiple projects in parallel is a daily routine**.',
]

// The "stack.log" panel: what I know and use day to day. What I'm working on
// right now is the last ABOUT paragraph, so it isn't repeated here.
export const STACK = [
  { key: 'web', items: ['typescript', 'react', 'next.js', 'vite'] },
  { key: 'infra', items: ['kubernetes', 'terraform', 'docker', 'github actions'] },
  { key: 'cloud', items: ['cloudflare', 'aws'] },
]
