
// ***********  VALORES INICIALES ************* //
unidades1 = ['UMF 01 Oaxaca','UMF 38 FFCC.','UMF 65 Sta Lucia del Camino','UMF 64 Tuxtepec','UMF 13 Cuicatlán','UMF 05 Sto.Dgo.Tehuantepec',
			'UMF 06 Juchitán','UMF 17 Magdalena Apasco','UMF 12 Sto. Domingo Ingenio','UMF 23 Cd. Ixtepec','UMF 27 Ocotlán','UMF 31 Zimatlán de Álvarez',
			'UMF 30 San Pedro Tapanatepec','UMF 40 Ixtlan de Juárez','UMF 32 Puerto Escondido','UMF 33 Pedro Pochutla','UMF 29 Barrio La Soledad',
			'UMF 26 Pinotepa','UMF 58 Teotitlán','UMF 57 San Pablo Villa de Etla','UMF 56 San Pablo Huitzo','UMF 59 Loma Bonita','UMRM 21 Tamazulapan','UMAA Oaxaca'];
unidades2 = ['HGZ 01 Oaxaca','HGZMF 02 Salina Cruz','HGZ 03 Tuxtepec','HGSMF 41 Huatulco','Oaxaca'];
nombres_unidades = ['Oaxaca', 'UMF 01 Oaxaca','UMF 38 FFCC.','UMF 65 Sta Lucia del Camino','UMF 64 Tuxtepec','UMF 13 Cuicatlán','UMF 05 Sto.Dgo.Tehuantepec',
					'UMF 06 Juchitán','UMF 17 Magdalena Apasco','UMF 12 Sto. Domingo Ingenio','UMF 23 Cd. Ixtepec','UMF 27 Ocotlán','UMF 31 Zimatlán de Álvarez',
					'UMF 30 San Pedro Tapanatepec','UMF 40 Ixtlan de Juárez','UMF 32 Puerto Escondido','UMF 33 Pedro Pochutla','UMF 29 Barrio La Soledad',
					'UMF 26 Pinotepa','UMF 58 Teotitlán','UMF 57 San Pablo Villa de Etla','UMF 56 San Pablo Huitzo','UMF 59 Loma Bonita','UMRM 21 Tamazulapan','UMAA Oaxaca',
					'HGZ 01 Oaxaca','HGZMF 02 Salina Cruz','HGZ 03 Tuxtepec','HGSMF 41 Huatulco'];

