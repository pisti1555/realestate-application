import axios from "axios";

export async function getMe() {
    const respone = await axios.get('http://localhost:8000/api/user', 
        {
            withCredentials: true
        }
    );

    console.log(respone);
    
}