import { SVGImageName } from "@/assets/svg/SVGImageName";
import { SVGPaths } from "@/assets/svg/SVGPaths";
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface SVGImageProps extends SvgProps {
  name: SVGImageName;
}

export const SVGImage: React.FC<SVGImageProps> = ({ name, ...svgProps }) => {
  const path = SVGPaths[name];
    if (!path) {
        console.error(`SVGImage: No path found for name: ${name}`);
        return null;
    }

  return (
    <Svg width={50} height={50} viewBox="0 0 24 24" fill="none" {...svgProps}>
      <Path d={path} fill={svgProps.fill} />
    </Svg>
  );
};
