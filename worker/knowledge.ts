// Knowledge base for the AI chat assistant
export const KNOWLEDGE = `
# About Carlos
Carlos Lisboa Cristelo is a software developer and final-year L.EIC (Licenciatura em Engenharia Informática e Computação) student at FEUP (Faculdade de Engenharia da Universidade do Porto), Portugal. He is actively seeking junior software developer roles.

# Skills
- Languages: TypeScript, JavaScript, Python, C, C++, Dart, Swift, HTML5, CSS3, SQL.
- Frameworks & Libraries: Angular (Angular 21, Signals, standalone components), RxJS, Tailwind CSS, Flutter.
- Cloud & Backend: Cloudflare Workers, Serverless APIs, Edge Computing, REST APIs, Git/GitHub, CI/CD with GitHub Actions.
- Concepts & Areas: Algorithms & Data Structures, Optimization, Operating Systems, Machine Learning & AI, Computer Networks.

# Projects
## Curricular Internship @ Wisify (aral-hub)
- What it does: A complete management platform built for a theatrical association (Aurora da Liberdade) to manage members, payments, tickets, and administrative operations.
- Tech stack: TypeScript, Python.
- Live URL: https://auroradaliberdade.com/
- GitHub: https://github.com/wisify/aral-hub
- Grade / Evaluation: 18/20.

## Personal Portfolio Website
- What it does: A modern developer portfolio website featuring a projects showcase pulled from GitHub, a contact form connected to Cloudflare Workers and Resend email API, rate limiting, Turnstile bot protection, caching, and an AI chat assistant.
- Tech stack: Angular 21, TypeScript, Tailwind CSS, Cloudflare Workers, Vitest.
- GitHub: https://github.com/carlinhos18/carlinhos18.github.io

## Serial Port Communication Protocol
- What it does: Implemented a link-layer and application-layer communication protocol for reliable file transfer over a serial port in C. It handles transmission noise, framing, packet acknowledgments, timeouts, and cable disconnections.
- Tech stack: C.
- Grade: 20/20.
- GitHub: https://github.com/anabspinto/RCOMProjects/tree/main/Lab01
- Collaborators: Ana Pinto.

## GreenWay Mobile App
- What it does: A cross-platform mobile application that incentivizes sustainable lifestyle practices by allowing users to earn and track virtual points.
- Tech stack: Dart, Flutter, Swift, C++, C.
- Grade: 18/20.
- GitHub: https://github.com/LEIC-ES-2024-25/2LEIC02T3
- Collaborators: Luís Ferreira, João Quental, Francisco Antunes.

## Urban Navigation Path-Planning Tool
- What it does: A graph-based path-planning tool for urban environments supporting the fastest independent routes, restricted segments (avoiding specific nodes or road sections), and multimodal routes combining driving, walking, and parking optimization.
- Tech stack: C++.
- Grade: 19/20.
- GitHub: https://github.com/carlinhos18/DA2425_PRJ1_G
- Collaborators: Martim Neves, Tomás Salgueiro.

## 0/1 Knapsack Problem Optimization
- What it does: Implemented and evaluated algorithmic approaches to solve the 0/1 Knapsack problem, including brute-force exhaustive search, dynamic programming, approximation algorithms, and linear integer programming.
- Tech stack: C++.
- Grade: 19.2/20.
- GitHub: https://github.com/carlinhos18/DA2425_PRJ2_G
- Collaborators: Martim Neves, Tomás Salgueiro.

## Book Scanning Optimization Problem
- What it does: AI project designed to optimize book scanning workflows across libraries using search and heuristic algorithms.
- Tech stack: Python.
- Grade: 18/20.
- GitHub: https://github.com/carlinhos18/IAProjects/tree/main/P1
- Collaborators: Guilherme Triães, Tiago.

## NBA Game Predictor
- What it does: Machine learning model trained to predict NBA game outcomes using statistical feature engineering and classification algorithms.
- Tech stack: Python.
- Grade: 15/20.
- GitHub: https://github.com/carlinhos18/IAProjects/tree/main/P2
- Collaborators: Guilherme Triães, Tiago.

# Education & Experience
- Degree: Licenciatura em Engenharia Informática e Computação (L.EIC), Faculdade de Engenharia da Universidade do Porto (FEUP).
- Status: Final-year undergraduate student.
- Professional experience: Curricular Internship at Wisify.

# Contact
- Email: carloslisboa2005@gmail.com
- Contact form: Use the contact form on this portfolio website to send Carlos a direct message.
`;

