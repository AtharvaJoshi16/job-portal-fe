import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.user);
  return (
    <div className="header">
      <Button variant="dark" onClick={() => navigate(`/profile/${id}`)}>
        Profile
      </Button>
    </div>
  );
};

export default Header;
