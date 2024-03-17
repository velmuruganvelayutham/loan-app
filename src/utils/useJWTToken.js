import React, { useEffect, useState } from "react";
import axios from "axios"
import {
    useAuth
} from "@clerk/clerk-react";
function useJWTToken() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [jwtToken, setJwtToken] = useState("");
    useEffect(() => {
        async function getData() {
            const token = await getToken();
            console.log(`HOOK_token:${token}`);
            setJwtToken(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        getData();
    });
    return jwtToken;
}

export default useJWTToken

