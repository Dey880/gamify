import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Profile() {
    const { user } = useContext(AuthContext);
    console.log(user, "USER");

    return (
        <div>
            <h1>Welcome to profile, {user ? user.email : "Loading..."}</h1>
        </div>
    );
}