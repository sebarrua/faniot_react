import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                
                <span className="navbar-brand" href="#">FANIOT</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <Link to="/sensor" className="nav-link active" aria-current="page">Sensores</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/addSensor" className="nav-link" aria-current="page">Add Sensores</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/medicion" className="nav-link" aria-current="page">Mediciones</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/addMedicion" className="nav-link" aria-current="page">Add Medicion</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}