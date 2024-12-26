import crypto from 'crypto';

export const hashFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const hash = crypto.createHash('sha256');
            hash.update(new Uint8Array(reader.result as ArrayBuffer));
            resolve(hash.digest('hex'));
        };
        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };
        reader.readAsArrayBuffer(file);
    });
};