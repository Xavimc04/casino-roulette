import { getJwtSecretKey } from "@/lib/auth/jwt-secret";
import prisma from "@/lib/prisma";
import { getCookie } from "cookies-next";
import { jwtVerify } from "jose";

export async function doesEmailExist(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    return !!user;
}

export async function isAuthenticated(req: Request) {
    const token = getCookie('auth-token', { req });

    if (!token) return false; 

    try {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(getJwtSecretKey())
        )

        if(verified) return verified; 

        return false 
    } catch (err) {
        return false
    }
}

export async function getUserIdentifier(req: Request) {
    const allowed = await isAuthenticated(req);

    if (!allowed) return false;

    return allowed?.payload?.id || null; 
}