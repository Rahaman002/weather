import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/css/jsvectormap.css";
import { useEffect } from "react";
import "../../js/in_mill";
import { useName } from "../../store/weatherName";

const MapOne = () => {
  //@ts-ignore
  const { updateName } = useName();
  const regionNames = {
    "IN-AN": "Andaman and Nicobar Islands",
    "IN-AP": "Andhra Pradesh",
    "IN-AR": "Arunachal Pradesh",
    "IN-AS": "Assam",
    "IN-BR": "Bihar",
    "IN-CH": "Chandigarh",
    "IN-CT": "Chhattisgarh",
    "IN-DN": "Dadra and Nagar Haveli and Daman and Diu",
    "IN-DL": "Delhi",
    "IN-GA": "Goa",
    "IN-GJ": "Gujarat",
    "IN-HR": "Haryana",
    "IN-HP": "Himachal Pradesh",
    "IN-JK": "Jammu and Kashmir",
    "IN-JH": "Jharkhand",
    "IN-KA": "Karnataka",
    "IN-KL": "Kerala",
    "IN-LD": "Lakshadweep",
    "IN-MP": "Madhya Pradesh",
    "IN-MH": "Maharashtra",
    "IN-MN": "Manipur",
    "IN-ML": "Meghalaya",
    "IN-MZ": "Mizoram",
    "IN-NL": "Nagaland",
    "IN-OR": "Odisha",
    "IN-PY": "Puducherry",
    "IN-PB": "Punjab",
    "IN-RJ": "Rajasthan",
    "IN-SK": "Sikkim",
    "IN-TN": "Tamil Nadu",
    "IN-TG": "Telangana",
    "IN-TR": "Tripura",
    "IN-UP": "Uttar Pradesh",
    "IN-UT": "Uttarakhand",
    "IN-WB": "West Bengal",
  };

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
      onRegionClick: function (event: any, code: string) {
        //@ts-ignore
        var name = regionNames?.[code] || code;
        updateName(name);
        console.log("Region Name:", name);
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
