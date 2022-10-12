import { useEffect, useState } from 'react';

import Input from '../components/ui/Input/Input';
import Button from '../components/ui/Button/Button';

import '../scss/home.scss';

function Home({ isRequstSended, setRequstSended, isRequstSuccess, setRequstSuccess }) {
  const [price, setPrice] = useState(3300000);
  const [fee, setFee] = useState(10);
  const [leasing, setLeasing] = useState(60);
  const [monthPay, setMonthPay] = useState(0);
  const [leasingPrice, setLeasingPrice] = useState(0);
  const [firstFee, setFirstFee] = useState(330000);
  const [hideCalculate, setHideCalculate] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setFee(Math.round(firstFee / (price / 100)));
  }, [firstFee]);

  useEffect(() => {
    setFirstFee(Math.round((price / 100) * fee));
  }, [price, fee]);

  useEffect(() => {
    const count = firstFee + leasing * monthPay;
    setLeasingPrice(count);
  }, [firstFee, leasing, monthPay]);

  useEffect(() => {
    const count =
      (price - firstFee) *
      ((0.035 * Math.pow(1 + 0.035, leasing)) / (Math.pow(1 + 0.035, leasing) - 1));
    setMonthPay(Math.round(count));
  }, [price, leasing, firstFee]);

  const sendRequest = async () => {
    try {
      setRequstSended(true);
      const data = {
        car_cost: price,
        initial_payment: firstFee,
        initial_payment_percent: fee,
        lease_term: leasing,
        total_sum: leasingPrice,
        monthly_payment_from: monthPay,
      };
      let res = await fetch('https://hookb.in/03yozzqwapt3Mkp3KWl0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;',
        },
        body: JSON.stringify(data),
      });
      let result = await res.json();
      setRequstSended(false);
      alert(JSON.stringify(result));
    } catch (error) {
      console.log(`ошибка ${error}`);
    }
  };

  const getBackgroundSizePrice = () => {
    return {
      backgroundSize: `${((price - 1000000) * 100) / 5000000}% 100%`,
    };
  };

  const getBackgroundSizeFee = () => {
    return {
      backgroundSize: `${((fee - 10) * 100) / 50}% 100%`,
    };
  };

  const getBackgroundSizeLeasing = () => {
    return {
      backgroundSize: `${((leasing - 1) * 100) / 59}% 100%`,
    };
  };
  return (
    <>
      <h1 className="calculator__title">Рассчитайте стоимость автомобиля в лизинг</h1>
      <div className={'calculator__values'}>
        <div className={'calculator__value'}>
          <p className={'calculator__p'}>Стоимость автомобиля</p>
          <Input
            value={price}
            getBackgroundSize={getBackgroundSizePrice}
            setValue={setPrice}
            max={6000000}
            min={1000000}
            disabled={isRequstSended}
            setHideCalculate={setHideCalculate}>
            <p className={`calculator__inputInside ${isRequstSended ? 'disabled' : ''}`}>₽</p>
          </Input>
        </div>
        <div className={'calculator__value'}>
          <p className={'calculator__p'}>Первоначальный взнос</p>
          <Input
            value={fee}
            getBackgroundSize={getBackgroundSizeFee}
            setValue={setFee}
            max={60}
            min={10}
            price={price}
            disabled={isRequstSended}
            leasing
            firstFee={firstFee}
            setFirstFee={setFirstFee}
            fee={fee}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            setHideCalculate={setHideCalculate}>
            <p
              className={`calculator__rouble ${isRequstSended ? 'disabled' : ''} ${
                focused ? 'hidden' : ''
              }`}>
              ₽
            </p>
            <input
              className={'calculator__inputInside-input'}
              type="text"
              readOnly
              disabled={isRequstSended}
              value={`${fee}%`}
            />
          </Input>
        </div>
        <div className={'calculator__value'}>
          <p className={'calculator__p'}>Срок лизинга</p>
          <Input
            value={leasing}
            getBackgroundSize={getBackgroundSizeLeasing}
            setValue={setLeasing}
            max={60}
            min={1}
            disabled={isRequstSended}
            setHideCalculate={setHideCalculate}>
            <p className={`calculator__inputInside ${isRequstSended ? 'disabled' : ''}`}>мес.</p>
          </Input>
        </div>
      </div>
      <div className={'calculator__counted'}>
        <div className={'calculator__leasingPrice'}>
          <p className={'calculator__leasingPrice-p'}>Сумма договора лизинга</p>
          {!hideCalculate && (
            <p className={'calculator__leasing-price'}>
              {String(leasingPrice)
                .split('')
                .reverse()
                .join('')
                .replace(/\d\d\d/g, '$& ')
                .split('')
                .reverse()
                .join('')}{' '}
              ₽
            </p>
          )}
          {hideCalculate && <p className={'loadingSpinner'}></p>}
        </div>
        <div className={'calculator__month'}>
          <p className={'calculator__month-p'}>Ежемесячный платеж от</p>
          {!hideCalculate && (
            <p className={'calculator__month-price'}>
              {String(monthPay)
                .split('')
                .reverse()
                .join('')
                .replace(/\d\d\d/g, '$& ')
                .split('')
                .reverse()
                .join('')}{' '}
              ₽
            </p>
          )}
          {hideCalculate && <p className={'loadingSpinner'}></p>}
        </div>
        <Button
          sendRequest={sendRequest}
          isRequstSuccess={isRequstSuccess}
          isRequstSended={isRequstSended}
        />
      </div>
    </>
  );
}

export default Home;
