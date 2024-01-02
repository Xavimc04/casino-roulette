import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/services/auth/api.service";

export default async function middleware(req: NextRequest) {
    const isAllowed = await isAuthenticated(req);
    
    if(req.nextUrl.pathname.startsWith('/auth')) {
        if(!isAllowed) { 
            return NextResponse.next();
        }
        
        return NextResponse.redirect(new URL('/', req.url).toString());
    } else if(req.nextUrl.pathname.startsWith('/casino')) {
        if(isAllowed) { 
            return NextResponse.next();
        }
        
        return NextResponse.redirect(new URL('/auth/login', req.url).toString());
    }
}