import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    }

    return(
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );

};

export default Logout;