//Despliega el grafico cuando el DOM ha terminado, y el script del archivo nav-footprint.mjs avisa que los datos se han guardado en localStorage y estan listos.
// Cuando el script concliuye con las instrucciones de guardar los datos en localStorage, despcha un evento con window.dispatchEvent(new Event("datos-preparados"));
//Ese evento es captado aqui con el atrapador window.addEventListener("datos-preparados", () => { y ejecuta la function pie()
//Esta secuencia asegura que se despliegue el grafico en su debido momento. De no existir estas pistas de eventos, el grafdico no se despliegara.
window.addEventListener("datos-preparados", () => {
  pie(); // Ejecutar el gráfico cuando los datos estén listos
});

//El grafico necesita de <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script> que se inserta al pie de esta pag
function pie() {
  var pcent_elect = localStorage.getItem("pcent_elect");
  var pcent_gas = localStorage.getItem("pcent_gas");
  var pcent_water = localStorage.getItem("pcent_water");
  var pcent_lpg = localStorage.getItem("pcent_lpg");
  var pcent_gn = localStorage.getItem("pcent_gn");
  var pcent_fly = localStorage.getItem("pcent_fly");
  var pcent_cogs = localStorage.getItem("pcent_cogs");

  if (pcent_elect == null) {
    pcent_elect = 0;
  }
  if (pcent_gas == null) {
    pcent_gas = 0;
  }
  if (pcent_water == null) {
    pcent_water = 0;
  }
  if (pcent_lpg == null) {
    pcent_lpg = 0;
  }
  if (pcent_gn == null) {
    pcent_gn = 0;
  }
  if (pcent_fly == null) {
    pcent_fly = 0;
  }
  if (pcent_cogs == null) {
    pcent_cogs = 0;
  }

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: "CO2 - % Gasto Energético",
    },
    data: [
      {
        type: "pie",
        startAngle: 240,
        yValueFormatString: '##0.00"%"',
        indexLabel: "{label} {y}",
        dataPoints: [
          { y: pcent_elect, label: "Elect" }, //pcent_elect
          { y: pcent_gas, label: "Gas" }, // pcent_gas
          { y: pcent_lpg, label: "LPG" }, //pcent_lpg
          { y: pcent_gn, label: "NG" }, //pcent_gn
          { y: pcent_fly, label: "fly" }, //pcent_fly
          { y: pcent_cogs, label: "Cogs" }, //pcent_COGS
          { y: pcent_water, label: "Water" }, //pcent_water
        ],
      },
    ],
  });
  chart.render();
} //termina la function pie

