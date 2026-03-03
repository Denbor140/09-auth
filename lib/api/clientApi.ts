import { Note } from "@/types/note";
import { api } from "./api";
import { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CheckSessionRequest {
  success: boolean;
}

export const fetchNotes = async (
  searchText: string,
  page: number,
  perPage: number,
  tag?: string,
) => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      search: searchText,
      page,
      perPage,
      tag,
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  newNote: Pick<Note, "title" | "content" | "tag">,
) => {
  const { data } = await api.post<Note>("/notes", newNote);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMe = async (username: Pick<User, "username">) => {
  const { data } = await api.patch<User>("/users/me", username);
  return data;
};
