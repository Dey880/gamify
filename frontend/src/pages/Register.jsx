import "../css/components/Form.css"
import { useContext, useState } from "react";
import axios from "axios"
import { AuthContext } from "../auth/AuthContext";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [msg, setMsg ] = useState("");
    const { user } = useContext(AuthContext);

    if(user) window.location.replace("/profile");

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
            { email, password, repeatPassword },
            { withCredentials: true }
        )
        .then((response) => {
            setMsg(response.data.msg);
            setTimeout(() => {
                if (response.status === 201) {
                    window.location.replace("/profile");
                }
            }, 1000);
        });
    }

    return(
        <div className="register">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password"onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Repeat password"onChange={(e) => setRepeatPassword(e.target.value)}/>
                <button type="submit">Registrer</button>
            </form>
            {msg?
            <div><p>{msg}</p></div>
        :
        <div></div>
        }
        </div>
    )
}