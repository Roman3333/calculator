import React, { useState } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
const Calculator = () => {
  const [value1, setValue1] = useState(4300000);
  const [value2, setValue2] = useState(50);
  const [value3, setValue3] = useState(80);

  return (
    <section className="calculator">
      <div className="container">
        <h1 className="calculator__title">Рассчитайте стоимость автомобиля в лизинг</h1>
        <form action="" className="calculator__form">
          {/* <div className="calculator__item">
            <div className="calculator__title">Стоимость автомобиля</div>
            <div className="calculator__field">
              <input type="text" className="calculator__input" />
              <span className="calculator__ruble"></span>
            </div>
          </div> */}
          <div className="calculator__item">
            <div className="calculator__desc">Стоимость автомобиля</div>
            <div className="calculator__wrapper">
              <input type="text" value={value1} onChange={(e) => setValue1(e.target.value)} />

              <Slider value={value1} min={0} max={6000000} onChange={(e) => setValue1(e)} />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Calculator;
