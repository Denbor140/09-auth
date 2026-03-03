"use client";

import css from "./NotesPage.module.css";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes, FetchNotesResponse } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const PER_PAGE = 12;

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", searchText, page, tag],
    queryFn: () => fetchNotes(searchText, page, PER_PAGE, tag),
    refetchOnMount: false,
    retry: 1,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const debounceSearchText = useDebouncedCallback((text: string) => {
    setSearchText(text);
    setPage(1);
  }, 300);

  const handleSearchChange = (text: string) => {
    setSearchInput(text);
    debounceSearchText(text);
  };

  return (
    <main className={css.main}>
      <div className={css.note}>
        <div className={css.toolbar}>
          <SearchBox text={searchInput} onSearch={handleSearchChange} />
          {data && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              page={page}
              onPageChange={setPage}
            />
          )}
          <Link href={`/notes/action/create`} className={css.button}>
            Create note +
          </Link>
        </div>

        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>
    </main>
  );
}
