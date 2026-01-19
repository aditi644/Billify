import React, { useEffect } from "react";
import { useInvoiceStore } from "../src/store/useInvoiceStore";

const Invoices = () => {
  const {
    invoices,
    getInvoices,
    isInvoicesLoading,
    selectedInvoice,
    setSelectedInvoice,
    filteredInvoices,
    isFilteredInvoicesLoading,
  } = useInvoiceStore();

  const dataToShow =
  filteredInvoices.length > 0 ? filteredInvoices : invoices;

  // Fetch invoices on mount
  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  

  const sortedInvoices = [...dataToShow].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Sort invoices: latest on top
  // const sortedInvoices = [...invoices].sort(
  //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  // );

  if (isInvoicesLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Loading invoices...</p>
      </div>
    );
  }

  if (isFilteredInvoicesLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Loading invoices...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3" onClick={() => setSelectedInvoice(null)}>
      {sortedInvoices.length === 0 && (
        <p className="text-center text-gray-500">No invoices found</p>
      )}

      {sortedInvoices.map((invoice) => (
        <div
          key={invoice._id}
          // onClick={() => setSelectedInvoice(invoice)}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedInvoice(invoice);
          }}
          className={`cursor-pointer rounded-lg border p-4 transition
            ${
              selectedInvoice?._id === invoice._id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
            }
          `}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">
                Invoice #{invoice.billnumber || invoice._id.slice(-6)}
              </p>
              <p className="text-sm text-gray-500">
                {invoice.doctorname || "Unknown Client"}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">₹{invoice.billamount}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full
                  ${
                    invoice.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : invoice.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {invoice.status}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Product given on {new Date(invoice.billdate).toLocaleDateString()}
          </p>

          <a
  href={invoice.image}
  target="_blank"
  rel="noopener noreferrer"
  className="text-xs text-blue-600 underline"
  onClick={(e) => e.stopPropagation()}
>
  View Image
</a>

        </div>
      ))}
    </div>
  );
};

export default Invoices;
