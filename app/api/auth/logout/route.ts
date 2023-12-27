import { deleteCookie } from "cookies-next";
import { NextResponse } from "next/server";

export default function POST() {
    deleteCookie('auth-token');

    return NextResponse.redirect('/login');
}