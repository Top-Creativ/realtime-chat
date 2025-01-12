

export const GetEnv = <T extends string | number | boolean>(
    key: string,
    default_value?: T
): T | null => {
    const value = process.env[key];

    if (value !== undefined) {
        if (typeof default_value === "boolean") {
            return (value === "true") as T;
        } else if (typeof default_value === "number") {
            const num = Number(value);
            return (isNaN(num) ? default_value : num) as T;
        }
        return value as T;
    }

    return default_value ?? null;
};

export function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);

    return Array.from(array, byte => chars[byte % chars.length]).join('');
}