// All roles updated with Sennett on 2026-10-07 from his LinkedIn, merged with
// the earlier site copy (archive/src/component/index/IndexExprience/*). Facts
// come from him; don't add claims or numbers without his sign-off.
export type Role = {
  id: string
  title: string
  date: string
  company: string
  industry: string
  // Inline markup: **strong**, [label](url).
  points: string[]
  // Per-project timeline within the role, latest first.
  projects?: RoleProject[]
}

export type RoleProject = {
  name: string
  // Omit for projects that can't be linked yet (e.g. stealth).
  href?: string
  // What the product is, for readers who don't know it.
  about?: string
  // What Sennett did on it. Inline markup.
  work: string
}

export const EXPERIENCE: Role[] = [
  {
    id: '9gag',
    title: 'FullStack Developer',
    date: 'May, 2024 - Present',
    company: '9GAG | MemeStrategy',
    industry: 'Social Media, Web3',
    // Role-wide work first; what was done on each product is in `projects`.
    points: [
      'Set up an **agent-friendly environment** to support an **AI-driven development life cycle**.',
      '**TypeScript** and **React** full-stack applications, from user interface to backend.',
      'Scalable backends on **Cloudflare** edge services (**Workers**, **Pages**, **KV**), tuned for latency and global distribution.',
      '**Unit**, **integration** and **end-to-end** testing across frontend and backend.',
      'Centralized **logging and monitoring** with **Datadog** for real-time observability.',
      '**Data pipelines** for tracking, scraping and cleaning, feeding analytics and product insights.',
    ],
    // Latest first. Bold marks what each project added, so the growth reads
    // bottom-up: features -> backend -> CI/CD -> AI integration -> AI-DLC.
    projects: [
      {
        name: 'Stealth',
        work: 'Backend, architectural design & implementation and CI/CD, setting up an **agent-friendly environment** and the **AI-DLC**.',
      },
      {
        name: '9GAG',
        href: 'https://9gag.com',
        about: 'The MEME OG',
        work: '**Feature upgrades** and **AI integration**.',
      },
      {
        name: 'AceTrader',
        href: 'https://acetrader.com/',
        about: 'Multi-asset prop trading platform',
        work: 'Backend, architectural design and implementation, **CI/CD**.',
      },
      {
        name: 'Pain',
        href: 'https://paintoken.com',
        about: 'Meme coin with largest presale amount in SOL',
        work: '**Backend** & **architectural design** and implementation.',
      },
      {
        name: 'Stakeland',
        href: 'https://stakeland.com',
        about: 'Social staking protocol for $MEME',
        work: 'Shipped **features**.',
      },
    ],
  },
  {
    id: 'qookia',
    title: 'FullStack Developer',
    date: 'Feb, 2023 - May, 2024',
    company: 'Qookia Limited',
    industry: 'Mobile Game',
    points: [
      '**Backend infrastructure** for a mobile game with **10K+ monthly active users**: microservices on **AWS EKS**.',
      '**Real-time multiplayer server** with **Socket.IO**, handling **5K+ concurrent connections**.',
      'Containerized services with **Docker** and **Kubernetes**, on **AWS**, **MongoDB Atlas** and **Terraform**.',
      '**CI/CD pipeline** with **GitLab CI**, automating testing and deployment.',
      'Data management **CMS** built with **Next.js** and **React**.',
      '**Performance testing** with **K6** and monitoring with **Prometheus**.',
      '**Data analytics pipeline** on AWS, **cost reduction** with DevOps engineers, and database **query optimization**.',
    ],
  },
  {
    id: 'ozaru',
    title: 'Analyst Programmer',
    date: 'Jan, 2022 - Jan, 2023',
    company: 'Cinblock | Ozaru',
    industry: 'Web3 & Blockchain',
    points: [
      '**Dapp** frontends with **React** and **TypeScript**.',
      '**Mobile app** with **React Native**.',
      '**Smart contracts** with **Solidity** and **Hardhat**, tested with **Mocha** and **Chai**.',
      'Blockchain integrations in both **JavaScript** and **Python**.',
      '**Serverless backends** and microservices on **AWS** with **Docker**.',
      '**GPT**-related applications.',
      '**Data scraping** with **Python** and **Selenium**, plus utility scripts in Python and JS.',
    ],
  },
  {
    id: 'krglobal',
    title: 'Frontend Developer',
    date: 'July, 2021 - July, 2022',
    company: 'KR Global Limited | Ecosa HK',
    industry: 'E-commerce',
    points: [
      '**E-commerce** store development for multiple countries.',
      'Built with **Nuxt.js**, **Vue.js**, **Vuex** and **PHP**.',
      'Integrations with frontend vendors such as **VWO** and **Storyblok**.',
      '**Revamped** the multilingual blog, **optimizing** page load speed.',
      '**Mobile-responsive** web applications, with a focus on **page speed** and **SEO**.',
    ],
  },
]
