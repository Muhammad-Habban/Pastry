import React, { useEffect, useState } from "react";
import axios from "axios";
import SalesOrderTable from "./SalesOrderTable";
import { ClipLoader } from "react-spinners";
function App() {
  const [data, setData] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const bgCol = "purple-bg";
  const norCol = "grey-bg";
  useEffect(() => {
    axios
      .get(
        `https://crystalerp.litbakery.co.uk/api/method/crystalpatisserie.custom.api.get_filtered_sales_orders?number_of_days=${numberOfDays}&page=1&page_size=20`
      )
      .then((response) => {
        setData(response.data.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [numberOfDays]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h1>Pastry</h1>

      {/* Filter buttons */}
      <div>
        <button
          className={numberOfDays == 0 ? bgCol : norCol}
          onClick={() => setNumberOfDays(0)}
        >
          Today
        </button>
        <button
          className={numberOfDays == 1 ? bgCol : norCol}
          onClick={() => setNumberOfDays(1)}
        >
          +1 day
        </button>
        <button
          className={numberOfDays == 2 ? bgCol : norCol}
          onClick={() => setNumberOfDays(2)}
        >
          +2 days
        </button>
        <button
          className={numberOfDays == 3 ? bgCol : norCol}
          onClick={() => setNumberOfDays(3)}
        >
          +3 days
        </button>
        <button
          className={numberOfDays == 4 ? bgCol : norCol}
          onClick={() => setNumberOfDays(4)}
        >
          +4 days
        </button>
        <button
          className={numberOfDays == 5 ? bgCol : norCol}
          onClick={() => setNumberOfDays(5)}
        >
          +5 days
        </button>
        <button
          className={numberOfDays == 6 ? bgCol : norCol}
          onClick={() => setNumberOfDays(6)}
        >
          +6 days
        </button>
        <button
          className={numberOfDays == 7 ? bgCol : norCol}
          onClick={() => setNumberOfDays(7)}
        >
          +7 days
        </button>
        {/* Add more buttons for other days */}
      </div>

      {data ? (
        <SalesOrderTable salesOrders={data.sales_orders} />
      ) : (
        <ClipLoader color="#36d7b7" />
      )}
    </div>
  );
}

export default App;
