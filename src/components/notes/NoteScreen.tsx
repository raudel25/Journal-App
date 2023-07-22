import { useSelector } from "react-redux";
import NotesAppBar from "./NotesAppBar";
import { RootState } from "../../store/store";
import { useForm } from "../../hooks/useForm";
import { useEffect, useRef } from "react";

const NoteScreen = () => {
  const { active } = useSelector((state: RootState) => state.notes);
  const note = active!;

  const [form, handleInputChange, reset] = useForm({
    title: note.title,
    body: note.body,
  });

  const noteId = useRef(note.id);

  useEffect(() => {
    if (note.id !== noteId.current) {
      reset({
        title: note.title,
        body: note.body,
      });

      noteId.current = note.id;
    }
  }, [note, reset]);

  const { title, body } = form;

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome tittle"
          className="notes__tittle-input"
          name="title"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="What happened today"
          className="notes__text-area"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        <img className="notes__image" />
      </div>
    </div>
  );
};

export default NoteScreen;
