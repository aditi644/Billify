import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { getInvoices, addInvoice, editInvoice, getFilteredInvoices, getInvoiceByBillNumber } from "../controllers/invoice.controller.js";
import multer from "multer";

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.get("/allinvoices", protectRoute, getInvoices);
router.post("/addinvoice", protectRoute, upload.single("image"), addInvoice);

router.post("/editinvoice", protectRoute, editInvoice);

router.get("/filteredinvoices", protectRoute, getFilteredInvoices);

router.get(
    "/by-billnumber/:billNumber",
     protectRoute,
    getInvoiceByBillNumber
  );
export default router;