const meses = [
	"enero", "febrero", "marzo", "abril", "mayo", "junio",
	"julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

indicadores_nombres = { 'DM 01' : 'Cobertura de detección de diabetes 20+ años.' }

labels = ["Esperado", "Bajo", "Medio", "Sin datos"];
colors_desempeños = ["green", "red", "orange", "lightgray"];
colors = ["green", "red", "orange", "lightgray"];
fechas = ['diciembre 2024', 'enero 2025', 'febrero 2025', 'marzo 2025', 'abril 2025', 'mayo 2025', 'junio 2025', 'julio 2025', 'agosto 2025', 'septiembre 2025'];

mes_deseado = fechas[fechas.length - 1].split(' ')[0];
año_deseado = fechas[fechas.length - 1].split(' ')[1];;
fecha_deseada = '';//mes_deseado.concat(' ', año_deseado);
console.log(`La fecha predeterminada es: ${fecha_deseada}`);

desempeño = 'Bajo';
color_deseado = 'red';
console.log(`El desempeño predeterminado es: ${desempeño}, color: ${color_deseado}`);

unidad_deseada = 'Oaxaca';
indicador_deseado = 'DM 01';
console.log(`La unidad predeterminada es: ${unidad_deseada} y el indicador predeterminado es: ${indicador_deseado}`);

// ---------- RANKING ------------------ //
nivel_deseado = 'Primer Nivel';
procesos = ['DM', 'EH', 'CAMama', 'CACU', 'Materna', 'Neonatal', 'S.Ob'];
normativos = ['CUPN', 'CUSN', 'IAAS', 'CVE', 'CES','HOSP', 'CIS'];

puntoResaltado = null;
n_indicadores = "--";

selectedMonth = ''; //meses.indexOf(mes_deseado);
currentYear = año_deseado;

// ***********  VALORES INICIALES ************* //

// *****************  HEADER ****************** //
const loader = document.getElementById('loader-overlay');
let selector_unidad = document.getElementById('unidad_select');
selector_unidad.textContent = unidad_deseada;
// Agregar opciones basadas en tus arrays
nombres_unidades.forEach((unidad) => {
	const option = document.createElement("option");
	option.value = unidad; 
	option.textContent = unidad;  // Usar el primer array para el texto visible
	selector_unidad.appendChild(option);
});

// *****************  HEADER ****************** //

// ***********  GRAFICAS INICIALES ************* //

Plotly.newPlot("desempeños", 
	[
		{
			type: "pie",
			values: [1, 1, 1, 1],
			labels: labels,
			marker: { colors: colors_desempeños	},
			textinfo: "label+percent",
			insidetextorientation: "horizontal",
			hole: 0.3,
			hovertemplate: '<b>%{label}</b> — %{percent:.1%}<br><b>%{value}</b> indicadores.<extra></extra>',
		}
	], 
	{
		title: {
			text: `<b>${unidad_deseada}</b>`,
			font: { size: 24 },
			x: 0.5,
			y: 0.95
		},
		margin: { t: 50, b: 40, l: 0, r: 0 }, // Márgenes ajustados
		plot_bgcolor: 'rgba(0,0,0,0)', // Fondo transparente
		paper_bgcolor: 'rgba(0,0,0,0)',
		annotations: [{  // Texto en el centro
			text: `<b>No.<br>indicadores:<br><br><span style="font-size:20px; margin:25px;">${n_indicadores}</span><b>`,
			font: { size: 11 },
			showarrow: false,
			x: 0.5,  // Posición X (0-1)
			y: 0.5,  // Posición Y (0-1)
			xanchor: 'center',
			yanchor: 'middle',
			align: 'center'
		}],
		showlegend: false,
		hoverlabel: {
			shadow: {
				color: 'rgba(0,0,0,0.5)',
				x: 3,
				y: 3,
				blur: 10
			}
		},
		font: {
			family: 'Noto Sans',
			size: 16,
			weight: 'bold',
			color: 'black'
		},
		hovermode: 'closest',
		animations: {
			enabled: true,
			easing: 'elastic-in-out'
		}
	}
); // desempeños

Plotly.newPlot("indicadores_x_desempeño", 
	[
		{
			type: "bar",
			x: ['01', '02', '03', '04', '05', '06', '07', '08'],
			y: [1, 0.75, 0.5, 0.25, 1, 0.75, 0.45, 0.9],
			cliponaxis: false,
			texttemplate: '<b>%{y:.1f}</b>',
			textangle: -45,
			marker: { color: color_deseado },
			textposition: 'outside'
		},
		{
			type: "scatter",
			mode: "lines+markers",
			x: ['01', '02', '03', '04', '05', '06', '07', '08'],
			y: [1, 0, 0, 0, 1, 0, 0, 0],
			line: {
				shape: "hvh",  // step graph: horizontal-vertical
				color: 'black',
				width: 1,
				dash: 'dot' // (dot, dash)
			},
			marker: {
				color: 'orange',
				symbol: 'circle',
				size: 15
			},
			hovertemplate: "Limite rango: %{y:.2f}<extra></extra>"
		}		
	], 
	{
		title: {
			text: `Indicadores con desempeño ${desempeño}, ${fecha_deseada}`,
			font: { size: 24 },
			x: 0.5,
			y: 0.98
		},
		margin: { b: 90, r: 10, l: 30, t:80 },
		plot_bgcolor: 'rgba(0,0,0,0)', // Fondo transparente
		paper_bgcolor: 'rgba(0,0,0,0)',
		showlegend: false,
		hoverlabel: {
			bgcolor: 'white',
			font: { weight: 'normal' },
			shadow: {
				color: 'rgba(0,0,0,0.5)',
				x: 3,
				y: 3,
				blur: 10
			}
		},
		font: {
			family: 'Noto Sans',
			size: 16,
			weight: 'bold',
			color: 'black'
		},
		hovermode: 'x unified',
		uniformtext: {
			mode: 'show',
			minsize: 12   // Tamaño mínimo de fuente
		},
		xaxis: { showgrid: false },
		yaxis: { showgrid: false }
	}
); // indicadores_x_desempeño

Plotly.newPlot("indicadores_historico", 
	[
		{
			type: "scatter",
			x: ['enero 2025', 'febrero 2025', 'marzo 2025', 'abril 2025', 'mayo 2025', 'junio 2025'],
			y: [1, 0.2, 0.3, 1, 0.5, 1],
			cliponaxis: false,
			texttemplate: '<b>%{y:.2f}<b>',
			textangle: -45,
			marker: { color: color_deseado },
			textposition: 'outside'
		},
		{
			type: "scatter",
			mode: "lines+markers",
			x: ['enero 2025', 'febrero 2025', 'marzo 2025', 'abril 2025', 'mayo 2025', 'junio 2025'],
			y: [0.75, 0.5, 0.24, 1, 0, 0.6],
			line: {
				shape: "hvh",  // step graph: horizontal-vertical
				color: 'black',
				width: 1,
				dash: 'dot' // (dot, dash)
			},
			marker: {
				color: 'orange',
				symbol: "circle",
				size: 15
			},
			hovertemplate: ""
		}
	], 
	{
		title: {
			text: `<span style="font-size:10px;">Histórico</span><br>${indicador_deseado} - ${unidad_deseada}`,
			font: {	size: 24 },
			x: 0.5,
			y: 0.98 
		},
		margin: { b: 110, t:80, l:10, r:5 },   
		plot_bgcolor: 'rgba(0,0,0,0)',
		paper_bgcolor: 'rgba(0,0,0,0)',
		showlegend: false,
		hoverlabel: { 
			bgcolor: 'white',
			font: { weight: 'normal' },
			shadow: {
				color: 'rgba(0,0,0,0.5)',
				x: 3,
				y: 3,
				blur: 10
			}
		},
		font: {
			family: 'Noto Sans',
			size: 16,
			weight: 'bold',
			color: 'black'
		},
		hovermode: 'x unified',
		uniformtext: {
			mode: 'show', // Oculta etiquetas que no caben
			minsize: 12   // Tamaño mínimo de fuente
		},
		yaxis: {
			showticklabels: false,
			showgrid: false
		},
		xaxis: {
			unifiedhovertitle: { text: '<b>%{x}</b>' },
			tickangle: -90, 
			tickfont: {	size: 13 }
		}
	}
); // indicadores_historico

Plotly.newPlot("indicador_numden",
	[{
		x: [0,1,2,3,4,5],
		y: [0,1,2,3,4,5],
		z: [null, 1, null, 1, null, 1],
		type: 'contour',
		contours: {
			coloring: 'heatmap',
			showlabels: false
		},
		colorscale: [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,200,200,0.3)']],
		text: '',
		hoverinfo: 'text',
		showscale: false
	}],
	{
		legend: {
			x: 0.01,
			y: 0.90,
			xanchor: 'left',
			yanchor: 'top',
			bgcolor: 'rgba(0,0,0,0)'//'whitesmoke'
		},
		title: {
			text: 'Para actualizar, presione el botón 《 Actualizar Gráfica 》.',
			font: { size: 20 },
			x: 0.5,
			y: 0.95
		},
		font: {
			family: 'Noto Sans',
			color: 'black',
			size: 16,
			weight: 'bold'
		},
		xaxis: { title: 'Den' },
		yaxis: { title: 'Num' },
		margin: {r: 10, b: 60, t: 50}
	}
); // indicador_numden

Plotly.newPlot("ranking_general_1N",
	[{
		type: "bar",
		x: ['DM', 'EH', 'CAMama', 'CACU', 'Materna', 'Neonatal', 'Sob y Obesidad', 'CUPN', 'CUSN'],
		y: [1, 0.75, 0.5, 0.25, 1, 0.8, 0.5, 0.25, 0.6],
		cliponaxis: false,
		textposition: 'outside',
		texttemplate: '<b>%{y:.2f}</b>',
		marker: { color: color_deseado },
		hoverlabel: {
			bgcolor: color_deseado,
			font: { color: (color_deseado=='orange' ? 'black':'white') }
		}
	}],
	{
		title: {
			text: `Ranking de Primer Nivel, ${fecha_deseada}`,
			font: { size: 24 },
			x: 0.5
		},
		font: {
			family: 'Noto Sans',
			color: 'black',
			weight: 'bold',
			size: 16
		},
		plot_bgcolor: 'rgba(0,0,0,0)',
		paper_bgcolor: 'rgba(0,0,0,0)',
		showlegend: false,
		margin: { b: 180, l:10, r:5, t:50 },
		yaxis: { showticklabels: false, showgrid: false },
		uniformtext: {
			minsize: 14   // Tamaño mínimo de fuente
		},
		xaxis: {
			tickangle: -90, //
			tickfont: {	size: 12 }
		}
	}
); // ranking_general_1N

Plotly.newPlot("ranking_indicador_1N", 
	[
		{
			type: "bar",
			x: ['DM', 'EH', 'CAMama', 'CACU', 'Materna', 'Neonatal', 'Sob y Obesidad', 'CUPN', 'CUSN'],
			y: [1, 0.75, 0.5, 0.25, 1, 0.8, 0.5, 0.25, 0.6],
			cliponaxis: false,
			texttemplate: ' ',
			marker: { 
				color: 'rgba(0,88,78,1)',
				line: {color: 'rgba(0,88,78,1)', width: 1}
			},
			hoverlabel: {
				bgcolor: color_deseado,
				font: { color: (color_deseado=='orange' ? 'black':'white') }
			},
			margin: { b: 150 },
			showlegend: false,
			name: 'Pond. Obtenida'
		},
		{
			type: "bar",
			x: ['DM', 'EH', 'CAMama', 'CACU', 'Materna', 'Neonatal', 'Sob y Obesidad', 'CUPN', 'CUSN'],
			y: [1, 0.75, 0.5, 0.25, 1, 0.8, 0.5, 0.25, 0.6],
			cliponaxis: false,
			texttemplate: ' ',
			marker: { 
				color: 'rgba(0,88,78,.25)',
				line: {color: 'rgba(0,88,78,1)', width: 1}
			},
			hoverlabel: {
				bgcolor: color_deseado,
				font: { color: (color_deseado=='orange' ? 'black':'white') }
			},
			margin: { b: 150 },
			showlegend: false,
			name: 'Pond. Faltante'
		}
	], 
	{
		title: {
			text: `Ponderación obtenida vs estimada<br> - ${unidad_deseada}, ${fecha_deseada}`,
			font: { size: 20 },
			x: 0.5,
			y: 0.95
		},
		font: {
			family: 'Noto Sans',
			color: 'black',
			weight: 'bold',
			size: 16
		},
		plot_bgcolor: 'rgba(0,0,0,0)',
		paper_bgcolor: 'rgba(0,0,0,0)',
		uniformtext: {
			minsize: 14   // Tamaño mínimo de fuente
		},
		barmode: 'stack'
	}
); // ranking_indicador_1N 

Plotly.newPlot("ranking_general_2N",
	[{
		type: "bar",
		x: ['Materna', 'Neonatal', 'CUSN', 'HOSP', 'IAAS', 'CES'],
		y: [1, 0.75, 0.5, 0.25, 1, 0.8],
		cliponaxis: false,
		textposition: 'outside',
		texttemplate: '<b>%{y:.2f}</b>',
		marker: { color: color_deseado },
		hoverlabel: {
			bgcolor: color_deseado,
			font: { color: (color_deseado=='orange' ? 'black':'white') }
		}
	}],
	{
		title: {
			text: `Ranking de Segundo Nivel, ${fecha_deseada}`,
			font: { size: 24 },
			x: 0.5
		},
		font: {
			family: 'Noto Sans',
			color: 'black',
			weight: 'bold',
			size: 16
		},
		plot_bgcolor: 'rgba(0,0,0,0)',
		paper_bgcolor: 'rgba(0,0,0,0)',
		showlegend: false,
		margin: { b: 180, l:10, r:5, t:50 },
		yaxis: { showticklabels: false, showgrid: false },
		uniformtext: {
			minsize: 14   // Tamaño mínimo de fuente
		},
		xaxis: {
			tickangle: -90, //
			tickfont: {	size: 12 }
		}
	}
); // ranking_general_2N

Plotly.newPlot("ranking_indicador_2N", 
	[
		{
			type: "bar",
			x: ['Materna', 'Neonatal', 'CUSN', 'HOSP', 'IAAS', 'CES'],
			y: [1, 0.75, 0.5, 0.25, 1, 0.8],
			/*cliponaxis: false,*/
			texttemplate: ' ',
			marker: { 
				color: 'rgba(0,88,78,1)',
				line: {color: 'rgba(0,88,78,1)', width: 1}
			},
			hoverlabel: {
				bgcolor: color_deseado,
				font: { color: (color_deseado == 'orange' ? 'black':'white') }
			},
			margin: { b: 150 },
			showlegend: false,
			name: 'Pond. Obtenida'
		},
		{
			type: "bar",
			x: ['Materna', 'Neonatal', 'CUSN', 'HOSP', 'IAAS', 'CES'],
			y: [1, 0.75, 0.5, 0.25, 1, 0.8],
			/*cliponaxis: false,*/
			texttemplate: ' ',
			marker: { 
				color: 'rgba(0,88,78,.25)',
				line: {color: 'rgba(0,88,78,1)', width: 1}
			},
			hoverlabel: {
				bgcolor: color_deseado,
				font: { color: (color_deseado == 'orange' ? 'black':'white') }
			},
			margin: { b: 150 },
			showlegend: false,
			name: 'Pond. Faltante'
		}
	], 
	{
		title: {
			text: `Ponderación obtenida vs estimada<br> - ${unidad_deseada}, ${fecha_deseada}`,
			font: { size: 20 },
			x: 0.5,
			y: 0.95
		},
		font: {
			family: 'Noto Sans',
			color: 'black',
			weight: 'bold',
			size: 16
		},
		plot_bgcolor: 'rgba(0,0,0,0)',
		paper_bgcolor: 'rgba(0,0,0,0)',
		uniformtext: {
			minsize: 14   // Tamaño mínimo de fuente
		},
		barmode: 'stack'
	}
); // ranking_indicador_2N  

// ***********  GRAFICAS INICIALES ************* //

// ************* TABLAS INICIALES ************** //
let grupo_indicadores = {};

const data = [
	{
		indicador: 'Oaxaca',
		ponderacion_obtenida: 0.15,
		ponderacion_estimada: 0.00,
		ponderacion_ajustada: 0.03,
		_children: [
			{
				id: "ps",
				indicador: "Procesos de Salud",
				ponderacion_obtenida: 66.15,
				ponderacion_estimada: 87.00,
				ponderacion_ajustada: 76.03,
				_children: [
					{ indicador: "DM", ponderacion_obtenida: 7.02, ponderacion_estimada: 20, ponderacion_ajustada: 35.11 },
					{ indicador: "EH", ponderacion_obtenida: 13.39, ponderacion_estimada: 16, ponderacion_ajustada: 83.68 },
					{ indicador: "CAMama", ponderacion_obtenida: 15.23, ponderacion_estimada: 16, ponderacion_ajustada: 95.16 },
					{ indicador: "CACU", ponderacion_obtenida: 14.74, ponderacion_estimada: 15, ponderacion_ajustada: 98.30 },
					{ indicador: "Materna", ponderacion_obtenida: 4.00, ponderacion_estimada: 4, ponderacion_ajustada: 100 },
					{ indicador: "Neonatal", ponderacion_obtenida: 4.00, ponderacion_estimada: 4, ponderacion_ajustada: 100 },

					{
						indicador: "S.Ob",
						ponderacion_obtenida: 7.77,
						ponderacion_estimada: 12,
						ponderacion_ajustada: 64.75,
						_children: [
							{ indicador: "S.Ob 01", ponderacion_obtenida: 3.82, ponderacion_estimada: 4, ponderacion_ajustada: 95.46 },
							{ indicador: "S.Ob 02", ponderacion_obtenida: 3.95, ponderacion_estimada: 4, ponderacion_ajustada: 98.79 },
							{ indicador: "S.Ob 04", ponderacion_obtenida: 0.00, ponderacion_estimada: 4, ponderacion_ajustada: 0.00 },
						]
					},
				]
			},
			{
				id: "cn",
				indicador: "Coordinaciones Normativas",
				ponderacion_obtenida: 14.77,
				ponderacion_estimada: 15.00,
				ponderacion_ajustada: 98.45,
				_children: [
					{ indicador: "CUPN", ponderacion_obtenida: 10.77, ponderacion_estimada: 11, ponderacion_ajustada: 97.89 },
					{ indicador: "CES",  ponderacion_obtenida: 4.00,  ponderacion_estimada: 4,  ponderacion_ajustada: 100 },
				]
			}
		]
	}
];

const data_2 = [
	{
		indicador: 'DM',
		mes_ant: '15.00',
		mes_act: '15.00',
		diferencia: '0.00'
	},
	{
		indicador: 'EH',
		mes_ant: '15.44',
		mes_act: '15.40',
		diferencia: '-0.04'
	},
	{
		indicador: 'CAMama',
		mes_ant: '6.08',
		mes_act: '6.86',
		diferencia: '0.78'
	},
	{
		indicador: 'CACU',
		mes_ant: '13.76',
		mes_act: '13.79',
		diferencia: '0.03'
	}
];

tabla_ranking_1 = new Tabulator("#tabla_1", {
	data: data,
	//layout: "fitColumns",
	//selectableRows:true,
	columnDefaults:{
		headerSort: false,  // <--- ESTO desactiva el ordenamiento
	},

	// Enable tree structure
	dataTree: true,
	dataTreeChildField: "_children",
	dataTreeSelectPropagate: true,
	dataTreeStartExpanded: [true, true, false],

	columns: [
		/*{ title: 'n', formatter: 'rownum', hozAlign: "center", },*/
		{ title: "Indicadores<br>1° Nivel", field: "indicador", width: 300, tooltip: function(e, cell) {
				if (!cell || typeof cell.getRow !== "function") return null;		
				const row = cell.getRow();
				let depth = 0;
				let parent = row.getTreeParent();
				while (parent) {
					depth++;
					parent = parent.getTreeParent();
				}
				if (depth === 3) return "Hola";
				return null;
			}
		},
        { title: "Ponderación<br>Obtenida", field: "ponderacion_obtenida", hozAlign: "center", formatter: formato2decimas, width: 150 },
        { title: "Ponderación<br>Estimada", field: "ponderacion_estimada", hozAlign: "center", formatter: formato2decimas, width: 150 },
        { title: "Ponderación<br>Ajustada", field: "ponderacion_ajustada", hozAlign: "center", formatter: formato2decimas, width: 150, formatter: function(celda, formatterParams) {
			let value = Number(celda.getValue());
			if (!value & value != 0)
				return celda.getValue();
			value = Number(celda.getValue()).toFixed(2);
			const el = celda.getElement();
			el.style.weight = 'bold';
			if (value < 60) {
				el.style.backgroundColor = "red";
				el.style.color = "white";
			} else if (value >= 60 && value <= 80) {
				el.style.backgroundColor = "yellow";
				el.style.color = "black";
			} else if (value > 80) {
				el.style.backgroundColor = "green";
				el.style.color = "white";
			}
			return value; // show the number
			
		}},
    ],
});

tabla_ranking_2 = new Tabulator("#tabla_2", {
	data: data,
	//layout: "fitColumns",
	//selectableRows:true,
	columnDefaults:{
		headerSort: false,  // <--- ESTO desactiva el ordenamiento
	},

	// Enable tree structure
	dataTree: true,
	dataTreeChildField: "_children",
	dataTreeSelectPropagate: true,
	dataTreeStartExpanded: [true, true, false],
	columns: [
		/*{ title: 'n', formatter: 'rownum', hozAlign: "center", },*/
		{ title: "Indicadores<br>2° Nivel/Delegacional", field: "indicador", width: 300, tooltip: function(e, cell) {
				if (!cell || typeof cell.getRow !== "function") return null;		
				const row = cell.getRow();
				const nombre_indicador_ = row.getData().indicador;
				const descr_indicador_ = indicadores_nombres[nombre_indicador_] ? indicadores_nombres[nombre_indicador_] : '-';
				let depth = 0;
				let parent = row.getTreeParent();
				while (parent) {
					depth++;
					parent = parent.getTreeParent();
				}
				if (depth === 3) return descr_indicador_;
				return null;
        }},
        { title: "Ponderación<br>Obtenida", field: "ponderacion_obtenida", hozAlign: "center", formatter: formato2decimas, width: 150 },
        { title: "Ponderación<br>Estimada", field: "ponderacion_estimada", hozAlign: "center", formatter: formato2decimas, width: 150 },
        { title: "Ponderación<br>Ajustada", field: "ponderacion_ajustada", hozAlign: "center", formatter: formato2decimas, width: 150, formatter: function(celda, formatterParams) {
			let value = Number(celda.getValue());
			if (!value & (value != 0))
				return celda.getValue();
			value = Number(celda.getValue()).toFixed(2);
			const el = celda.getElement();
			el.style.weight = 'bold';
			if (value < 60) {
				el.style.backgroundColor = "red";
				el.style.color = "white";
			} else if (value >= 60 && value <= 80) {
				el.style.backgroundColor = "yellow";
				el.style.color = "black";
			} else if (value > 80) {
				el.style.backgroundColor = "green";
				el.style.color = "white";
			}
			return value; // show the number
		}},
    ],
});

tabla_ranking_comp_1 = new Tabulator("#tabla_rank_comp_1", {
    data: data_2,
    // Enable tree structure
    dataTree: true,
    dataTreeSelectPropagate: true,
    columns: [
    	{ title: 'n', formatter: 'rownum', hozAlign: "center", },
        { title: "Indicadores", field: "indicador", width: 140, },
        { title: "Mes anterior", field: "mes_ant", hozAlign: "center", formatter: formato2decimas, width: 180 },
        { title: "Mes actual", field: "mes_act", hozAlign: "center", formatter: formato2decimas, width: 180 },
        { title: "Diferencia", field: "diferencia", hozAlign: "center", formatter: formatoTablaAnalisis_2, width: 180 },
    ],
});

tabla_ranking_comp_21 = new Tabulator("#tabla_rank_comp_21", {
    data: data_2,
    // Enable tree structure
    dataTree: true,
    dataTreeSelectPropagate: true,
    columns: [
    	{ title: 'n', formatter: 'rownum', hozAlign: "center", },
        { title: "Indicadores", field: "indicador", width: 200, tooltip: function(e, cell) {
				if (!cell || typeof cell.getRow !== "function") return null;		
				const row = cell.getRow();
				const nombre_indicador_ = row.getData().indicador;
				const descr_indicador_ = indicadores_nombres[nombre_indicador_] ? indicadores_nombres[nombre_indicador_] : '-';
				let depth = 0;
				let parent = row.getTreeParent();
				while (parent) {
					depth++;
					parent = parent.getTreeParent();
				}
				if (depth === 3) return descr_indicador_;
				return null;
        }},
        { title: "Mes anterior", field: "mes_ant", hozAlign: "center", formatter: formato2decimas, width: 180 },
        { title: "Mes actual", field: "mes_act", hozAlign: "center", formatter: formato2decimas, width: 180 },
        { title: "Diferencia", field: "diferencia", hozAlign: "center", formatter: formatoTablaAnalisis_2, width: 180 },
    ],
});

tabla_ranking_comp_22 = new Tabulator("#tabla_rank_comp_22", {
    data: data_2,
    // Enable tree structure
    dataTree: true,
    dataTreeSelectPropagate: true,
    columns: [
    	{ title: 'n', formatter: 'rownum', hozAlign: "center", },
        { title: "Indicadores", field: "indicador", width: 200, },
        { title: "Mes anterior", field: "mes_ant", hozAlign: "center", formatter: formato2decimas, width: 180 },
        { title: "Mes actual", field: "mes_act", hozAlign: "center", formatter: formato2decimas, width: 180 },
        { title: "Diferencia", field: "diferencia", hozAlign: "center", formatter: formatoTablaAnalisis_2, width: 180 },
    ],
});



// **************** FUNCIONES ***************** //
function loadFirebaseData() { 
	// Create references to your Firebase paths 
	const resultadosRef = firebase.database().ref('data'); 
	const ponderacionesRef = firebase.database().ref('rank'); 
	const descripcionRef = firebase.database().ref('desc'); 
	// Fetch all data simultaneously 
	Promise.all([ 
		resultadosRef.once('value'), 
		ponderacionesRef.once('value'), 
		descripcionRef.once('value') 
	]) 
	.then(([resultadosSnapshot, ponderacionesSnapshot, descripcionSnapshot]) => { 
		// Process resultados data (previously data_1) 
		const data_1 = resultadosSnapshot.val(); 
		datos = Object.values(data_1).map(row => ({ 
			fecha: formatearFecha(row['FECHA']), 
			unidad: row["UNIDAD"], 
			ind: row["IND"], 
			indicador: row["INDICADOR"], 
			nombre_indicador: row["NOMBRE INDICADOR"], 
			valor: parseFloat(row["VALOR"]), 
			color: calcularColor(row["VALOR"], row["ESPERADO"], row["MEDIO"], row["BAJO"]), 
			esperado: obtenerRangoNumero(row['ESPERADO']), 
			medio: obtenerRangoNumero(row['MEDIO']), 
			bajo: obtenerRangoNumero(row['BAJO']), 
			esperado_: row['ESPERADO'], 
			medio_: row['MEDIO'], 
			bajo_: row['BAJO'], 
			numerador: row['NUM'], 
			denominador: row['DEN'] 
		})); 

		// Process ponderaciones data (previously data_2) 
		const data_2 = ponderacionesSnapshot.val();
		datos_pond = Object.values(data_2).map(row => ({ 
			fecha: formatearFecha(row['FECHA']), 
			indicador: row['INDICADOR'], 
			unidad: row['UNIDAD MEDICA'], 
			ind: row['IND'], 
			pond_est: row['POND_ ESTIMADA'], 
			pond_obt: row['POND_ OBTENIDA'], 
			nivel: row['NIVEL'] 
		})); 

		// Process descripcion data (previously data_3) 
		const data_3 = descripcionSnapshot.val();
		datos_desc = Object.values(data_3).map(row => ({ 
			indicador: row['INDICADOR'], 
			nombre_indicador: row['NOMBRE'], 
			nombre_num: row['NUM'], 
			nombre_den: row['DEN'], 
			factor: row['FACTOR'], 
			den_fijo: row['DEN_FIJO'] == 1 ? true : false 
		}));  

		// Call any functions that depend on this data 
		//initializeAfterDataLoad(); 
		fechas = obtenerFechas(datos);
		fecha_deseada = fechas[fechas.length - 1];
		mes_deseado = fecha_deseada.split(' ')[0];
		selectedMonth = meses.indexOf(mes_deseado);
		console.log('La ultima fecha es: ', fecha_deseada);
		console.log("Termina de comunicarse. Comienza a graficar.");
		datos_desc.forEach(row => {
			indicadores_nombres[row.indicador] = row.nombre_indicador;
		});
		updateYearDisplay();
		updateSelectedMonth();
		ActualizarCadaGrafica(1);
		//actualizarGraficaNumDen(datos, unidad_deseada, indicador_deseado, fecha_deseada);

		document.getElementById('loader-overlay').style.display = 'none';
		loader.classList.remove('show-loader');		
	}) 
	.catch(error => { 
		console.error("Error loading Firebase data:", error); 
		// Add error handling UI here 
	}); 
}

function obtenerFechas(datos) {
	datos_ = filtrarUnidad(datos, 'Oaxaca');
	datos_ = filtrarIndicador(datos_, 'DM 01');
	fechas = datos_.map(row => row['fecha']);
	return fechas;
}

function formatearFecha(fecha) {
	const date = new Date(fecha);
	const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
					'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 
					'diciembre'];
	const mesNombre = meses[date.getMonth()];
	const año = date.getFullYear();
	return `${mesNombre} ${año}`;
}

