import NotesAppBar from "./NotesAppBar";

const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome tittle"
          className="notes__tittle-input"
        />

        <textarea
          placeholder="What happened today"
          className="notes__text-area"
        ></textarea>

        <img className="notes__image" />
      </div>
    </div>
  );
};

export default NoteScreen;
