import { SVGImageName } from "@/assets/svg/SVGImageName";
import { SVGPaths } from "@/assets/svg/SVGPaths";
import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";

interface SVGImageProps extends SvgProps {
  name: SVGImageName;
  style?: StyleProp<ViewStyle>;
}

export const SVGImage: React.FC<SVGImageProps> = ({ name, style, ...svgProps }) => {
  const path = SVGPaths[name];
    if (!path) {
        console.error(`SVGImage: No path found for name: ${name}`);
        return null;
    }

  return (
    <Svg width={50} height={50} viewBox="0 0 24 24" fill="none" {...svgProps} style ={style}>
      <Path d={path} fill={svgProps.fill} />
    </Svg>
  );
};
