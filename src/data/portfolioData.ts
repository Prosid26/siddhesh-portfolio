export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  category: 'all' | 'ai-cv' | 'fullstack' | 'web3';
  link?: string;
  github?: string;
  image: string;
  highlights: string[];
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'ai-cv' | 'tools';
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  iconType: 'code' | 'web' | 'database' | 'ai' | 'blockchain' | 'graduation' | 'search';
}

export interface AchievementItem {
  title: string;
  description: string;
  category: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'fitness-trainer',
    title: 'AI Virtual Fitness Trainer',
    description: 'An AI-powered virtual fitness trainer built using MediaPipe and OpenCV that performs real-time human pose estimation during Surya Namaskar. The system detects posture, provides instant corrective feedback, and demonstrates practical applications of AI in fitness and healthcare.',
    tech: ['Python', 'MediaPipe', 'OpenCV', 'Computer Vision'],
    category: 'ai-cv',
    github: 'https://github.com/Prosid26/ai-pose-trainer',
    image: '/images/fitness-trainer.jpg',
    highlights: ['Real-time pose estimation', 'Computer Vision', 'Posture correction', 'AI feedback']
  },
  {
    id: 'restaurant-erp',
    title: 'Restaurant ERP System',
    description: 'A full-stack Restaurant ERP platform featuring QR-based ordering, authentication, restaurant management, order tracking, billing workflows, database integration and an admin dashboard.',
    tech: ['Next.js', 'Node.js', 'Prisma', 'PostgreSQL', 'TailwindCSS'],
    category: 'fullstack',
    github: 'https://github.com/Prosid26/restaurant-erp',
    image: '/images/restaurant-erp.jpg',
    highlights: ['QR Ordering', 'Authentication', 'Admin Dashboard', 'Multi-brand customization']
  },
  {
    id: 'nft-marketplace',
    title: 'Blockchain NFT Marketplace',
    description: 'A decentralized NFT Marketplace exploring Ethereum smart contracts, wallet connectivity, blockchain transactions and Web3 development.',
    tech: ['React', 'Solidity', 'Hardhat', 'Ethereum'],
    category: 'web3',
    github: 'https://github.com/Prosid26/nft-marketplace',
    image: '/images/nft-marketplace.jpg',
    highlights: ['Smart Contracts', 'Wallet Integration', 'NFT Trading', 'Ethereum']
  },
  {
    id: 'eyeview-ai',
    title: 'EyeView AI',
    description: 'Contributed to an AI-powered Computer Vision platform focused on intelligent video analytics, backend functionality and AI-driven visual processing workflows.',
    tech: ['Python', 'Flask', 'Computer Vision', 'AI'],
    category: 'ai-cv',
    github: 'https://github.com/Prosid26/eyeview-ai',
    image: '/images/eyeview-ai.jpg',
    highlights: ['Video Analytics', 'AI Processing', 'Backend', 'Computer Vision']
  }
];

export const techStack: TechItem[] = [
  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'TailwindCSS', category: 'frontend' },
  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'Java', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'PHP (Laravel)', category: 'backend' },
  // Database
  { name: 'MySQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'Prisma', category: 'database' },
  // AI & CV
  { name: 'Python', category: 'ai-cv' },
  { name: 'OpenCV', category: 'ai-cv' },
  { name: 'MediaPipe', category: 'ai-cv' },
  // Tools
  { name: 'Git', category: 'tools' },
  { name: 'GitHub', category: 'tools' },
  { name: 'VS Code', category: 'tools' },
  { name: 'Postman', category: 'tools' },
  { name: 'Firebase', category: 'tools' },
  { name: 'Linux', category: 'tools' }
];

export const exploreStack = [
  { name: 'AI Agents', description: 'Autonomous agents, LLM tool-use, RAG systems, flow orchestration.' },
  { name: 'Computer Vision', description: 'Multi-object tracking, real-time posture analysis, model fine-tuning.' },
  { name: 'Full Stack Development', description: 'Scalable APIs, modern state management, high-performance database architectures.' },
  { name: 'Cloud & DevOps', description: 'Docker containerization, CI/CD pipelines, serverless deployments.' }
];

