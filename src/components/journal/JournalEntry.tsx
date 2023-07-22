import { NoteId } from "../../types/types";
import moment from "moment";

const JournalEntry = (note: NoteId) => {
  const date = moment(note.date);

  return (
    <div className="journal__entry pointer">
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
