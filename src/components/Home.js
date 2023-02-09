import Addnote from "./Addnote";
import Notes from "./Notes";

export default function Home(props) {
  const { showAlert } = props;
  return (
    <>
      <Addnote showAlert={showAlert} />

      <div className="conatiner my-3">
        <Notes showAlert={showAlert} />
      </div>
    </>
  );
}
