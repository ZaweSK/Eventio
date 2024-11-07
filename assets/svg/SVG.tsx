// SVG/index.js or SVG.js

import { BackArrow } from '@/assets/svg/BackArrow';
import { CellLayout1 } from '@/assets/svg/CellLayout1';
import { CellLayout2 } from '@/assets/svg/CellLayout2';
import { Settings } from '@/assets/svg/Settings';
import { SvgProps } from 'react-native-svg';

const SVG = {
  Settings: (props: SvgProps) => <Settings {...props} />,
  BackArrow: (props: SvgProps) => <BackArrow {...props} />,
  CellLayout1: (props: SvgProps) => <CellLayout1 {...props} />,
  CellLayout2: (props: SvgProps) => <CellLayout2 {...props} />,
};

export default SVG;