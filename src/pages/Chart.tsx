import React from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import ChartOne from "../components/Charts/ChartOne";
import ChartTwo from "../components/Charts/ChartTwo";
import DefaultLayout from "../layout/DefaultLayout";

const Chart: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
    </DefaultLayout>
  );
};

export default Chart;
