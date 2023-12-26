'use client'

import { FormEvent, useState } from "react"; 
import { registryValidation } from '@/services/auth/register.service'
import LabeledInput from "@/components/labeled-input";

export default function Page() {
    const [error, handleError] = useState<string>(''); 

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 

        const data = new FormData(event.currentTarget);

        const {
            isValid, 
            message
        } = registryValidation(data);

        if(!isValid) handleError(message)
    }

    return <main className="w-[350px] flex flex-col gap-2">
        <h2 className="text-4xl text-indigo-500 font-extrabold">Eurovegas</h2>

        <small className="mb-3">
            Enjoy the best online casino games.
        </small>

        {
            error && <small className="text-xs text-red-500 mb-3">
                * { error }
            </small>
        }

        <form
            onSubmit={ handleSubmit }
            className="flex flex-col gap-2"
        >
            <LabeledInput
                label="Name"
                icon="person"
                name="name"
                type="text"
            />

            <LabeledInput 
                label="Email"
                icon="mail"
                name="email"
                type="email"
            />

            <LabeledInput
                label="Password"
                icon="key"
                name="password"
                type="password"
            /> 

            <LabeledInput
                label="Confirm password"
                icon="key"
                name="confirm_password"
                type="password"
            />

            <small
                className="text-xs text-gray-400 mb-3 text-end"
            >
                Already have an account? <a href="/auth/login" className="text-indigo-500">Login</a>
            </small>

            <button
                type="submit"
                className="bg-indigo-500 text-white text-sm py-2 rounded-sm focus:outline-none focus:ring-0 transition-all hover:bg-indigo-600" 
            >
                Complete register
            </button>
        </form>
    </main>
}