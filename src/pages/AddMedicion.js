import React from 'react';
import axios from 'axios';

export default class AddMedicion extends React.Component {
    state = {
        fecha: '',
        temperatura: '',
        sensor:'',
    };

    handleChange1 = event => {
        this.setState({ fecha: event.target.value });
    }
    handleChange2 = event => {
        this.setState({ temperatura: event.target.value });
    }
    handleChange3 = event => {
        this.setState({ sensor: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post('http://localhost:8080/medicion', {
            fecha: this.state.fecha,
            temperatura: this.state.temperatura,
            sensor:{
                sensorId: this.state.sensor,
            }
        }) 
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    render() {
        return (
            <div>
                <h4>ADD MEDICIÓN</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Fecha</label>
                        <input type="text" className="form-control" placeholder="Fecha" name="fecha" onChange={this.handleChange1}/>
                        <small id="emailHelp" className="form-text text-muted">Fechad de la medicion.</small>
                    </div>
                    <div class="form-group">
                        <label>Tempretura</label>
                        <input type="text" className="form-control" placeholder="Temperatura" name="temperatura" onChange={this.handleChange2}/>
                        <small id="emailHelp" className="form-text text-muted">Temperatura de la medicion.</small>
                    </div>
                    <div class="form-group">
                        <label>Sensor</label>
                        <input type="text" className="form-control" placeholder="Sensor" name="sensor" onChange={this.handleChange3}/>
                        <small id="emailHelp" className="form-text text-muted">Sensor de la medicion.</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Medicion</button>
                </form> 
            </div>                       
        )
    }
}