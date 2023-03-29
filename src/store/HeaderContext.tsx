import {
  HeaderCTAProps,
  ProgressBarValuesInterface,
} from 'components/Header/Header';
import { FC, createContext } from 'react';

export interface headerContextType {
  text: string;
  setText: (a: string) => void;
  CTA: HeaderCTAProps | undefined;
  setCTA: (a: HeaderCTAProps) => void;
  isProgressBar: boolean;
  setIsProgressBar: (a: boolean) => void;
  steps: number;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
}
const HeaderContext = createContext<headerContextType>({
  text: '',
  setText: () => {},
  CTA: undefined,
  setCTA: () => {},
  isProgressBar: false,
  setIsProgressBar: () => {},
  steps: 0,
  currentStep: 0,
  nextStep: () => {},
  prevStep: () => {},
});
export default HeaderContext;
