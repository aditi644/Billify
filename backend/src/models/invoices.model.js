import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    billnumber:{
        type: String,
        required: true,
    },
    billdate:{
        type: Date,
        required: true,
    },
    billamount:{
        type: Number,
        required: true,
    },
    doctorname: {
        type: String,
        required: true,
    },
    productname: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;