export default async function handler(req, res) {
  const url = process.env.SHEET_API;

  if (!url) {
    return res.status(500).json({ error: "Link SHEET_API kosong di Vercel!" });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Koneksi ke Google Sheets Gagal: " + err.message });
  }
}
