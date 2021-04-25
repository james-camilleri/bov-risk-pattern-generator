import { animated, useSpring } from 'react-spring'

export const Circle = (props) => {
  const springProps = useSpring(props)

  return <animated.circle {...springProps} />
}

export const Connector = (props) => {
  const springProps = useSpring(props)

  return (
    <animated.polyline
      fill='none'
      stroke='black'
      strokeWidth={5}
      {...springProps}
    />
  )
}
