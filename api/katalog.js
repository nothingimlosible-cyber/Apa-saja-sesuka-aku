export default async function handler(req, res) {
  try {
    const url = process.env.SHEET_API;
    if (!url) return res.status(500).json({ error: "API URL missing" });

    const response = await fetch(url, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method === 'POST' ? JSON.stringify(req.body) : null,
      redirect: 'follow'
    });

    const data = await response.json();
    
    // Pastikan header CORS agar browser tidak memblokir
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
