import React, { useMemo, useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { PDFExport } from "@progress/kendo-react-pdf";
var axios = require('axios');

export default function Medicion() {
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
      async function getData() {
        await axios
          .get("http://localhost:8080/medicion")
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
        { id:"medicionId", name:'ID', selector:'medicionId', sortable:true },
        { id:"fecha", name:'Fecha', selector:'fecha', sortable:true },
        { id:"temperatura", name:'Temperatura', selector:'temperatura', sortable:true },
        { id:"sensor", name:'Sensor', selector:'sensor.nombre', sortable:true },
    ]);

    const paginacionOpciones = {
        rowsPerPageText:'Filas por Página',
        rangeSeparatorText: 'de',
        selectAllRowsItems: true,
        selectAllRowsItemText: 'Todos'
    }

    const conditionalRowStyles = [
      {
        when: row => row.temperatura < 30,
        style: {
          backgroundColor: ' #4fa3df ',
          color: 'white',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
      {
        when: row => row.temperatura > 70,
        style: {
          backgroundColor: ' #f74c41 ',
          color: 'white',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },      
    ];

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
              Export Mediciones
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
                  title="MEDICIONES" 
                  columns={columnas}
                  data={data}
                  pagination
                  paginationComponentOptions={paginacionOpciones}
                  fixedHeader
                  fixedHeaderScrollHeight="600px"
                  conditionalRowStyles={conditionalRowStyles}
                  />
            </div>
          </PDFExport>
        </div>
    )
}
