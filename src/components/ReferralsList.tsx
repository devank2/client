import React, { useEffect, useState } from "react";
import axios from "axios";

interface Referral {
  _id: string;
  username: string;
  website: string;
  phone: string;
  parent?: string;
  status: "pending" | "approved" | "rejected";
}

const ReferralList = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/referrals");
        if (Array.isArray(res.data)) {
          setReferrals(res.data); // ✅ Now no TypeScript error
        }
      } catch (error) {
        console.error("Error fetching referrals:", error);
      }
    };

    fetchReferrals();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-xl font-semibold mb-4">All Referrals</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Website</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Parent</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral) => (
              <tr key={referral._id}>
                <td className="border px-4 py-2">{referral.username}</td>
                <td className="border px-4 py-2">{referral.website}</td>
                <td className="border px-4 py-2">{referral.phone}</td>
                <td className="border px-4 py-2">{referral.parent || "-"}</td>
                <td className="border px-4 py-2 capitalize">{referral.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralList;
