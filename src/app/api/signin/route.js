import { createSession, getSession } from "@/lib/session";
//import { cookies } from "next/headers";

export async function POST(request) {
    const body = await request.json();
    //console.log(body);
    if(!body.admin) return new Response("Admin not found", { status: 404 });

    const session = await getSession();

    if(session) return new Response('Already authenticated', {status: 200});

    await createSession(body.admin);
    
    return new Response('Authenticated' , {status: 200});
}