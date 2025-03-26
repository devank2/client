import React, { useState } from "react";
import { ReferralRequest } from "../types";
import { maskUsername } from '../utils/maskUsername';
import Pagination from "./Pagination";

interface Props {
  referralRequests: ReferralRequest[];
  onApprove: (username: string) => void;
  onReject: (username: string) => void;
}

const ReferralRequestsTable: React.FC<Props> = ({ referralRequests, onApprove, onReject }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Calculate total pages
  const totalPages = Math.ceil(referralRequests.length / itemsPerPage);

  // Get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = referralRequests.slice(startIndex, endIndex);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Referral Requests</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Username</th>
            <th className="p-3">Website</th>
            <th className="p-3">Referencee</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-3 text-center text-gray-500">
                No referral requests available.
              </td>
            </tr>
          ) : (
            currentData.map((req) => (
              <tr key={req.username} className="border-b">
                <td className="p-3">{maskUsername(req.username)}</td>
                <td className="p-3">{req.website}</td>
                <td className="p-3">{req.referencee}</td>
                <td className="p-3">
                  <button
                    onClick={() => onApprove(req.username)}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onReject(req.username)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ReferralRequestsTable;