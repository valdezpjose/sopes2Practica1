import React, {Component} from 'react';
import CanvasJSReact from './canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints =[];


class Chart extends Component{
    

    render(){
        const options = {
			theme: "light2",
			title: {
				text: "Porcentaje de uso de RAM"
			},
			data: [{
				type: "doughnut",
				dataPoints: dataPoints,
				startAngle: 60,
		//innerRadius: 60,
		indexLabelFontSize: 17,
		indexLabel: "{label} - #percent%",
		toolTipContent: "<b>{label}:</b> {y} (#percent%)",
			}]
		}
        return (
            <div>
                <CanvasJSChart options = {options} 
                     onRef={ref => this.chart = ref}
                />
                {}
            </div>
            );
    }

    componentDidMount(){
		var chart = this.chart;
		fetch('http://18.222.207.135:5000/getRam')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			dataPoints.push({
				label: "ram usada",
				y: data.used
			});
			dataPoints.push({
				label: "ram libre",
				y: data.free
			});
			chart.render();
		});
	}

}




export default Chart;