function colorByPonderacion(resultado){
	if (resultado >= 80) return 'rgba(0,88,78,1)';
	if (resultado >= 60) return 'rgba(255,192,0,1)';
	return 'rgba(255,0,0,1)';
}

function textColorByPonderacion(resultado){
	if (resultado >= 80) return 'rgba(255,255,255,1)';
	if (resultado >= 60) return 'rgba(0,0,0,1)';
	return 'rgba(255,255,255,1)';
}

function calcularColor(valor, esperado, medio, bajo) { 
	if (evaluarCondicion(valor, esperado)) { 
		return "green"; 
	} else if (evaluarCondicion(valor, bajo)) { 
		return "red"; 
	} else if (evaluarCondicion(valor, medio)) { 
		return "orange"; 
	} else { return "lightgray"; } 
}

function evaluarCondicion(numero, condicionTexto) {
    if (!condicionTexto) return false;
    condicionTexto = condicionTexto.toLowerCase().replace(/\s+/g, "");
    const condiciones = condicionTexto.split("o");
    return condiciones.some(cond => {
    	if (/^\d+(\.\d+)?$/.test(cond)) {
    		return numero === parseFloat(cond);
		} else if (/^<=\d+(\.\d+)?$/.test(cond)) {
			return numero <= parseFloat(cond.slice(2));
		} else if (/^>=\d+(\.\d+)?$/.test(cond)) {
			return numero >= parseFloat(cond.slice(2));
		} else if (/^<\d+(\.\d+)?$/.test(cond)) {
			return numero < parseFloat(cond.slice(1));
		} else if (/^>\d+(\.\d+)?$/.test(cond)) {
			return numero > parseFloat(cond.slice(1));
		} else if (/^\d+(\.\d+)?-\d+(\.\d+)?/.test(cond)) {
			const [inicio, fin] = cond.split("-").map(Number);
			return numero >= inicio && numero <= fin;
        }
		return false;
	});
}

function obtenerRangoNumero(valor){ 
	if (valor == null || valor === "") { 
		return null; 
	} 
	valor = valor.toString(); 
	valor = valor.trim(); 

	if (valor.includes("o")) { 
		const partes = valor.split("o").map(v => v.trim()); 
		return partes.map(parte => obtenerRangoNumero(parte)); // Recursivo para limpiar cada parte 
	} 

	if (valor.includes("-")) { 
		const partes = valor.split("-").map(v => parseFloat(v.trim())); 
		return [partes[0], partes[1]]; 
	} else if (valor.startsWith(">=")) { 
		return parseFloat(valor.substring(2).trim()) // { tipo: "mayorIgual", valor: parseFloat(valor.substring(2).trim()) }; 
	} else if (valor.startsWith("<=")) { 
		return parseFloat(valor.substring(2).trim()) // { tipo: "menorIgual", valor: parseFloat(valor.substring(2).trim()) }; 
	} else if (valor.startsWith(">")) { 
		return parseFloat(valor.substring(1).trim()) // { tipo: "mayor", valor: parseFloat(valor.substring(1).trim()) }; 
	} else if (valor.startsWith("<")) { 
		return parseFloat(valor.substring(1).trim()) // { tipo: "menor", valor: parseFloat(valor.substring(1).trim()) }; 
	} else { return parseFloat(valor); } 
}

function updateYearDisplay() {
	//document.querySelector('.año-actual').textContent = currentYear;
	document.getElementsByClassName('selected-year')[0].textContent = currentYear;
	document.getElementsByClassName('selected-year')[1].textContent = currentYear;
}

function updateSelectedMonth() {
	document.getElementsByClassName('selected-month')[0].textContent = meses[selectedMonth];
	document.getElementsByClassName('selected-month')[1].textContent = meses[selectedMonth];
	mes_deseado = meses[selectedMonth];
	fecha_deseada = `${meses[selectedMonth]} ${currentYear}`;
	checkMonths(fecha_deseada);
}

function updateSelectedUnit() {
	document.getElementById('selected-unit').textContent = unidad_deseada;
	//ActualizarCadaGrafica(1);
}

// Checar las disponibilidad del boton en header
function checkMonths(fecha) {
	if (fecha == fechas[fechas.length - 1]){
		document.getElementById('prev-month').disabled = false;
		document.getElementById('next-month').disabled = true;
	} else if (fecha == fechas[0]){      
		document.getElementById('prev-month').disabled = true;
		document.getElementById('next-month').disabled = false;
	} else{
		document.getElementById('prev-month').disabled = false;
		document.getElementById('next-month').disabled = false;
	}
}

function insertarSaltosLinea(text, maxLineLength) {
	const words = text.split(' ');
	let line = '';
	let result = '';

	for (let word of words) {
		if ((line + word).length > maxLineLength) {
			result += line.trim() + '<br>';
			line = '';
		}
		line += word + ' ';
	}
	result += line.trim(); // Agrega la última línea
	return result;
}

function calcularError(numero, rango){
	if (Array.isArray(rango)){
		if (Array.isArray(rango[0])){
			err1 = numero - rango[0][0];
			err2 = numero - rango[0][1];
			err3 = numero - rango[1][0];
			err4 = numero - rango[1][1];
			errores = [err1, err2, err3, err4];
			errores_abs = [Math.abs(err1), Math.abs(err2), Math.abs(err3), Math.abs(err4)];
			error_ = Math.min(...errores_abs);
			index = errores_abs.indexOf(error_);
			error = errores[index];
		} else {
			err1 = numero - rango[0];
			err2 = numero - rango[1];
			error = (Math.abs(err1) < Math.abs(err2)) ? err1 : err2;
		}
	} else {
		error = numero - rango;
	}
	return error;
}

