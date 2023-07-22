import { useSelector } from "react-redux";
import NotesAppBar from "./NotesAppBar";
import { RootState, useAppDispatch } from "../../store/store";
import { useForm } from "../../hooks/useForm";
import { useEffect, useRef, useState } from "react";
import { activateNote } from "../../actions/notes";

const NoteScreen = () => {
  const { active } = useSelector((state: RootState) => state.notes);
  const note = active!;

  const [noteValues, setNoteValues] = useState({
    id: note.id,
    date: note.date,
  });

  const [form, handleInputChange, reset] = useForm({
    title: note.title,
    body: note.body,
    imgUrl: note.imgUrl ? note.imgUrl : "",
  });

  const noteId = useRef(note.id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (note.id !== noteId.current) {
      reset({
        title: note.title,
        body: note.body,
        imgUrl: note.imgUrl ? note.imgUrl : "",
      });
      setNoteValues({ id: note.id, date: note.date });

      noteId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(
      activateNote(
        {
          title: form.title,
          body: form.body,
          imgUrl: form.imgUrl === "" ? undefined : form.imgUrl,
          date: noteValues.date,
        },
        noteValues.id
      )
    );
  }, [form, noteValues, dispatch]);

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

        {note.imgUrl && <img className="notes__image" />}
      </div>
    </div>
  );
};

export default NoteScreen;
