import prisma from "@/lib/prisma";
import { getUserIdentifier } from "@/services/auth/api.service";
import { NextResponse } from "next/server";

export async function GET(
    req: Request
) {
    const userId = await getUserIdentifier(req);

    if(!userId) return NextResponse.redirect('/login');

    const user = await prisma.user.findUnique({
        where: {
            id: userId as number
        }, 
        select: {
            id: true, 
            email: true, 
            name: true, 
            balance: true,
            createdAt: true, 
            updatedAt: true
        }
    });

    return NextResponse.json(user, { status: 200 });
}