function filtrarErrores(datosFiltrados) {
	const datosConError = datosFiltrados.map(row => {
		const indicador = row['indicador'];
		const valor = row['valor'];
		const Resperado = row['esperado'];
		const Rmedio = row['medio'];
		const Rbajo = row['bajo'];
		const fecha = row['fecha'];
		const color = row['color'];

		let errorEsperado = calcularError(valor, Resperado);
		let errorMedio = calcularError(valor, Rmedio);
		let errorBajo = calcularError(valor, Rbajo);

		if (color == 'red') {
			error = (Math.abs(errorMedio) <= Math.abs(errorEsperado)) ? errorMedio : errorEsperado;
			errorColor = (Math.abs(errorMedio) < Math.abs(errorEsperado)) ? 'orange' : 'green';
		} else if (color == 'orange'){
			error = errorEsperado;
			errorColor = 'green';
		} else if (color == 'green') {
			error = (Math.abs(errorMedio) <= Math.abs(errorBajo)) ? errorMedio : errorBajo;
			errorColor = (Math.abs(errorMedio) < Math.abs(errorBajo)) ? 'orange' : 'red';
		}
		valor_esperado = valor - error;
		return {
			indicador: indicador,
			error: error,
			valor: valor,
			limite: valor_esperado,
			colorError: errorColor,
			fecha: fecha
		};
	});
	return datosConError;
}

function filtrarUnidad(datos, unidadSeleccionada){
	return datos.filter(d =>
      d.unidad === unidadSeleccionada
    );
}

function filtrarFecha(datos, fechaSeleccionada){
	return datos.filter(d =>
      d.fecha === fechaSeleccionada
    );
}

function filtrarDesempeño(datos, colorSeleccionado) {
	return datos.filter(d =>
		d.color === colorSeleccionado
	);
}

function filtrarIndicador(datos, indicadorSeleccionado){
	return datos.filter(d =>
      d.indicador === indicadorSeleccionado
    );
}

function contarColores(datosFiltrados) {
	const conteo = {
		green: 0,
		red: 0,
		orange: 0,
		lightgray: 0
	};
	datosFiltrados.forEach(d => {
	if (conteo[d.color] !== undefined) {
		conteo[d.color]++;
	}
});

return conteo;
}

function addLine(id, x2, y2, color_line, name_line){
	Plotly.addTraces(id, {
		x: x2,
		y: y2,
		mode: 'lines',
		line: {color: color_line},
		/*name: name_line,*/
		showlegend: false,
		hoverinfo: 'skip',
	});
}

function addPoint(id, x1, x2, y1, y2, f, color_line, name_line){
	x_ = x2.toLocaleString('es-mx', {maximumFractionDigits: 2});
	y_ = y2.toLocaleString('es-mx', {maximumFractionDigits: 2});
	punto_res = (y2/x2*f).toLocaleString('es-mx', {maximumFractionDigits: 2});
	Plotly.addTraces(id, {
		x: [x1, x2],
		y: [y1, y2],
		mode: 'lines',
		line: {
			dash: 'dot',
			color: color_line
			//width: 2
		},
		showlegend: false,
		hoverinfo: 'skip',
	});
	Plotly.addTraces(id, {
		x: [x2],
		y: [y2],
		type: 'scatter',
		mode: 'markers',
		marker: {
			symbol: 'star',
			size: 10,
			color: color_line,
			line: {color: 'black', width: 0.75}
		},
		showlegend: false,
		text: `Num: ${y_}<br>Den: ${x_}<br>Valor: <b>${punto_res}</b>`,
		hoverinfo: 'text',
	});
}

function addActualPoint(id, punto_den, punto_num, color_line, f, res){
	const punto_res = ((punto_num / punto_den) * f).toLocaleString('es-mx', {maximumFractionDigits: 2});
	const punto_num_ = punto_num.toLocaleString('es-mx', {maximumFractionDigits: 2});
	const punto_den_ = punto_den.toLocaleString('es-mx', {maximumFractionDigits: 2});
	Plotly.addTraces(id, {
		x: [punto_den],
		y: [punto_num],
		type: 'scatter',
		marker: {
			color: color_line,
			size: 14
		},
		text: `Num: ${punto_num_}<br>Den: ${punto_den_}<br>Valor: <b>${punto_res}</b>`,
		hoverinfo: 'text',
		textposition: 'top left',
		name: `Punto actual:<br>Num: ${punto_num_}<br>Den: ${punto_den_}<br>Valor: <b><span style="color:${color_line};">${punto_res}</span></b>`,
		legend: { font: {size: 16 } }
	});
}

function agruparRanking(datos_pond){
	const resultado_2 = {
		inds: {},
		pond_proc_obt: 0,
		pond_norm_obt: 0,
		pond_proc_est: 0,
		pond_norm_est: 0,
		pond_aju: 0,
		color: 'orange'
	};

	datos_pond.forEach(row => {
		const indicador = row.indicador;
		const ind = row.ind;
		const pond_est = parseFloat(row.pond_est) || 0;
		const pond_obt = parseFloat(row.pond_obt) || 0;
		const unidad = row.unidad;

		// Inicializa estructura

		// Inicializa estructura para grupo indicador si no existe
		if (!resultado_2.inds[ind]){
			resultado_2.inds[ind] = {
				indicadores: {},
				pond_obt: 0,
				pond_est: 0          
			};
		}

		// Inicializa estructura para indicador si no existe
		if (!resultado_2.inds[ind].indicadores[indicador]){
			resultado_2.inds[ind].indicadores[indicador] = {
				pond_obt: 0,
				pond_est: 0          
			};
		}

		// Inicializa estructura para indicador si no existe
		if (!resultado_2.inds[ind].indicadores[indicador]){
			resultado_2.inds[ind].indicadores[indicador] = {
				pond_obt: 0,
				pond_est: 0          
			};
		}

		// Suma los valores en el indicador
		resultado_2.inds[ind].indicadores[indicador].pond_obt += pond_obt;
		resultado_2.inds[ind].indicadores[indicador].pond_est += pond_est;

		// Suma los valores en el grupo indicador
		resultado_2.inds[ind].pond_obt += pond_obt;
		resultado_2.inds[ind].pond_est += pond_est;

		// Suma los totales del indicador
		if (procesos.includes(ind)){
			resultado_2.pond_proc_obt += pond_obt*0.6;
			resultado_2.pond_proc_est += pond_est*0.6;
		} else if (normativos.includes(ind)){
			resultado_2.pond_norm_obt += pond_obt*0.4;
			resultado_2.pond_norm_est += pond_est*0.4;
		}
	});

	// Calcula pond_aju para cada indicador
	resultado_2.pond_aju = ((resultado_2.pond_proc_obt/resultado_2.pond_proc_est*60) + (resultado_2.pond_norm_obt/resultado_2.pond_norm_est*40));
	if (resultado_2.pond_aju >= 80) 
		resultado_2.color = 'green';
	else if (resultado_2.pond_aju >= 60)
	resultado_2.color = 'orange';
	else
	resultado_2.color = 'red';
	return resultado_2;
}

function analisisRanking(datos_pond_fecha, nivel){
	const resultado = {};

	datos_pond_fecha.forEach(row => {
		const indicador = row.indicador;
		const ind = row.ind;
		const unidad = row.unidad;
		const pond_obt = parseFloat(row.pond_obt) || 0;
		const pond_est = parseFloat(row.pond_est) || 0;

		if (row.nivel == nivel || row.nivel == 'Ambos'){
			// Inicializa estructura para unidad si no existe
			if (!resultado[unidad]){
				resultado[unidad] = {
				inds: {},
				pond_proc_obt: 0,
				pond_norm_obt: 0,
				pond_proc_est: 0,
				pond_norm_est: 0,
				pond_aju: 0,
				color: 'orange'
				};
			}

			// Inicializa estructura para grupo indicador si no existe
			if (!resultado[unidad].inds[ind]){
				resultado[unidad].inds[ind] = {
					indicadores: {},
					pond_obt: 0,
					pond_est: 0          
				};
			}

			// Inicializa estructura para indicador si no existe
			if (!resultado[unidad].inds[ind].indicadores[indicador]){
				resultado[unidad].inds[ind].indicadores[indicador] = {
					pond_obt: 0,
					pond_est: 0     
				};
			}

			// Suma los valores en el indicador
			resultado[unidad].inds[ind].indicadores[indicador].pond_obt += pond_obt;
			resultado[unidad].inds[ind].indicadores[indicador].pond_est += pond_est;

			// Suma los valores en el grupo indicador
			resultado[unidad].inds[ind].pond_obt += pond_obt;
			resultado[unidad].inds[ind].pond_est += pond_est;

			// Suma los totales del indicador
			if (procesos.includes(ind)){
				resultado[unidad].pond_proc_obt += pond_obt*0.6;
				resultado[unidad].pond_proc_est += pond_est*0.6;
			} else if (normativos.includes(ind)){
				resultado[unidad].pond_norm_obt += pond_obt*0.4;
				resultado[unidad].pond_norm_est += pond_est*0.4;
			}
		}
	});

	// Calcula pond_aju para cada indicador
	Object.values(resultado).forEach(obj => {
		obj.pond_aju = ((obj.pond_proc_obt/obj.pond_proc_est*60) + (obj.pond_norm_obt/obj.pond_norm_est*40));
		if (obj.pond_aju >= 80)
			obj.color = 'green';
		else if (obj.pond_aju >= 60)
			obj.color = 'orange';
		else 
			obj.color = 'red';
	});
	return resultado;
}

function analisisRanking_2(datos_mes_act, datos_mes_ant) {
	const indicadores_ = Object.keys(datos_mes_ant.inds);

	const resultado = indicadores_.map(indicador_ => {
		const datoAnt = datos_mes_ant.inds[indicador_];
		const datoAct = datos_mes_act.inds[indicador_];

		const pondAnt = datoAnt ? datoAnt.pond_obt : 0;
		const pondAct = datoAct ? datoAct.pond_obt : 0;

		return {
			indicador: indicador_,
			mes_ant: pondAnt,
			mes_act: pondAct,
			diferencia: pondAct - pondAnt
		};
	});
	return resultado;//*/
}

function analisisRanking_3(datos_mes_act, datos_mes_ant) {
	const indicadores_ = Object.keys(datos_mes_ant.inds);
	peores = [];
	mejores = [];

	indicadores_.map(indicador_ => {
		const datos_ant_ind = datos_mes_ant.inds[indicador_];
		const datos_act_ind = datos_mes_act.inds[indicador_];
		const ind = Object.keys(datos_ant_ind.indicadores);

		ind.map(ind_ => {
			const datoAnt = datos_ant_ind.indicadores[ind_];
			const datoAct = datos_act_ind.indicadores[ind_];

			const pondAct = datoAct ? datoAct.pond_obt : 0;
			const pondAnt = datoAnt ? datoAnt.pond_obt : 0;
			const diferencia = pondAct - pondAnt;

			dato = {
				indicador : ind_,
				mes_ant : pondAnt,
				mes_act : pondAct,
				diferencia : pondAct - pondAnt
			};
			
			if (diferencia < 0)
				peores.push(dato);
			else if (diferencia > 0)
				mejores.push(dato);
		});
	});
	return [mejores, peores];
}

function formato2decimas(celda){
	if (Number(celda.getValue()) && Number(celda.getValue()) != 0)
		return Number(celda.getValue()).toFixed(2);
	else
		return celda.getValue();
}

function formatoTablaAnalisis(raw) {
	const result = [];

	Object.keys(raw).forEach(unidad => {
		const unidad_ = raw[unidad];
		//const unidad_ = raw;/*
		
		const umfNode = {
			indicador: unidad,
			ponderacion_obtenida: unidad_.pond_proc_obt + unidad_.pond_norm_obt,
			ponderacion_estimada: unidad_.pond_proc_est + unidad_.pond_norm_est,
			ponderacion_ajustada: unidad_.pond_aju,
			color: unidad_.color,
			_children: []
		};
		// Create 2 middle groups
			const procesosNode = {
			indicador: "Procesos Salud - Enfermedad",
			_children: []
		};

		const normativasNode = {
			indicador: "Coordinaciones Normativas",
			_children: []
		};
		// Loop each main indicator
		Object.keys(unidad_.inds).forEach(indicador => {
			const ind = unidad_.inds[indicador];

			const indNode = {
				indicador: indicador,
				ponderacion_obtenida: ind.pond_obt,
				ponderacion_estimada: ind.pond_est,
				ponderacion_ajustada: ind.pond_est > 0 ? (ind.pond_obt / ind.pond_est) * 100 : 0,
				_children: []
			};

			// Sub-indicators
			if (ind.indicadores) {
				Object.keys(ind.indicadores).forEach(sub => {
					const subInd = ind.indicadores[sub];

					indNode._children.push({
						indicador: sub,
						ponderacion_obtenida: subInd.pond_obt,
						ponderacion_estimada: subInd.pond_est,
						ponderacion_ajustada: subInd.pond_est > 0 ? (subInd.pond_obt / subInd.pond_est) * 100 : 0
					});
				});
			}

			if (indNode._children.length === 0) delete indNode._children;

			// Decide group based on array membership
			if (procesos.includes(indicador)) {
				procesosNode._children.push(indNode);
			} else if (normativos.includes(indicador)) {
				normativasNode._children.push(indNode);
			} else {
			// If indicator belongs to neither array → put in root
				umfNode._children.push(indNode);
			}
		});

		// Only add groups if they have children
		if (procesosNode._children.length > 0) umfNode._children.push(procesosNode);
		if (normativasNode._children.length > 0) umfNode._children.push(normativasNode);

		result.push(umfNode);
		});
	return result;
}

