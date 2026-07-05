import icons from '../data/icons.json';

export default function handler(req, res) {
  const { ach, progress } = req.query;
  const iconBase64 = icons[ach] || icons["default"];

  const p = Math.min(Math.max(parseFloat(progress) || 0, 0), 100);

  const circumference = 251;
  const offset = circumference - (p / 100) * circumference;

  const svg = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,0 62,25 88,12 75,38 100,50 75,62 88,88 62,75 50,100 38,75 12,88 25,62 0,50 25,38 12,12 38,25" fill="#ddd" transform="scale(0.7) translate(21,21)" />
      <circle cx="50" cy="50" r="46" stroke="#eee" stroke-width="6" fill="none" />
      <circle cx="50" cy="50" r="46" stroke="#3498db" stroke-width="6" fill="none" 
              stroke-dasharray="${circumference}" 
              stroke-dashoffset="${offset}" 
              transform="rotate(-90 50 50)" />
      <image x="15%" y="15%" width="70" height="70" href="${iconBase64}" />
    </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.send(svg);
}
