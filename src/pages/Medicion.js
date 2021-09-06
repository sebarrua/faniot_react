import React, { useMemo, useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
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
        { name:'ID', selector:'medicionId', sortable:true },
        { name:'Fecha', selector:'fecha', sortable:true },
        { name:'Temperatura', selector:'temperatura', sortable:true },
        { name:'Sensor', selector:'sensor.nombre', sortable:true },
    ]);

    const paginacionOpciones = {
        rowsPerPageText:'Filas por Página',
        rangeSeparatorText: 'de',
        selectAllRowsItems: true,
        selectAllRowsItemText: 'Todos'
    }
    return (
        <div>
            <div>
              <DataTable className="table-responsive"
                  title="MEDICIONES" 
                  columns={columnas}
                  data={data}
                  pagination
                  paginationComponentOptions={paginacionOpciones}
                  fixedHeader
                  fixedHeaderScrollHeight="600px"
                  />
            </div>
        </div>
    )
}