function formatoTablaAnalisis_2(celda, formatterParams, onredered) {
	value = celda.getValue();
	var displayValue = Math.abs(value).toFixed(2); 

	if(value > 0)
		return `<span style="color:#009900; font-weight:bold;">▲ ${displayValue}</span>`;
	else if(value < 0)
		return `<span style="color:#cc0000; font-weight:bold;">▼ ${displayValue}</span>`;
	else
		return `<span style="color:black; font-weight:bold;">— ${displayValue}</span>`;
}

function ActualizarCadaGrafica(paso){
	ranking_1_resultado = document.getElementById('rank_unidad_1');
	ranking_2_resultado = document.getElementById('rank_unidad_2');
	ranking_1_titulo = document.getElementById('rank_title_1');
	ranking_2_titulo = document.getElementById('rank_title_2');
	ranking_1_grafica_general = document.getElementById('ranking_general_1N');
	ranking_2_grafica_general = document.getElementById('ranking_general_2N');
	ranking_1_grafica_indicador = document.getElementById('ranking_indicador_1N');
	ranking_2_grafica_indicador = document.getElementById('ranking_indicador_2N');
	if (unidad_deseada == 'Oaxaca') { 
		ranking_1_grafica_indicador.style.maxWidth = '100%';
	} else {
		ranking_1_grafica_indicador.style.maxWidth = '30%';
		ranking_2_grafica_indicador.style.maxWidth = '50%';
	}
	if ((unidad_deseada == 'HGZ 03 Tuxtepec' | unidad_deseada == 'HGZ 01 Oaxaca')){
		ranking_1_resultado.hidden = true;
		ranking_2_resultado.hidden = false;
		ranking_1_grafica_general.hidden = true;
		ranking_2_grafica_general.hidden = false;
		ranking_1_grafica_indicador.hidden = true;
		ranking_2_grafica_indicador.hidden = false;
		ranking_2_titulo.innerHTML = '2° Nivel';
	} else if (unidad_deseada == 'HGSMF 41 Huatulco' | unidad_deseada == 'HGZMF 02 Salina Cruz'){		
		ranking_1_resultado.hidden = false;
		ranking_2_resultado.hidden = false;
		ranking_1_grafica_general.hidden = false;
		ranking_2_grafica_general.hidden = false;
		ranking_1_grafica_indicador.hidden = false;
		ranking_2_grafica_indicador.hidden = false;
		ranking_2_titulo.innerHTML = '2° Nivel';
	} else if (unidad_deseada == 'Oaxaca') {
		ranking_1_resultado.hidden = true;
		ranking_2_resultado.hidden = false;
		ranking_1_grafica_general.hidden = true;
		ranking_2_grafica_general.hidden = true;
		ranking_1_grafica_indicador.hidden = true;
		ranking_2_grafica_indicador.hidden = false;
		ranking_2_titulo.innerHTML = 'Delegacional';
	} else {
		ranking_1_resultado.hidden = false;
		ranking_2_resultado.hidden = true;
		ranking_1_grafica_general.hidden = false;
		ranking_2_grafica_general.hidden = true;
		ranking_1_grafica_indicador.hidden = false;
		ranking_2_grafica_indicador.hidden = true;
	}

	loader.style.display = 'flex';
	loader.classList.add('show-loader');
	if (paso == 1){
		datosFiltrados = actualizarGraficaDesempeñosPastel(datos, unidad_deseada, fecha_deseada, desempeño);
		actualizarGraficaDesempeñosBarras(datosFiltrados, desempeño);
		actualizarGraficaHistorico(datos, unidad_deseada, indicador_deseado);
		//actualizarGraficaNumDen(datos, unidad_deseada, indicador_deseado, fecha_deseada);
		limpiarGraficaNumDen();
		actualizarGraficaRankingGeneral_1N(datos_pond, fecha_deseada);
		pond_unidad_1 = actualizarGraficaRankingIndicador_1N(datos_pond, unidad_deseada, fecha_deseada);
		actualizarGraficaRankingGeneral_2N(datos_pond, fecha_deseada);
		pond_unidad_2 = actualizarGraficaRankingIndicador_2N(datos_pond, unidad_deseada, fecha_deseada);
	} else if (paso == 2){
		actualizarGraficaDesempeñosBarras(datosFiltrados, desempeño);
		actualizarGraficaHistorico(datos, unidad_deseada, indicador_deseado);
		//actualizarGraficaNumDen(datos, unidad_deseada, indicador_deseado, fecha_deseada);
		limpiarGraficaNumDen();
		actualizarGraficaRankingGeneral_1N(datos_pond, fecha_deseada);
		pond_unidad_1 = actualizarGraficaRankingIndicador_1N(datos_pond, unidad_deseada, fecha_deseada);
		actualizarGraficaRankingGeneral_2N(datos_pond, fecha_deseada);
		pond_unidad_2 = actualizarGraficaRankingIndicador_2N(datos_pond, unidad_deseada, fecha_deseada);
	} else if (paso == 3){
		actualizarGraficaHistorico(datos, unidad_deseada, indicador_deseado);
		//actualizarGraficaNumDen(datos, unidad_deseada, indicador_deseado, fecha_deseada);
		limpiarGraficaNumDen();
		actualizarGraficaRankingGeneral_1N(datos_pond, fecha_deseada);
		pond_unidad_1 = actualizarGraficaRankingIndicador_1N(datos_pond, unidad_deseada, fecha_deseada);
		actualizarGraficaRankingGeneral_2N(datos_pond, fecha_deseada);
		pond_unidad_2 = actualizarGraficaRankingIndicador_2N(datos_pond, unidad_deseada, fecha_deseada);
	} else if (paso == 4){
		//actualizarGraficaNumDen(datos, unidad_deseada, indicador_deseado, fecha_deseada);
		limpiarGraficaNumDen();
		actualizarGraficaRankingGeneral_1N(datos_pond, fecha_deseada);
		pond_unidad_1 = actualizarGraficaRankingIndicador_1N(datos_pond, unidad_deseada, fecha_deseada);
		actualizarGraficaRankingGeneral_2N(datos_pond, fecha_deseada);
		pond_unidad_2 = actualizarGraficaRankingIndicador_2N(datos_pond, unidad_deseada, fecha_deseada);
	}	
	actualizarAnalisis_1(pond_unidad_1, pond_unidad_2);
	actualizarAnalisis_2(datos_pond, unidad_deseada, fecha_deseada);
	loader.style.display = 'none';
}

function actualizarGraficaDesempeñosPastel(datos, unidad_deseada, fecha_deseada, desempeño) {
	const pulled = [0, 0, 0, 0];    // Posición de las secciones de desempeños (centradas o salidas)
	const datos_fechaFiltrada = filtrarFecha(datos, fecha_deseada);
	const datosFiltrados = filtrarUnidad(datos_fechaFiltrada, unidad_deseada);
	const conteo = contarColores(datosFiltrados);
	const values = [conteo.green, conteo.red, conteo.orange, conteo.lightgray];

	index_color = labels.indexOf(desempeño);
	pulled[index_color] = 0.1;      // Posición del desempeño seleccionado 
	n_indicadores = values[index_color];

	titulo = unidad_deseada;
	const reg_exp = /(?<=\d{2})\s/;
	titulo = titulo.replace(reg_exp, "<br>");
	Plotly.react("desempeños", 
	[{
		type: "pie",
		values: values,
		labels: labels,
		marker: { colors: colors_desempeños },
		textinfo: "label+percent",
		insidetextorientation: "horizontal",
		pull: pulled,
		hole: 0.3,
		hovertemplate: '<b>%{label}</b> — %{percent:.1%}<br><b>%{value}</b> indicadores.<extra></extra>',
		}], 
		{
			title: {
				text: `${titulo}`,
				font: { size: 24 },
				x: 0.5,
				y: 0.95
			},
			annotations: [{  // Texto en el centro
				text: `<b>No.<br>Indicadores:<br><br><span style="font-size:20px; margin:25px;">${n_indicadores}</span><b>`,
				font: { size: 11 },
				showarrow: false,
				x: 0.5,  // Posición X (0-1)
				y: 0.5,  // Posición Y (0-1)
				xanchor: 'center',
				yanchor: 'middle',
				align: 'center'
			}],
			showlegend: false,
			hoverlabel: {
				shadow: {
					color: 'rgba(0,0,0,0.5)',
					x: 3,
					y: 3,
					blur: 10
				}
			},
			plot_bgcolor: 'rgba(0,0,0,0)', // Fondo transparente
			paper_bgcolor: 'rgba(0,0,0,0)',
			margin: { t: 50, b: 40, l: 0, r: 0 }, // Márgenes ajustados
			font: {
				family: 'Noto Sans',
				size: 16,
				weight: 'bold',
				color: 'black'
			},
			hovermode: 'closest',
			animations: {
				enabled: true,
				easing: 'elastic-in-out'
			}
		}
	); // grafica - desempeños
	return datosFiltrados;
}

function actualizarGraficaDesempeñosBarras(datosFiltrados, desempeño){
	index_color = labels.indexOf(desempeño);
	color_deseado = colors_desempeños[index_color];

	const datosFiltrados2 = filtrarDesempeño(datosFiltrados, color_deseado);

	// Calcular errores y armar nuevo array
	const datosConError = filtrarErrores(datosFiltrados2);
	const datosConError2 = datosConError.slice();

	// Ordenar por valor absoluto del error de menor a mayor
	datosConError2.sort((a, b) => Math.abs(a.error) - Math.abs(b.error));

	// Crear arrays para la gráfica
	const indicadores = datosConError.map(row => row.indicador);
	const valores = datosConError.map(row => row.valor);
	const errores = datosConError.map(row => row.error);
	const limites = datosConError.map(row => row.limite);
	const colores = datosConError.map(row => row.colorError);
	const textos = valores.map((valor, i) => {
		const error_ = errores[i];
		const signo_ = error_ >= 0 ? "▲" : "▼"; // Usa el signo correcto
		return `Valor actual: ${valor.toFixed(2)} (${signo_}${Math.abs(error_).toFixed(2)})`;
	});

	indicador_deseado = indicadores[0];

	// Trabajo a futuro: agregar range slider and selector: https://plotly.com/javascript/range-slider/
	Plotly.react("indicadores_x_desempeño", 
	[
		{
			type: "bar",
			x: indicadores,
			y: valores,
			text: textos,
			cliponaxis: false,
			marker: { color: color_deseado },
			hovertemplate: '%{text}<extra></extra>',
			textposition: 'none',
			name: 'Valor actual'
		},
		{
			type: "scatter",
			mode: "lines+markers",
			x: indicadores,
			y: limites,
			line: {
				shape: "hvh",  // step graph: horizontal-vertical-horizontal
				color: 'black',
				width: 1,
				dash: 'dot' // (dot, dash)
			},
			marker: {
				color: colores,
				symbol: 'circle', //"cross-thin"
				size: 15
			},
			hovertemplate: "Limite rango: %{y:.2f}<extra></extra>",
			name: 'Limite rango cercano'
		},
		{
			type: "scatter",
			mode: "text",
			x: indicadores,
			y: valores, 
			text: valores.map(v => v.toFixed(2)),
			textposition: "top center",
			hoverinfo: "none", 
			cliponaxis: false,
			showlegend: false
		}
	], {
		title: {
			text: `Indicadores con desempeño ${desempeño}, ${fecha_deseada}`,
			font: { size: 24 },
			x: 0.5,
			y: 0.98
		},
		margin: { b: 90, r: 10, l: 10, t:50 },
		plot_bgcolor: 'rgba(0,0,0,0)',
		paper_bgcolor: 'rgba(0,0,0,0)',
		//showlegend: false,
		hoverlabel: { 
			bgcolor: 'white',
			font: { weight: 'normal', size: 14 },
			shadow: {
				color: 'rgba(0,0,0,0.5)',
				x: 3,
				y: 3,
				blur: 10
			}
		},
		font: {
			family: 'Noto Sans',
			size: 14,
			weight: 'bold',
			color: 'black'
		},
		hovermode: 'x unified',
		uniformtext: {
			mode: 'show', // 
			minsize: 12   // Tamaño mínimo de fuente
		},
		yaxis: { 
			showticklabels: false,
			showgrid: false
		},
		xaxis: {
			unifiedhovertitle: { text: '<b>%{x}</b>' },
			tickangle: -90, 
			tickfont: {
				size: 14
			}
		},
		legend: {
			x: 1,
			y: 1.15,
			xanchor: 'right',
			font: { size: 10 }
		}
	}); // gráfica indicadores_1
}

