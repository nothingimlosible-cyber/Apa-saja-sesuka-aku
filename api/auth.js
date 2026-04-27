export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.body;
  // Pastikan ADMIN_PASS ini namanya SAMA dengan yang di Vercel
  if (password === process.env.ADMIN_PASS) {
    return res.status(200).json({ success: true });
  }
  
  return res.status(401).json({ success: false });
}
