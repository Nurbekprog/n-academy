import { redirect } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (response.status === 401) {
    removeToken();
    if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
       // Optional: Redirect to login or let the caller handle it
       // window.location.href = "/login"; 
    }
  }

  if (!response.ok) {
    let detail = "Request failed";
    try {
      const errorData = await response.json();
      detail = errorData.detail || JSON.stringify(errorData);
    } catch {
      detail = await response.text();
    }
    throw new Error(detail || "Request failed");
  }
  
  // Handle 204 No Content
  if (response.status === 204) {
      return {} as T;
  }

  return response.json() as Promise<T>;
}

// --- Types ---

export interface User {
  id: number;
  email: string;
  full_name?: string | null;
  role: "admin" | "teacher" | "student";
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name?: string;
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

// --- Auth API ---

export async function login(email: string, password: string): Promise<AuthResponse> {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: formData, // OAuth2PasswordRequestForm expects form-urlencoded
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
  });
}

export async function register(data: RegisterData): Promise<User> {
  return apiFetch<User>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMe(): Promise<User> {
  return apiFetch<User>("/users/me");
}

// --- Content API ---

export async function getCourses(): Promise<CourseApi[]> {
  return apiFetch<CourseApi[]>("/courses");
}

export async function getProjects(): Promise<ProjectApi[]> {
  return apiFetch<ProjectApi[]>("/projects");
}