function actualizarGraficaHistorico(datos, unidad_deseada, indicador_deseado){
    const datos_ = filtrarUnidad(datos, unidad_deseada);
    const datosFiltrados3 = filtrarIndicador(datos_, indicador_deseado);
    datosConError = filtrarErrores(datosFiltrados3);

    // Crear arrays para la gráfica
    fechas = datosFiltrados3.map(row => row['fecha']);
    const valores = datosFiltrados3.map(row => row['valor']);
    const colores = datosFiltrados3.map(row => row['color']);
    const nombres_indicadores = datosFiltrados3.map(row => row['nombre_indicador']);
    const nombre_indicador = nombres_indicadores[0];
    const nombre_formateado = insertarSaltosLinea(nombre_indicador, 70);

    const indicadores = datosConError.map(row => row['indicadores']);
    const limites = datosConError.map(row => row['limite']);
    const errores = datosConError.map(row => row['error']);
    const colores_ = datosConError.map(row => row.colorError);
    const textos = valores.map((valor, i) => {
		const error_ = errores[i];
		const signo_ = error_ >= 0 ? "▲" : "▼"; // Usa el signo correcto
		return `${valor.toFixed(2)} (${signo_}${Math.abs(error_).toFixed(2)})`;
    });
    let index_fecha = fechas.indexOf(fecha_deseada);
    let fechas_ = [];
    let lim_inf = 0, lim_sup = 0;
    lim_sup = index_fecha+1
    
    Plotly.react("indicadores_historico", 
	[
		{
			type: "scatter",
			mode: "lines+markers",
			x: fechas.slice(lim_inf,lim_sup),
			y: limites.slice(lim_inf,lim_sup),
			line: {
				shape: "hvh",  // step graph: horizontal-vertical-horizontal
				color: 'black',
				width: 1,
				dash: 'dot' // (dot, dash)
			},
			marker: {
				color: colores_.slice(lim_inf,lim_sup),
				symbol: 'circle', //"cross-thin"
				size: 15
			},
			hovertemplate: "Limite rango: %{y:.2f}<extra></extra>",
			name: 'Límite rango cercano'
		},
		{
			type: "bar",
			x: fechas.slice(lim_inf,lim_sup),
			y: valores.slice(lim_inf,lim_sup),
			text: textos.slice(lim_inf,lim_sup),
			cliponaxis: false,
			marker: { color: colores.slice(lim_inf,lim_sup) },
			hovertemplate: '%{text}<extra></extra>',
			textposition: 'none',
			name: 'Valor actual'
		},
		{
			type: "scatter",
			mode: "text",
			x: fechas.slice(lim_inf, lim_sup),
			y: valores.slice(lim_inf, lim_sup), 
			text: valores.slice(lim_inf, lim_sup).map(v => v.toFixed(2)),
			textposition: "top center",
			hoverinfo: "skip",
			cliponaxis: false,
			showlegend: false
		}
	], 
	{
		title: {
			text: `<span style="font-size:10px;">Histórico</span><br>${nombre_formateado}<br>${indicador_deseado} — ${unidad_deseada}<br>`,
			font: {	size: 16 },
			x: 0.5,
			y: 0.98 
		},
		margin: { b: 110, t:80, l:10, r:5 },   
		plot_bgcolor: 'rgba(0,0,0,0)',
		paper_bgcolor: 'rgba(0,0,0,0)',
		//showlegend: false,
		legend: {
			x: 1,
			y: 1.15,
			xanchor: 'right',
			font: {
				size: 8
			}
		},
		hoverlabel: { 
			bgcolor: 'white',
			font: { weight: 'normal' },
			shadow: {
				color: 'rgba(0,0,0,0.5)',
				x: 3,
				y: 3,
				blur: 10
			}
		},
		font: {
			family: 'Noto Sans',
			size: 16,
			weight: 'bold',
			color: 'black'
		},
		hovermode: 'x unified',
		uniformtext: {
			mode: 'show', // Oculta etiquetas que no caben
			minsize: 12   // Tamaño mínimo de fuente
		},
		yaxis: {
			showticklabels: false,
			showgrid: false
		},
		xaxis: {
			unifiedhovertitle: { text: '<b>%{x}</b>' },
			tickangle: -90, 
			tickfont: {	size: 13 }
		}
	}); // indicadores_historico
}

async function actualizarGraficaNumDen() { //datos, unidad_deseada, indicador_deseado, fecha_deseada
	const datosFiltrados_ = filtrarUnidad(datos, unidad_deseada);
	const datosFiltrados__ = filtrarIndicador(datosFiltrados_, indicador_deseado);
	const datosFiltrados5 = filtrarFecha(datosFiltrados__, fecha_deseada);
	const datosFiltrados5_ = filtrarIndicador(datos_desc, indicador_deseado);

	let rango1 = 0;
	let rango2 = 0;
	const rangoEsperado = datosFiltrados5[0]['esperado_'];
	const rangoMedio = datosFiltrados5[0]['medio_'];
	const rangoBajo = datosFiltrados5[0]['bajo_'];
	// Valores
	const punto_num = datosFiltrados5[0]['numerador'];
	const punto_den = datosFiltrados5[0]['denominador'];
	const den_fijo = datosFiltrados5_[0]['den_fijo'];
	const f = datosFiltrados5_[0]['factor'];
	if (datosFiltrados5[0]['esperado'].length > 0){
		rango1 = datosFiltrados5[0]['esperado'][0];
		rango2 = datosFiltrados5[0]['esperado'][1];
	} else{
		if (rangoEsperado.includes('>')){
			rango1 = datosFiltrados5[0]['esperado'];
		} else{
			rango2 = datosFiltrados5[0]['esperado'];
		}
	}
	const punto_res = punto_num / punto_den * f;
	const nombre_num = datosFiltrados5_[0]['nombre_num'];
	const nombre_den = datosFiltrados5_[0]['nombre_den'];
	
	// Status
	if (rango1 != 0 && rango2 == 0){status_num = 'mayorA';}
	else if (rango1 == 0 && rango2 != 0){status_num = 'menorA';}
	else if (rango1 != 0 && rango2 != 0){status_num = 'ambos';};

	if (den_fijo == false){
		if (rango1 != 0 && rango2 == 0){status_den = 'mayorA';}
		else if (rango1 == 0 && rango2 != 0){status_den = 'menorA';}
		else if (rango1 != 0 && rango2 != 0){status_den = 'ambos';};
	};

	// Punto minimo
	let punto_num1 = 0;
	let punto_num2 = 0;
	let punto_den1 = 0;
	let punto_den2 = 0;
	if (status_num == 'mayorA')
		punto_num1 = rango1 * punto_den / f;
	else if (status_num == 'menorA')
		punto_num2 = rango2 * punto_den / f;
	else if (status_num == 'ambos'){
		punto_num1 = rango1 * punto_den / f;
		punto_num2 = rango2 * punto_den / f;
	};
	if (den_fijo == false){
		if (status_den == 'mayorA')
			punto_den1 = f * punto_num / rango1;
		else if (status_den == 'menorA')
			punto_den2 = f * punto_num / rango2;
		else if (status_den == 'ambos'){
			punto_den1 = f * punto_num / rango1;
			punto_den2 = f * punto_num / rango2;
		}
	};

	// Rango de valores
	const max_den = Math.max(punto_den, punto_den1, punto_den2);
	const max_num = Math.max(punto_num, punto_num1, punto_num2);
	const min_den = Math.min(punto_den, punto_den1, punto_den2);
	const min_num = Math.min(punto_num, punto_num1, punto_num2);

	// Rango de X y Y
	const x = []; // den
	const y = []; // num
	const steps = 90;
	for (let i = min_den*0.75; i <= max_den*1.25; i += ((max_den*1.25)-(min_den*0.75))/steps) x.push(i);
	for (let j = min_num*0.75; j <= max_num*1.25; j += ((max_num*1.25)-(min_num*0.75))/steps) y.push(j);

	
	// Condición
	let condicion_num = null;
	let condicion_den = null;
	let texto = '';
	let z = [];
	let res = 0;
	let res_format = '';
	let res2 = 0;
	let res_format2 = '';

	if (status_num == 'mayorA'){
		res = rango1 / f * punto_den;
		res_format = res.toLocaleString('es-mx', {minimumFractionDigits:2, maximumFractionDigits: 2});
		texto += `Num > ${res_format}`;
		z = y.map(yVal => x.map(xVal => (yVal >= res && xVal >= punto_den ? 1 : null)));
	} else if (status_num == 'menorA'){
		res = rango2 / f * punto_den;
		res_format = res.toLocaleString('es-mx', {minimumFractionDigits:2, maximumFractionDigits: 2});
		texto += `Num < ${res_format}`;
		z = y.map(yVal => x.map(xVal => (yVal <= res && xVal >= punto_den ? 1 : null)));
	} else if (status_num == 'ambos'){
		res = rango1 / f * punto_den;
		res_format = res.toLocaleString('es-mx', {minimumFractionDigits:2, maximumFractionDigits: 2});
		res2 = rango2 / f * punto_den;
		res_format2 = res2.toLocaleString('es-mx', {minimumFractionDigits:2, maximumFractionDigits: 2});
		texto += `${res_format} < Num < ${res_format2}`;
		z = y.map(yVal => x.map(xVal => (yVal >= res && yVal <= res2 && xVal >= punto_den ? 1 : null)));
	}
	if (den_fijo == true){
		let punto_den_format = punto_den.toLocaleString('es-mx', {minimumFractionDigits:2, maximumFractionDigits: 2});
		texto += `\nDen = ${punto_den_format}`;
	};

	if (den_fijo == false){
		texto = '';
		if (status_den == 'mayorA'){
			res = rango1 / f;
			res_format = res.toLocaleString('es-mx', {minimumFractionDigits:2, maximumFractionDigits: 2});
			texto += `Num > ${res_format} * Den`;
			z = y.map(yVal => x.map(xVal => (yVal >= (res * xVal) ? 1 : null)));
		} else if (status_den == 'menorA'){
			res = rango2 / f;
			res_format = res.toLocaleString('es-mx', {minimumFractionDigits:2, maximumFractionDigits: 2});
			texto += `Num < ${res_format} * Den`;
			z = y.map(yVal => x.map(xVal => (yVal <= (res * xVal) ? 1 : null)));
		} else if (status_den == 'ambos'){
			res = rango1 / f;
			res_format = res.toLocaleString('es-mx', {minimumFractionDigits:2, maximumFractionDigits: 2});
			res2 = rango2 / f;
			res_format2 = res2.toLocaleString('es-mx', {minimumFractionDigits:2, maximumFractionDigits: 2});
			texto += `${res_format} * Den < Num < ${res_format2} * Den`;
			z = y.map(yVal => x.map(xVal => (yVal >= (res * xVal) && yVal <= (res2 * xVal) ? 1 : null)));
		}
	};
	

	// Matriz Z basada en condición: y >= 350
	format_den = insertarSaltosLinea(nombre_den, 90);
	format_num = insertarSaltosLinea(nombre_num, 65);
	
	const nRows = z.length;
	const nCols = z[0].length;

	const textos2 = [];

	for (let i = 0; i < nRows; i++) {
		const row = [];
		for (let j = 0; j < nCols; j++) {
			const valx = x[j].toLocaleString('es-mx', { maximumFractionDigits: 2 });
			const valy = y[i].toLocaleString('es-mx', { maximumFractionDigits: 2 });
			const res = ((y[i]/x[j])*f).toLocaleString('es-mx', { maximumFractionDigits: 2 });
			row.push(`Num: ${valy}<br>Den: ${valx}<br>Valor: <b>${res}</b>`);
		}
		textos2.push(row);    
	}

	Plotly.react("indicador_numden",
		[{
			x: x,
			y: y,
			z: z,
			type: 'contour',
			contours: {
				coloring: 'heatmap',
				showlabels: false
			},
			colorscale: [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,200,200,0.3)']],
			text: textos2,
			hoverinfo: 'text',
			showscale: false
		}],
		{
			legend: {
				x: 0.01,
				y: 0.90,
				xanchor: 'left',
				yanchor: 'top',
				bgcolor: 'rgba(0,0,0,0)',//'whitesmoke',
				font: {size: 12}
			},
			title: {
				text: `Valor actual, Numerador/Denominador<br>${indicador_deseado} — ${unidad_deseada}, ${fecha_deseada}`,
				font: {
					size: 16,
					color: 'black',//"black"
					weight: 'bold',
					family: 'Noto Sans'
				},
				x: 0.5,
				y: 0.95
			},
			font: {
				family: 'Noto Sans',
				color: 'black',
				size: 8
			},
			xaxis: { title: { text: `Den: ${format_den}` } },
			yaxis: { title: { text: `Num: ${format_num}` } },
			margin: {r: 10, b: 60, t: 50},
			annotations: [{
				xref: 'paper',
				yref: 'paper',
				x: 0.05,
				y: 0.55,
				text: `<b>RANGOS:<br><span style="color: green">Esperado:</span> ${rangoEsperado}<br><span style="color: orange">Medio:</span> ${rangoMedio}<br><span style="color: red">Bajo:</span> ${rangoBajo}</b>`,
				showarrow: false,
				bgcolor: 'rgba(0,0,0,0.02)', // 'whitesmoke',
				align: 'left',
				font: {	size: 12 }
			}]
		}
	); // indicador_numden

	
	let y2 = [];
	let color = 'green';
	let name = '';
	if (den_fijo == true){
		if (rango1 != 0){
			y2 = Array(steps).fill(rango1/f*punto_den);
			name = `Num > ${punto_num1.toLocaleString('es-mx', {maximumFractionDigits: 2})}`;
			addLine('indicador_numden', x, y2, color, name);
		}
		if (rango2 != 0){
			y2 = Array(steps).fill(rango2/f*punto_den);
			name = `Num < ${punto_num2.toLocaleString('es-mx', {maximumFractionDigits: 2})}`;
			addLine('indicador_numden', x, y2, color, name);
		}
	} else{
		if (rango1 != 0){
			y2 = x.map(d => rango1 / f * d);
			name = `Num > ${(rango1/f).toLocaleString('es-mx', {maximumFractionDigits: 2})} * Den`;
			addLine('indicador_numden', x, y2, color, name);
		}
		if (rango2 != 0){
			y2 = x.map(d => rango2 / f * d);
			name = `Num < ${(rango2/f).toLocaleString('es-mx', {maximumFractionDigits: 2})} * Den`;
			addLine('indicador_numden', x, y2, color, name);
		}
	}

	// Linea constante poblacion
	if (den_fijo == true){
		x2 = Array(steps).fill(punto_den);
		name = `Denominador = ${punto_den.toLocaleString('es-mx', {maximumFractionDigits: 2})}`;
		addLine('indicador_numden', x2, y, 'navy', name);
		if (punto_num1 != 0)
		addPoint('indicador_numden', punto_den, punto_den, punto_num, punto_num1, f, 'cyan', `Num = ${punto_num1.toLocaleString('es-mx', {maximumFractionDigits: 2})}`);
		if (punto_num2 != 0)
		addPoint('indicador_numden', punto_den, punto_den, punto_num, punto_num2, f, 'blue', `Num = ${punto_num2.toLocaleString('es-mx', {maximumFractionDigits: 2})}`);
	}
	if (den_fijo == false){
		if (punto_num1 != 0)
		addPoint('indicador_numden', punto_den, punto_den, punto_num, punto_num1, f, 'cyan', `Num = ${punto_num1.toLocaleString('es-mx', {maximumFractionDigits: 2})}`);
		if (punto_num2 != 0)
		addPoint('indicador_numden', punto_den, punto_den, punto_num, punto_num2, f, 'blue', `Num = ${punto_num2.toLocaleString('es-mx', {maximumFractionDigits: 2})}`);
		if (punto_den1 != 0)
		addPoint('indicador_numden', punto_den, punto_den1, punto_num, punto_num, f, 'saddlebrown', `Den = ${punto_den1.toLocaleString('es-mx', {maximumFractionDigits: 2})}`);
		if (punto_den2 != 0)
		addPoint('indicador_numden', punto_den, punto_den2, punto_num, punto_num, f, 'magenta', `Den = ${punto_den2.toLocaleString('es-mx', {maximumFractionDigits: 2})}`);
	}

	// punto actual
	addActualPoint('indicador_numden', punto_den, punto_num, color_deseado, f, res);
	document.getElementById('loader-overlay').style.display = 'none';
}

