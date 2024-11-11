import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const BackArrow = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M3.38086 12.3018C3.38086 12.0698 3.48291 11.8564 3.66846 11.6802L9.81006 5.54785C10.0142 5.34375 10.209 5.26953 10.4316 5.26953C10.8862 5.26953 11.248 5.60352 11.248 6.06738C11.248 6.29004 11.1646 6.50342 11.0161 6.65186L8.93799 8.76709L5.8208 11.6152L8.05664 11.4761H19.7925C20.2749 11.4761 20.6089 11.8193 20.6089 12.3018C20.6089 12.7842 20.2749 13.1274 19.7925 13.1274H8.05664L5.81152 12.9883L8.93799 15.8364L11.0161 17.9517C11.1646 18.0908 11.248 18.3135 11.248 18.5361C11.248 19 10.8862 19.334 10.4316 19.334C10.209 19.334 10.0142 19.2505 9.82861 19.0742L3.66846 12.9233C3.48291 12.7471 3.38086 12.5337 3.38086 12.3018Z"
      fill={props.fill}
    />
  </Svg>
);