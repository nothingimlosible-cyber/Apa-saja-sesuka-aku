export default async function handler(req, res) {
  const SHEET_URL = process.env.SHEET_API;
  
  if (!SHEET_URL) {
    return res.status(500).json({ error: "SHEET_API belum diisi di Vercel" });
  }

  // Cuma bolehin GET buat ambil data, POST buat nambah data
  if (!['GET', 'POST'].includes(req.method)) {
    return res.status(405).json({ error: 'Method tidak diizinkan' });
  }

  try {
    const options = {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
    };

    // Kalau nambah produk, wajib cek dulu
    if (req.method === 'POST') {
      const { id, nama, harga, link, img, source } = req.body;
      
      if (!id || !nama || !harga || !link || !img) {
        return res.status(400).json({ error: 'Data produk kurang lengkap' });
      }
      
      if (nama.length > 100 || link.length > 500) {
        return res.status(400).json({ error: 'Data kepanjangan' });
      }
      
      if (!link.startsWith('http')) {
        return res.status(400).json({ error: 'Link harus diawali http' });
      }

      options.body = JSON.stringify({ id, nama, harga, link, img, source });
    }

    const response = await fetch(SHEET_URL, options);
    const data = await response.json();
    
    return res.status(200).json(data);
    
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