function limpiarGraficaNumDen(){
	Plotly.react("indicador_numden",
	[{
		x: [0,1,2,3,4,5],
		y: [0,1,2,3,4,5],
		z: [null, 1, null, 1, null, 1],
		type: 'contour',
		contours: {
			coloring: 'heatmap',
			showlabels: false
		},
		colorscale: [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,200,200,0.3)']],
		text: '',
		hoverinfo: 'text',
		showscale: false
	}],
	{
		legend: {
			x: 0.01,
			y: 0.90,
			xanchor: 'left',
			yanchor: 'top',
			bgcolor: 'rgba(0,0,0,0)'//'whitesmoke'
		},
		title: {
			text: 'Para actualizar, presione el botón 《 Actualizar Gráfica 》.',
			font: { size: 20 },
			x: 0.5,
			y: 0.95
		},
		font: {
			family: 'Noto Sans',
			color: 'black',
			size: 16,
			weight: 'bold'
		},
		xaxis: { title: 'Den' },
		yaxis: { title: 'Num' },
		margin: {r: 10, b: 60, t: 50}
	}
); // indicador_numden
}

function actualizarGraficaRankingGeneral_1N(datos_pond, fecha_deseada){	
	if (unidad_deseada != 'HGZ 03 Tuxtepec' & unidad_deseada != 'HGZ 01 Oaxaca' & unidad_deseada != 'UMAA Oaxaca' & unidad_deseada != 'Oaxaca'){
		datos_pond_fecha = filtrarFecha(datos_pond, fecha_deseada);

		ranking_nivel_1 = analisisRanking(datos_pond_fecha, 'Primer Nivel');

		const datosOrdenados_1 = Object.entries(ranking_nivel_1)
		.map(([unidad, valores]) => ({
			unidad,
			pond_aju: valores.pond_aju,
			color: valores.color
		}))
		.sort((a, b) => b.pond_aju - a.pond_aju);  // De mayor a menor

		const unidades_sinPromedio = datosOrdenados_1.map(d => d.unidad);
		const sumaTotal = datosOrdenados_1.reduce((acc, d) => acc + d.pond_aju, 0);
		const promedio = sumaTotal / datosOrdenados_1.length;
		datosOrdenados_1.push({
			unidad: 'Promedio',
			pond_aju: promedio,
			color: 'deepskyblue'
		})
		datosOrdenados_1.sort((a, b) => b.pond_aju - a.pond_aju);

		const unidades = datosOrdenados_1.map(d => d.unidad); // etiquetas
		const valores = datosOrdenados_1.map(d => d.pond_aju);
		const colores_ranking = datosOrdenados_1.map(d => d.color);
		const textos = datosOrdenados_1.map((valor, i) => {
			const unidad = unidades[i];
			const index = unidades_sinPromedio.indexOf(unidad) + 1;
			const posicion = (index == 0) ? '' : (index+'° ');
			return `<b>${posicion} ${unidad}</b>`;
		})

		Plotly.react("ranking_general_1N",
			[
				{
					type: "bar",
					x: unidades,
					y: valores,
					text: textos,
            		cliponaxis: false,
					textposition: 'outside',
            		texttemplate: '<b>%{y:.2f}</b>',
					marker: { color: colores_ranking },
					hovertemplate: '%{text}<br>%{y:.2f}<extra></extra>',
					hoverlabel: {
						bgcolor: colores_ranking,
						font: { size: 16 }
					}
				},
				{
					type: 'bar',
					x: [unidad_deseada],
					y: [valores[unidades.indexOf(unidad_deseada)]],
					marker: { 
						color: colores_ranking[unidades.indexOf(unidad_deseada)],
						line: {
							color: 'rgba(0,0,0,0.4)', // Borde sutil
							width: 6
						}
					},
					hoverinfo: 'skip'
				}
			],
			{
				barmode: 'overlay',
				title: {
					text: `Ranking de Primer Nivel, ${fecha_deseada}`,
					font: { size: 24 },
					x: 0.5,
					y: 0.98
				},
				font: {
					family: 'Noto Sans',
					color: 'black',
					weight: 'bold',
					size: 16
				},
				width: document.getElementById('ranking_general_1N').clientWidth*0.95,
				autosize: false,
				plot_bgcolor: 'rgba(0,0,0,0)',
				paper_bgcolor: 'rgba(0,0,0,0)',
				margin: { b: 180, l:10, r:5, t:50 },
				uniformtext: { minsize: 10 }, // Tamaño mínimo de fuente 
				padding: {b: 150},
				yaxis: {            
					showticklabels: false,
					showgrid: false
				},
				xaxis: {
					tickangle: -90, //
					tickfont: {
						size: 12
					}
				},
				showlegend: false
			}
		); // ranking_general_1N
	}
}

function actualizarGraficaRankingIndicador_1N(datos_pond, unidad_deseada, fecha_deseada){
	datos_pond_fecha = filtrarFecha(datos_pond, fecha_deseada);
	ponderaciones = analisisRanking(datos_pond_fecha, 'Primer Nivel');

	const pond_unidad = Object.fromEntries(Object.entries(ponderaciones).filter(([unidad]) => unidad === unidad_deseada));
	let grupo_indicadores = {};

	if (pond_unidad[unidad_deseada]) {
		const unidad = pond_unidad[unidad_deseada];
		grupo_indicadores = Object.entries(unidad.inds);
		document.getElementById('rank_1').innerHTML = unidad.pond_aju.toFixed(2);
		document.getElementById('rank_unidad_1').style.background = colorByPonderacion(unidad.pond_aju).replace(",1)",",.8)");
		document.getElementById('rank_unidad_1').style.color = textColorByPonderacion(unidad.pond_aju);
	} else{
		return;
	}

	const x_labels = grupo_indicadores.map(([nombre]) => nombre);
	const estimados = grupo_indicadores.map(([_, valor]) => valor.pond_est);
	const obtenidos = grupo_indicadores.map(([_, valor]) => valor.pond_obt);
	const resultados = grupo_indicadores.map(([_, valor]) => {
		return valor.pond_obt / valor.pond_est * 100;
	});
	const col_obtenidos = grupo_indicadores.map(([_, valor]) => {
		const resultado = valor.pond_obt / valor.pond_est * 100;
		return colorByPonderacion(resultado);
	});
	const col_estimados = grupo_indicadores.map(([_,valor]) => {
		const resultado = valor.pond_obt / valor.pond_est * 100;
		return colorByPonderacion(resultado).replace(",1)",",.25)");
	});
	const textos = x_labels.map((valor, i) => {
		const estimado = estimados[i];
		const obtenido = obtenidos[i];
		const resultado = resultados[i];
		const faltante = estimado - obtenido;
		return `<b> — ${resultado.toFixed(2)}%</b><br>Ponderación Obtenida<br>${obtenido.toFixed(2)} de ${estimado.toFixed(2)} <br>Diferencia: ▼${Math.abs(faltante.toFixed(2))}`;
	});
	const txt_color = col_obtenidos.map((valor, i) => {
		if (valor == 'rgba(255,192,0,1)'){ return 'black'; } else { return 'white'; }
	});

	Plotly.react("ranking_indicador_1N", 
		[
			{
				type: "bar",
				orientation: 'h',
				y: x_labels,
				x: estimados,
				cliponaxis: false,
				textposition: 'outside',
				texttemplate: '<b>%{x:.2f}</b>',
				marker: { 
					color: "rgba(0,0,0,0.2)", 
					line: {color: "rgba(0,0,0,0.2)", width: 1}
				},
          		hoverinfo: 'none'
			},
			{
				type: "bar",
				orientation: 'h',
				y: x_labels,
				x: obtenidos,
				text: textos,
				textposition: 'inside',
				texttemplate: '<b>%{x:.2f}</b>',
				textfont: { size: 14 },
				marker: { color: col_obtenidos },
				hoverlabel: {
					bordercolor: 'white',
					font: { size: 16 }
				},
				hovertemplate: `<b>%{label}</b>%{text}<extra></extra>`,
			}
		], 
		{
			width: document.getElementById('ranking_indicador_1N').clientWidth*0.9,
			margin: { b: 10, l: 80, t:60, r:30 },
			autosize: true,
			title: {
				text: `Ponderación obtenida vs estimada<br>${unidad_deseada}, ${fecha_deseada}`,
				font: { size: 18 },
				x: 0.5,
				y: 0.95
			},
			font: {
				family: 'Noto Sans',
				color: 'black',
				size: 16,
				weight: 'bold'
			},
			plot_bgcolor: 'rgba(0,0,0,0)',
			paper_bgcolor: 'rgba(0,0,0,0)',
			shadow: {
				enabled: true,
				color: 'rgba(0,0,0,0.2)',
				x: 3,
				y: 3,
				blur: 10
			},
			uniformtext: { minsize: 10 },
			barmode: 'overlay',
			yaxis: { tickfont: { size: 14 } },
			xaxis: {
				showticklabels: false,
				showgrid: false
			},
			showlegend: false,
		}
	); // ranking_indicador_1N
	return pond_unidad;
}

