import React, { useRef } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // for Bootstrap theme (optional)
import { Card, Grid, IconButton } from "@mui/material";

const TabulatorComponent = () => {
  const data = [
    {
      circle_name: "Faridabad",
      substation_name: "66 kV Substation Dhauj",
      transformer_name: "TR_1",
      main_mtr_sl: "HVPN5073",
      check_mtr_sl: "HVPN5074",
    },
    {
      circle_name: "Faridabad",
      substation_name: "66 kV Substation Dhauj",
      transformer_name: "TR_2",
      main_mtr_sl: "HVPN5075",
      check_mtr_sl: "HVPN5077",
    },
    {
      circle_name: "Faridabad",
      substation_name: "66 kV Substation Escort I",
      transformer_name: "TR_1",
      main_mtr_sl: "HVPN5082",
      check_mtr_sl: "HVPN5083",
    },
    {
      circle_name: "Faridabad",
      substation_name: "66 kV Substation Escort I",
      transformer_name: "TR_2",
      main_mtr_sl: "HVPN5258",
      check_mtr_sl: "HVPN5259",
    },
    {
      circle_name: "Faridabad",
      substation_name: "66 KV Substation Escort II",
      transformer_name: "TR_1",
      main_mtr_sl: "HVPN5086",
      check_mtr_sl: "HVPN5087",
    },
    {
      circle_name: "Faridabad",
      substation_name: "66 KV Substation Escort II",
      transformer_name: "TR_2",
      main_mtr_sl: "HVPN5256",
      check_mtr_sl: "HVPN5257",
    },
    {
      circle_name: "Jind",
      substation_name: "220 KV Jind",
      transformer_name: "TR3_IC1",
      main_mtr_sl: "HVPN5114",
      check_mtr_sl: "HVPN5115",
    },
    {
      circle_name: "Jind",
      substation_name: "220 KV Jind",
      transformer_name: "TR3_IC2",
      main_mtr_sl: "HVPN5116",
      check_mtr_sl: "HVPN5117",
    },
    {
      circle_name: "Jind",
      substation_name: "132 KV Dablain",
      transformer_name: "TR3",
      main_mtr_sl: "HVPN6398",
      check_mtr_sl: "HVPN6399",
    },
    {
      circle_name: "Jind",
      substation_name: "132 KV Dablain",
      transformer_name: "TR1",
      main_mtr_sl: "HVPN6720",
      check_mtr_sl: "HVPN6721",
    },
    {
      circle_name: "Jind",
      substation_name: "132 kV Substation Jind (O)",
      transformer_name: "TR1",
      main_mtr_sl: "HVPN6400",
      check_mtr_sl: "HVPN6401",
    },
    {
      circle_name: "Jind",
      substation_name: "132 kV Substation Jind (O)",
      transformer_name: "TR2",
      main_mtr_sl: "HVPN6402",
      check_mtr_sl: "HVPN6403",
    },
  ];

  const columns = [
    {
      title: "Index",
      field: "index",
      width: 100,
      formatter: (cell) => cell.getRow().getPosition(true),
      frozen: true,
      responsive: 0,
      minWidth: 50,
    },
    {
      title: "Circle Name",
      field: "circle_name",
      frozen: true,
      width: 200,
      resizable: true,
      responsive: 3,
      minWidth: 150,
    },
    {
      title: "Substation Name",
      field: "substation_name",
      frozen: true,
      width: 200,
      resizable: true,
      minWidth: 150,
    },
    {
      title: "Transformer Name",
      field: "transformer_name",
      width: 200,
      resizable: true,
      minWidth: 150,
    },
    {
      title: "Meter Uic",
      headerHozAlign: "center",
      columns: [
        {
          title: "Main Meter Serial No",
          field: "main_mtr_sl",
          width: 200,
          resizable: true,
          minWidth: 150,
        },
        {
          title: "Check Meter Serial No",
          field: "check_mtr_sl",
          editor: "input",
          width: 200,
          resizable: true,
          minWidth: 150,
        },
      ],
    },
    {
      title: "Consumption (kW)",
      headerHozAlign: "center",
      columns: [
        {
          title: "Main Meter Consumption",
          field: "main_mtr_sl",
          width: 200,
          resizable: true,
          editable: true,
          editor: "input",
          minWidth: 150,
        },
        {
          title: "Check Meter Consumption",
          field: "check_mtr_sl",
          editor: "input",
          width: 200,
          editable: true,
          resizable: true,
          minWidth: 150,
        },
      ],
    },
    {
      title: "Meter Selected",
      field: "check_mtr_sl",
      width: 200,
      resizable: true,
      minWidth: 150,
    },
    {
      title: "Remarks",
      field: "remarks",
      width: 200,
      resizable: true,
      editor: "input",
      editable: true,
      minWidth: 150,
    },
    {
      title: "Difference",
      field: "diff_main_check_consumption",
      width: 200,
      resizable: true,
      minWidth: 150,
    },
    // { title: "Main Meter Serial No", field: "main_mtr_sl",width:200 },
    // { title: "Check Meter Serial No", field: "check_mtr_sl",width:200 },
    // { title: "Main Meter Serial No", field: "main_mtr_sl",width:200 },
  ];

  const tableRef = useRef(null);

  const handleDownload = (format) => {
    // console.log("tableRef", tableRef.current);
    if (tableRef.current) {
      const table = tableRef.current;

      switch (format) {
        case "csv":
          table.download("csv", "data.csv");
          break;
        case "json":
          table.download("json", "data.json");
          break;
        case "xlsx":
          table.download("xlsx", "data.xlsx", {
            sheetName: "My Data",
          });
          break;
        case "pdf":
          table.download("pdf", "data.pdf", {
            orientation: "portrait",
            title: "Example Report",
          });
          break;
        case "html":
          table.download("html", "data.html", { style: true });
          break;
        default:
          break;
      }
    }
  };

  return (
    <Card sx={{backgroundColor:"grey"}}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          size="small"
          onClick={() => handleDownload("pdf")}
          sx={{mr:-6}}
        >
          PDF
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleDownload("csv")}
          sx={{mr:-6}}
        >
          CSV
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleDownload("json")}
          sx={{mr:-6}}
        >
          JSON
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleDownload("xlsx")}
          sx={{mr:-6}}
        >
          XLSX
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleDownload("html")}
        >
          HTML
        </IconButton>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <ReactTabulator
          onRef={(ref) => (tableRef.current = ref)}
          data={data}
          columns={columns}
          layout="fitDataFill"
          options={{
            rowHeader: true,
            responsiveLayout: true,
            pagination: "local",
            paginationSize: 10,
            paginationSizeSelector: [5, 10, 15, 20],
            movableRows: true,
            movableColumns: true,
            paginationCounter: "rows",
            groupBy: "circle_name",
          }}
        />
      </Grid>
    </Card>
  );
};

export default TabulatorComponent;
