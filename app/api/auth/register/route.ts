import { NextResponse } from 'next/server' 
import prisma from '@/lib/prisma';
import { registryValidation } from '@/services/auth/validation.service'
import { Register } from '@/types/auth/types';
import { doesEmailExist } from '@/services/auth/api.service';
import { encrypt } from '@/lib/encryption';

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

        const { name, email, password, password_confirmation } : Register = body;
    
        const validationResult = registryValidation({ name, email, password, password_confirmation });
    
        if (validationResult.isValid) {
            const alreadyInUse : boolean = await doesEmailExist(email as string); 

            if(alreadyInUse) {
                return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
            }

            const user = await prisma.user.create({
                data: {
                    name: name as string,
                    email: email as string,
                    password: encrypt(password as string)
                }
            });

            if(user) {
                return NextResponse.json({ message: 'User created successfully' }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Error creating user' }, { status: 400 });
            }
        } else {
            return NextResponse.json({ message: validationResult.message }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({
            error: (error as Error).message
        }, { status: 400 });
    }
}