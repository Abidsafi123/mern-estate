 import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/User.js";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      console.log(result);

      
      const { data } = await axios.post("http://localhost:3000/api/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      dispatch(loginSuccess(data));
      navigate('/')

    } catch (error) {
      console.log("Couldn't continue with Google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
};

export default Oauth;
