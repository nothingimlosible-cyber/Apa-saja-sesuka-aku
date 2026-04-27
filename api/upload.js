export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Memberi izin Vercel untuk menerima file hingga 10MB
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.IMGBB_API_KEY;
  const { image } = req.body; 

  if (!image) {
    return res.status(400).json({ error: 'Gambar tidak ditemukan di request' });
  }

  try {
    // Pastikan format Base64 bersih (buang bagian "data:image/jpeg;base64,")
    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");

    const formData = new URLSearchParams();
    formData.append('image', cleanBase64);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        url: result.data.url 
      });
    } else {
      return res.status(result.status || 500).json({ 
        error: 'ImgBB Error: ' + (result.error?.message || 'Gagal upload') 
      });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server Error: ' + err.message });
  }
}
