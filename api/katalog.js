export default async function handler(req, res) {
  // Pakai try-catch supaya kalau error gak langsung merah lognya
  try {
    const SHEET_URL = process.env.SHEET_API;

    if (!SHEET_URL) {
      return res.status(500).json({ error: "SHEET_API belum ada di Environment Variables Vercel!" });
    }

    // Pakai method GET sebagai default
    const response = await fetch(SHEET_URL, {
      method: req.method === 'POST' ? 'POST' : 'GET',
      headers: req.method === 'POST' ? { 'Content-Type': 'application/json' } : {},
      body: req.method === 'POST' ? JSON.stringify(req.body) : null,
      redirect: 'follow'
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ 
      error: "Koneksi Gagal", 
      detail: err.message 
    });
  }
}
