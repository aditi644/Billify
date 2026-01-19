// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useInvoiceStore } from "../src/store/useInvoiceStore";
// import { useState } from "react";

// const Header = () => {
//   const navigate = useNavigate();
//   const { selectedInvoice, getFilteredInvoices, getInvoices } = useInvoiceStore();

//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");

//   const applyFilter = () => {
//     if (!month || !year) return;
//     getFilteredInvoices({ month, year });
//   };

//   const clearFilter = () => {
//     setMonth("");
//     setYear("");
//     getInvoices();
//   };

//   return (
//     <div className="flex justify-between items-center p-4 border-b bg-base-100">
//       <h2 className="text-xl font-semibold">Invoices</h2>

//       <div className="flex gap-3">
//         {/* Month */}
//         <select
//           className="select select-bordered select-sm"
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//         >
//           <option value="">Month</option>
//           {Array.from({ length: 12 }).map((_, i) => (
//             <option key={i} value={i + 1}>
//               {new Date(0, i).toLocaleString("default", { month: "long" })}
//             </option>
//           ))}
//         </select>

//         {/* Year */}
//         <select
//           className="select select-bordered select-sm"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//         >
//           <option value="">Year</option>
//           {[2024, 2025, 2026].map((y) => (
//             <option key={y} value={y}>
//               {y}
//             </option>
//           ))}
//         </select>

//         <button onClick={applyFilter} className="btn btn-sm btn-outline">
//           Filter
//         </button>

//         <button onClick={clearFilter} className="btn btn-sm btn-ghost">
//           Clear
//         </button>
//         <button
//           onClick={() => navigate("/add-invoice")}
//           className="btn btn-primary"
//         >
//           Add Invoice
//         </button>

//         <button
//           disabled={!selectedInvoice}
//           onClick={() => navigate("/edit-invoice")}
//           className="btn btn-outline"
//         >
//           Edit Invoice
//         </button>
//       </div>
      
//     </div>
    
//   );
// };

// export default Header;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInvoiceStore } from "../src/store/useInvoiceStore";

const Header = () => {
  const navigate = useNavigate();
  const { selectedInvoice, getFilteredInvoices, getInvoices } = useInvoiceStore();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const applyFilter = () => {
    if (!month || !year) return;
    getFilteredInvoices({ month, year });
  };

  const clearFilter = () => {
    setMonth("");
    setYear("");
    getInvoices();
  };

  return (
    <div className="border-b bg-base-100 p-4 space-y-2">
      {/* Top row: title + buttons */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Invoices</h2>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/add-invoice")}
            className="btn btn-primary"
          >
            Add Invoice
          </button>

          <button
            disabled={!selectedInvoice}
            onClick={() => navigate("/edit-invoice")}
            className="btn btn-outline"
          >
            Edit Invoice
          </button>
        </div>
      </div>

      {/* Second row: filters */}
      <div className="flex gap-3 flex-wrap items-center">
        <select
          className="select select-bordered select-sm"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Month</option>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered select-sm"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Year</option>
          {[2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <button onClick={applyFilter} className="btn btn-sm btn-outline">
          Filter
        </button>

        <button onClick={clearFilter} className="btn btn-sm btn-ghost">
          Clear
        </button>
      </div>
    </div>
  );
};

export default Header;
