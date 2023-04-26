import { Client } from "../../client";

export async function POST(request: Request) {
    const { user_email, username, user_image, role } = await request.json();
    console.log(user_email, role);
    const { data, error } = await Client.from('users').select('*').filter('user_email', 'eq', user_email);

    if (data!.length == 0) {
        const { data, error } = await Client.from('users').insert([{ user_email, username, user_image, role }]);
        if (error) return new Response(JSON.stringify(error), { status: 500 });
        else return new Response(JSON.stringify({result:'Successfully created User at'}), { status: 201 });
    } else
        return new Response(JSON.stringify(data), { status: 201 });

}

