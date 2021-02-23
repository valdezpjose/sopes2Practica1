import React, {Component} from 'react';
import CanvasJSReact from './canvasjs.react';
import axios from 'axios';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints =[];




class ChartEdad extends Component{
	constructor() {
		super();
		this.state = {value: []};
	  }
	  
    render(){
        const options = {
			theme: "light2",
			title: {
				text: "Arbol de procesos"
			},
			data: [{
				type: "column",
				dataPoints: dataPoints
			}]
		}
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Estado</th>
							<th>Padre</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.value.map(product =>(
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.usrid}</td>
                                <td>{product.state}</td>
								<td>{product.parent}</td>
                                <td>
                                <button
                                    onClick={async () => {
										const body = {"pid": product.id}
										const data = await axios.delete('http://18.222.207.135:5000/killProc',{data:body});
										window.location.reload(true);
										console.log(data);
									}}
                                    className="btn btn-danger btn-sm">
                                 {" "}
                                 Borrar
                                 </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            );
    }

	 
    async componentDidMount(){
		var chart = []
		const data = await fetch('http://18.222.207.135:5000/getProcs').then(function(response) {
			return response.text();
		})
		.then(function(data) {
			const json = JSON.parse(data.replace(/;/g,':'));
			json.splice( 0, 1 );
			return json;
			
		});
		this.setState({value: data});
	}


}




export default ChartEdad;