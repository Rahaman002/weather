import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useWeather } from "../../routes/getWeatherByName";
import { useName } from "../../store/weatherName";
import { useQueryClient } from "@tanstack/react-query";

const ChartTwo: React.FC = () => {
  //@ts-ignore
  const {name}=useName()
  const queryClient=useQueryClient()
  const data=queryClient.getQueryData(["weather",name])
  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: [] },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",
      markers: { radius: 99 },
    },
    fill: { opacity: 1 },
  });

  const [series, setSeries] = useState([
    { name: "Temperature", data: [] },
    { name: "Humidity", data: [] },
  ]);

  useEffect(() => {
    if (data) {
      //@ts-ignore
      const nextSevenDaysData = data?.days?.slice(0, 7);

      const temperatureData = nextSevenDaysData?.map((day: any) => ((Number(day.temp) - 32) / 1.8).toFixed(1));
      const humidityData = nextSevenDaysData?.map((day: any) => day.humidity);

      setSeries([
        { name: "Temperature", data: temperatureData },
        { name: "Humidity", data: humidityData },
      ]);

      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const todayIndex = new Date().getDay();
      const categories = daysOfWeek.slice(todayIndex, todayIndex + 7).concat(daysOfWeek.slice(0, todayIndex)).slice(0, 7);

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: { categories: categories },
      }));
    }
  }, [data]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Temperature and Humidity
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
