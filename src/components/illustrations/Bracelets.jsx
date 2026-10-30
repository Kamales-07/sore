/** Two matching friendship bracelets with G and K beads. */
export default function Bracelets({ className = '' }) {
  return (
    <svg
      className={`illo ${className}`}
      viewBox="0 0 220 90"
      role="img"
      aria-label="Two matching friendship bracelets with G and K beads"
    >
      <ellipse cx="62" cy="46" rx="42" ry="24" fill="none" stroke="#7f66d6" strokeWidth="6" />
      <g fill="#ffe27a" stroke="#2d2650" strokeWidth="1.5">
        <circle cx="20" cy="46" r="6" />
        <circle cx="33" cy="29" r="6" />
        <circle cx="62" cy="22" r="6" />
        <circle cx="91" cy="29" r="6" />
        <circle cx="104" cy="46" r="6" />
        <circle cx="91" cy="63" r="6" />
        <circle cx="33" cy="63" r="6" />
      </g>
      <circle cx="62" cy="70" r="10" fill="#fff6e3" stroke="#2d2650" strokeWidth="2" />
      <text x="62" y="75" textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="Nunito, system-ui, sans-serif" fill="#2d2650">
        G
      </text>

      <ellipse cx="158" cy="46" rx="42" ry="24" fill="none" stroke="#e9634f" strokeWidth="6" />
      <g fill="#a9d3f5" stroke="#2d2650" strokeWidth="1.5">
        <circle cx="116" cy="46" r="6" />
        <circle cx="129" cy="29" r="6" />
        <circle cx="158" cy="22" r="6" />
        <circle cx="187" cy="29" r="6" />
        <circle cx="200" cy="46" r="6" />
        <circle cx="187" cy="63" r="6" />
        <circle cx="129" cy="63" r="6" />
      </g>
      <circle cx="158" cy="70" r="10" fill="#fff6e3" stroke="#2d2650" strokeWidth="2" />
      <text x="158" y="75" textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="Nunito, system-ui, sans-serif" fill="#2d2650">
        K
      </text>
    </svg>
  )
}
