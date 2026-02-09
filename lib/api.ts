const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Request failed");
  }
  return response.json() as Promise<T>;
}

export interface CourseApi {
  id: number;
  title: string;
  description?: string | null;
  price?: string | null;
  duration?: string | null;
  lessons?: number | null;
  students?: number | null;
  level?: string | null;
  fullDescription?: string | null;
  modules?: string[] | null;
  features?: string[] | null;
}

export interface ProjectApi {
  id: number;
  title: string;
  description?: string | null;
  category?: string | null;
  image?: string | null;
  fullDescription?: string | null;
  results?: string[] | null;
}

export async function getCourses(): Promise<CourseApi[]> {
  return apiFetch<CourseApi[]>("/courses");
}

export async function getProjects(): Promise<ProjectApi[]> {
  return apiFetch<ProjectApi[]>("/projects");
}
