import "./styles.css";
import { Card } from "antd";
import weatherHelper from "./WeatherHelper";

export default function CompWeek(props) {
  const { data } = props;

  console.log(data);

  return (
    <>
      {data.days && data.days.length > 0 && (
        <Card>
          <div className="week-layout-content">
            {data.days.map((item, index) => {
              return (
                <Card
                  key={index}
                  bordered={true}
                  size="small"
                  title={
                    <>
                      <div>{item.name}</div>
                      <div>{item.date}</div>
                    </>
                  }
                >
                  <div>Diena</div>
                  <div className="week-layout-content-image">
                    {" "}
                    <img
                      src={weatherHelper.getIconUrl(data.icon, 2)}
                      alt="Nav Bildes"
                      title={item.iconTooltip}
                      width="50px"
                      height="50px"
                    />
                    <div>{item.max_temp}°C</div>
                  </div>{" "}
                  <div>Nakts</div>
                  <div className="week-layout-content-image">
                    {" "}
                    <img
                      src={weatherHelper.getIconUrl(data.icon, 2)}
                      alt="Nav Bildes"
                      title={item.iconTooltip}
                      width="50px"
                      height="50px"
                    />
                    <div>{item.min_temp}°C</div>
                  </div>{" "}
                </Card>
              );
            })}
          </div>
        </Card>
      )}
    </>
  );
}
