export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', 
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Gunakan method POST' });
  }

  // PAKAI IBB (Sesuai nama yang kamu buat di Vercel Environment Variables)
  const apiKey = process.env.IBB;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key IBB tidak ditemukan di Vercel' });
  }

  const { image } = req.body; 

  if (!image) {
    return res.status(400).json({ error: 'Gambar tidak terkirim dari frontend' });
  }

  try {
    // Bersihkan Base64
    const cleanBase64 = image.includes('base64,') 
      ? image.split('base64,')[1] 
      : image;

    // Kirim ke ImgBB menggunakan apiKey yang isinya dari process.env.IBB
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: new URLSearchParams({ image: cleanBase64 }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const result = await response.json();

    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        url: result.data.url 
      });
    } else {
      return res.status(400).json({ 
        error: 'Respon ImgBB: ' + (result.error?.message || 'Gagal') 
      });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server Error: ' + err.message });
  }
}
