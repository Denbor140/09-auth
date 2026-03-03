import { api } from "./api";
import { cookies } from "next/headers";

export const fetchNotes = async (
  searchText: string,
  page: number,
  perPage: number,
  tag?: string,
) => {
  const cookieStore = await cookies();
  const { data } = await api.get("/notes", {
    params: {
      search: searchText,
      page,
      perPage,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();

  const { data } = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const getMe = async () => {
  const cookieStore = await cookies();

  const { data } = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();

  const res = await api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
