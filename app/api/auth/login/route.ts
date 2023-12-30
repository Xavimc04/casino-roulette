import { loginValidation } from "@/services/auth/validation.service";
import { Login } from "@/types/auth/types";
import { NextResponse } from "next/server"; 
import prisma from "@/lib/prisma";
import { compareEncryption } from "@/lib/encryption"; 
import { setCookie } from "cookies-next";
import { SignJWT } from 'jose'
import { getJwtSecretKey } from "@/lib/auth/jwt-secret";

export const config = {
    api: {
      bodyParser: false
    },
};

export async function POST(
    req: Request
) {
    try {
        let formData = await req.formData();

        let body = Object.fromEntries(formData);

        const { email, password } : Login = body;
    
        const validationResult = loginValidation({ email, password });
    
        if (validationResult.isValid) {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            if (!user) {
                return NextResponse.json({
                    error: 'This email is not registered'
                }, { status: 400 });
            }

            const isPasswordValid = compareEncryption(password as string, user.password);

            if (!isPasswordValid) {
                return NextResponse.json({
                    error: 'Invalid credentials'
                }, { status: 400 });
            }

            const token = await new SignJWT({
                id: user.id
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('1h')
                .sign(new TextEncoder().encode(getJwtSecretKey()))

            const res = new NextResponse(
                JSON.stringify({ message: 'Logged in successfully' }), 
                { status: 200 }
            );
            
            setCookie('auth-token', token, {
                req, 
                res, 
                maxAge: 1800000,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            return res
        } else {
            return NextResponse.json({ message: validationResult.message }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({
            error: (error as Error).message
        }, { status: 400 });
    }
}