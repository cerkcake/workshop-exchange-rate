import React from "react";
import { BsArrowLeftRight } from "react-icons/bs";
import ReactECharts from "echarts-for-react";
import {
  useFetchExchangeRate,
  useConvertExchangeRate,
  useFetchExchangeStatistic,
  useChartOption,
} from "./hooks";

const Exchange = () => {
  // todo 0 : ย้าย authToken มาไว้บนสุด
  const authToken =
    "Basic bG9kZXN0YXI6WnoxdndXVmFVRXdFZUFkdkpIWjFuMEY0bXRROWY4U1g=";
  // todo 1 : call CustomHook 1
  const { exchangeRates, currencyLists } = useFetchExchangeRate({ authToken });
  // todo 2 : call CustomHook 2
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    amount,
    setAmount,
    amountConvert,
    fromCurrencyRate,
    toCurrencyRate,
  } = useConvertExchangeRate({ exchangeRates });
  // todo 3 : call CustomHook 3
  const { exchangeStatistic, setExchangeRatesStatistic } =
    useFetchExchangeStatistic({ authToken, fromCurrency, toCurrency });
  // todo 4 : call CustomHook 4
  const { chartOption, setChartOption } = useChartOption({
    authToken,
    fromCurrency,
    toCurrency,
  });

  const switchCurrency = () => {
    // USD => THB || THB => USD
    // TEMP => USD || THB = TEMP(USD)

    const temp = fromCurrency; //ต้นทาง
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="">
      <div className="w-1/2 mx-auto bg-gray-100 mt-8 p-6">
        <h1 className="font-bold text-xl text-center">คำนวนอัตราแลกเปลี่ยน</h1>
        <div>
          <div className="flex mt-4 space-x-8">
            <div className="w-1/3">
              <label>จำนวน</label>
              <br />
              <input
                type="number"
                name="amount"
                className="p-2 w-full mt-2"
                placeholder="1"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              ></input>
            </div>
            <div className="w-1/3">
              <label>จาก</label>
              <br />
              <select
                className="p-2 w-full mt-2"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencyLists
                  ?.filter((currency) => currency !== toCurrency)
                  ?.map((currency) => (
                    <option value={currency} key={currency}>
                      {currency}
                    </option>
                  ))}
              </select>
            </div>
            <button className="text-lg mt-8" onClick={switchCurrency}>
              <BsArrowLeftRight />
            </button>
            <div className="w-1/3">
              <label>ไป</label>
              <br />
              <select
                className="p-2 w-full mt-2"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencyLists
                  ?.filter((currency) => currency !== fromCurrency)
                  ?.map((currency) => (
                    <option value={currency} key={currency}>
                      {currency}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="mt-8">
            <div>
              {amount} {fromCurrency} =
            </div>
            <div className="font-bold text-xl">
              {amountConvert.toFixed(4)} {toCurrency}
            </div>
            <div>
              1 {toCurrency} ={" "}
              {((1 / fromCurrencyRate) * toCurrencyRate).toFixed(4)}{" "}
              {fromCurrency}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 mx-auto  mt-8">
        <h2 className="text-lg font-bold">อัตราแลกเปลี่ยนย้อนหลัง</h2>
        <div className="flex mt-4">
          <div className="w-1/2">
            <div>1 วัน</div>
            <div className="font-bold text-xl">
              1 {fromCurrency} ={" "}
              {exchangeStatistic?.last1Days.average.toFixed(4)} {toCurrency}
            </div>
            <div>
              1 {toCurrency} ={" "}
              {(1 / exchangeStatistic?.last1Days.average).toFixed(4)}{" "}
              {fromCurrency}{" "}
            </div>
          </div>
          <div className="w-1/2">
            <div>7 วัน</div>
            <div className="font-bold text-xl">
              1 {fromCurrency} ={" "}
              {exchangeStatistic?.last7Days.average.toFixed(4)} {toCurrency}
            </div>
            <div>
              1 {toCurrency} =
              {(1 / exchangeStatistic?.last7Days.average).toFixed(4)}{" "}
              {fromCurrency}{" "}
            </div>
          </div>
        </div>
        <div className="flex mt-4">
          <div className="w-1/2">
            <div>30 วัน</div>
            <div className="font-bold text-xl">
              1 {fromCurrency} ={" "}
              {exchangeStatistic?.last30Days.average.toFixed(4)} {toCurrency}
            </div>
            <div>
              1 {toCurrency} ={" "}
              {(1 / exchangeStatistic?.last30Days.average).toFixed(4)}{" "}
              {fromCurrency}{" "}
            </div>
          </div>
          <div className="w-1/2">
            <div>60 วัน</div>
            <div className="font-bold text-xl">
              1 {fromCurrency} ={" "}
              {exchangeStatistic?.last60Days.average.toFixed(4)} {toCurrency}
            </div>
            <div>
              1 {toCurrency} =
              {(1 / exchangeStatistic?.last60Days.average).toFixed(4)}{" "}
              {fromCurrency}{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ReactECharts option={chartOption} />
      </div>
    </div>
  );
};

export default Exchange;
