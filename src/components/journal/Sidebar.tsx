import { useSelector } from "react-redux";
import JournalEntries from "./JournalEntries";
import { RootState, useAppDispatch } from "../../store/store";
import { startLogout } from "../../actions/auth";
import { cleaningNotes, startNewNote } from "../../actions/notes";

const Sidebar = () => {
  const { displayName } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(cleaningNotes());
    dispatch(startLogout());
  };

  const handleNewEntry = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span>{displayName}</span>
        </h3>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="journal__new-entry" onClick={handleNewEntry}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New Entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};

export default Sidebar;
