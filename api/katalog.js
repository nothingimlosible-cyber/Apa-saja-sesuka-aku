export default async function handler(req, res) {
    const SHEET_API = process.env.SHEET_API;

    // 1. Ambil Data (GET)
    if (req.method === 'GET') {
        const response = await fetch(SHEET_API);
        const data = await response.json();
        return res.status(200).json(data);
    }

    // 2. Simpan Data (POST)
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

    // 3. Hapus Data (DELETE)
    if (req.method === 'DELETE') {
        const { id } = req.query;
        // Apps Script butuh parameter khusus untuk hapus, kirim lewat POST saja agar mudah
        const response = await fetch(`${SHEET_API}?id=${id}&action=delete`, { 
            method: 'GET', // Apps Script lebih mudah terima perintah hapus via GET param
            redirect: 'follow'
        });
        return res.status(200).json({ success: true });
    }
}
