import axios from "axios";
import { useEffect, useState } from "react";

export const useUser = () => {
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState();

    async function getDetails() {
        try {
            const res = await axios.get("https://my-finance-hub-ten.vercel.app/api/v1/user/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            
            console.log(res.data.user.firstName);
    
            const user = {
                balance: res.data.account.balance,
                firstName: res.data.user.firstName
            };
    
            console.log(`user ${JSON.stringify(user)}`);
    
            setUserDetails(user);
        } catch (error) {
            console.error('Axios request error:', error);
    
            // Check the response status and additional details
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        getDetails();
    }, []);

    // Return loading and userDetails as an object
    return {
        loading,
        userDetails
    };
};
