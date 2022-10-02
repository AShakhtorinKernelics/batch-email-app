import { createDecipheriv, createCipheriv } from 'crypto';

export const toEncrypted = (token: string, vector: string) => {
    const algorithm = "aes-256-cbc";
    const cipher = createCipheriv(algorithm, process.env.SECURITY_KEY!, vector);
    let encryptedData = cipher.update(token, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    return encryptedData;
}

export const toDecrypted = (encryptedToken: string, vector: string) => {
    const algorithm = "aes-256-cbc";
    const decipher = createDecipheriv(algorithm, process.env.SECURITY_KEY!, vector);
    let decryptedData = decipher.update(encryptedToken, "hex", "utf-8");
    decryptedData += decipher.final("utf8");

    return decryptedData;
}




