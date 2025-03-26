import React, { useState } from "react";
import axios from "axios";

const ReferralForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    website: "",
    phone: "",
    parent: "",
    status: "pending",
    totalDeposit: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalDeposit" ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/referrals", formData);
      alert("Referral submitted successfully ✅");
      setFormData({
        username: "",
        website: "",
        phone: "",
        parent: "",
        status: "pending",
        totalDeposit: 0
      });
    } catch (error) {
      alert("Something went wrong ❌");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-md mx-auto mt-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Submit Referral</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="parent"
        placeholder="Parent (Optional)"
        value={formData.parent}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      {/* Status Dropdown */}
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="pending">Pending</option>
        
      </select>

      {/* Total Deposit Input */}
      <input
        type="number"
        name="totalDeposit"
        placeholder="Total Deposit"
        value={formData.totalDeposit}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default ReferralForm;
