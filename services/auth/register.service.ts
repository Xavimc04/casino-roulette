import { Register } from "@/types/auth/types";

export function registryValidation(
    state: Register
) {
    const { name, email, password, password_confirmation } = state;

    if (!name) {
        return {
            isValid: false,
            message: 'Name is required'
        }
    }

    if (!email) {
        return {
            isValid: false,
            message: 'Email is required'
        }
    }

    if (!email.includes('@')) {
        return {
            isValid: false,
            message: 'Email must be valid'
        }
    }

    if (!password) {
        return {
            isValid: false,
            message: 'Password is required'
        }
    }

    if(password.length < 8) {
        return {
            isValid: false,
            message: 'Password must be at least 8 characters'
        }
    }

    if (!password_confirmation) {
        return {
            isValid: false,
            message: 'Password confirmation is required'
        }
    }

    if (password !== password_confirmation) {
        return {
            isValid: false,
            message: 'Password and password confirmation must match'
        }
    }

    return {
        isValid: true,
        message: 'All fields are valid'
    }
}