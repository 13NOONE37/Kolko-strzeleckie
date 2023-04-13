import { FC, useCallback, useState } from 'react';
import styles from './Header.module.css';

export interface ProgressBarValuesInterface {
  steps: number;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
}
export const useProgressBarValues = (
  steps: number,
  initialStep: number,
): ProgressBarValuesInterface => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  const handleChangeProgress = useCallback(
    (direction: number) => {
      const newStep = Math.max(0, Math.min(steps, currentStep + direction));
      setCurrentStep(newStep);
    },
    [currentStep, steps],
  );

  const nextStep = useCallback(() => {
    handleChangeProgress(1);
  }, [handleChangeProgress]);

  const prevStep = useCallback(() => {
    handleChangeProgress(-1);
  }, [handleChangeProgress]);

  return { steps, currentStep, nextStep, prevStep };
};

interface ProgressBarProps {
  steps: number;
  currentStep: number;
}
const ProgressBar: FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div
      className={styles['header--progress']}
      style={{ gridTemplateColumns: `repeat(${steps}, 1fr)` }}
    >
      {Array.from({ length: steps }).map((_, index) => (
        <div
          className={`${styles['header--progress--step']} 
             ${
               index + 1 <= currentStep
                 ? styles['header--progress--step__filled']
                 : ''
             }`}
          key={index}
        ></div>
      ))}
    </div>
  );
};

export interface HeaderCTAProps {
  Icon?: FC;
  text: string;
  disabled?: boolean;
  callback?: () => void;
}
const HeaderCTA: FC<HeaderCTAProps> = ({ Icon, text, disabled, callback }) => {
  return (
    <button
      onClick={callback}
      disabled={disabled}
      className={`${styles['header--button']}`}
    >
      {text}
      {Icon && <Icon />}
    </button>
  );
};

interface HeaderProps {
  text: string;
  CTA?: HeaderCTAProps;
  progressBar?: boolean;
  progressProps?: ProgressBarProps;
}
const Header: FC<HeaderProps> = ({ text, CTA, progressBar, progressProps }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles['header--text']}>{text}</h1>

      {CTA && <HeaderCTA {...CTA} />}
      {progressBar && progressProps && <ProgressBar {...progressProps} />}
    </header>
  );
};

export default Header;
export { HeaderCTA };