export const timeline: TimelineItem[] = [
  {
    year: '2022',
    title: 'Started Coding',
    description: 'Discovered Python and fell in love with algorithm design and puzzle-solving.',
    iconType: 'code'
  },
  {
    year: '2023',
    title: 'First Website',
    description: 'Created dynamic interfaces using HTML, CSS, and vanilla JavaScript. Discovered the joy of design.',
    iconType: 'web'
  },
  {
    year: '2023',
    title: 'Backend Development',
    description: 'Mastered SQL, Node.js, and Java to handle databases, custom APIs, and backend architectures.',
    iconType: 'database'
  },
  {
    year: '2024',
    title: 'AI Projects',
    description: 'Explored computer vision using OpenCV and MediaPipe to detect keypoints and track poses.',
    iconType: 'ai'
  },
  {
    year: '2024',
    title: 'Blockchain',
    description: 'Wrote and deployed Solidity smart contracts and developed Web3 dApps with React.',
    iconType: 'blockchain'
  },
  {
    year: '2025',
    title: 'Engineering Graduation',
    description: 'Balancing structural IT academics, leadership roles, and building production-ready projects.',
    iconType: 'graduation'
  },
  {
    year: 'Present',
    title: 'Looking for Software Engineering Opportunities',
    description: 'Hungry to build scalable code. Seeking Software Engineer, Full Stack, and AI/ML positions.',
    iconType: 'search'
  }
];

export const achievements: AchievementItem[] = [
  {
    title: 'Dance Club Head',
    description: 'Led one of the most active engineering dance clubs, choreographing performances and managing logistics while balancing academic work.',
    category: 'Leadership & Culture'
  },
  {
    title: 'Inter-college Dance Competition Wins',
    description: 'Secured multiple inter-college dance competition victories, demonstrating teamwork, creative execution, and high performance under pressure.',
    category: 'Competitions'
  },
  {
    title: 'Engineering Projects',
    description: 'Developed and launched multiple academic and personal systems ranging from AI platforms to operational enterprise ERP tools.',
    category: 'Technical Delivery'
  },
  {
    title: 'Continuous Learning',
    description: 'Constantly exploring the boundaries of agentic AI, computer vision platforms, and high-scale full-stack technologies.',
    category: 'Professional Growth'
  }
];

export const experiences: ExperienceItem[] = [
  {
    role: 'Full Stack & AI Developer',
    company: 'Self-Directed & Academic Projects',
    period: '2022 - Present',
    description: [
      'Architected and implemented a custom SURF/ORB and posture keypoint analysis system using OpenCV and MediaPipe, serving real-time correction data.',
      'Designed transactional schemas and secure API layers with Next.js, Express, and Prisma, optimizing complex SQL queries and index layouts for ERP platforms.',
      'Integrated Web3 client wallets with Solidity smart contracts, ensuring secure transactional execution and gas optimization during Hardhat tests.'
    ],
    tags: ['Next.js', 'Python', 'OpenCV', 'MediaPipe', 'PostgreSQL', 'Prisma', 'Solidity']
  },
  {
    role: 'Dance Club Head & Event Coordinator',
    company: 'Engineering Cultural Committee',
    period: '2024 - 2025',
    description: [
      'Spearheaded club activities, scheduling, and training sessions for a 30+ member group, fostering cross-functional coordination.',
      'Organized large-scale intra and inter-college cultural events, securing budgets, managing timelines, and handling public communication.',
      'Pioneered creative choreographies that secured consecutive podium finishes in highly competitive state-level engineering dance leagues.'
    ],
    tags: ['Leadership', 'Event Operations', 'Team Collaboration', 'Public Relations']
  },
  {
    role: 'Open Source Contributor & Tech Community Member',
    company: 'Developer Ecosystem',
    period: '2023 - Present',
    description: [
      'Contributed custom layouts and documentation enhancements to web developer tooling and community repositories.',
      'Participated in multiple hackathons, formulating rapid prototypes under 36-hour constraints and presenting deliverables to industry judges.',
      'Built open utilities to automate local folder scaffolding and API request logs for student developers.'
    ],
    tags: ['Git', 'Community', 'Hackathons', 'TypeScript', 'Rapid Prototyping']
  }
];
