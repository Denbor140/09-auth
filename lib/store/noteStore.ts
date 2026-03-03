import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type NoteTag } from '@/types/note';

interface NoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteDraftStore {
  draft: NoteData;
  setDraft: (note: NoteData) => void;
  clearDraft: () => void;
}

const initialDraft: NoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: (note: NoteData) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: 'note-draft' }
  )
);
