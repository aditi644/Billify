import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInvoiceStore } from "../src/store/useInvoiceStore";

const AddInvoice = () => {
  const navigate = useNavigate();
  const { addInvoice } = useInvoiceStore();

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    billnumber: "",
    billdate: "",
    billamount: "",
    doctorname: "",
    productname: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setPreview(URL.createObjectURL(files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    await addInvoice(data);
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-base-200">
      <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add Invoice</h2>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="billnumber" placeholder="Bill Number" className="input input-bordered w-full" onChange={handleChange} />
          <input type="date" name="billdate" className="input input-bordered w-full" onChange={handleChange} />
          <input name="billamount" placeholder="Bill Price" className="input input-bordered w-full" onChange={handleChange} />
          <input name="doctorname" placeholder="Doctor Name" className="input input-bordered w-full" onChange={handleChange} />
          <input name="productname" placeholder="Product Name" className="input input-bordered w-full" onChange={handleChange} />
          {/* <input type="file" name="image" className="file-input file-input-bordered w-full" onChange={handleChange} /> */}
          <label className="btn btn-outline flex-1 cursor-pointer">
    📷 Camera
    <input
      type="file"
      name="image"
      accept="image/*"
      capture="environment"
      hidden
      onChange={handleChange}
    />
  </label>

  {/* Gallery */}
  <label className="btn btn-outline flex-1 cursor-pointer">
    📁 Upload
    <input
      type="file"
      name="image"
      accept="image/*"
      hidden
      onChange={handleChange}
    />
  </label>
  {preview && (
  <img
    src={preview}
    alt="Preview"
    className="w-full h-48 object-cover rounded-lg border"
  />
)}

  
          <button type="submit" className="btn btn-primary w-full">
            Submit Invoice
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInvoice;
