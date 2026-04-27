export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', 
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Hanya bisa pakai POST ya kak' });
  }

  // AMBIL API KEY (Pastikan di Vercel namanya IBB)
  const apiKey = process.env.IBB;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key (IBB) belum ada di Vercel' });
  }

  const { image } = req.body; 

  if (!image) {
    return res.status(400).json({ error: 'Gambar tidak terdeteksi' });
  }

  try {
    // 1. Bersihkan string Base64 dari header "data:image/..."
    const cleanBase64 = image.includes('base64,') 
      ? image.split('base64,')[1] 
      : image;

    // 2. Siapkan data untuk dikirim ke ImgBB
    const formData = new URLSearchParams();
    formData.append('image', cleanBase64);

    // 3. PROSES KIRIM (Pastikan URL menggunakan apiKey yang tadi diambil)
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const result = await response.json();

    // 4. Cek hasil dari ImgBB
    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        url: result.data.url 
      });
    } else {
      return res.status(400).json({ 
        error: 'Error ImgBB: ' + (result.error?.message || 'Gagal Upload') 
      });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server Crash: ' + err.message });
  }
}
