import { signOut, getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom";

const SignOut = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        const auth = getAuth();
        try {
          await signOut(auth);
          navigate('/login');
        } catch (error) {
          console.error("Error signing out:", error);
        }
      };

    return (
        <button onClick={handleLogout}>
            Cerrar Sesión
        </button>
    )
}

export default SignOut;