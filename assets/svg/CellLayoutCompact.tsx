import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const CellLayoutCompact = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M5.7666 11.1182C4.646 11.1182 4.08203 10.5688 4.08203 9.44092V6.64307C4.08203 5.52246 4.646 4.98047 5.7666 4.98047H18.2251C19.3457 4.98047 19.9097 5.52246 19.9097 6.64307V9.44092C19.9097 10.5688 19.3457 11.1182 18.2251 11.1182H5.7666ZM5.7666 18.4644C4.646 18.4644 4.08203 17.9224 4.08203 16.7944V13.9893C4.08203 12.876 4.646 12.3267 5.7666 12.3267H18.2251C19.3457 12.3267 19.9097 12.876 19.9097 13.9893V16.7944C19.9097 17.9224 19.3457 18.4644 18.2251 18.4644H5.7666Z"
      fill={props.fill}
    />
  </Svg>
);