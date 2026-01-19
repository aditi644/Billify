import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInvoiceStore } from "../src/store/useInvoiceStore";
import { axiosInstance } from "../src/lib/axios";

const EditInvoice = () => {
  const navigate = useNavigate();
  const { selectedInvoice, updateInvoice } = useInvoiceStore();

  const [billNumber, setBillNumber] = useState(selectedInvoice?.billnumber || "");
  const [invoiceAmount, setInvoiceAmount] = useState(selectedInvoice?.billamount || "");
  const [paidAmount, setPaidAmount] = useState("");

  // Auto fetch amount when bill number changes
  // useEffect(() => {
  //   if (!billNumber) return;

  //   const fetchAmount = async () => {
  //     try {
  //       const res = await axiosInstance.get(`/invoices/by-billnumber/${billNumber}`);
  //       setInvoiceAmount(res.data.billamount);
  //     } catch (err) {
  //       console.log("Bill not found");
  //     }
  //   };

  //   fetchAmount();
  // }, [billNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateInvoice({
      invoiceId: selectedInvoice._id,
      billnumber: billNumber,
      billamount: Number(invoiceAmount)-Number(paidAmount),
      
    });

    navigate("/");
  };

  if (!selectedInvoice) {
    return <p className="text-center mt-10">No invoice selected</p>;
  }

  return (
    <div className="min-h-screen pt-24 px-4 bg-base-200">
      <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Edit Invoice</h2>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={billNumber}
            onChange={(e) => setBillNumber(e.target.value)}
            placeholder="Bill Number"
            className="input input-bordered w-full"
          />
  
          <input
            value={invoiceAmount}
            disabled
            className="input input-bordered w-full"
            placeholder="Invoice Amount"
          />
  
          <input
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            placeholder="Paid Amount"
            className="input input-bordered w-full"
          />
  
          <button type="submit" className="btn btn-primary w-full">
            Update Invoice
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default EditInvoice;
