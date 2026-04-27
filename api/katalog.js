export default async function handler(req, res) {
    const SHEET_API = process.env.SHEET_API;

    // Menangani pengambilan data (GET)
    if (req.method === 'GET') {
        try {
            const response = await fetch(SHEET_API);
            const data = await response.json();
            
            // Kita pastikan formatnya bersih sebelum dikirim ke HTML
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Menangani simpan data (POST)
    if (req.method === 'POST') {
        try {
            const response = await fetch(SHEET_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body),
                redirect: 'follow'
            });
            const result = await response.json();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Menangani hapus data (DELETE)
    if (req.method === 'DELETE') {
        try {
            const { id } = req.query;
            await fetch(`${SHEET_API}?id=${id}&action=delete`, { 
                method: 'GET', 
                redirect: 'follow' 
            });
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
