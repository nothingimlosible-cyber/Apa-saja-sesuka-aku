export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { image } = req.body; 
        const IBB_KEY = process.env.IBB_KEY;

        // Pastikan IBB_KEY ada
        if (!IBB_KEY) {
            throw new Error("IBB_KEY belum dipasang di Environment Vercel");
        }

        // Gunakan URLSearchParams untuk mengirim data
        const formData = new URLSearchParams();
        formData.append('image', image);

        // Perhatikan URL di bawah ini, jangan sampai salah ketik
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IBB_KEY}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // Berhasil: kirim link gambar ke frontend
            return res.status(200).json({ url: data.data.url });
        } else {
            // Gagal dari sisi ImgBB (misal key salah atau gambar kegedean)
            return res.status(500).json({ message: 'ImgBB Error: ' + data.error.message });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
