import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/services/auth/api.service";

export default async function middleware(req: NextRequest) {
    if(req.nextUrl.pathname.startsWith('/auth')) {
        const isAllowed = await isAuthenticated(req);

        if(!isAllowed) { 
            return NextResponse.next();
        }
        
        return NextResponse.redirect(new URL('/', req.url).toString(), {
            status: 401
        });
    }
}