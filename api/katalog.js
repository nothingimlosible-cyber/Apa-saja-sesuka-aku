export default async function handler(req, res) {
  const SHEET_API = process.env.SHEET_API;

  // Cek apakah variabel link sudah ada
  if (!SHEET_API) {
    return res.status(500).json({ error: "Variabel SHEET_API belum diset di Vercel Settings" });
  }

  try {
    // Logika Pengambilan Data (GET)
    if (req.method === 'GET') {
      const response = await fetch(SHEET_API);
      if (!response.ok) throw new Error("Gagal mengambil data dari Google Sheets");
      const data = await response.json();
      return res.status(200).json(data);
    }

    // Logika Simpan Data (POST)
    if (req.method === 'POST') {
      const response = await fetch(SHEET_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
        redirect: 'follow'
      });
      const result = await response.json();
      return res.status(200).json(result);
    }

    // Jika method bukan GET atau POST
    return res.status(405).json({ message: "Method not allowed" });

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
