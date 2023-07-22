import { useSelector } from "react-redux";
import { startSaveNote } from "../../actions/notes";
import { RootState, useAppDispatch } from "../../store/store";
import moment from "moment";

const NotesAppBar = () => {
  const dispatch = useAppDispatch();

  const { active } = useSelector((state: RootState) => state.notes);

  const date = moment(active!.date);

  const handleSave = () => {
    dispatch(startSaveNote(active!));
  };

  return (
    <div className="notes__app-bar">
      <span>{date.format("LLLL")}</span>

      <div>
        <button className="btn">Picture</button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
