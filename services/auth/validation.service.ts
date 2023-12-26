import { Login, Register } from "@/types/auth/types";

export function registryValidation(
    form: FormData | Register
) { 
    let name, email, password, password_confirmation;

    if(form instanceof FormData) {
        name = form.get('name');
        email = form.get('email');
        password = form.get('password');
        password_confirmation = form.get('password_confirmation');
    } else {
        name = form.name;
        email = form.email;
        password = form.password;
        password_confirmation = form.password_confirmation;
    }

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

    if (!String(email).includes('@')) {
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

    if(String(password).length < 8) {
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

export function loginValidation(
    form: FormData | Login
) {
    let email, password;

    if(form instanceof FormData) {
        email = form.get('email');
        password = form.get('password');
    } else {
        email = form.email;
        password = form.password;
    }

    if (!email) {
        return {
            isValid: false,
            message: 'Email is required'
        }
    }

    if (!String(email).includes('@')) {
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

    return {
        isValid: true,
        message: 'All fields are valid'
    }
}