// Simple keyword-based QA — no external LLM required, works at edge
export function findAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  // Topic keywords mapping
  const topics = [
    { keywords: ['about', 'who', 'carlos', 'bio', 'background', 'student', 'feup', 'education'], answer: `Carlos Lisboa Cristelo is a software developer and final-year L.EIC student at FEUP (Faculdade de Engenharia da Universidade do Porto), Portugal. He is actively seeking junior software developer roles. He completed a curricular internship at Wisify building a management platform for a theatrical association.` },
    { keywords: ['skill', 'stack', 'technolog', 'language', 'framework', 'tool', 'proficient'], answer: `Languages: TypeScript, JavaScript, Python, C, C++, Dart, Swift, HTML5, CSS3, SQL.
Frameworks & Libraries: Angular (Angular 21, Signals, standalone components), RxJS, Tailwind CSS, Flutter.
Cloud & Backend: Cloudflare Workers, Serverless APIs, Edge Computing, REST APIs, Git/GitHub, CI/CD with GitHub Actions.
Concepts & Areas: Algorithms & Data Structures, Optimization, Operating Systems, Machine Learning & AI, Computer Networks.` },
    { keywords: ['project', 'work', 'portfolio', 'github', 'repo', 'repository', 'build', 'made', 'created'], answer: `Key projects:
1. Curricular Internship @ Wisify (aral-hub) — Management platform for a theatrical association. Tech: TypeScript, Python. Grade: 18/20.
2. Personal Portfolio Website — Angular 21, Tailwind CSS, Cloudflare Workers, AI chat assistant.
3. GreenWay Mobile App — Cross-platform sustainability app. Tech: Dart, Flutter, Swift. Grade: 18/20.
4. Urban Navigation Path-Planning Tool — C++ graph-based route planning. Grade: 19/20.
5. Serial Port Communication Protocol — C, reliable file transfer protocol. Grade: 20/20.
6. 0/1 Knapsack Problem Optimization — C++ algorithmic approaches. Grade: 19.2/20.
7. Book Scanning Optimization — Python AI/heuristics. Grade: 18/20.
8. NBA Game Predictor — Python ML model. Grade: 15/20.` },
    { keywords: ['contact', 'email', 'reach', 'hire', 'job', 'hire me', 'cv', 'resume', 'linkedin'], answer: `Email: carloslisboa2005@gmail.com
Use the contact form on this portfolio website to send Carlos a direct message.
He is actively seeking junior software developer roles.` },
    { keywords: ['internship', 'wisify', 'aral', 'curricular'], answer: `Curricular Internship @ Wisify (aral-hub): A complete management platform for a theatrical association (Aurora da Liberdade) to manage members, payments, tickets, and administrative operations. Tech: TypeScript, Python. Live: https://auroradaliberdade.com/ Grade: 18/20.` },
    { keywords: ['greenway', 'mobile', 'flutter', 'dart', 'sustainab'], answer: `GreenWay Mobile App: Cross-platform app incentivizing sustainable practices. Tech: Dart, Flutter, Swift, C++, C. Grade: 18/20. Collaborators: Luís Ferreira, João Quental, Francisco Antunes.` },
    { keywords: ['path', 'planning', 'urban', 'navigation', 'graph', 'cpp', 'c++', 'route'], answer: `Urban Navigation Path-Planning Tool: Graph-based tool for urban environments supporting fastest independent routes, restricted segments, and multimodal routes (driving + walking + parking). Tech: C++. Grade: 19/20. Collaborators: Martim Neves, Tomás Salgueiro.` },
    { keywords: ['serial', 'port', 'protocol', 'c lang', 'communication'], answer: `Serial Port Communication Protocol: Link-layer and application-layer protocol for reliable file transfer over serial port in C. Handles noise, framing, acknowledgments, timeouts, cable disconnections. Grade: 20/20. Collaborator: Ana Pinto.` },
    { keywords: ['knapsack', 'optimization', 'dynamic programming', 'algorithm'], answer: `0/1 Knapsack Problem Optimization: Implemented exhaustive search, dynamic programming, approximation algorithms, and linear integer programming. Tech: C++. Grade: 19.2/20. Collaborators: Martim Neves, Tomás Salgueiro.` },
    { keywords: ['book', 'scanning', 'ai', 'heuristic', 'search'], answer: `Book Scanning Optimization Problem: AI project to optimize book scanning workflows across libraries using search and heuristic algorithms. Tech: Python. Grade: 18/20. Collaborators: Guilherme Triães, Tiago.` },
    { keywords: ['nba', 'predictor', 'machine learning', 'ml', 'sports'], answer: `NBA Game Predictor: ML model to predict NBA game outcomes using statistical feature engineering and classification algorithms. Tech: Python. Grade: 15/20. Collaborators: Guilherme Triães, Tiago.` },
  ];

  for (const topic of topics) {
    for (const kw of topic.keywords) {
      if (q.includes(kw)) {
        return topic.answer;
      }
    }
  }

  // Fallback
  return "I'm not sure about that. You can reach out via the contact form or email at carloslisboa2005@gmail.com for more details. You can also ask about his projects, skills, education, or internship experience!";
}