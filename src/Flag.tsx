import * as React from 'react'
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
  const [SVGComponent, setSVGComponent] = React.useState<React.FC<React.SVGProps<SVGSVGElement>> | null>(null)

  React.useEffect(() => {
    const loadComponent = async() => {
      // @ts-ignore
      const loadedComponent = await import(`./flags/${size}/${code}.svg`).then(m => m.default)

      setSVGComponent(loadedComponent)
    }

    loadComponent()
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
        SVGComponent && <SVGComponent />
      }
    </div>
  )
}

export default Flag
