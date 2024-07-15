import { deleteSession } from "@/lib/session";
//import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {

     deleteSession();
    return new NextResponse("User signed out successfully", {status: 200});
}