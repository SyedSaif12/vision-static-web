const prefix = process.env.NEXT_PUBLIC_ENV;
export function StorageKey() {
    return {
        tokens: `${prefix}:tokens`,
        user: `${prefix}:user`
    }
}


export function isEmail(value) {
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/

    return emailRegex.test(value.trim())
}

export function isPhoneNumber(value) {
    return /^03\d{9}$/.test(value.trim())
}
