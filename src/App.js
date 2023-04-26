import { useState } from "react";
import "./styles.css";
import CompToday from "./CompToday";
import CompWeek from "./CompWeek";
import { SearchOutlined } from "@ant-design/icons";
import weatherApiObject from "./WeatherApi";
import weatherHelper from "./WeatherHelper";

import { GlobalOutlined } from "@ant-design/icons";
import { Layout, Input, Button, Empty } from "antd";

const { Content } = Layout;
const { Search } = Input;

export default function App() {
  const [showResult, setShowResult] = useState(false);
  const [showWeek, setShowWeek] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [warningText, setWarningText] = useState("");

  async function formatWeatherData(searchtext) {
    let dayResult = await weatherApiObject.getWeatherToday(searchtext);

    if (dayResult.cod === "404") {
      setShowResult(false);
      setWeatherData({});
      setWarningText("Ievadītā Pilsēta nēeksistē");
      return;
    }

    let forecastResult = await weatherApiObject.getForecastData(searchtext);
    //console.log(dayResult, forecastResult);

    let weatherDataFromApi = weatherHelper.formatData(
      dayResult,
      forecastResult
    );

    //console.log(forecastResult);

    setShowResult(true);
    setWeatherData(weatherDataFromApi);
  }

  function onSearch(value) {
    if (value.length === 0) return;

    formatWeatherData(value);
  }

  function onWeekBtnClick() {
    setShowWeek(true);
  }

  return (
    <div className="App">
      <div className="app-title">
        <GlobalOutlined className="app-title-icon" />
        <span className="app-title-name">Laika apstākļu aplikācija</span>
      </div>
      <Layout className="main-layout">
        <Content>
          <div className="content-search-row">
            <Search placeholder="Pilsēta" onSearch={onSearch} enterButton />
            <div className="content-search-week">
              <Button onClick={onWeekBtnClick} disabled={!showResult}>
                Nedēļas prognoze
              </Button>
            </div>
          </div>
          {showResult && (
            <>
              <div className="comp-today">
                <CompToday data={weatherData} />
              </div>
              {showWeek && <CompWeek data={weatherData} />}
            </>
          )}
          {warningText.length > 0 && (
            <div className="warning">
              <Empty description={warningText} />
            </div>
          )}
        </Content>
      </Layout>
      <div></div>
    </div>
  );
}
