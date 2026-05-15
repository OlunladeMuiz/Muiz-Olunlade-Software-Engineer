import type { Project } from '$lib/types/project';

export const projects: Project[] = [
  {
    id: 'fxguard',
    slug: 'fxguard',
    title: 'FXGuard',
    tagline: 'Nigerian FX intelligence platform for African SMEs.',
    summary: 'A calm fintech flagship that turns FX and settlement context into clearer decisions for small businesses.',
    description:
      'FXGuard is a fintech product exploration focused on helping African SMEs understand foreign exchange, settlement pressure, and rate context through a calmer, more trustworthy interface. It treats FX information as a decision-support problem instead of a noisy dashboard problem.',
    longDescription:
      'FXGuard centers the kind of product thinking that portfolio reviewers can immediately understand: a Nigerian FX intelligence platform shaped around the needs of African SMEs. Rather than overwhelming users with market noise, it presents foreign-exchange context in a calm, editorial way that supports faster and more confident decisions. The live dashboard shows settlement pressure, rate stacks, and action-oriented financial context in a way that feels easier to trust. The project reinforces the portfolio narrative around applied frontend architecture, premium visual hierarchy, and practical fintech storytelling. It is the project that anchors the rest of the case studies and gives the portfolio a clear flagship example when discussing product judgment, audience fit, and technical taste.',
    aiContext:
      'FXGuard is the project I point to when talking about fintech product thinking. It focuses on helping African SMEs understand foreign exchange context through a calmer interface and clearer decision support, while keeping the experience grounded in practical frontend architecture.',
    highlights: [
      'Built a fintech concept around FX decision support for African SMEs instead of generic dashboard clutter.',
      'Used calm, editorial presentation to make volatile financial context feel easier to read and trust.',
      'Anchors the portfolio narrative as the flagship product when discussing product judgment and execution quality.',
      'Reinforces the portfolio\'s focus on strong visual hierarchy, clarity, and applied frontend architecture.',
      'Provides a concrete fintech case study for conversations about audience fit and product thinking.'
    ],
    challenges: [
      'Presenting volatile financial information without overwhelming users with charts, jargon, or speculative UI.',
      'Balancing trust, clarity, and product depth in a fintech context where the interface has to feel calm and credible.',
      'Keeping the experience simple enough for SMEs while still signalling technical and design sophistication.'
    ],
    year: '2026',
    tags: ['Fintech', 'Frontend'],
    category: 'frontend',
    status: 'in-progress',
    featured: true,
    technologies: [
      { name: 'React', category: 'framework' },
      { name: 'Next.js', category: 'framework' },
      { name: 'TypeScript', category: 'language' },
      { name: 'FastAPI', category: 'framework' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'Tailwind CSS', category: 'design' },
      { name: 'Node.js', category: 'runtime' },
      { name: 'Zod', category: 'library' }
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL'],
    impact:
      'Established the portfolio\'s fintech flagship and a clear example of product thinking for African SME workflows.',
    metrics: [
      { label: 'Audience', value: 'African SMEs' },
      { label: 'Focus', value: 'FX decision support' },
      { label: 'Tone', value: 'Calm and editorial' }
    ],
    links: [],
    screenshots: [
      {
        src: '/images/projects/fxguard.png',
        alt: 'FXGuard dashboard showing settlement pressure, NGN rate stack, and treasury terminal panels.',
        width: 1856,
        height: 848
      }
    ],
    openGraphDescription:
      'Nigerian FX intelligence platform for African SMEs with a calm, decision-first interface.',
    liveUrl: null,
    repoUrl: null,
    accent: '#E25563'
  },
  {
    id: 'nexus-terminal',
    slug: 'nexus-terminal',
    title: 'NEXUS Terminal',
    tagline: 'Real-time crypto analytics dashboard with live price streaming.',
    summary: 'A terminal-grade crypto dashboard that keeps live market data readable, fast, and visually sharp.',
    description:
      'NEXUS Terminal is a production-grade real-time analytics dashboard simulating a crypto trading terminal. It streams live price data via geometric Brownian motion, renders multi-series candlestick and line charts, and maintains a live activity feed with sub-250ms latency. The architecture prioritizes performance through capped circular buffers, lazy-loaded components, and optimized Pinia store patterns.',
    longDescription:
      'Built as Stage 5A of a professional mentorship program, NEXUS Terminal demonstrates deep expertise in real-time systems and Vue 3 performance optimization. The dashboard ingests simulated price ticks, validates them with Zod, and streams updates to four specialized Pinia stores (stream, markets, alerts, ui) with explicit throttling to maintain UI responsiveness. Key architectural decisions include using shallow refs for large arrays to avoid Vue\'s reactivity overhead, marking ECharts options as raw to prevent proxy wrapping, and implementing v-memo on feed rows to reduce unnecessary re-renders during high-frequency updates. The challenge was building a terminal-grade charting experience that feels as fast as Bloomberg while maintaining clean separation of concerns across components, composables, and stores. The result is a production-ready dashboard that scales horizontally with data volume and demonstrates mastery of Vue 3 Composition API, TypeScript strict mode, and real-time data visualization.',
    aiContext:
      'This project showcases a comprehensive understanding of Vue 3\'s performance characteristics and real-time system design. We built a crypto dashboard that streams live price updates, renders interactive candlestick charts, and maintains a live activity feed, all while keeping latency sub-250ms through aggressive optimization. The architecture uses Pinia stores as the single source of truth, composables to orchestrate side effects, and lazy-loaded chart components to keep initial bundle size small. Every decision was deliberate: we chose ECharts over D3 for production-ready charting, enforced TypeScript strict mode to catch bugs early, and implemented capped buffers to prevent memory leaks during continuous streaming. This is production-grade frontend work.',
    highlights: [
      'Implemented real-time price streaming with geometric Brownian motion simulation, feeding validated ticks into specialized Pinia stores at 250ms throttle intervals.',
      'Optimized rendering performance through lazy-loaded chart components, shallow refs for large arrays, and v-memo on activity feed rows to handle high-frequency updates.',
      'Built a comprehensive state management architecture with four decoupled Pinia stores (stream, markets, alerts, ui) enforcing strict dependency injection patterns and circular dependency prevention.',
      'Designed type-safe data validation layer using Zod with TypeScript strict mode, achieving zero unhandled type errors across composables and stores.',
      'Engineered custom capped circular buffers for OHLC and price history to maintain bounded memory growth during continuous streaming.',
      'Implemented responsive multi-chart dashboard with five chart types (Line, Area, Bar, Candlestick, Sparkline) using vue-echarts with custom theme configuration.'
    ],
    challenges: [
      'Managing update frequency at the UI level. Raw tick rate exceeds 60fps, but Vue renders are bounded by the display refresh cycle. Solved by throttling store writes to 250ms minimum intervals and disabling chart animations during streaming bursts.',
      'Preventing memory leaks in a continuous streaming application. Price and OHLC histories could grow unbounded. Implemented capped circular buffers to maintain constant memory footprint regardless of stream duration.',
      'Coordinating complex state across four independent stores while preventing circular dependencies and maintaining clean separation of concerns between data fetching, validation, transformation, and rendering layers.'
    ],
    year: '2026',
    tags: ['Frontend', 'Tooling'],
    category: 'frontend',
    status: 'in-progress',
    featured: true,
    technologies: [
      { name: 'Vue 3', category: 'framework' },
      { name: 'TypeScript', category: 'language' },
      { name: 'Pinia', category: 'library' },
      { name: 'Vite', category: 'devops' },
      { name: 'ECharts', category: 'library' },
      { name: 'vue-echarts', category: 'library' },
      { name: 'Tailwind CSS', category: 'design' },
      { name: 'shadcn-vue', category: 'library' },
      { name: 'Vue Router', category: 'library' },
      { name: 'Zod', category: 'library' },
      { name: 'Vitest', category: 'devops' },
      { name: '@vueuse/core', category: 'library' }
    ],
    stack: ['Vue 3', 'Pinia', 'ECharts', 'TypeScript', 'Zod'],
    impact:
      'Demonstrates that continuous market streaming, dense charts, and a live feed can stay performant inside a polished trading-style interface.',
    metrics: [
      { label: 'Update cadence', value: '250ms throttle' },
      { label: 'Store layout', value: '4 Pinia stores' },
      { label: 'Chart suite', value: '5 chart types' }
    ],
    links: [],
    screenshots: [
      {
        src: '/images/projects/nexus-terminal.png',
        alt: 'NEXUS Terminal dashboard showing live crypto charts and activity feed.',
        width: 1917,
        height: 904
      }
    ],
    openGraphDescription:
      'Real-time crypto dashboard with live price streaming, multi-series charting, and performance-optimized Vue 3 architecture.',
    liveUrl: null,
    repoUrl: null,
    accent: '#00C2FF'
  },
  {
    id: 'furniro-ecommerce',
    slug: 'furniro-ecommerce',
    title: 'Furniro E-Commerce Platform',
    tagline: 'Full-stack furniture marketplace with Stripe payments and admin controls.',
    summary: 'A production-ready furniture storefront with secure checkout, inventory control, and admin workflow.',
    description:
      'Furniro is a production-ready e-commerce platform built with React, Node.js, Express, and Prisma. It features a modern storefront with product browsing, secure authentication, shopping cart management, and integrated Stripe payment processing, backed by a scalable REST API with an admin dashboard for inventory and order management.',
    longDescription:
      'Built as a comprehensive full-stack solution, Furniro demonstrates enterprise-grade architecture and best practices in both frontend and backend development. The project solves real-world e-commerce challenges including image upload validation, category management, slug generation, and responsive modal design. The backend implements JWT authentication with refresh tokens, rate limiting, CORS security, and modular business logic separated by domain (auth, products, orders, payments). The frontend leverages React Context API for state management and TypeScript for end-to-end type safety. Every problem encountered during development, from non-direct image links to dropdown-driven category selection, was documented and solved with pragmatic, scalable solutions. The codebase is production-ready with clear documentation, comprehensive onboarding guidance, and a monorepo structure designed for rapid team collaboration.',
    aiContext:
      'Furniro is a full-stack e-commerce platform I built to demonstrate professional software architecture. It handles the complete flow from product browsing through secure checkout with Stripe integration, paired with a powerful admin dashboard for inventory management. The backend is modular and well-tested, the frontend is responsive and type-safe, and the entire codebase is documented for easy onboarding. This project shows how to build scalable systems while solving real production challenges.',
    highlights: [
      'Built end-to-end TypeScript stack with strict type checking across React, Express, and Prisma',
      'Integrated Stripe payment processing with secure order management and payment status tracking',
      'Implemented JWT-based authentication with refresh tokens, role-based access control, and rate limiting',
      'Designed modular backend architecture with separate domain modules for auth, cart, products, orders, and payments',
      'Solved production challenges including image validation, dropdown-driven category selection, and responsive modal design'
    ],
    challenges: [
      'Coordinated frontend and backend form validation for multiple data types, requiring unified event handlers and type-safe form processing across both layers',
      'Managed complexity of image uploads and CDN integration while preventing non-direct image links that broke rendering',
      'Balanced security requirements (CORS, rate limiting, helmet headers) with development workflow across monorepo structure'
    ],
    year: '2026',
    tags: ['Full-Stack'],
    category: 'fullstack',
    status: 'live',
    featured: true,
    technologies: [
      { name: 'TypeScript', category: 'language' },
      { name: 'React', category: 'framework' },
      { name: 'Vite', category: 'devops' },
      { name: 'Express', category: 'framework' },
      { name: 'Node.js', category: 'runtime' },
      { name: 'Prisma', category: 'library' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'Stripe', category: 'api' },
      { name: 'JWT', category: 'library' },
      { name: 'Bcrypt', category: 'library' },
      { name: 'Cloudinary', category: 'api' },
      { name: 'SendGrid', category: 'api' },
      { name: 'Docker', category: 'devops' },
      { name: 'Vitest', category: 'devops' }
    ],
    stack: ['React', 'Express', 'Prisma', 'Stripe', 'PostgreSQL'],
    impact:
      'Shows how to ship a complete retail flow with secure auth, Stripe checkout, and admin controls without sacrificing clarity or structure.',
    metrics: [
      { label: 'Payments', value: 'Stripe checkout' },
      { label: 'Auth', value: 'JWT refresh flow' },
      { label: 'Domains', value: 'Auth / orders / products' }
    ],
    links: [
      {
        label: 'Live Demo',
        href: 'https://funito-ecom.vercel.app',
        external: true
      }
    ],
    screenshots: [
      {
        src: '/images/projects/funiro.png',
        alt: 'Furniro storefront hero with furniture product preview and call to action.',
        width: 1902,
        height: 910
      }
    ],
    openGraphDescription:
      'Full-stack e-commerce platform with React, Node.js, Stripe payments, and admin dashboard built with TypeScript and Prisma.',
    liveUrl: 'https://funito-ecom.vercel.app',
    repoUrl: null,
    accent: '#F5A623'
  },
  {
    id: 'lifeos',
    slug: 'lifeos',
    title: 'LifeOS',
    tagline: 'Decision engine that recommends what to work on next.',
    summary: 'A calm prioritization system that picks the single best next task from goals, tasks, and context.',
    description:
      'LifeOS is a calm decision system that recommends one task at a time based on user goals, available tasks, and daily context. Rather than overwhelming users with lists, it uses a deterministic algorithm to surface the highest-impact task that fits their current energy and time constraints. The system explains every recommendation transparently, helping users overcome decision fatigue without relying on opaque AI.',
    longDescription:
      'LifeOS inverts the traditional productivity approach. Instead of asking "what should I do today?", it asks "given my energy, time, and current obstacles, what is the single best next task?" The system maintains three inputs - goals (max 3 active), tasks (with effort costs), and daily context (energy level, available minutes, obstacles) - and outputs one transparent recommendation with human-readable reasoning. The backend features 18 fully-specified REST endpoints, JWT authentication with refresh tokens, and a deterministic decision engine implemented in TypeScript with Prisma ORM managing a 5-table PostgreSQL schema. The frontend includes a production-ready login flow and an editorial Today screen designed with calm principles: large typography, generous whitespace, and zero clutter. Backed by 3,700+ lines of comprehensive documentation and a frozen v1.0.0 API contract, LifeOS demonstrates deep thinking about reducing cognitive load in productivity tools.',
    aiContext:
      'This project tackles decision fatigue by flipping how productivity tools work. Instead of collecting everything into lists, LifeOS recommends one task at a time based on your energy, available time, and what matters most. The algorithm is completely transparent - no machine learning, no mystery scores - which means users can actually trust the recommendations. I built this as a full-stack system with a deterministic backend engine and a calm, editorial frontend that puts clarity first.',
    highlights: [
      'Implemented deterministic decision engine with transparent algorithm that users can audit and trust.',
      'Built 18 REST API endpoints with JWT authentication, refresh token pattern, and Prisma ORM on PostgreSQL.',
      'Enforced database-level constraints (max 3 active goals per user, one daily context per date) to prevent invalid state.',
      'Designed editorial Today screen with calm aesthetic principles: large typography, whitespace, and zero metrics clutter.',
      'Documented entire system with 3,700+ lines including frozen API contract, algorithm spec, and architecture rationale.'
    ],
    challenges: [
      'Designing bounded constraints (max 3 goals) that force prioritization without frustrating power users or feeling arbitrary.',
      'Building explainability into the core system architecture so every recommendation can be audited, making transparency a first-class concern, not an afterthought.',
      'Resisting feature creep and productivity theater: keeping the interface laser-focused on answering one question instead of adding stats, charts, and gamification.'
    ],
    year: '2026',
    tags: ['Full-Stack', 'Design'],
    category: 'fullstack',
    status: 'in-progress',
    featured: false,
    technologies: [
      { name: 'Node.js', category: 'runtime' },
      { name: 'Express.js', category: 'framework' },
      { name: 'TypeScript', category: 'language' },
      { name: 'Prisma', category: 'library' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'Next.js', category: 'framework' },
      { name: 'React', category: 'library' },
      { name: 'Tailwind CSS', category: 'design' },
      { name: 'Axios', category: 'library' },
      { name: 'JWT', category: 'library' },
      { name: 'Zod', category: 'library' }
    ],
    stack: ['TypeScript', 'Express.js', 'Prisma', 'PostgreSQL', 'Next.js'],
    impact:
      'Reframes productivity around a single transparent recommendation so users can act without scanning noisy task lists.',
    metrics: [
      { label: 'Decision model', value: '1 task at a time' },
      { label: 'Goal cap', value: '3 active goals' },
      { label: 'API surface', value: '18 endpoints' }
    ],
    links: [],
    screenshots: [
      {
        src: '/images/projects/lifeos.png',
        alt: 'LifeOS dashboard showing the calm daily focus view and decision engine layout.',
        width: 1902,
        height: 907
      }
    ],
    openGraphDescription:
      'A calm decision engine that tells you what to work on next, based on your energy and time.',
    liveUrl: null,
    repoUrl: null,
    accent: '#3DBA7A'
  }
];
