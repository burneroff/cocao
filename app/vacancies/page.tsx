import { notFound } from "next/navigation";

import VacanciesClient from "./VacanciesClient";
import { vacancies } from "./data";

export default function VacanciesPage() {
  const hasVacancies = Array.isArray(vacancies) && vacancies.length > 0;

  if (!hasVacancies) {
    notFound();
  }

  return <VacanciesClient />;
}
