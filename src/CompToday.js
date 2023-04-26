import "./styles.css";
import { Card } from "antd";
import {
  CloudDownloadOutlined,
  CompassOutlined,
  SwapOutlined,
  CompressOutlined
} from "@ant-design/icons";
import weatherHelper from "./WeatherHelper";

export default function CompToday(props) {
  const { data } = props;

  return (
    <>
      <Card>
        <div className="today-layout-title">
          {data.weekday} {data.time}
        </div>

        <div className="today-layout-content">
          <div className="today-layout-content-p1">
            <div className="today-layout-content-city">
              {data.city} ({data.country}), {data.iconTooltip}
            </div>
            <div className="today-layout-content-p1-image">
              <img
                src={weatherHelper.getIconUrl(data.icon, 4)}
                alt="Nav Bildes"
                title={data.iconTooltip}
              />
              <div className="today-layout-content-p1temp">
                {data.temperature}°C
              </div>
            </div>
          </div>
          <div className="today-layout-content-pr1">
            <div className="today-layout-feels-like">
              Pēc sajūtām - {data.feels_like_temparature}°C
            </div>
            <div className="today-layout-content-pr1-detail">
              <CloudDownloadOutlined className="icon-style" />
              <div className="names-today">Nokrišņi</div>
              <div className="Numbers">{data.humidity} %</div>
              <CompassOutlined className="icon-style" />
              <div className="names-today">Vēja virziens</div>
              <div className="Numbers">{data.windDirection} </div>
              <SwapOutlined className="icon-style" />
              <div className="names-today">Vēja ātrums</div>
              <div className="Numbers">{data.windSpeed} m/s</div>
              <CompressOutlined className="icon-style" />
              <div className="names-today">Atmosfēras spiediens</div>
              <div className="Numbers">{data.pressure} hPa</div>
            </div>
          </div>
        </div>
        <div>
          {data.hours && data.hours.length > 0 && (
            <div className="hours-content">
              {data.hours.map((item, index) => {
                if (index > 5) return false;
                return (
                  <Card key={index} size="small" bordered="false">
                    <div> {item.name} </div>
                    <div className="hours-content-image">
                      {" "}
                      <img
                        src={weatherHelper.getIconUrl(data.icon, 2)}
                        alt="Nav Bildes"
                        title={item.iconTooltip}
                        width="50px"
                        height="50px"
                      />
                      <div>{item.temperature}°C</div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </Card>
      <></>
    </>
  );
}
