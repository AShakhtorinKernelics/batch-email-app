export const mailBuilder = (
    from: string, to: string,
    subject: string, text: string
) => {
    return {
        from,
        to,
        subject,
        text
    }
};