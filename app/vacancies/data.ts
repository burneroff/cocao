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

export const vacancies: Vacancy[] = []
