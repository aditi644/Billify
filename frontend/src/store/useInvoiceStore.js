import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useInvoiceStore = create((set, get) => ({
  invoices: [],
  filteredInvoices: [],
  selectedInvoice: null,
  isInvoicesLoading: false,
  isFilteredInvoicesLoading: false,

  // Fetch all invoices
  getInvoices: async () => {
    set({ isInvoicesLoading: true });
    try {
      const res = await axiosInstance.get("/invoices/allinvoices"); // Adjust endpoint
      set({ invoices: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch invoices");
    } finally {
      set({ isInvoicesLoading: false });
    }
  },

  // Fetch filtered invoices
  getFilteredInvoices: async (filterParams) => {
    set({ isFilteredInvoicesLoading: true });
    try {
      // Example: filterParams = { status: 'paid', date: '2026-01-01' }
      const res = await axiosInstance.get("/invoices/filteredinvoices", { params: filterParams });
      set({ filteredInvoices: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch filtered invoices");
    } finally {
      set({ isFilteredInvoicesLoading: false });
    }
  },

  // Set selected invoice
  setSelectedInvoice: (invoice) => set({ selectedInvoice: invoice }),

  clearFilteredInvoices: () => set({ filteredInvoices: [] }),


  // Optional: Add a new invoice
  addInvoice: async (invoiceData) => {
    try {
      console.log(invoiceData);
      const res = await axiosInstance.post("/invoices/addinvoice", invoiceData, {headers: {
        "Content-Type": "multipart/form-data"
      }});
      console.log(res.data);
      set({ invoices: [...get().invoices, res.data] });
      toast.success("Invoice added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add invoice");
    }
  },

  // Optional: Update invoice
  updateInvoice: async (updateData) => {
    try {
      const res = await axiosInstance.post(`/invoices/editinvoice`, updateData);
      await get().getInvoices();

      set({ selectedInvoice: res.data.invoice });
      
      toast.success("Invoice updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update invoice");
    }
  },
}));
