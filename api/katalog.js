export default async function handler(req, res) {
    const SHEET_API = process.env.SHEET_API;

    if (!SHEET_API) {
        return res.status(500).json({ error: "Variabel SHEET_API tidak ditemukan di Vercel" });
    }

    try {
        if (req.method === 'GET') {
            const response = await fetch(SHEET_API);
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
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
