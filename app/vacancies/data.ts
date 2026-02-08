export type Vacancy = {
  id: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
};

export const vacancies: Vacancy[] = [
  {
    id: "product-manager",
    title: "Product Manager",
    location: "Warszawa, Poland",
    type: "Full-time",
    summary:
      "Own the mobile product roadmap, align business goals with user needs, and ship measurable improvements in short cycles.",
    responsibilities: [
      "Define product strategy and quarterly roadmap with stakeholders.",
      "Translate insights into clear specs, PRDs, and success metrics.",
      "Coordinate delivery with design, engineering, and QA.",
      "Analyze product performance and iterate on features.",
    ],
    requirements: [
      "4+ years of product management in mobile or SaaS.",
      "Experience with discovery, analytics, and A/B testing.",
      "Strong communication and prioritization skills.",
      "English B2+; Polish is a plus.",
    ],
    perks: [
      "Hybrid work in Warszawa",
      "Flexible schedule",
      "Personal growth budget",
      "Top-tier hardware",
    ],
  },
  {
    id: "ios-engineer",
    title: "Senior iOS Engineer",
    location: "Remote or Warszawa",
    type: "Full-time",
    summary:
      "Build and scale a polished iOS experience, contribute to architecture decisions, and mentor the team.",
    responsibilities: [
      "Develop new features in Swift and SwiftUI.",
      "Improve performance, reliability, and app stability.",
      "Collaborate with backend and product teams on APIs.",
      "Review code and mentor mid-level engineers.",
    ],
    requirements: [
      "5+ years of iOS development experience.",
      "Strong knowledge of Swift, Combine, and modern iOS tooling.",
      "Experience with CI/CD and modular architectures.",
      "Comfortable working with analytics and crash tools.",
    ],
    perks: [
      "Remote-friendly team",
      "Conference and training support",
      "Private healthcare",
      "Annual performance bonus",
    ],
  },
  {
    id: "qa-engineer",
    title: "QA Engineer",
    location: "Warszawa, Poland",
    type: "Full-time",
    summary:
      "Own testing strategy for mobile releases, automate critical flows, and ensure high-quality launches.",
    responsibilities: [
      "Create and maintain test plans for mobile releases.",
      "Automate regression tests for key user journeys.",
      "Validate fixes, reproduce bugs, and report issues.",
      "Partner with engineering on quality improvements.",
    ],
    requirements: [
      "3+ years in QA for mobile or web products.",
      "Hands-on experience with test automation tools.",
      "Strong attention to detail and communication.",
      "Understanding of release pipelines.",
    ],
    perks: [
      "Modern QA stack",
      "Career growth path",
      "Team offsites",
      "Healthy work-life balance",
    ],
  },
];
