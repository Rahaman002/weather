import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/css/jsvectormap.css";
import { useEffect } from "react";
import "../../js/in_mill";

const MapOne = () => {
  useEffect(() => {
    const mapOne = new jsVectorMap({
      selector: "#mapOne",
      map: "in_mill",
      zoomButtons: true,

      regionStyle: {
        initial: {
          fill: "#C8D0D8",
        },
        hover: {
          fillOpacity: 1,
          fill: "#3056D3",
        },
      },
      regionLabelStyle: {
        initial: {
          fontFamily: "Satoshi",
          fontWeight: "semibold",
          fill: "#fff",
        },
        hover: {
          cursor: "pointer",
        },
      },
      onRegionClick: function (event: any, code: any) {
        var name = code;
        console.log("code", code);
      },

      labels: {
        regions: {
          render(code: any) {
            return code.split("-")[1];
          },
        },
      },
    });
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Region labels
      </h4>
      <div id="mapOne" className="mapOne h-96"></div>
    </div>
  );
};

export default MapOne;
