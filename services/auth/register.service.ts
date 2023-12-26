export function registryValidation(
    form: FormData
) { 
    const name = form.get('name');
    const email = form.get('email');
    const password = form.get('password');
    const password_confirmation = form.get('password_confirmation');

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