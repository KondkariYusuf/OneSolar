import type { SVGProps } from "react"
import { motion, useTransform } from "framer-motion"

export interface MacProps extends SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  src?: string
  src2?: string
  src3?: string
  src4?: string
  opacity1?: any
  opacity2?: any
  opacity3?: any
  opacity4?: any
  progress?: any
}

export function Mac({ 
  width = 600, 
  height = 500, 
  src, 
  src2, 
  src3, 
  src4, 
  opacity1: customOpacity1, 
  opacity2: customOpacity2, 
  opacity3: customOpacity3, 
  opacity4: customOpacity4, 
  progress, 
  ...props 
}: MacProps) {
  // Define fallback progress and opacities if custom ones are not passed
  const defaultProgress = useTransform(() => 0);
  const activeProgress = progress || defaultProgress;

  const fallbackOpacity1 = useTransform(activeProgress, [0, 1], [1, 0]);
  const fallbackOpacity2 = useTransform(activeProgress, [0, 1], [0, 1]);

  const opacity1 = customOpacity1 !== undefined ? customOpacity1 : fallbackOpacity1;
  const opacity2 = customOpacity2 !== undefined ? customOpacity2 : fallbackOpacity2;
  const opacity3 = customOpacity3;
  const opacity4 = customOpacity4;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        fill="url(#mac-gold-gradient)"
        x="232.4"
        y="401.32"
        width="135.19"
        height="83.37"
      />
      <rect
        fill="#FFF1A8"
        x="234.32"
        y="489.39"
        width="17.21"
        height="1.9"
        rx=".15"
        ry=".15"
      />
      <rect
        fill="#FFF1A8"
        x="348.45"
        y="489.39"
        width="17.21"
        height="1.9"
        rx=".15"
        ry=".15"
      />
      <rect fill="#E1B131" x="232.4" y="484.69" width="135.19" height="5.61" />
      <path
        fill="#FCE491"
        d="M23.83,10.99h552.03c4.92,0,8.91,3.99,8.91,8.91v324.18H14.92V19.9c0-4.92,3.99-8.91,8.91-8.91Z"
      />
      <path
        fill="#FFF1A8"
        d="M23.83,343.94h552.03c4.92,0,8.91,3.99,8.91,8.91v48.47H14.92v-48.47c0-4.92,3.99-8.91,8.91-8.91Z"
        transform="translate(599.69 745.26) rotate(180)"
      />
      <path
        fill="#231f20"
        d="M570.43,330.43H29.57c-.44,0-.79-.36-.79-.79V25.47c0-.44.36-.79.79-.79h540.87c.44,0,.79.36.79.79v304.17c0,.44-.36.79-.79.79ZM29.57,25.37c-.05,0-.1.04-.1.09v304.17c0,.05.04.1.1.1h540.87c.05,0,.09-.04.09-.1V25.47c0-.05-.04-.09-.09-.09H29.57Z"
      />
      <rect
        fill="#fff"
        x="29.12"
        y="25.02"
        width="541.76"
        height="305.06"
        rx=".44"
        ry=".44"
      />
      <circle fill="#414042" cx="300" cy="17.7" r="2.11" />
      <circle fill="#262262" cx="300" cy="17.7" r=".85" />
      <rect
        fill="currentColor"
        x="29.12"
        y="25.02"
        width="541.76"
        height="305.06"
        rx=".44"
        ry=".44"
      />
      {src && (
        <motion.image
          href={src}
          x="29.12"
          y="25.02"
          width="541.76"
          height="305.06"
          preserveAspectRatio="none"
          clipPath="url(#mac-rounded-corners)"
          style={{ opacity: opacity1 }}
        />
      )}
      {src2 && (
        <motion.image
          href={src2}
          x="29.12"
          y="25.02"
          width="541.76"
          height="305.06"
          preserveAspectRatio="none"
          clipPath="url(#mac-rounded-corners)"
          style={{ opacity: opacity2 }}
        />
      )}
      {src3 && (
        <motion.image
          href={src3}
          x="29.12"
          y="25.02"
          width="541.76"
          height="305.06"
          preserveAspectRatio="none"
          clipPath="url(#mac-rounded-corners)"
          style={{ opacity: opacity3 }}
        />
      )}
      {src4 && (
        <motion.image
          href={src4}
          x="29.12"
          y="25.02"
          width="541.76"
          height="305.06"
          preserveAspectRatio="none"
          clipPath="url(#mac-rounded-corners)"
          style={{ opacity: opacity4 }}
        />
      )}

      <defs>
        <clipPath id="mac-rounded-corners">
          <rect
            fill="#ffffff"
            x="29.12"
            y="25.02"
            width="541.76"
            height="305.06"
            rx=".44"
            ry=".44"
          />
        </clipPath>
      </defs>

      <linearGradient
        id="mac-gold-gradient"
        x1="300"
        y1="484.69"
        x2="300"
        y2="401.32"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#D9A722" />
        <stop offset=".1" stop-color="#FDE080" />
        <stop offset=".41" stop-color="#FFF4C2" />
        <stop offset=".73" stop-color="#FFF4C2" />
        <stop offset="1" stop-color="#FDE080" />
      </linearGradient>
    </svg>
  )
}
