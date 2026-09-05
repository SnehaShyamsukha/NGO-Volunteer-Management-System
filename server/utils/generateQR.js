import QRCode from "qrcode";

export const generateQR = async(data) => {
    try {
        return await QRCode.toDataURL(data);
    } catch(error) {
        throw new Error(
            "QR generation failed"
        );
    }
};