function actualizarGraficaRankingGeneral_2N(datos_pond, fecha_deseada){	
	if (unidades2.includes(unidad_deseada) & unidad_deseada != 'Oaxaca') {
		datos_pond_fecha = filtrarFecha(datos_pond, fecha_deseada);

		ranking_nivel_2 = analisisRanking(datos_pond_fecha, 'Segundo Nivel');

		const datosOrdenados_1 = Object.entries(ranking_nivel_2)
		.map(([unidad, valores]) => ({
			unidad,
			pond_aju: valores.pond_aju,
			color: valores.color
		}))
		.sort((a, b) => b.pond_aju - a.pond_aju);  // De mayor a menor

		const unidades_sinPromedio = datosOrdenados_1.map(d => d.unidad);
		const sumaTotal = datosOrdenados_1.reduce((acc, d) => acc + d.pond_aju, 0);
		const promedio = sumaTotal / datosOrdenados_1.length;
		datosOrdenados_1.push({
			unidad: 'Promedio',
			pond_aju: promedio,
			color: 'deepskyblue'
		})
		datosOrdenados_1.sort((a, b) => b.pond_aju - a.pond_aju);

		const unidades = datosOrdenados_1.map(d => d.unidad); // etiquetas
		const valores = datosOrdenados_1.map(d => d.pond_aju);
		const colores_ranking = datosOrdenados_1.map(d => d.color);
		const textos = datosOrdenados_1.map((valor, i) => {
			const unidad = unidades[i];
			const index = unidades_sinPromedio.indexOf(unidad) + 1;
			const posicion = (index == 0) ? '' : (index+'° ');
			return `<b>${posicion} ${unidad}</b>`;
		})

		Plotly.react("ranking_general_2N",
			[
				{
					type: "bar",
					x: unidades,
					y: valores,
					text: textos,
            		cliponaxis: false,
					textposition: 'outside',
            		texttemplate: '<b>%{y:.2f}</b>',
					marker: { color: colores_ranking },
					hovertemplate: '%{text}<br>%{y:.2f}<extra></extra>',
					hoverlabel: {
						bgcolor: colores_ranking,
						font: { size: 16 }
					}
				},
				{
					type: 'bar',
					x: [unidad_deseada],
					y: [valores[unidades.indexOf(unidad_deseada)]],
					marker: { 
						color: colores_ranking[unidades.indexOf(unidad_deseada)],
						line: {
							color: 'rgba(0,0,0,0.4)', // Borde sutil
							width: 6
						}
					},
					hoverinfo: 'skip'
				}
			],
			{
				barmode: 'overlay',
				title: {
					text: `Ranking de Segundo Nivel, ${fecha_deseada}`,
					font: { size: 24 },
					x: 0.5,
					y: 0.98
				},
				font: {
					family: 'Noto Sans',
					color: 'black',
					weight: 'bold',
					size: 16
				},
				width: document.getElementById('ranking_general_2N').clientWidth*0.95,
				autosize: false,
				plot_bgcolor: 'rgba(0,0,0,0)',
				paper_bgcolor: 'rgba(0,0,0,0)',
				margin: { b: 50, l:10, r:5, t:50 },
				uniformtext: { minsize: 10 }, // Tamaño mínimo de fuente 
				padding: {b: 80},
				yaxis: {            
					showticklabels: false,
					showgrid: false
				},
				xaxis: {
					tickangle: -0, //
					tickfont: {
						size: 12
					}
				},
				showlegend: false
			}
		); // ranking_general_2N
	}
}

function actualizarGraficaRankingIndicador_2N(datos_pond, unidad_deseada, fecha_deseada){
	datos_pond_fecha = filtrarFecha(datos_pond, fecha_deseada);
	if (unidades2.includes(unidad_deseada) & unidad_deseada != 'Oaxaca') {
		ponderaciones = analisisRanking(datos_pond_fecha, 'Segundo Nivel');
	} else if (unidad_deseada == 'Oaxaca') {
		ponderaciones = analisisRanking(datos_pond_fecha, 'Delegacional');
	}

	const pond_unidad = Object.fromEntries(Object.entries(ponderaciones).filter(([unidad]) => unidad === unidad_deseada));

	if (pond_unidad[unidad_deseada]) {
		const unidad = pond_unidad[unidad_deseada];
		grupo_indicadores = Object.entries(unidad.inds);
		document.getElementById('rank_2').innerHTML = unidad.pond_aju.toFixed(2);
		document.getElementById('rank_unidad_2').style.background = colorByPonderacion(unidad.pond_aju).replace(",1)",",.8)");
		document.getElementById('rank_unidad_2').style.color = textColorByPonderacion(unidad.pond_aju);
	} else{
		return;
	}

	const x_labels = grupo_indicadores.map(([nombre]) => nombre);
	const estimados = grupo_indicadores.map(([_, valor]) => valor.pond_est);
	const obtenidos = grupo_indicadores.map(([_, valor]) => valor.pond_obt);
	const resultados = grupo_indicadores.map(([_, valor]) => {
		return valor.pond_obt / valor.pond_est * 100;
	});
	const col_obtenidos = grupo_indicadores.map(([_, valor]) => {
		const resultado = valor.pond_obt / valor.pond_est * 100;
		return colorByPonderacion(resultado);
	});
	const col_estimados = grupo_indicadores.map(([_,valor]) => {
		const resultado = valor.pond_obt / valor.pond_est * 100;
		return colorByPonderacion(resultado).replace(",1)",",.25)");
	});
	const textos = x_labels.map((valor, i) => {
		const estimado = estimados[i];
		const obtenido = obtenidos[i];
		const resultado = resultados[i];
		const faltante = estimado - obtenido;
		return `<b> — ${resultado.toFixed(2)}%</b><br>Ponderación Obtenida<br>${obtenido.toFixed(2)} de ${estimado.toFixed(2)} <br>Diferencia: ▼${Math.abs(faltante.toFixed(2))}`;
	});
	const txt_color = col_obtenidos.map((valor, i) => {
		if (valor == 'rgba(255,192,0,1)'){ return 'black'; } else { return 'white'; }
	});
	Plotly.react("ranking_indicador_2N", 
		[
			{
				type: "bar",
				x: x_labels,
				y: estimados,
				cliponaxis: false,
				textposition: 'outside',
				texttemplate: '<b>%{y:.2f}</b>',
				textfont: { size: 14 },
				marker: { color: "rgba(0,0,0,0.2)" },
          		hoverinfo: 'none'
			},
			{
				type: "bar",
				x: x_labels,
				y: obtenidos,
				text: textos,
				textposition: 'inside',
				texttemplate: '<b>%{y:.2f}</b>',
				textfont: { size: 14 },
				marker: { color: col_obtenidos },
				hoverlabel: {
					bordercolor: 'white',
					font: { size: 16 }
				},
				hovertemplate: `<b>%{label}</b>%{text}<extra></extra>`,
			}
		], 
		{
			margin: { b: 50, l: 10, t:60, r:10 },
			autosize: true,
			title: {
				text: `Ponderación obtenida vs estimada<br>${unidad_deseada}, ${fecha_deseada}`,
				font: { size: 18 },
				x: 0.5,
				y: 0.95
			},
			font: {
				family: 'Noto Sans',
				color: 'black',
				size: 16,
				weight: 'bold'
			},
			plot_bgcolor: 'rgba(0,0,0,0)',
			paper_bgcolor: 'rgba(0,0,0,0)',
			shadow: {
				enabled: true,
				color: 'rgba(0,0,0,0.2)',
				x: 3,
				y: 3,
				blur: 10
			},
			uniformtext: { minsize: 10 },
			barmode: 'overlay',
			xaxis: { tickfont: { size: 14 } },
			yaxis: {
				showticklabels: false,
				showgrid: false
			},
			showlegend: false,
		}
	); // ranking_indicador_2N
	return pond_unidad;
}

function actualizarAnalisis_1(pond_unidad_1, pond_unidad_2){
	cuadro_tabla_1 = document.getElementById('tabla_1')
	cuadro_tabla_2 = document.getElementById('tabla_2')
	tabla_ranking_1.clearData();
	tabla_ranking_2.clearData();

	let data_1 = new Object();
	let data_2 = new Object();

	if (unidad_deseada == 'HGZMF 02 Salina Cruz' | unidad_deseada == 'HGSMF 41 Huatulco') {
		data_1 = formatoTablaAnalisis(pond_unidad_1);
		tabla_ranking_1.updateOrAddData(data_1);
		data_2 = formatoTablaAnalisis(pond_unidad_2);
		tabla_ranking_2.updateOrAddData(data_2);
		cuadro_tabla_1.hidden = false;
		cuadro_tabla_2.hidden = false;
		tabla_ranking_1.hidden = true;
	} else if (unidades1.includes(unidad_deseada)) {
		data_1 = formatoTablaAnalisis(pond_unidad_1);
		tabla_ranking_1.updateOrAddData(data_1);
		cuadro_tabla_1.hidden = false;
		cuadro_tabla_2.hidden = true;
	} else {
		data_2 = formatoTablaAnalisis(pond_unidad_2);
		tabla_ranking_2.updateOrAddData(data_2);
		cuadro_tabla_1.hidden = true;
		cuadro_tabla_2.hidden = false;
	}
}

function actualizarAnalisis_2(datos_pond, unidad_deseada, fecha_deseada){
	tabla_ranking_comp_1.clearData();
	tabla_ranking_comp_21.clearData();
	tabla_ranking_comp_22.clearData();

	datos_pond_ = filtrarUnidad(datos_pond, unidad_deseada);
	datos_mes_act = filtrarFecha(datos_pond_, fecha_deseada);
	[mes, año] = fecha_deseada.split(' ');
	mes_ant = meses[meses.indexOf(mes) - 1];
	fecha_ant = mes_ant + ' ' + año
	datos_mes_ant = filtrarFecha(datos_pond_, fecha_ant);
	
	rank_mes_act = agruparRanking(datos_mes_act);
	rank_mes_ant = agruparRanking(datos_mes_ant);

	data_1 = analisisRanking_2(rank_mes_act, rank_mes_ant);
	tabla_ranking_comp_1.updateOrAddData(data_1);
	tabla_ranking_comp_1.getColumn("mes_ant").updateDefinition({title: fecha_ant});
	tabla_ranking_comp_1.getColumn("mes_act").updateDefinition({title: fecha_deseada});
	
	[data_mejor, data_peor] = analisisRanking_3(rank_mes_act, rank_mes_ant);
	tabla_ranking_comp_21.updateOrAddData(data_peor);
	tabla_ranking_comp_22.updateOrAddData(data_mejor);
	tabla_ranking_comp_21.getColumn("mes_ant").updateDefinition({title: fecha_ant});
	tabla_ranking_comp_21.getColumn("mes_act").updateDefinition({title: fecha_deseada});
	tabla_ranking_comp_22.getColumn("mes_ant").updateDefinition({title: fecha_ant});
	tabla_ranking_comp_22.getColumn("mes_act").updateDefinition({title: fecha_deseada});
}

document.getElementById('prev-month').addEventListener('click', () => {    
	selectedMonth--;
	if (selectedMonth < 1) {
		selectedMonth = 12;
		currentYear--;
	}
	updateSelectedMonth();
	updateYearDisplay();
	ActualizarCadaGrafica(1);
	fecha_deseada = (`${meses[selectedMonth]} ${currentYear}`);//.toUpperCase();
	checkMonths(fecha_deseada);
});

document.getElementById('next-month').addEventListener('click', () => {
	selectedMonth++;
	if (selectedMonth > 12) {
		selectedMonth = 1;
		currentYear++;
	}
	updateSelectedMonth();
	updateYearDisplay();
	ActualizarCadaGrafica(1);
	fecha_deseada = (`${meses[selectedMonth]} ${currentYear}`);//.toUpperCase();
	checkMonths(fecha_deseada);
});

selector_unidad = document.getElementById('unidad_select');

selector_unidad.addEventListener('change', () => {
	const value = selector_unidad.value;
	unidad_deseada = value;
	document.getElementById('selected-unit').textContent = unidad_deseada;

	// Actualizando Graficas
	updateYearDisplay();
	updateSelectedMonth();
	ActualizarCadaGrafica(1);
});

document.getElementById("desempeños").on('plotly_click', function(data3) {
	var punto = data3.points[0];
	desempeño = punto.label;
	n_indicadores = punto.value;

	// Actualizando Graficas
	ActualizarCadaGrafica(1);
});

document.getElementById("indicadores_x_desempeño").on('plotly_click', function(data4) {
	var punto = data4.points[0];
	indicador_deseado = punto.x;

	// Actualizando Graficas
	ActualizarCadaGrafica(3);
});

document.getElementById('ranking_general_1N').on('plotly_click', function(data5) {
	var punto = data5.points[0];
	unidad_deseada = punto.x;
	if (unidad_deseada != 'Promedio'){
		selector_unidad.value = unidad_deseada;
		updateSelectedUnit();
		ActualizarCadaGrafica(1);
	}
});

document.getElementById('ranking_general_2N').on('plotly_click', function(data5) {
	var punto = data5.points[0];
	unidad_deseada = punto.x;
	if (unidad_deseada != 'Promedio'){
		selector_unidad.value = unidad_deseada;
		updateSelectedUnit();
		ActualizarCadaGrafica(1);
	}
});

// 
console.log('INICIO')
document.getElementById('loader-overlay').style.display = 'flex';
loader.classList.add('show-loader');
window.addEventListener('DOMContentLoaded', loadFirebaseData);
