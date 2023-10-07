// WORKS PERFECTLY
import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const SalesOrderTable = ({ salesOrders, numDays }) => {
  const [orderData, setOrderData] = useState(salesOrders);
  const [numberOfDays, setNumberOfDays] = useState(numDays);
  console.log(salesOrders);
  const yellowBg = "yellowBg";
  const greenBg = "greenBg";
  const normalClass = "normalClass";

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState("");
  const [orderNumberToUpdate, setOrderNumberToUpdate] = useState("");

  const updateStatus = async (orderNumber) => {
    try {
      const response = await axios.put(
        "https://crystalerp.litbakery.co.uk/api/method/crystalpatisserie.custom.api.update_so",
        {
          order_number: orderNumber,
          status: "Done", // Set the status to 'Done'
        }
      );
      axios
        .get(
          `https://crystalerp.litbakery.co.uk/api/method/crystalpatisserie.custom.api.get_filtered_sales_orders?number_of_days=${numberOfDays}&page=1&page_size=20`
        )
        .then((response) => {
          setOrderData(response.data.data.message.sales_orders);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
      // Handle success, e.g., show a success message
      console.log("Status updated:", response.data);

      // Update local row status when the API call is successful
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error updating status:", error);
    }
  };

  const updateStatusInStock = async (orderNumber) => {
    try {
      const response = await axios.put(
        "https://crystalerp.litbakery.co.uk/api/method/crystalpatisserie.custom.api.update_so",
        {
          order_number: orderNumber,
          status: "In stock", // Set the status to 'inStock'
        }
      );
      axios
        .get(
          `https://crystalerp.litbakery.co.uk/api/method/crystalpatisserie.custom.api.get_filtered_sales_orders?number_of_days=${numberOfDays}&page=1&page_size=20`
        )
        .then((response) => {
          setOrderData(response.data.data.message.sales_orders);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
      // Handle success, e.g., show a success message
      console.log("Status updated:", response.data);

      // Update local row status when the API call is successful
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error updating status:", error);
    }
  };

  const showConfirmationPopup = (action, orderNumber) => {
    setConfirmationAction(action);
    setOrderNumberToUpdate(orderNumber);
    setConfirmationVisible(true);
  };

  const handleConfirmation = async () => {
    if (confirmationAction === "In Stock") {
      await updateStatusInStock(orderNumberToUpdate);
    } else if (confirmationAction === "Done") {
      await updateStatus(orderNumberToUpdate);
    }
    setConfirmationVisible(false);
  };

  const getRowStyle = (record) => {
    console.log("Inside getRowStyle : \n" + JSON.stringify(record));
    return record.custom_order_status === "Pending"
      ? normalClass
      : record.custom_order_status === "In stock"
      ? yellowBg
      : greenBg;
  };

  const columns = [
    {
      title: "Items",
      dataIndex: ["items", 0, "item_name"],
      key: ["items", 0, "item_name"],
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Quantity",
      dataIndex: ["items", 0, "qty"],
      key: ["items", 0, "qty"],
    },
    {
      title: "Precut",
      key: ["items", 0, "custom_precut"],
      dataIndex: ["items", 0, "custom_precut"],
      render: (_, { items }) => {
        const precut = items[0].custom_precut;
        let color = precut.length === 3 ? "volcano" : "green";
        return (
          <Tag color={color} key={precut}>
            {precut.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Portion",
      dataIndex: ["items", 0, "custom_portion_size"],
      key: ["items", 0, "custom_portion_size"],
    },
    {
      title: "Status",
      key: "custom_order_status",
      render: (_, record) => {
        return (
          <Space size="middle">
            <button
              disabled={
                record.custom_order_status === "Done" ||
                record.custom_order_status === "In stock"
              }
              onClick={() => showConfirmationPopup("In Stock", record.name)}
              className={
                record.custom_order_status === "In stock" ||
                record.custom_order_status === "Done"
                  ? "disabledClass"
                  : "specialClass"
              }
            >
              In Stock
            </button>
            <button
              disabled={record.custom_order_status === "Done"}
              onClick={() => showConfirmationPopup("Done", record.name)}
              className={
                record.custom_order_status === "Done"
                  ? "disabledClass"
                  : "specialClass"
              }
            >
              Done
            </button>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={orderData}
        rowClassName={getRowStyle}
      />

      {confirmationVisible && (
        <Popup
          contentStyle={{
            padding: "10px 0 10px 15px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
          }}
          open={true}
          closeOnDocumentClick={false}
        >
          <div>
            <p>
              Are you sure you want to mark this item as {confirmationAction}?
            </p>
            <button className="specialClass" onClick={handleConfirmation}>
              Confirm
            </button>
            <button
              className="specialClass"
              onClick={() => setConfirmationVisible(false)}
            >
              Cancel
            </button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default SalesOrderTable;
