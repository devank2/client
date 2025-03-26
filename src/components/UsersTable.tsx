import React, { useState } from "react";
import Pagination from "./Pagination";
import { ApprovedUser } from "../types";
import { maskUsername } from '../utils/maskUsername';


interface Props {
  approvedUsers: ApprovedUser[];
}

const UsersTable: React.FC<Props> = ({ approvedUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Calculate total pages
  const totalPages = Math.ceil(approvedUsers.length / itemsPerPage);

  // Get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = approvedUsers.slice(startIndex, endIndex);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Username</th>
            <th className="p-3">Website</th>
            <th className="p-3">Referencee</th>
            <th className="p-3">Total Deposit</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-3 text-center text-gray-500">
                No approved users.
              </td>
            </tr>
          ) : (
            currentData.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-3">{maskUsername(user.username)}</td>
                <td className="p-3">{user.website}</td>
                <td className="p-3">{user.parent}</td>
                <td className="p-3">{user.totalDeposit}</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {user.status}
                  </span>
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

export default UsersTable;