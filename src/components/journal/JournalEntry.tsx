import { activateNote } from "../../actions/notes";
import { useAppDispatch } from "../../store/store";
import { noteIdToNote } from "../../types/convert";
import { NoteId } from "../../types/types";
import moment from "moment";

const JournalEntry = (note: NoteId) => {
  const date = moment(note.date);

  const dispatch = useAppDispatch();

  const handleEntryClick = () => {
    dispatch(activateNote(noteIdToNote(note), note.id));
  };

  return (
    <div className="journal__entry pointer" onClick={handleEntryClick}>
      {note.imgUrl && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${note.imgUrl})`,
          }}
        ></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-tittle">{note.title}</p>
        <p className="journal__entry-content">{note.body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span>{date.format("dddd")}</span>
        <h4>{date.format("Do")}</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
