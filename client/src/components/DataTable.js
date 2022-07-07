import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({ tableData, columns }) {
    return (
        <div style={{ height: 800, width: "100%" }}>
            <DataGrid rows={tableData} columns={columns} pageSize={10} />
        </div>
    );
}
