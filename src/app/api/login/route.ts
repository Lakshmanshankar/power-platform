import { Client } from "../client";

export async function POST(request: Request) {
    const { email } = await request.json();
    console.log(email);
    const { data, error } = await Client.from('users').select('*').filter('user_email', 'eq', email);
    return new Response(JSON.stringify(data),{status:201});
}




