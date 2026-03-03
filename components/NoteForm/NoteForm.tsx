"use client";

import css from "./NoteForm.module.css";
import { useId } from "react";
// import * as Yup from 'yup';
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { NoteTag } from "@/types/note";
import { useNoteStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api/clientApi";

// const NoteFormSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, 'Minimum 3 characters')
//     .max(50, 'Maximum 50 characters')
//     .required('Title is required'),
//   content: Yup.string().max(500, 'Maximum 500 characters'),
//   tag: Yup.string()
//     .oneOf(
//       ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'],
//       'Оберіть один із тегів'
//     )
//     .required('Choose one of the tags'),
// });

export default function NoteForm() {
  const fieldId = useId();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push(`/notes/filter/all`);
    },
    onError() {
      console.log("error");
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(draft);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          value={draft.title}
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
        {/* <ErrorMessage component="span" name="title" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          value={draft.content}
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          onChange={(e) => setDraft({ ...draft, content: e.target.value })}
        />
        {/* <ErrorMessage component="span" name="content" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(e) =>
            setDraft({ ...draft, tag: e.target.value as NoteTag })
          }
        >
          <option value="">-- Choose one tag --</option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {/* <ErrorMessage component="span" name="tag" className={css.error} /> */}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.push(`/notes/filter/all`)}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating note..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
