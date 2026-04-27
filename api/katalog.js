export default async function handler(req, res) {
    const SHEET_API = process.env.SHEET_API;

    // Menangani pengambilan data (GET)
    if (req.method === 'GET') {
        const response = await fetch(SHEET_API);
        const data = await response.json();
        return res.status(200).json(data);
    }

    // Menangani hapus data (DELETE)
    if (req.method === 'DELETE') {
        const { id } = req.query;
        const response = await fetch(`${SHEET_API}/id/${id}`, { method: 'DELETE' });
        const result = await response.json();
        return res.status(200).json(result);
    }
}
