export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', 
    },
  },
};

export default async function handler(req, res) {
  // 1. Cek Method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Hanya bisa pakai POST ya kak' });
  }

  // 2. Ambil API Key (Sesuaikan dengan nama di Vercel: IBB)
  const apiKey = process.env.IBB;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key IBB belum disetting di Vercel' });
  }

  // 3. Ambil data gambar dari body
  const { image } = req.body; 

  if (!image) {
    return res.status(400).json({ error: 'Gambar kosong atau tidak terkirim' });
  }

  try {
    // 4. Bersihkan Base64
    const cleanBase64 = image.includes('base64,') 
      ? image.split('base64,')[1] 
      : image;

    // 5. Kirim ke ImgBB
    const formData = new URLSearchParams();
    formData.append('image', cleanBase64);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const result = await response.json();

    // 6. Respon balik ke Web (Frontend)
    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        url: result.data.url 
      });
    } else {
      return res.status(result.status || 400).json({ 
        error: 'Gagal di ImgBB: ' + (result.error?.message || 'Unknown Error') 
      });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Masalah Server: ' + err.message });
  }
}
