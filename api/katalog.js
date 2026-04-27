export default async function handler(req, res) {
  const url = process.env.SHEET_API;
  
  if (!url) return res.status(500).json({ error: "SHEET_API belum diisi di Vercel" });

  try {
    const options = {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (req.method === 'POST') {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(url, options);
    const data = await response.json();
    
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Gagal ke Sheets: " + err.message });
  }
}
