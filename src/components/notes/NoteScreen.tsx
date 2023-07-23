import { useSelector } from "react-redux";
import NotesAppBar from "./NotesAppBar";
import { RootState, useAppDispatch } from "../../store/store";
import { useForm } from "../../hooks/useForm";
import { useEffect, useRef, useState } from "react";
import { activateNote, startDelete } from "../../actions/notes";

const NoteScreen = () => {
  const { active } = useSelector((state: RootState) => state.notes);
  const note = active!;

  const [noteValues, setNoteValues] = useState({
    id: note.id,
    date: note.date,
    imgUrl: note.imgUrl,
  });

  const [form, handleInputChange, reset] = useForm({
    title: note.title,
    body: note.body,
  });

  const noteId = useRef(note.id);
  const noteImg = useRef(note.imgUrl);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (note.id !== noteId.current) {
      reset({
        title: note.title,
        body: note.body,
      });
      setNoteValues({ id: note.id, date: note.date, imgUrl: note.imgUrl });

      noteId.current = note.id;
    }

    if (note.imgUrl !== noteImg.current) {
      setNoteValues({ id: note.id, date: note.date, imgUrl: note.imgUrl });
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(
      activateNote(
        {
          title: form.title,
          body: form.body,
          imgUrl: noteValues.imgUrl,
          date: noteValues.date,
        },
        noteValues.id
      )
    );
  }, [form, noteValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDelete(note));
  };

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

        {noteValues.imgUrl && (
          <div className="notes__image">
            <img src={noteValues.imgUrl} />
          </div>
        )}
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default NoteScreen;
