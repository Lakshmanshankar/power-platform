"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import Image from "next/image";
function Login() {
    const { data: session,status } = useSession();
    console.log(session, status);
    const user = session?.user;
    if (session) {
        return (
            <div>
                <div className="">
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                    <div className=" rounded-full">
                        <Image src={`${user?.image}`} alt="No Image" width={200} height={200} ></Image>
                    </div>
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1>User not logged in</h1>
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        );
    }
}
export default Login;

