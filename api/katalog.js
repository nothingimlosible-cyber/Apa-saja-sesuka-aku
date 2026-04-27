export default async function handler(req, res) {
  const url = process.env.SHEET_API;
  
  if (!url) {
    return res.status(500).json({ error: "Variabel SHEET_API belum diset" });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    // Jika Google Sheets error, kita kirim array kosong [] agar web tidak merah
    return res.status(200).json([]);
  }
}
