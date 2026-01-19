import User from "../models/user.model.js";

import Invoice from "../models/invoices.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getInvoices = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const invoices = await Invoice.find({ userId: loggedInUserId });
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error in getInvoices: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addInvoice = async (req, res) => {
    try {
      const { billnumber, billdate, billamount, doctorname, productname } = req.body;

      console.log(req.body);
      console.log(req.file);

      const userId = req.user._id;

      let imageUrl = "";

if (req.file) {
  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(req.file.buffer);
  });

  imageUrl = uploadResult.secure_url;
}

  
      // let imageUrl;
      // if (image) {
      //   // Upload base64 image to cloudinary
      //   const uploadResponse = await cloudinary.uploader.upload(image);
      //   imageUrl = uploadResponse.secure_url;
      // }
      console.log(imageUrl);
  
      const newInvoice = new Invoice({
        userId,
        billnumber,
        billdate,
        billamount,
        doctorname,
        productname,
        image: imageUrl,
      });

      console.log(newInvoice);
  
      await newInvoice.save();
  
  
      res.status(201).json(newInvoice);
    } catch (error) {
      console.log("Error in addInvoice controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  export const editInvoice = async (req, res) => {
    try {
        const { invoiceId, billnumber, billamount } = req.body;
    const userId = req.user._id;
    
    if (!invoiceId) {
      return res.status(400).json({
        error: "Invoice ID is required",
      });
    }
    // validation
    if (!billnumber || billamount === undefined) {
      return res.status(400).json({
        error: "billNumber and billAmount are required",
      });
    }

    // update only if billNumber AND userId match
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { _id: invoiceId, userId },           // condition
      { $set: { billamount } },          // only field to update
      { new: true }                      // return updated document
    );

    if (!updatedInvoice) {
      return res.status(404).json({
        error: "Invoice not found or not authorized",
      });
    }

    res.status(200).json({
      message: "Invoice updated successfully",
      invoice: updatedInvoice,
    });
    } catch (error) {
        console.log("Error in editInvoice controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
  }

  export const getFilteredInvoices = async (req, res) => {
    try {
      const userId = req.user._id;
      const { month, year } = req.params;
  
      // validation
      if (!month || !year) {
        return res.status(400).json({
          error: "Month and year are required",
        });
      }
  
      // month is 1-12, JS Date uses 0-11
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
  
      const invoices = await Invoice.find({
        userId,
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });
  
      res.status(200).json(invoices);
    } catch (error) {
      console.error("Error filtering invoices:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

  // GET invoice by bill number
export const getInvoiceByBillNumber = async (req, res) => {
    try {
      const { billnumber } = req.params;
      
  
      if (!billnumber) {
        return res.status(400).json({ message: "Bill number is required" });
      }
  
      const invoice = await Invoice.findOne({ billnumber });
  
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
  
      res.status(200).json(invoice);
    } catch (error) {
      console.error("Error fetching invoice by bill number:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
