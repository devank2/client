import React from "react";
import * as XLSX from "xlsx";
import { ExcelData } from "../types";
import axios from "axios";

interface Props {
  onUpload?: (data: ExcelData[]) => void;
}

interface ExcelRow {
  [key: string]: string | number;
}

const ExcelUpload: React.FC<Props> = ({ onUpload }) => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      alert("Uploading, please wait...");
      const data = await readFile(file);
      const workbook = XLSX.read(data, { type: "array" });
      const parsedData = parseExcel(workbook);
      await axios.post("http://localhost:5000/api/excel/excel-upload", JSON.stringify(parsedData), {
        headers: { "Content-Type": "application/json" }
      });
      alert("Upload successful!");
      onUpload?.(parsedData);
    } catch (error) {
      console.error("Upload failed:", error);
      alert(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const readFile = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
      reader.onerror = () => reject(new Error("File reading failed"));
      reader.readAsArrayBuffer(file);
    });
  };

  const parseExcel = (workbook: XLSX.WorkBook): ExcelData[] => {
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json: ExcelRow[] = XLSX.utils.sheet_to_json(sheet);
    if (!json.length) throw new Error("Empty Excel file");
    return json.map((row): ExcelData => {
      const username = String(row.username || row.Username || "Unknown");
      const website = String(row.website || row.Website || "Unknown");
      const deposit = Number(row.totalDeposit) || 0;
      const reference = String(row.reference || row.Reference || "Unknown");
      console.log(reference, row, "checking rows and reference")
      return {
        username,
        website,
        deposit,
        reference,
        // Omit _id if your backend generates it
        // Or include if needed:
        // _id: String(row._id || Math.random().toString(36).substring(2, 9))
      };
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Excel Upload</h1>
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <p className="mt-2 text-sm text-gray-500">
        Required columns: username, website, deposit
      </p>
    </div>
  );
};

export default ExcelUpload;