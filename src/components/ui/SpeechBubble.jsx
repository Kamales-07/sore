/** Comic-style speech/thought bubble. side: 'left' | 'right' | 'bottom' */
export default function SpeechBubble({ children, side = 'left', tone = 'paper', thought = false, className = '', style }) {
  return (
    <div
      className={`bubble bubble--${side} bubble--${tone} ${thought ? 'bubble--thought' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
