export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const apiKey = process.env.IMGBB_API_KEY;
  const { image } = req.body; // Ini base64 dari HP kamu

  if (!image) return res.status(400).json({ error: 'Gambar kosong' });

  try {
    // Kita kirim pakai URLSearchParams agar lebih ringan & cepat tembus
    const body = new URLSearchParams();
    body.append('image', image);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const result = await response.json();

    if (result.success) {
      return res.status(200).json({ url: result.data.url });
    } else {
      return res.status(500).json({ error: 'ImgBB Error: ' + result.error.message });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server Error: ' + err.message });
  }
}
