
export interface ExcelData {
  username: string;
  website: string;
  deposit: number;
  reference: string;
  _id?: string; 
}

export type ReferralRequest = {
  username: string;
  website: string;
  referencee?: string; 
  status?: string;
  phone?: string;
  _id?: string;
};


export interface ApprovedUser {
  _id: string;
  username: string;
  website: string;
  parent: string;
  totalDeposit: number;
  status: "Approved" | "Pending" | "Rejected";
}
