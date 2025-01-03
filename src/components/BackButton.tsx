import { useNavigate } from "react-router-dom";
import Button from "./Button";
const BackButton = () => {
    const navigate=useNavigate()
  return (
    <div>
      <Button
        type="back"
        onClick={() => {
          navigate(-1);
        }}
      >
        &larr; Back
      </Button>
    </div>
  );
}

export default BackButton