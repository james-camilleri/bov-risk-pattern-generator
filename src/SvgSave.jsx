export const SvgSave = (props) => {
  const { children, svgRef } = props
  const svg = svgRef.current?.outerHTML
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const href = window.URL.createObjectURL(blob)

  return (
    <a
      className='button'
      download='risk-management-pattern'
      href={href}
      rel='noreferrer'
      target='_blank'
    >
      {children}
    </a>
  )
}
