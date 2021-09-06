import React, { useMemo, useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
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

    function dataFromaAPISensor() {
        var config = {
          method: 'GET',
          url: 'http://localhost:8080/sensor',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'            
          },
        };
        axios(config)
          .then(function (response) {
            setData(response.data);
          })
          .catch(function (error) {
            console.log("error");
            console.log(error);
            console.log("error");
          });
      }

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
    return (
        <div>
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
        </div>
    )
}
