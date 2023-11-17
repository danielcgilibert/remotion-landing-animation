import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { linearTiming, TransitionSeries } from '@remotion/transitions'
import { fade } from '@remotion/transitions/fade'

const myImage = staticFile(`/web4.png`)

export const MyComposition: React.FC = () => {
  const { fps, durationInFrames, width, height } = useVideoConfig()
  const frame = useCurrentFrame() // 10

  const positionR = interpolate(frame, [0, 25], [0, 30], {})
  const skewY = interpolate(positionR, [0, 25], [0, 0.5], {})
  const Scale = interpolate(frame, [0, 25], [100, 102], {
    extrapolateRight: 'clamp',
  })

  const ToTop = interpolate(frame, [80, 200], [0, 100])

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <AbsoluteFill className=' items-center justify-center bg-gradient-to-r from-violet-500 via-purple-300 to-blue-800 '>
          {/* <Img
            src={myImage}
            className={`w-full h-full object-cover  rounded-3xl shadow-2xl transition-all ease-in   `}
            style={{ transform: `skewY(${skewY}deg)` }}
          /> */}
          <Img
            src={myImage}
            className={`object-cover   absolute right-48 top-28 h-[1100px]  shadow-2xl rounded-2xl      `}
            style={{
              right: `${positionR}px`,
              scale: `${Scale}%`,
              transform: `skewY(-${skewY}deg)`,
            }}
          />
        </AbsoluteFill>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: 20 })}
        presentation={fade()}
      />

      <TransitionSeries.Sequence durationInFrames={200}>
        <AbsoluteFill className=' items-center justify-center bg-gradient-to-r from-violet-500 via-purple-300 to-blue-800 '>
          <Img
            src={myImage}
            className={`w-screen h-full object-cover rounded-3xl scale-110  absolute  top-0    `}
            style={{
              top: `-${ToTop}px`,
            }}
          />
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  )
}
