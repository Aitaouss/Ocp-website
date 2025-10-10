"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelUploader() {
  const [data, setData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws);
      setData(jsonData as any[]);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Upload Button */}
      <input
        type="file"
        accept=".xlsx, .xls, .xlsm"
        onChange={handleFileUpload}
        className="border p-2 rounded-md"
      />

      {/* Table View */}
      {data.length > 0 ? (
        <div className="overflow-auto max-h-[500px] border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-4 py-2 text-left font-semibold">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  {Object.values(row).map((value, j) => (
                    <td key={j} className="px-4 py-2">
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">Aucun fichier importé pour l'instant.</p>
      )}
    </div>
  );
}
