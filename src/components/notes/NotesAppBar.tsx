import { useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";
import { RootState, useAppDispatch } from "../../store/store";
import moment from "moment";
import { ChangeEvent } from "react";

const NotesAppBar = () => {
  const dispatch = useAppDispatch();

  const { active } = useSelector((state: RootState) => state.notes);

  const date = moment(active!.date);

  const handleSave = () => {
    dispatch(startSaveNote(active!));
  };

  const handlePicture = () => {
    document.getElementById("fileSelector")?.click();
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <div className="notes__app-bar">
      <span>{date.format("LLLL")}</span>

      <input
        id="fileSelector"
        type="file"
        style={{ display: "none" }}
        onChange={handleFile}
      />

      <div>
        <button className="btn" onClick={handlePicture}>
          Picture
        </button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
