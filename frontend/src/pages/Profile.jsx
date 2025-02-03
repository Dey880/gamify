// import { useContext, useEffect } from "react";
// import { AuthContext } from "../auth/AuthContext";

export default function Profile() {
    // const { user } = useContext(AuthContext);

    // useEffect(() => {
    //     const checkUser = async () => {
    //         if (!user) {
    //             window.location.replace("/login");
    //         }
    //     };
        
    //     checkUser();
    // }, [user]);

    return(
        <div>
            <h1>Welcome to profile, "USER EMAIL"</h1>
        </div>
    );
}