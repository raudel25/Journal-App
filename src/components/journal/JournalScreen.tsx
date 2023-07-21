import NothingSelected from "./NothingSelected";
import Sidebar from "./Sidebar";
import NoteScreen from "../notes/NoteScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const JournalScreen = () => {
  const { active } = useSelector((state: RootState) => state.notes);

  return (
    <div className="journal__main-content">
      <Sidebar />

      <main>{active ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};
