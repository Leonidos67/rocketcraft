// Original interface for backward compatibility
export interface CaseItem {
  title: string;
  industry: string;
  problem: string;
  solution: string;
  results: string[];
}

// Extended interface with all details
export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  imageUrl: string;
  thumbnailUrl?: string;
  client: string;
  industry: string;
  services: string[];
  startDate: string;
  endDate?: string;
  results: string[];
  challenges: string[];
  solutions: string[];
  technologies: string[];
  tags: string[];
  // For backward compatibility
  problem: string;
  solution: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "E-commerce Platform Redesign",
    subtitle: "Modernizing the shopping experience",
    description: "Complete overhaul of an outdated e-commerce platform to improve user experience and increase conversions.",
    detailedDescription: "Our team worked closely with the client to understand their business goals and customer needs. We conducted extensive user research, created detailed wireframes, and iterated on designs based on user feedback. The result was a modern, intuitive e-commerce platform that increased conversion rates by 35%.",
    imageUrl: "https://placehold.co/1200x600/4f46e5/white?text=E-commerce+Platform",
    thumbnailUrl: "https://placehold.co/600x400/4f46e5/white?text=E-commerce",
    client: "ShopMax",
    industry: "Retail",
    services: ["UI/UX Design", "Frontend Development", "Performance Optimization"],
    startDate: "2023-01-15",
    endDate: "2023-04-20",
    results: [
      "35% increase in conversion rate",
      "40% improvement in page load speed",
      "60% reduction in bounce rate"
    ],
    challenges: [
      "Legacy codebase that was difficult to maintain",
      "Outdated user interface causing poor user experience",
      "Slow loading times affecting sales"
    ],
    solutions: [
      "Implemented modern design principles with focus on usability",
      "Optimized frontend performance and backend APIs",
      "Integrated analytics to track user behavior and optimize further"
    ],
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    tags: ["e-commerce", "ui-ux", "performance"],
    problem: "Legacy codebase that was difficult to maintain, outdated user interface causing poor user experience, slow loading times affecting sales",
    solution: "Implemented modern design principles with focus on usability, optimized frontend performance and backend APIs, integrated analytics to track user behavior and optimize further"
  },
  {
    id: "2",
    title: "Mobile Banking Application",
    subtitle: "Secure and intuitive financial management",
    description: "Development of a secure mobile banking application with advanced features for personal finance management.",
    detailedDescription: "We developed a comprehensive mobile banking solution that prioritizes security while maintaining an intuitive user experience. The app includes features like biometric authentication, budget tracking, and real-time notifications. Security was our top priority throughout the development process, implementing multiple layers of encryption and secure communication protocols.",
    imageUrl: "https://placehold.co/1200x600/059669/white?text=Banking+App",
    thumbnailUrl: "https://placehold.co/600x400/059669/white?text=Banking",
    client: "FinSecure Bank",
    industry: "Financial Services",
    services: ["Mobile App Development", "Security Implementation", "Backend Architecture"],
    startDate: "2022-09-10",
    endDate: "2023-03-05",
    results: [
      "Achieved SOC 2 Type II compliance",
      "Over 1 million downloads in first year",
      "99.9% uptime since launch"
    ],
    challenges: [
      "Meeting strict financial security requirements",
      "Creating seamless user experience for complex financial operations",
      "Ensuring regulatory compliance across multiple jurisdictions"
    ],
    solutions: [
      "Implemented multi-factor authentication and end-to-end encryption",
      "Designed simplified UI for complex financial operations",
      "Conducted regular security audits and penetration testing"
    ],
    technologies: ["React Native", "Firebase", "Node.js", "PostgreSQL"],
    tags: ["mobile-app", "security", "finance"],
    problem: "Meeting strict financial security requirements, creating seamless user experience for complex financial operations, ensuring regulatory compliance across multiple jurisdictions",
    solution: "Implemented multi-factor authentication and end-to-end encryption, designed simplified UI for complex financial operations, conducted regular security audits and penetration testing"
  },
  {
    id: "3",
    title: "Healthcare Management System",
    subtitle: "Streamlining patient care and administrative tasks",
    description: "Comprehensive healthcare management system to improve patient care coordination and reduce administrative burden.",
    detailedDescription: "This healthcare management system transformed how medical professionals coordinate patient care. We built a centralized platform that connects doctors, nurses, and administrative staff, enabling seamless communication and efficient workflow management. The system includes features for appointment scheduling, patient records, billing, and telemedicine capabilities.",
    imageUrl: "https://placehold.co/1200x600/dc2626/white?text=Healthcare+System",
    thumbnailUrl: "https://placehold.co/600x400/dc2626/white?text=Healthcare",
    client: "MediCare Health Network",
    industry: "Healthcare",
    services: ["Full-Stack Development", "HIPAA Compliance", "Cloud Infrastructure"],
    startDate: "2022-06-01",
    endDate: "2023-01-15",
    results: [
      "45% reduction in administrative tasks",
      "Improved patient satisfaction scores by 30%",
      "Reduced appointment scheduling time by 60%"
    ],
    challenges: [
      "Ensuring HIPAA compliance for patient data protection",
      "Integrating with existing hospital systems",
      "Training staff on new processes and technology"
    ],
    solutions: [
      "Implemented robust data encryption and access controls",
      "Created API integrations with existing EMR systems",
      "Provided comprehensive training and ongoing support"
    ],
    technologies: ["Angular", ".NET Core", "Azure", "SQL Server"],
    tags: ["healthcare", "compliance", "integration"],
    problem: "Ensuring HIPAA compliance for patient data protection, integrating with existing hospital systems, training staff on new processes and technology",
    solution: "Implemented robust data encryption and access controls, created API integrations with existing EMR systems, provided comprehensive training and ongoing support"
  },
  {
    id: "4",
    title: "AI-Powered Analytics Dashboard",
    subtitle: "Transforming data into actionable insights",
    description: "Advanced analytics dashboard with AI-powered insights to help businesses make data-driven decisions.",
    detailedDescription: "We developed an intelligent analytics platform that uses machine learning algorithms to identify trends, anomalies, and predictive insights from business data. The dashboard features customizable widgets, automated reporting, and real-time data visualization. Our AI components provide recommendations and flag potential issues before they become critical.",
    imageUrl: "https://placehold.co/1200x600/7c3aed/white?text=Analytics+Dashboard",
    thumbnailUrl: "https://placehold.co/600x400/7c3aed/white?text=Analytics",
    client: "DataInsight Inc.",
    industry: "Technology",
    services: ["AI/ML Integration", "Data Visualization", "Cloud Architecture"],
    startDate: "2023-03-12",
    endDate: "2023-08-25",
    results: [
      "Reduced data analysis time by 70%",
      "Increased decision-making speed by 50%",
      "Identified cost savings of $2M annually"
    ],
    challenges: [
      "Processing large volumes of data in real-time",
      "Making complex data understandable to non-technical users",
      "Ensuring accuracy of AI predictions"
    ],
    solutions: [
      "Implemented scalable cloud infrastructure with distributed processing",
      "Designed intuitive visualization components with drill-down capabilities",
      "Trained ML models with historical data and validation metrics"
    ],
    technologies: ["Vue.js", "Python", "TensorFlow", "Google Cloud"],
    tags: ["ai", "analytics", "data-viz"],
    problem: "Processing large volumes of data in real-time, making complex data understandable to non-technical users, ensuring accuracy of AI predictions",
    solution: "Implemented scalable cloud infrastructure with distributed processing, designed intuitive visualization components with drill-down capabilities, trained ML models with historical data and validation metrics"
  }
];

// Also export in the old format for backward compatibility
export const cases: CaseItem[] = caseStudies.map(({ title, industry, problem, solution, results }) => ({
  title,
  industry,
  problem,
  solution,
  results
}));