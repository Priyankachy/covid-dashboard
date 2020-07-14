import { AfterViewInit, Component } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  statesMapURL: string = '/assets/indiamap.geojson';
  map;
  statesData;
  

  constructor(private apiService: DataServiceService) { }

  ngAfterViewInit(): void {
    this.initMap();
  }
  public initMap(): void {
    this.map = L.map('map').setView([20.5937, 78.9629], 4) 
    
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.light'
  }).addTo(this.map);

  
  this.apiService.getIndiaMap(this.statesMapURL).subscribe((res:any) =>{
    this.statesData = res
    console.log('I was actually called')
    console.log(this.statesData);
    var geojson
    geojson = L.geoJson(this.statesData, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(this.map);
  
  var info = L.control();

  info.onAdd = function (map) {
    info._div = L.DomUtil.create('div', 'info');
    console.log('I got added')
    info.update();

		return info._div;
  };
  
  info.update = function (props) {
		// this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
		// 	'<b>' + props.name"" + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
    // 	: 'Hover over a state');
    console.log(props);
    console.log(props.NAME_1);
    info._div.innerHTML = '<h4> PC </h4>';
	};

  info.addTo(this.map);
  
  function getColor(d) {
		return d > 1000 ? '#800026' :
				d > 500  ? '#BD0026' :
				d > 200  ? '#E31A1C' :
				d > 100  ? '#FC4E2A' :
				d > 50   ? '#FD8D3C' :
				d > 20   ? '#FEB24C' :
				d > 10   ? '#FED976' :
							'#FFEDA0';
  }
    function highlightFeature(e) {
      var layer = e.target;
  
      layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
      });
  
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
  
      info.update(layer.feature.properties);
    }
    
  
    function resetHighlight(e) {
      geojson.resetStyle(e.target);
      info.update();
    }
  
    function zoomToFeature(e) {
      L.map('map').fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
    }

  

	

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.density)
		};
	}

	

	
  this.map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 10, 20, 50, 100, 200, 500, 1000],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(this.map);

   
  });

  
  }
  
}


