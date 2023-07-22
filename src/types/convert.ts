import { NoteId, Note } from "./types";

export const noteIdToNote = (note: NoteId): Note =>
  note.imgUrl
    ? {
        title: note.title,
        body: note.body,
        imgUrl: note.imgUrl,
        date: note.date,
      }
    : {
        title: note.title,
        body: note.body,
        date: note.date,
      };
