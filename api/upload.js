export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method tidak diizinkan' });
  }

  const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Data gambar kosong' });
  }

  try {
    const formData = new URLSearchParams();
    formData.append('image', image);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ url: data.data.url });
    } else {
      console.error("ImgBB Error:", data);
      return res.status(500).json({ error: 'ImgBB menolak upload' });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: 'Gagal menghubungi server upload' });
  }
}
