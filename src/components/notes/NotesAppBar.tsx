import { useSelector } from "react-redux";
import { startSaveNote } from "../../actions/notes";
import { RootState, useAppDispatch } from "../../store/store";

const NotesAppBar = () => {
  const dispatch = useAppDispatch();

  const { active } = useSelector((state: RootState) => state.notes);

  const handleSave = () => {
    dispatch(startSaveNote(active!));
  };

  return (
    <div className="notes__app-bar">
      <span>25 de mayo 2001</span>

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
