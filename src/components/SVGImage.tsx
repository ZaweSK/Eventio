import { SVG } from "@/assets/svg/SVG";
import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";

export type SVGImageName = keyof typeof SVG; 

interface SVGImageProps extends SvgProps {
  name: SVGImageName;
  style?: StyleProp<ViewStyle>;
}

export const SVGImage: React.FC<SVGImageProps> = ({ name, style, ...svgProps } : SVGImageProps) => {
  const SVGImageComponent = SVG[name];
  if (!SVGImageComponent) {
    console.error(`SVGImage: No component found for name: ${name}`);
    return null;
  }
  return <SVGImageComponent {...svgProps} style={style} />
};
