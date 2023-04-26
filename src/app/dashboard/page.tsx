"use client"
import { useSession } from "next-auth/react";
import axios from "axios";
import { UserType } from "../../../types/User";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<UserType>();
    useEffect(() => {
        axios.post("/api/login", { email: session?.user?.email }).then((res) => {
            console.log(res.data);
            setUser(res.data[0]);
        });
    }, [session]);

    if (status === "loading") return <h1>Loading...</h1>

    return (
        <div className=" flex w-full bg-gradient-to-br from-yellow-400 to-blue-600">
            {user ? <h1>{user.username}</h1> : <SignNewUser/>}
        </div>
    );
}


function SignNewUser() {
    const { data: session, status } = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const role = data.get("role");
        const res = await axios.post("/api/login/new", { user_email: session?.user?.email, username: session?.user?.name, user_image: session?.user?.image, role: role });
        console.log(res.data)
    };
    if(status === "loading") return <h1>Loading...</h1>
    if (!session) {
        return <h1>Not Signed In</h1>;
    } else {
        return (
            <div>
                You Have Not Signup Yet Please Select the Role to continue
                <form onSubmit={handleSubmit}>
                    <select name="role" id="role" defaultValue={'customer'}>
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                    </select>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}