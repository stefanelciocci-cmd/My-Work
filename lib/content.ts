// All portfolio copy in one place. Sections read from here, so updating a project,
// a skill or a recommendation never means touching layout code.

export const profile = {
  name: "Stefan Ciocirlan",
  firstName: "Stefan",
  lastName: "Ciocirlan",
  role: "Full-Stack Developer",
  location: "Timisoara, Romania",
  email: "stefanelciocci@gmail.com",
  linkedin: "https://www.linkedin.com/in/stefan-ciocirlan-a99b16205/",
  availability: "Available for work",
  intro:
    "Full-stack developer with 5+ years delivering end-to-end web solutions — from AI-powered tools to multi-tenant SaaS platforms. I ship things that work, are easy to understand, and built to last.",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "testimonials", label: "Kind words" },
  { id: "play", label: "Play" },
  { id: "contact", label: "Contact" },
] as const;

export const stats = [
  { value: 5, suffix: "+", label: "years shipping full-stack products" },
  { value: 46, suffix: "", label: "malls running on a CMS I built" },
  { value: 6, suffix: "", label: "selected products, end to end" },
];

export const about = {
  eyebrow: "Creative process",
  title: "What's in my head",
  body:
    "Coding is more than a skill for me — it's a lifestyle. I like optimising slow interactions because every millisecond matters, and I treat AI as the tool that makes us more free and efficient. Away from the keyboard it's football, music, gaming with friends and a spritz with good company. When things get stressful: count to three, keep moving forward, everything works out.",
  highlights: ["lifestyle", "every millisecond matters", "more free and efficient", "keep moving forward"],
  interests: [
    "Coding",
    "Data",
    "AI",
    "Football",
    "Ideas",
    "Momentum",
    "Social",
    "Music",
    "Gaming",
    "Learning",
    "Magic",
    "Calm",
  ],
};

export const skills = [
  { category: "Frontend", tone: "primary", items: ["Next.js", "React.js", "TypeScript", "TailwindCSS", "HTML/CSS"] },
  { category: "Backend", tone: "accent", items: ["Node.js", "Express.js", "Strapi CMS"] },
  { category: "Tools & Infra", tone: "primary", items: ["Redis", "OpenAI API", "Stripe", "Docker", "Jira", "Git"] },
  { category: "Soft skills", tone: "accent", items: ["Solo ownership", "Client delivery", "Agile teamwork"] },
] as const;

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Express",
  "Strapi",
  "Redis",
  "OpenAI",
  "Stripe",
  "Docker",
  "Git",
];

export type Project = {
  title: string;
  kind: string;
  summary: string;
  tags: string[];
  /** Real screenshot of the live product, shown in a browser frame. */
  image?: string;
  liveUrl?: string;
  /** For private projects: a short terminal session shown as the cover. */
  terminal?: string[];
};

export const projects: Project[] = [
  {
    title: "Ozas Multi-Tenant Platform",
    kind: "Sole developer",
    summary:
      "Multi-tenant platform serving 30+ shopping centres across Eastern Europe, built with Next.js and Strapi CMS for seamless content management.",
    tags: ["Next.js", "Strapi", "Multi-tenant"],
    image: "/images/projects/ozas.jpg",
    liveUrl: "https://ozas.lt",
  },
  {
    title: "The Population Project",
    kind: "Full-stack",
    summary: "A website, a data scraper and a file management dashboard with AI capabilities.",
    tags: ["Next.js", "Redis", "OpenAI"],
    image: "/images/projects/population.jpg",
    liveUrl: "https://thepopulationproject.org/",
  },
  {
    title: "Sensodyne AI Tool",
    kind: "AI · Data",
    summary:
      "AI-powered misinformation detection monitoring dental health content on TikTok, Instagram and YouTube.",
    tags: ["Express.js", "Redis", "OpenAI", "Social APIs"],
    terminal: ["$ monitor --platforms tiktok,instagram,youtube", "› scanning dental health content…", "› classifying claims with OpenAI", "✓ misinformation flagged for review"],
  },
  {
    title: "SOW Generator",
    kind: "AI tooling",
    summary: "Generates structured Statements of Work automatically from a project description.",
    tags: ["Next.js", "OpenAI", "TypeScript"],
    terminal: ["$ sow generate --from project-brief.md", "› drafting scope, milestones, deliverables", "› pricing and timeline", "✓ statement-of-work ready"],
  },
  {
    title: "Bot Management Dashboard",
    kind: "Frontend lead",
    summary:
      "A full-scale dashboard for connecting and orchestrating bots across multiple platforms with automated responses.",
    tags: ["React.js", "Dashboard", "Automation"],
    terminal: ["$ bots connect --platforms all", "› syncing channels", "› routing automated responses", "✓ orchestration live"],
  },
  {
    title: "Lipa & Subscribfy",
    kind: "Sole developer",
    summary: "Two SaaS presentational websites with CMS, email notifications and SEO optimisation.",
    tags: ["Strapi", "Next.js", "SEO"],
    terminal: ["$ strapi build && next build", "› generating SEO metadata", "› wiring email notifications", "✓ two SaaS sites deployed"],
  },
];

export const recommendations = [
  {
    name: "Valentin Constanda",
    role: "Helping businesses Just Get Paid",
    relationship: "Managed Stefan directly",
    quote:
      "Stefan is an amazing team player and a talented software engineer. His best full-stack development qualities were on display creating the CMS + Website system now used by 46 malls throughout Eastern Europe, whilst his constant (good quality!) jokes were a pleasure in all of our calls.",
    linkedin: "https://linkedin.com/in/valentinconstanda",
    initials: "VC",
  },
  {
    name: "Danilo Colombo",
    role: "Software Architect, Automation Architect",
    relationship: "Managed Stefan directly at Gamma Innovation",
    quote:
      "Stefan is a serious and efficient programmer. In one of my teams in Gamma Innovation he developed the UI for a distributed system based on a Spring Boot micro service backend and a React frontend. His work was crucial in developing a workflow designer, a fundamental building block of the project. Working with him was a pleasure for the whole team.",
    linkedin: "https://www.linkedin.com/in/danilo-colombo-0339b54/",
    initials: "DC",
  },
  {
    name: "Ignas Maziliauskas",
    role: "Legal Representative",
    relationship: "Civitta",
    quote:
      "Stefan demonstrated exceptional adaptability to complex technical requirements and a talent for optimising development processes. His meticulous approach, analytical mindset, punctuality, and openness made him a key factor in maintaining stability and continuous performance across multiple projects.",
    linkedin: "https://linkedin.com/in/ignas-maziliauskas",
    initials: "IM",
  },
];

export const contact = {
  promises: [
    "End-to-end delivery, from idea to production",
    "AI integrations that actually ship",
    "Clear communication and no surprises",
  ],
};
