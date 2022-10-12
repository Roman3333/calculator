import { useState } from 'react';

import './Input.scss';

const Input = ({
  value,
  getBackgroundSize,
  setValue,
  max,
  min,
  children,
  disabled,
  leasing,
  firstFee,
  setFirstFee,
  fee,
  setHideCalculate,
  onFocus,
  onBlur,
}) => {
  const [timer, setTimer] = useState(null);
  const [timer2, setTimer2] = useState(null);
  const [write, setWrite] = useState(false);

  const handleValue = (e) => {
    let parent = e.target.closest('div');
    parent.classList.add('active');

    setHideCalculate(true);

    if (leasing) {
      setFirstFee(e.target.value);
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        if (fee > 60 || firstFee < 36000000) {
          setValue(60);
          setHideCalculate(false);
        } else if (fee < 10 || firstFee < 100000) {
          setValue(10);
          setHideCalculate(false);
        } else {
          setFirstFee(e.target.value);
          setHideCalculate(false);
        }
        parent.classList.remove('active');
      }, 300);
      setTimer(newTimer);
    } else {
      parent.classList.add('active');
      setValue(e.target.value);
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        const newValue = Math.max(min, Math.min(max, e.target.value));
        setValue(newValue);
        setHideCalculate(false);
        parent.classList.remove('active');
      }, 300);
      setTimer(newTimer);
    }
  };

  const handleValueMouse = (e) => {
    let parent = e.target.closest('div');
    parent.classList.add('active');
    setValue(e.target.value);
    clearTimeout(timer2);
    const newTimer = setTimeout(() => {
      console.log('yes');
      parent.classList.remove('active');
    }, 400);
    setTimer2(newTimer);
  };

  return (
    <div className={'calculator__box'}>
      <span className={'calculator__active'}>Ввод текста</span>
      <input
        className={'calculator__number'}
        type="number"
        value={leasing ? firstFee : String(value)}
        min={min}
        max={max}
        disabled={disabled}
        onChange={handleValue}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <input
        className={'calculator__range'}
        min={min}
        value={value}
        max={max}
        type="range"
        disabled={disabled}
        onChange={handleValueMouse}
        style={getBackgroundSize()}
      />
      {children}
    </div>
  );
};

export default Input;
