// import React from "react";
// import { Space, Table, Tag } from "antd";
// import axios from "axios";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

// const SalesOrderTable = ({ salesOrders }) => {
//   const yellowBg = "yellowBg";
//   const greenBg = "greenBg";
//   const normalClass = "normalClass";
//   const updateStatus = async (orderNumber) => {
//     try {
//       const response = await axios.put(
//         "https://crystalerp.litbakery.co.uk/api/method/crystalpatisserie.custom.api.update_so",
//         {
//           order_number: orderNumber,
//           status: "Done", // Set the status to 'Done'
//         }
//       );
//       // Handle success, e.g., show a success message
//       console.log("Status updated:", response.data);
//     } catch (error) {
//       // Handle error, e.g., show an error message
//       console.error("Error updating status:", error);
//     }
//   };
//   const updateStatusInStock = async (orderNumber) => {
//     try {
//       const response = await axios.put(
//         "https://crystalerp.litbakery.co.uk/api/method/crystalpatisserie.custom.api.update_so",
//         {
//           order_number: orderNumber,
//           status: "In stock", // Set the status to 'inStock'
//         }
//       );
//       // Handle success, e.g., show a success message
//       console.log("Status updated:", response.data);
//     } catch (error) {
//       // Handle error, e.g., show an error message
//       console.error("Error updating status:", error);
//     }
//   };
//   const getRowStyle = (record) => {
//     console.log("Inside getRowStyle : \n" + JSON.stringify(record));
//     return record.custom_order_status === "Pending"
//       ? normalClass
//       : record.custom_order_status === "In stock"
//       ? yellowBg
//       : greenBg;
//   };
//   const columns = [
//     {
//       title: "Items",
//       dataIndex: ["items", 0, "item_name"],
//       key: ["items", 0, "item_name"],
//     },
//     {
//       title: "Customer",
//       dataIndex: "customer",
//       key: "customer",
//     },
//     {
//       title: "Quantity",
//       dataIndex: ["items", 0, "qty"],
//       key: ["items", 0, "qty"],
//     },
//     {
//       title: "Precut",
//       key: ["items", 0, "custom_precut"],
//       dataIndex: ["items", 0, "custom_precut"],
//       render: (_, { items }) => {
//         const precut = items[0].custom_precut;
//         let color = precut.length === 3 ? "volcano" : "green";
//         return (
//           <Tag color={color} key={precut}>
//             {precut.toUpperCase()}
//           </Tag>
//         );
//       },
//     },
//     {
//       title: "Portion",
//       dataIndex: ["items", 0, "custom_portion_size"],
//       key: ["items", 0, "custom_portion_size"],
//     },
//     {
//       title: "Status",
//       key: "custom_order_status",
//       render: (_, record) => {
//         return (
//           <Space size="middle">
//             <button
//               disabled={
//                 record.custom_order_status === "Done" ||
//                 record.custom_order_status === "In stock"
//                   ? true
//                   : false
//               }
//               onClick={() => updateStatusInStock(record.name)}
//               className={
//                 record.custom_order_status === "In stock" ||
//                 record.custom_order_status === "Done"
//                   ? "disabledClass"
//                   : "specialClass"
//               }
//             >
//               In Stock
//             </button>
//             <button
//               disabled={record.custom_order_status === "Done" ? true : false}
//               onClick={() => updateStatus(record.name)}
//               className={
//                 record.custom_order_status === "Done"
//                   ? "disabledClass"
//                   : "specialClass"
//               }
//             >
//               Done
//             </button>
//           </Space>
//         );
//       },
//     },
//   ];
//   console.log(salesOrders);
//   return (
//     <Table
//       columns={columns}
//       dataSource={salesOrders}
//       rowClassName={getRowStyle}
//     />
//   );
// };
// export default SalesOrderTable;

// COLORS WONT CHANGE AFTER UPDATE

// import React, { useState } from "react";
// import { Space, Table, Tag } from "antd";
// import axios from "axios";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

// const SalesOrderTable = ({ salesOrders }) => {
//   const yellowBg = "yellowBg";
//   const greenBg = "greenBg";
//   const normalClass = "normalClass";

//   const [confirmationVisible, setConfirmationVisible] = useState(false);
//   const [confirmationAction, setConfirmationAction] = useState("");
//   const [orderNumberToUpdate, setOrderNumberToUpdate] = useState("");

//   const updateStatus = async (orderNumber) => {
//     try {
//       const response = await axios.put(
//         "https://crystalerp.litbakery.co.uk/api/method/crystalpatisserie.custom.api.update_so",
//         {
//           order_number: orderNumber,
//           status: "Done", // Set the status to 'Done'
//         }
//       );
//       // Handle success, e.g., show a success message
//       console.log("Status updated:", response.data);
//     } catch (error) {
//       // Handle error, e.g., show an error message
//       console.error("Error updating status:", error);
//     }
//   };

//   const updateStatusInStock = async (orderNumber) => {
//     try {
//       const response = await axios.put(
//         "https://crystalerp.litbakery.co.uk/api/method/crystalpatisserie.custom.api.update_so",
//         {
//           order_number: orderNumber,
//           status: "In stock", // Set the status to 'inStock'
//         }
//       );
//       // Handle success, e.g., show a success message
//       console.log("Status updated:", response.data);
//     } catch (error) {
//       // Handle error, e.g., show an error message
//       console.error("Error updating status:", error);
//     }
//   };

