import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useWeather } from "../../routes/getWeatherByName";
import Loader from "../../common/Loader";
import { useQueryClient } from "@tanstack/react-query";
import { useName } from "../../store/weatherName";

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 3,
    },
  },
  xaxis: {
    type: "category",
    categories: [],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const getFilteredHourlyData = (
  todayHours: any[],
  tomorrowHours: any[],
  currentDateTime: Date,
) => {
  const filteredData = [];
  const labels = [];
  const temperatures = [];
  const windSpeeds = [];

  for (let i = -3; i <= 12; i++) {
    const targetTime = new Date(currentDateTime);
    targetTime.setHours(currentDateTime.getHours() + i);
    const targetHour = targetTime.getHours();
    const targetHourString = targetHour.toString().padStart(2, "0") + ":00:00";

    let hourData;
    if (targetTime.getDate() === currentDateTime.getDate()) {
      // Today
      hourData = todayHours.find((hour) => hour.datetime === targetHourString);
    } else {
      // Tomorrow
      hourData = tomorrowHours.find(
        (hour) => hour.datetime === targetHourString,
      );
    }

    if (hourData) {
      filteredData.push(hourData);
      labels.push(hourData.datetime.slice(0, 5));
      temperatures.push(((hourData.temp - 31) / 1.8).toFixed(1));
      windSpeeds.push(hourData.windspeed);
    }
  }

  return { labels, temperatures, windSpeeds };
};

const ChartOne: React.FC = () => {
  //@ts-ignore
  const { name } = useName();
  console.log("name", name);
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["weather", name]);
  console.log("data:", data);
  const currentDateTime = new Date();

  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: "Temperature in °C",
        data: [],
      },
      {
        name: "Wind Speed in km/h",
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (data) {
      //@ts-ignore
      const todayHours = data?.days[0].hours;
      //@ts-ignore
      const tomorrowHours = data?.days[1] ? data?.days[1].hours : [];
      const { labels, temperatures, windSpeeds } = getFilteredHourlyData(
        todayHours,
        tomorrowHours,
        currentDateTime,
      );
      setState({
        series: [
          {
            name: "Temperature in °C",
            data: temperatures,
          },
          {
            name: "Wind Speed in km/h",
            data: windSpeeds,
          },
        ],
      });
      //@ts-ignore
      options.xaxis.categories = labels;
    }
  }, [data]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Temperature</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Wind Speed</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={{
              ...options,
              xaxis: {
                ...options.xaxis,
                categories: state.series[0].data.map(
                  (_, i) => options?.xaxis?.categories[i],
                ),
              },
            }}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
