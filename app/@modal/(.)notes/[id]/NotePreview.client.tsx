"use client";

import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import Loading from "./loading";
import Error from "./error";

export default function NotePreview() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    retry: 1,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <button onClick={handleClose} className={css.backBtn}>
            ← Назад
          </button>

          {isLoading && <Loading />}
          {isError && <Error error={error} />}

          {note && (
            <>
              <div className={css.header}>
                <h2>{note.title}</h2>
                {note.tag && <span className={css.tag}>{note.tag}</span>}
              </div>

              <div className={css.content}>{note.content}</div>
              <div className={css.date}>{note.createdAt}</div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