//   const showConfirmationPopup = (action, orderNumber) => {
//     setConfirmationAction(action);
//     setOrderNumberToUpdate(orderNumber);
//     setConfirmationVisible(true);
//   };

//   const handleConfirmation = async () => {
//     if (confirmationAction === "In Stock") {
//       await updateStatusInStock(orderNumberToUpdate);
//     } else if (confirmationAction === "Done") {
//       await updateStatus(orderNumberToUpdate);
//     }
//     setConfirmationVisible(false);
//   };

//   const getRowStyle = (record) => {
//     return record.custom_order_status === "Pending"
//       ? normalClass
//       : record.custom_order_status === "In stock"
//       ? yellowBg
//       : greenBg;
//   };

//   const columns = [
// {
//   title: "Items",
//   dataIndex: ["items", 0, "item_name"],
//   key: ["items", 0, "item_name"],
// },
// {
//   title: "Customer",
//   dataIndex: "customer",
//   key: "customer",
// },
// {
//   title: "Quantity",
//   dataIndex: ["items", 0, "qty"],
//   key: ["items", 0, "qty"],
// },
// {
//   title: "Precut",
//   key: ["items", 0, "custom_precut"],
//   dataIndex: ["items", 0, "custom_precut"],
//   render: (_, { items }) => {
//     const precut = items[0].custom_precut;
//     let color = precut.length === 3 ? "volcano" : "green";
//     return (
//       <Tag color={color} key={precut}>
//         {precut.toUpperCase()}
//       </Tag>
//     );
//   },
// },
// {
//   title: "Portion",
//   dataIndex: ["items", 0, "custom_portion_size"],
//   key: ["items", 0, "custom_portion_size"],
// },
//     {
//       title: "Status",
//       key: "custom_order_status",
//       render: (_, record) => {
//         return (
//           <Space size="middle">
//             <button
//               disabled={
//                 record.custom_order_status === "Done" ||
//                 record.custom_order_status === "In stock"
//               }
//               onClick={() => showConfirmationPopup("In Stock", record.name)}
//               className={
//                 record.custom_order_status === "In stock" ||
//                 record.custom_order_status === "Done"
//                   ? "disabledClass"
//                   : "specialClass"
//               }
//             >
//               In Stock
//             </button>
//             <button
//               disabled={record.custom_order_status === "Done"}
//               onClick={() => showConfirmationPopup("Done", record.name)}
//               className={
//                 record.custom_order_status === "Done"
//                   ? "disabledClass"
//                   : "specialClass"
//               }
//             >
//               Done
//             </button>
//           </Space>
//         );
//       },
//     },
//   ];

//   return (
//     <div>
//       <Table
//         columns={columns}
//         dataSource={salesOrders}
//         rowClassName={getRowStyle}
//       />

//       {confirmationVisible && (
//         <Popup open={true} closeOnDocumentClick={false}>
//           <div>
//             <p>
//               Are you sure you want to mark this item as {confirmationAction}?
//             </p>
//             <button onClick={handleConfirmation}>Confirm</button>
//             <button onClick={() => setConfirmationVisible(false)}>
//               Cancel
//             </button>
//           </div>
//         </Popup>
//       )}
//     </div>
//   );
// };

// export default SalesOrderTable;

// ... your imports and other code ...
import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const SalesOrderTable = ({ salesOrders }) => {
  console.log(salesOrders);
  const yellowBg = "yellowBg";
  const greenBg = "greenBg";
  const normalClass = "normalClass";

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState("");
  const [orderNumberToUpdate, setOrderNumberToUpdate] = useState("");
  const [rowStatus, setRowStatus] = useState({}); // Local state for row statuses

  const updateStatus = async (orderNumber) => {
    try {
      const response = await axios.put(
        "https://crystalerp.litbakery.co.uk/api/method/crystalpatisserie.custom.api.update_so",
        {
          order_number: orderNumber,
          status: "Done", // Set the status to 'Done'
        }
      );
      // Handle success, e.g., show a success message
      console.log("Status updated:", response.data);

      // Update local row status when the API call is successful
      setRowStatus((prevRowStatus) => ({
        ...prevRowStatus,
        [orderNumber]: "Done",
      }));
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
      // Handle success, e.g., show a success message
      console.log("Status updated:", response.data);

      // Update local row status when the API call is successful
      setRowStatus((prevRowStatus) => ({
        ...prevRowStatus,
        [orderNumber]: "In stock",
      }));
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
    // Use local row status to determine background color
    const rowCustomOrderStatus =
      rowStatus[record.name] || record.custom_order_status;
    return rowCustomOrderStatus === "Pending"
      ? normalClass
      : rowCustomOrderStatus === "In stock"
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
        dataSource={salesOrders}
        rowClassName={getRowStyle}
      />

      {confirmationVisible && (
        <Popup open={true} closeOnDocumentClick={false}>
          <div>
            <p>
              Are you sure you want to mark this item as {confirmationAction}?
            </p>
            <button onClick={handleConfirmation}>Confirm</button>
            <button onClick={() => setConfirmationVisible(false)}>
              Cancel
            </button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default SalesOrderTable;
