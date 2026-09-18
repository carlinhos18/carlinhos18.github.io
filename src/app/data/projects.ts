export interface Collaborator {
  name: string;
  github_url: string;
}

export interface Project {
  id: number | string;
  name: string;
  description: string;
  html_url: string; // Link to GitHub
  live_url?: string; // Optional link to live website
  image_url?: string; // Optional link to an image/screenshot
  language: string;
  grade?: string | number; // Grade received for the faculty project
  collaborators?: Collaborator[]; // Shoutout to colleagues
}

export const MY_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Curricular Internship @ Wisify',
    description: 'Website built for a theatrical association to manage associated members, payments and ticket office operations.',
    html_url: 'https://github.com/wisify/aral-hub',
    live_url: 'https://auroradaliberdade.com/',
    image_url: 'images/aral.png',
    language: 'TypeScript, Python',
    grade: '18/20',
  },
  {
    id: 2,
    name: 'Book Scanning Optimization Problem',
    description: 'AI project to optimize the scanning of books in a library using multiple algorithms.',
    html_url: 'https://github.com/carlinhos18/IAProjects/tree/main/P1',
    language: 'Python',
    image_url: 'images/AIP1.png',
    grade: '18/20',
    collaborators: [
      { name: 'Guilherme Triães', github_url: 'https://github.com/PatinhoF' },
      { name: 'Tiago', github_url: 'https://github.com/up202304762' }
    ],

  },
  {
    id: 3,
    name: 'NBA Predicter',
    description: 'AI project to predict the outcome of NBA games using machine learning techniques.',
    html_url: 'https://github.com/carlinhos18/IAProjects/tree/main/P2',
    language: 'Python',
    image_url: 'images/AIP2.png',
    grade: '15/20',
    collaborators: [
      { name: 'Guilherme Triães', github_url: 'https://github.com/PatinhoF' },
      { name: 'Tiago', github_url: 'https://github.com/up202304762' }
    ],
  },

  {
    id: 4,
    name: 'Serial Port Protocol',
    description: 'Implemented a link-layer and application-layer communication protocol for reliable file transfer over a serial port, including handling of cable disconnections and transmission noise.',
    html_url: 'https://github.com/anabspinto/RCOMProjects/tree/main/Lab01',
    language: 'C',
    image_url: 'images/RCOM1.png',
    grade: '20/20',
    collaborators: [
      { name: 'Ana Pinto', github_url: 'https://github.com/anabspinto' },
    ],
  },

  {
    id: 5,
    name: 'GreenWay App',
    description: 'Mobile application for tracking and managing sustainable practices by earning virtual points.',
    html_url: 'https://github.com/LEIC-ES-2024-25/2LEIC02T3',
    language: 'Dart, Swift, C++, C',
    image_url: 'images/greenway.png',
    grade: '18/20',
    collaborators: [
      { name: 'Luís Ferreira', github_url: 'https://github.com/LuisF775' },
      { name: 'João Quental', github_url: 'https://github.com/JoaoQuental' },
      { name: 'Francisco Antunes', github_url: 'https://github.com/sillss1' },
    ],
  },

  {
    id: 6,
    name: 'Path-planning tool to assist with urban navigation',
    description: 'The tool supports identifying the fastest and a second-fastest independent route, planning routes that exclude specific nodes or segments (restricted routes), and creating environmentally-friendly routes that combine driving and walking with parking options.',
    html_url: 'https://github.com/carlinhos18/DA2425_PRJ1_G',
    language: 'C++',
    image_url: 'images/DAP1.png',
    grade: '19/20',
    collaborators: [
      { name: 'Martim Neves', github_url: 'https://github.com/ceraizi' },
      { name: 'Tomás Salgueiro', github_url: 'https://github.com/Tomassalgueiro' }
    ],
  },

  {
    id: 7,
    name: ' 0/1 Knapsack Problem',
    description: 'Algorithmic approaches to solve this problem, including exhaustive search, dynamic programming, and approximation and linear integer programming algorithms. ',
    html_url: 'https://github.com/carlinhos18/DA2425_PRJ2_G',
    language: 'C++',
    image_url: 'images/DAP2.png',
    grade: '19.2/20',
    collaborators: [
      { name: 'Martim Neves', github_url: 'https://github.com/ceraizi' },
      { name: 'Tomás Salgueiro', github_url: 'https://github.com/Tomassalgueiro' }
    ],
  },

];
