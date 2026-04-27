export default async function handler(req, res) {
    // Hanya izinkan metode POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { image } = req.body; // Gambar dalam bentuk Base64 dari HTML
        const IBB_KEY = process.env.IBB_KEY; // Diambil dari Vercel Environment

        // Kirim ke API ImgBB dari "sisi server"
        const formData = new URLSearchParams();
        formData.append('image', image);

        const response = await fetch(`https://imgbb.com{IBB_KEY}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // Kirim link gambar yang sudah jadi ke HTML
            return res.status(200).json({ url: data.data.url });
        } else {
            return res.status(500).json({ message: 'Gagal upload ke ImgBB' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
