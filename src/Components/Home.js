import React, { useEffect, useState } from "react";
import useResize from "./hooks/useResize";
import "./styles/home.css";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import CircleIcon from "@mui/icons-material/Circle";
import { LineChart } from "@mui/x-charts/LineChart";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [fontColor, setFontColor] = useState("");
  const [img, setImg] = useState("");
  const dim = useResize();
  const [forecastData, setForcastData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const [month, setMonth] = useState([
    "January",
    "February",
    "March",
    "April",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]);
  const [weatherDesc, setWeatherDesc] = useState("");
  const [weatherHeader, setWeatherHeader] = useState("");
  let graphData = [];
  let graphX = [];
  const [graphFlag, setGraphFlag] = useState(false);
  const [mobileFlag, setMobileFlag] = useState(false);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [ind, setInd] = useState(3);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState("");
  const [city, setCity] = useState("Chennai");

  function bgImg() {
    weatherData?.current?.condition?.text?.split(" ")?.map((val, ind) => {
      let localVal = val.toLowerCase();
      if (localVal === "sunny" || localVal === "clear") {
        dim.w <= 600 ? setImg("sunny-mobile") : setImg("sunny");
        setFontColor("black");
        setWeatherHeader(`Sunny Skies Ahead!`);
        setWeatherDesc(
          `It's a beautiful day to be outside! Expect clear skies with sunshine. High temperatures will reach around ${forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c} degrees Celsius. Light winds will keep things comfortable. Enjoy the sunshine!`
        );
      } else if (localVal === "cloudy" || localVal === "overcast") {
        dim.w <= 600 ? setImg("cloudy-mobile") : setImg("cloudy");
        setFontColor("black");
        setWeatherHeader(`Clouds Roll In`);
        setWeatherDesc(
          `Mostly cloudy skies are expected. While there won't be much sunshine, it should stay dry. Highs will be around ${forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c} degrees Celsius.`
        );
      } else if (localVal === "mist") {
        dim.w <= 600 ? setImg("mist-mobile") : setImg("mist");
        setFontColor("white");
        setWeatherHeader(`Socked in by Mist`);
        setWeatherDesc(
          `A blanket of mist will shroud the area, limiting visibility (even the website text isn't safe from its playful tricks!).  Be sure to use caution if driving and allow extra following distance. Temperatures will be on the cool side, with highs around ${forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c} degrees Celsius.`
        );
      } else if (localVal === "rain") {
        dim.w <= 600 ? setImg("rain-mobile") : setImg("rain");
        setFontColor("white");
        setWeatherHeader(`Rain on the Way`);
        setWeatherDesc(
          `Get ready to grab your umbrella! Rain is expected, with showers possible. Highs will only reach around ${forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c} degrees Celsius.`
        );
      } else if (localVal === "snow") {
        dim.w <= 600 ? setImg("snow-mobile") : setImg("snow");
        setFontColor("black");
        setWeatherHeader(`Winter Wonderland`);
        setWeatherDesc(
          `Snow is in the forecast! Expect ${forecastData?.forecast?.forecastday[0]?.day?.totalsnow_cm} of accumulation, throughout the day. Temperatures will stay cold, with highs only reaching around ${forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c} degrees Celsius. Bundle up in warm clothes, wear proper footwear for slippery conditions, and be sure to check road conditions before heading out.`
        );
      } else if (localVal === "sleet") {
        dim.w <= 600 ? setImg("sleet-mobile") : setImg("sleet");
        setFontColor("black");
        setWeatherHeader(`Sleet Makes Streets Slick`);
        setWeatherDesc(
          `Prepare for a wintry mix! Sleet is expected, with icy pellets bouncing off surfaces. This can make roads and sidewalks hazardous, so take caution when walking or driving.  Highs will only reach around ${forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c} degrees Celsius. Bundle up in warm clothes and wear boots with good tread for extra traction. Be sure to check the latest forecast for any updates on accumulation.`
        );
      } else if (localVal === "thundery") {
        dim.w <= 600 ? setImg("thunder-mobile") : setImg("thunder");
        setFontColor("white");
        setWeatherHeader(`Look Out for Lightning!`);
        setWeatherDesc(
          `Expect thundery weather with a chance of ${forecastData?.forecast?.forecastday[0]?.day?.daily_chance_of_rain}. Be aware of the risk of lightning strikes. If you hear thunder, head indoors immediately. Highs will only reach around ${forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c} degrees Celsius.  Strong winds may also be possible, so be sure to secure any loose outdoor items. Stay weather aware and check for updates on the timing and intensity of the storms.`
        );
      } else if (localVal === "blizzard") {
        dim.w <= 600 ? setImg("blizzard-mobile") : setImg("blizzard");
        setFontColor("black");
        setWeatherHeader(`Blizzard Warning! Stay Indoors!`);
        setWeatherDesc(
          `A dangerous blizzard is upon us! Expect heavy snowfall with blowing snow significantly reducing visibility to near zero.  Winds will be strong, reaching ${forecastData?.forecast?.forecastday[0]?.day?.maxwind_kph} km/h, creating whiteout conditions and making travel extremely hazardous, if not impossible. Highs will only be around ${forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c} degrees Celsius, but wind chills will make it feel much colder.`
        );
      } else if (localVal === "fog") {
        dim.w <= 600 ? setImg("fog-mobile") : setImg("fog");
        setFontColor("white");
        setWeatherHeader(`Foggy Forecast: See You When It Clears!`);
        setWeatherDesc(
          `Be prepared for limited visibility!Fog will blanket the area, making travel tricky.  Drive slowly and use headlights with low beams for better penetration.  Temperatures will be on the cool side, with highs around ${forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c} degrees Celsius.  The fog may linger throughout the day, so dress in layers for changing conditions.`
        );
      } else if (localVal === "drizzle") {
        dim.w <= 600 ? setImg("drizzle-mobile") : setImg("drizzle");
        setFontColor("white");
        setWeatherHeader(`Light Drizzle on the Menu`);
        setWeatherDesc(
          `A light drizzle is expected. While it won't be a heavy downpour, you might want to carry an umbrella or wear a light rain jacket just in case.  Highs will only reach around ${forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c} degrees Celsius.  Roads may be slightly slick, so be cautious when walking or driving.`
        );
      } else if (localVal === "heavy" && weatherData[ind + 1] === "rain") {
        dim.w <= 600 ? setImg("heavy-rain-mobile") : setImg("heavy-rain");
        setFontColor("white");
        setWeatherHeader(`Heavy Rain Incoming!`);
        setWeatherDesc(
          `Get ready to break out the rain gear! Heavy rain is expected today, with continuous rain possible. Localized flooding could be a risk in low-lying areas.  Highs will only reach around ${forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c} degrees Celsius.  Be sure to check the latest warnings issued by your local authorities.`
        );
      }
    });
  }

  useEffect(() => {
    const position = { lat: null, long: null };
    let isMobile = false;
    let geolocationSupported = false;

    if ("platform" in navigator) {
      if (
        navigator.platform === "Android" ||
        navigator.platform === "iPhone" ||
        navigator.platform === "iPad"
      ) {
        isMobile = true;
        setMobileFlag(true);
      }
    }

    function location() {
      if (isMobile) {
        if ("geolocation" in navigator) {
          geolocationSupported = true;
          navigator.geolocation.getCurrentPosition((pos) => {
            position.lat = pos.coords.latitude;
            position.long = pos.coords.longitude;
          });
        }
      }
    }
    async function fetchData() {
      if (geolocationSupported && isMobile) {
        try {
          const res = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=081ab152c18c423b98153018240107&q=${position.lat},${position.long}`
          );
          const data = await res.json();
          setWeatherData((prev) => {
            return data;
          });
          const forecastRes = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=081ab152c18c423b98153018240107&q=${position.lat},${position.long}&alerts=yes&aqi=yes`
          );
          const forecastData = await forecastRes.json();
          setForcastData((prev) => {
            return forecastData;
          });
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          const res = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=081ab152c18c423b98153018240107&q=${city}`
          );
          const data = await res.json();
          setWeatherData((prev) => {
            return data;
          });
          const forecastRes = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=081ab152c18c423b98153018240107&q=${city}&alerts=yes&aqi=yes`
          );
          const forecastData = await forecastRes.json();
          setForcastData((prev) => {
            return forecastData;
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
    location();
    fetchData();
  }, [city]);

  useEffect(() => {
    bgImg();
    if (dim.w <= 850) {
      setMobileFlag(true);
    } else {
      setMobileFlag(false);
    }
  }, [dim.w, weatherData, forecastData, city]);

  graphData = forecastData?.forecast?.forecastday[0]?.hour?.map((val) => {
    return val.temp_c;
  });
  graphX = forecastData?.forecast?.forecastday[0].hour.map((val, ind) => {
    if (ind !== 24) {
      return val.time.split(" ")[1].split(":")[0];
    }
  });

  useEffect(() => {
    function getGraphData() {
      forecastData &&
        setTimeout(() => {
          setGraphFlag(true);
        }, 1000);
    }
    function getHourlyWeatherData() {
      forecastData &&
        setTimeout(() => {
          setHourlyWeather((prev) => {
            return [
              forecastData?.forecast?.forecastday[0]?.hour?.map((val) => {
                return {
                  time: val?.time?.split(" ")[1],
                  temperature: val?.temp_c,
                  willRain: val?.will_it_rain,
                  rainProbability: val?.chance_of_rain,
                  depthOfRain: val?.precip_mm,
                  humidity: val?.humidity,
                  condition: val?.condition?.text,
                  conditionIcon: val?.condition?.icon,
                };
              }),
            ];
          });
        }, 1000);
    }
    getGraphData();
    getHourlyWeatherData();
  }, [forecastData]);

  // Search Data

  useEffect(() => {
    async function search() {
      try {
        const res = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=081ab152c18c423b98153018240107&q=${searchValue}`
        );
        const data = await res.json();
        setSearchData((prev) => {
          return data?.location;
        });
      } catch (e) {
        console.error(e);
      }
    }
    search();
  }, [searchValue]);

  function handleClickPrev() {
    ind === 3
      ? setInd(3)
      : setInd((prev) => {
          return prev - 3;
        });
  }

  function handleClickNext() {
    ind === 24
      ? setInd(24)
      : setInd((prev) => {
          return prev + 3;
        });
  }

  function handleChange(e) {
    setSearchValue((prev) => {
      return e.target.value;
    });
  }

  function handleSearchDataClick() {
    setCity(searchData?.region);
  }

  return (
    <div className={`home ${img} ${fontColor}`}>
      <div className="home__sidebar">
        <div className="home__sidebar__search">
          <div className="home__sidebar__thermometer animate">
            <DeviceThermostatIcon />
          </div>
          <div className="home__sidebar__search_bar animate">
            <input
              type="text"
              className={fontColor}
              value={searchValue}
              onChange={handleChange}
              placeholder="City, State"
            />
          </div>
          {searchValue && <div className="home__sidebar__search_icon"></div>}
        </div>
        {searchValue && (
          <div
            className="home__sidebar__search_results animate"
            style={{ color: `${fontColor}` }}
            onClick={handleSearchDataClick}
          >
            <p>{searchData?.region}</p>
            <p>{searchData?.country}</p>
          </div>
        )}
        <div className="home__sidebar__info">
          <div className="home__sidebar__info__temperature animate">
            <h1>{weatherData?.current?.temp_c}</h1>
            <div className="home__sidebar__info__temperature__degree animate">
              <CircleIcon />
            </div>
            <h1>C</h1>
          </div>
          <div className="home__sidebar__info__wind">
            <div className="home__sidebar__info__wind__humidity animate">
              <p>Humidity: {weatherData?.current?.humidity}%</p>
            </div>
            <div className="home__sidebar__info__wind__speed animate">
              <p>
                Wind: {weatherData?.current?.wind_dir}{" "}
                {weatherData?.current?.wind_kph} kph
              </p>
            </div>
          </div>
        </div>
        <div className="home__sidebar__sun animate">
          <p>
            Sunrise: {forecastData?.forecast?.forecastday[0]?.astro?.sunrise}
          </p>
          <p>Sunset: {forecastData?.forecast?.forecastday[0]?.astro?.sunset}</p>
        </div>
        {graphFlag && !mobileFlag && (
          <div className={`home__sidebar__graph ${fontColor} animate`}>
            <div className="home__sidebar__graph__legend_y">
              <p>Temp (in C)</p>
            </div>
            <LineChart
              xAxis={[
                {
                  data: graphX,
                },
              ]}
              series={[
                {
                  data: graphData,
                  showMark: false,
                },
              ]}
              width={320}
              height={220}
            />
            <div className="home__sidebar__graph__legend_x">
              <p>Railway Time</p>
            </div>
          </div>
        )}
        <div className="home__sidebar__moon animate">
          <p>
            Moon Rise: {forecastData?.forecast?.forecastday[0]?.astro?.moonrise}
          </p>
          <p>
            Moon Set: {forecastData?.forecast?.forecastday[0]?.astro?.moonset}
          </p>
        </div>
        <div className="home__sidebar__timezone animate">
          <p>Your Timezone: {weatherData?.location?.tz_id}</p>
        </div>
        <div className="home__sidebar__lat_and_lon animate">
          <p>Latitude: {weatherData?.location?.lat}</p>
          <p>Longitude: {weatherData?.location?.lon}</p>
        </div>
      </div>
      <div className="home__main">
        <div className="home__main__location_details">
          <div className="home__main__location_details__date">
            <p>
              Date: {weatherData?.current?.last_updated.split(" ")[0]},{" "}
              {day[date.getDay()]}, {month[date.getMonth()]}
            </p>
            <p>{forecastData?.location?.name}</p>
            <p>{forecastData?.location?.region}</p>
          </div>

          <div className="home__main__location_details__rain">
            <p>
              Chances of Rain Today:{" "}
              {
                forecastData?.forecast?.forecastday[0]?.day
                  ?.daily_chance_of_rain
              }{" "}
              %
            </p>
            <p>
              Intensity / Depth Of Rain:{" "}
              {forecastData?.forecast?.forecastday[0]?.day?.totalprecip_mm} mm
            </p>
          </div>
          {forecastData?.forecast?.forecastday[0]?.day?.daily_will_it_snow ===
            1 && (
            <div className="home__main__location_details__rain">
              <p>
                Chances of Snow Today:{" "}
                {
                  forecastData?.forecast?.forecastday[0]?.day
                    ?.daily_chance_of_snow
                }{" "}
                %
              </p>
              <p>
                Intensity / Depth Of Snow:{" "}
                {forecastData?.forecast?.forecastday[0]?.day?.totalsnow_cm} cm
              </p>
            </div>
          )}
        </div>
        <div className="home__main__weather_details">
          <p>Weather Forecast</p>
          <h1>{weatherData?.current?.condition?.text}</h1>
          <h4>{weatherHeader}</h4>
          <div className="home__main__weather_details__avgtemp">
            <h3>Average Temperature for today: </h3>
            <h3> {forecastData?.forecast?.forecastday[0]?.day?.avgtemp_c}</h3>
            <div className="home__main__weather_details__avgtemp__degree animate">
              <CircleIcon />
            </div>
            <h3>C</h3>
          </div>
          <div className="home__main__weather_details__weather_desc">
            <p>{weatherDesc}</p>
          </div>
          {hourlyWeather && (
            <div className="home__main__hourly_forecast">
              {ind !== 3 && (
                <div
                  className="home__main__hourly_forecast__prev animate"
                  onClick={handleClickPrev}
                >
                  <ArrowBackIosNewIcon />
                </div>
              )}
              {hourlyWeather[0]?.map((val, currInd) => {
                if (currInd >= ind - 3 && currInd <= ind) {
                  return (
                    <div className="home__main__hourly_forecast__hour animate">
                      <p>{val.time}</p>
                      <div className="home__main__hourly_forecast__hour__temp">
                        <h4>{val.temperature}</h4>
                        <div className="temp">
                          <CircleIcon />
                        </div>
                        <h4>C</h4>
                      </div>

                      <div className="home__main__hourly_forecast__hour__rain">
                        <p>
                          <span className="property">Chance of rain: </span>{" "}
                          {dim.w === 950 && <br />}
                          {val?.rainProbability}%
                        </p>
                        <p>
                          <span className="property">Depth of rain: </span>{" "}
                          {dim.w === 950 && <br />}
                          {val?.depthOfRain}mm
                        </p>
                      </div>

                      <div className="home__main__hourly_forecast__hour__humidity">
                        <p>Humidity: {val?.humidity}%</p>
                      </div>
                    </div>
                  );
                }
              })}
              {ind !== 24 && (
                <div
                  className="home__main__hourly_forecast__next animate"
                  onClick={handleClickNext}
                >
                  <ArrowForwardIosIcon />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
