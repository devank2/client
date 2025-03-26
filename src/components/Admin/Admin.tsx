import React, { useEffect, useState } from "react";
import { ApprovedUser, ReferralRequest } from "../../types";
import UsersTable from "../UsersTable";
import ExcelUpload from "../ExcelUpload";
import ReferralRequestsTable from "../ReferralRequestsTable";
import axios from "axios";

export const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState("referrals");
    const [referralRequests, setReferralRequests] = useState<ReferralRequest[]>([]);
    const [approvedUsers, setApprovedUsers] = useState<ApprovedUser[]>([]);

    useEffect(() => {
        if (activeTab === "users") {
          fetchApprovedUsers();
        }
        if (activeTab === 'referrals') {
            fetchReferrals();
        }
      }, [activeTab]);
      const fetchReferrals = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/referrals");
          if (Array.isArray(res.data)) {
            setReferralRequests(res.data); 
          }
        } catch (error) {
          console.error("Error fetching referrals:", error);
        }
      };
    const fetchApprovedUsers = async () => {
        try {
            const res = await axios.get<ApprovedUser[]>("http://localhost:5000/api/admin/users");
          console.log("Fetched users:", res.data);
      
          
          const formattedUsers: ApprovedUser[] = res.data.map((user): ApprovedUser => ({
            ...user,
            parent: user.parent || (user as any).parent || "N/A",
            totalDeposit: user.totalDeposit || 0,
            status: "Approved"
          }));
            // console.log(formattedUsers);
          setApprovedUsers(formattedUsers);
        } catch (err) {
          console.error("Error fetching users:", err);
        }
      };
      
  


  
const handleApprove = async (username: string) => {
    try {
      const request = referralRequests.find(req => req.username === username);
      if (!request) return;
  
      // Call API to approve
        const { data: updated }: { data: ReferralRequest } = await axios.put(`http://localhost:5000/api/referrals/${request._id}/approve`);      
        
      // Update local state
      setApprovedUsers(prev => [...prev, { ...updated, status: "Approved" } as ApprovedUser]);
      setReferralRequests(prev => prev.filter(req => req.username !== username));
    } catch (error) {
      console.error("Approval error:", error);
      alert("Failed to approve referral.");
    }
  };
  
  const handleReject = async (username: string) => {
    try {
      const request = referralRequests.find((r) => r.username === username);
      if (!request || !request._id) return;
  
      await axios.delete(`http://localhost:5000/api/referrals/${request._id}`);
      setReferralRequests((prev) => prev.filter((r) => r.username !== username));
    } catch (error) {
      console.error("Rejection error:", error);
      alert("Failed to reject (delete) referral.");
    }
  };
  
    return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md p-4">
          <h2 className="text-xl font-bold mb-6">Referral Admin</h2>
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === "referrals" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("referrals")}
              >
                <b>Referral Requests</b>
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === "users" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("users")}
              >
                <b>Users</b>
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === "upload" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("upload")}
              >
                <b>Excel Upload</b>
              </button>
            </li>
          </ul>
        </div>
  
        {/* Content Area */}
        <div className="flex-1 p-6">
          {activeTab === "referrals" && (
            <ReferralRequestsTable
              referralRequests={referralRequests}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}
          {activeTab === "users" && <UsersTable approvedUsers={approvedUsers} />}
          {activeTab === "upload" && <ExcelUpload />}
        </div>
      </div>
    );
  };