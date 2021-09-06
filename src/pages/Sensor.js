import React, { useMemo, useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { PDFExport } from "@progress/kendo-react-pdf";
var axios = require('axios');

export default function Sensor() {
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
      async function getData() {
        await axios
          .get("http://localhost:8080/sensor")
          .then((response) => {
            // check if the data is populated
            console.log(response.data);
            setData(response.data);
            // you tell it that you had the result
            setLoadingData(false);
          });
      }
      if (loadingData) {
        // if the result is not ready so you make the axios call
        getData();
      }
    }, []);

    const columnas = useMemo(() => [
        { name:'ID', selector:'sensorId', sortable:true },
        { name:'Nombre', selector:'nombre', sortable:true },
        { name:'Descripcion', selector:'descripcion', sortable:true },
    ]);

    const paginacionOpciones = {
        rowsPerPageText:'Filas por Página',
        rangeSeparatorText: 'de',
        selectAllRowsItems: true,
        selectAllRowsItemText: 'Todos'
    }

    const pdfExportComponent = React.useRef(null);

    const exportPDFWithComponent = () => {
      if (pdfExportComponent.current) {
        pdfExportComponent.current.save();
      }
    };

    return (
        <div>
          <div className="example-config">
            <button className="k-button" onClick={exportPDFWithComponent}>
              Export Sensores
            </button>
          </div>
          <PDFExport
            ref={pdfExportComponent}
            paperSize="auto"
            margin={40}
            fileName={`Report for ${new Date().getFullYear()}`}
            author="KendoReact Team"
          >
          <div>              
            <DataTable className="table-responsive"
              title="SENSORES" 
              columns={columnas}
              data={data}
              pagination
              paginationComponentOptions={paginacionOpciones}
              fixedHeader
              fixedHeaderScrollHeight="600px"
              />
          </div>
          </PDFExport>
        </div>
    )
}
