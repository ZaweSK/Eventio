import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const Settings = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M11.1978 22.1899C10.6851 22.1899 10.3159 21.8926 10.2031 21.3901L9.70068 19.2778C9.3418 19.1548 8.99316 19.0112 8.67529 18.8677L6.82959 20.0059C6.39893 20.2725 5.92725 20.2314 5.56836 19.8828L4.30713 18.6113C3.94824 18.2627 3.89697 17.7705 4.18408 17.3398L5.31201 15.5044C5.16846 15.1763 5.03516 14.8379 4.92236 14.4995L2.7998 13.9971C2.28711 13.8945 2 13.5254 2 13.0127V11.2285C2 10.7261 2.28711 10.3569 2.7998 10.2441L4.90186 9.73145C5.03516 9.3623 5.17871 9.02393 5.30176 8.72656L4.17383 6.87061C3.88672 6.43994 3.91748 5.96826 4.28662 5.59912L5.56836 4.33789C5.92725 3.98926 6.36816 3.94824 6.80908 4.19434L8.66504 5.34277C8.98291 5.18896 9.3418 5.05566 9.70068 4.92236L10.2031 2.81006C10.3159 2.29736 10.6851 2 11.1978 2H13.0024C13.5151 2 13.8843 2.29736 13.9971 2.81006L14.4893 4.94287C14.8687 5.06592 15.207 5.20947 15.5146 5.35303L17.3809 4.19434C17.8218 3.94824 18.2627 3.99951 18.6216 4.33789L19.9033 5.59912C20.2725 5.96826 20.3032 6.43994 20.0264 6.87061L18.8882 8.72656C19.0112 9.02393 19.165 9.3623 19.2881 9.73145L21.3901 10.2441C21.9028 10.3569 22.1899 10.7261 22.1899 11.2285V13.0127C22.1899 13.5254 21.9028 13.8945 21.3901 13.9971L19.2676 14.4995C19.165 14.8379 19.0215 15.1763 18.8779 15.5044L20.0059 17.3398C20.293 17.7705 20.2417 18.2627 19.8828 18.6113L18.6216 19.8828C18.2627 20.2314 17.791 20.2725 17.3604 20.0059L15.5146 18.8677C15.1968 19.0112 14.8481 19.1548 14.4893 19.2778L13.9971 21.3901C13.8843 21.8926 13.5151 22.1899 13.0024 22.1899H11.1978ZM12.1001 15.5352C13.9868 15.5352 15.5352 13.9766 15.5352 12.0898C15.5352 10.2134 13.9868 8.65479 12.1001 8.65479C10.2134 8.65479 8.65479 10.2134 8.65479 12.0898C8.65479 13.9766 10.2134 15.5352 12.1001 15.5352Z"
      fill={props.fill}
    />
  </Svg>
);