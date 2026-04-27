export default async function handler(req, res) {
  const SHEET_API = process.env.SHEET_API;

  if (!SHEET_API) {
    return res.status(500).json({ error: "Variabel SHEET_API belum diset di Vercel" });
  }

  try {
    if (req.method === 'GET') {
      const response = await fetch(SHEET_API);
      if (!response.ok) throw new Error("Google Sheets menolak akses");
      const data = await response.json();
      return res.status(200).json(data);
    }

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
    
    return res.status(405).json({ message: "Hanya dukung GET dan POST" });

  } catch (err) {
    // Ini akan muncul di log Vercel kamu jika merah lagi
    console.error("LOG ERROR:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
