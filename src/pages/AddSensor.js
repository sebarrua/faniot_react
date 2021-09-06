import React from 'react';
import axios from 'axios';

export default class AddSensor extends React.Component {
    state = {
        nombre: '',
        descripcion: '',
    };

    handleChange1 = event => {
        this.setState({ nombre: event.target.value });
    }
    handleChange2 = event => {
        this.setState({ descripcion: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post('http://localhost:8080/sensor', {
            nombre: this.state.nombre,
            descripcion: this.state.descripcion,
        }) 
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }
    /**
     *  <form onSubmit={this.handleSubmit}>
                <label>NOMBRE:  <input type="text" name="nombre" onChange={this.handleChange1}/></label><br/>
                <label>DESCRIPCION:  <input type="text" name="descripcion" onChange={this.handleChange2}/></label><br/>
                <button type="submit">Add Sensor</button>
            </form>
     * @returns 
     */

    render() {
        return (
            <div>
                <h4>ADD SENSOR</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" className="form-control" placeholder="Nombre" name="nombre" onChange={this.handleChange1}/>
                        <small id="emailHelp" className="form-text text-muted">Ingrese el nombre del sensor.</small>
                    </div>
                    <div class="form-group">
                        <label>Descripcion</label>
                        <input type="text" className="form-control" placeholder="Descripcion" name="descripcion" onChange={this.handleChange2}/>
                        <small id="emailHelp" className="form-text text-muted">Ingrese la descripcion del sensor.</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Sensor</button>
                </form> 
            </div>                       
        )
    }
}