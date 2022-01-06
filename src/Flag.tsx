import React from 'react'
import type { Flags } from 'flagpack-core'
import './Flag.scss'

interface Props {
  code: Flags,
  size?: string,
  gradient?: '' | 'top-down' | 'real-circular' | 'real-linear',
  hasBorder?: boolean,
  hasDropShadow?: boolean,
  hasBorderRadius?: boolean,
  className?: string
}

const Flag: React.FC<Props> = ({
  code = 'NL',
  size = 'l',
  gradient = '',
  hasBorder = true,
  hasDropShadow = false,
  hasBorderRadius = true,
  className
}: Props) => {
  const [src, setSrc] = React.useState<string | null>(null)

  React.useEffect(() => {
    const loadImage = async() => {
      // @ts-ignore
      const loaded = await import(`./flags/${size}/${code}.svg`)

      setSrc(loaded)
    }

    loadImage()
  })

  return (
    <div
      className={
        `flag
    ${gradient}
    size-${size}
    ${hasBorder ? 'border' : ''}
    ${hasDropShadow ? 'drop-shadow' : ''}
    ${hasBorderRadius ? 'border-radius' : ''}
    ${className ? className.replace(/\s\s+/g, ' ').trim() : ''}`
      }>
      {
        src && <img src={src} />
      }
    </div>
  )
}

export default Flag
