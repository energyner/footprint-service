// nav-footprint.mjs

document.getElementById("calculo").addEventListener("click", async function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
   const state = document.getElementById("state_id").value;
   console.log("Valor de state = " + state);
    const elect = parseFloat(document.getElementById("elect").value) || 0;
    const gas = parseFloat(document.getElementById("gas").value) || 0;
    const water = parseFloat(document.getElementById("water").value) || 0;
    const lpg = parseFloat(document.getElementById("lpg").value) || 0;
    const gn = parseFloat(document.getElementById("gn").value) || 0;
    const fly = parseFloat(document.getElementById("fly").value) || 0;
    const cogs = parseFloat(document.getElementById("cogs").value) || 0;
    const person = parseInt(document.getElementById("person").value) || 1;

    const data = { state, elect, gas, water, lpg, gn, fly, cogs, person };

    // --- Configuración de URLs de API para FOOTPRINT SERVICE ---
    // URL de tu API 'footprint-service' desplegada en Google Cloud Run
    // ¡IMPORTANTE: Asegúrate de que esta URL sea la correcta para tu servicio Cloud Run!
    // El YOUR_PROJECT_ID ha sido reemplazado por 858389184339.
    // Y ajusta el endpoint '/api/huella-carbono' si es diferente.
    const CLOUD_RUN_API_URL = 'https://footprint-service-487796814360.us-east1.run.app/api/huella-carbono';

    // URL de tu API 'footprint-service' cuando se ejecuta localmente en tu PC (para desarrollo en laptop)
    // Se asume el puerto LOCAL 3008.
    const LOCAL_API_URL_LAPTOP = "http://localhost:3008/api/huella-carbono";

    // URL de tu API 'footprint-service' cuando se ejecuta localmente en tu PC (para pruebas desde móvil en la misma LAN)
    // ¡Asegúrate que esta IP sea la IP REAL de tu laptop en tu red Wi-Fi local!
    // Se asume el mismo puerto LOCAL 3008.
    const LOCAL_API_URL_LAN = "http://192.168.0.252:3008/api/huella-carbono";
    // --- Fin de Configuración de URLs de API ---

    let API_FOOTPRINT_FINAL_URL;

    // Lógica para seleccionar la URL de la API basada en el entorno del navegador
    const hostname = window.location.hostname;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      // Entorno de desarrollo local en la misma laptop
      API_FOOTPRINT_FINAL_URL = LOCAL_API_URL_LAPTOP;
      console.log("Entorno detectado: Desarrollo local (laptop). URL API Footprint:",
        API_FOOTPRINT_FINAL_URL
      );
    } else if (
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.")
    ) {
      // Entorno de desarrollo local, accedido por IP en la red de área local (LAN)
      API_FOOTPRINT_FINAL_URL = LOCAL_API_URL_LAN;
      console.log(  "Entorno detectado: Desarrollo local (LAN). URL API Footprint:",
        API_FOOTPRINT_FINAL_URL
      );
    } else {
      // Cualquier otro hostname (ej. *.run.app, o un dominio personalizado) se considera producción
      API_FOOTPRINT_FINAL_URL = CLOUD_RUN_API_URL;
      console.log( "Entorno detectado: Producción (Cloud Run). URL API Footprint:",
        API_FOOTPRINT_FINAL_URL
      );
    }

    try {
      const response = await fetch(API_FOOTPRINT_FINAL_URL, {
        // Usa la URL final construida
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      //result de los calculos realizados
      document.getElementById("resultado").value =(result.total || 0 ) + " " + "lb/CO2";
      document.getElementById("estado").value = result.estado|| "N/A";
      document.getElementById("percapita").value = (result.per_capita || 0) + "  " + "lbCO2/persona";
      document.getElementById("per_capita_estado").value =(result.per_capita_estado || 0) + "  " + "lbCO2/persona";
      document.getElementById("promedioUSA").value = (result.promedioUSA || 0)+" " + "lbCO2/persona";
      document.getElementById("promedioMundial").value = (result.promedioMundial || 0)+" " + "lbCO2/persona";
      document.getElementById("porcentEstado").value = (result.porcentEstado || 0) + " " + "%";
      document.getElementById("porcentUSA").value = (result.porcentUSA || 0) + " " + "%";
      document.getElementById("porcentM").value = (result.porcentM || 0) + " " + "%";
      //Lb de CO2 emitidas por cada portador energetico
      document.getElementById("reporte_e").value = (result.libras_co2.elect || 0) + " " + " lb/CO2";
      document.getElementById("reporte_gas").value = (result.libras_co2.gas|| 0) + " " + " lb/CO2";
      document.getElementById("reporte_water").value = (result.libras_co2.water  || 0) + " " + " lb/CO2"; 
      document.getElementById("reporte_lpg").value = (result.libras_co2.lpg || 0) + " " + " lb/CO2";
      document.getElementById("reporte_gn").value = (result.libras_co2.gn || 0) + " " + " lb/CO2";
      document.getElementById("reporte_fly").value = (result.libras_co2.fly || 0) + "  " + " lb/CO2";
      document.getElementById("reporte_consumo").value = (result.libras_co2.cogs || 0) + " " + " lb/CO2";

    //Calculo de porcientos de emisiones de cada portador sobre el total
    //Electricidad
   
      const total=JSON.stringify(result.total);
      const e=JSON.stringify(result.libras_co2.elect);
      const t=JSON.stringify(result.libras_co2.gas);
      const c=JSON.stringify(result.libras_co2.water);
      const l=JSON.stringify(result.libras_co2.lpg);
      const o=JSON.stringify(result.libras_co2.gn);
      const f=JSON.stringify(result.libras_co2.fly);
      const u=JSON.stringify(result.libras_co2.cogs);
    
      //electricidad
      var p=(e/total)*100; 
      p=Math.round(p); 
      //Combustible
      var v=(t/total)*100; 
      v=Math.round(v);
      //Agua
      var m=(c/total)*100; 
      m=Math.round(m);
      // LPG
      var s=(l/total)*100;
      s=Math.round(s);
      // GN
      var M=(o/total)*100;
      M=Math.round(M);
      // Fly
      var F=(f/total)*100;
      F=Math.round(F);
      // COGS
      var g=(u/total)*100;
      g=Math.round(g);

      //Guardando los datos en localStorage
        localStorage.setItem("pcent_elect",p);
        localStorage.setItem("pcent_gas",v);
        localStorage.setItem("pcent_water",m);
        localStorage.setItem("pcent_lpg",s);
        localStorage.setItem("pcent_gn",M);
        localStorage.setItem("pcent_fly",F);
        localStorage.setItem("pcent_cogs",g)

    // Evento personalizado para avisar al grafico pie puede desplegarse pues los datos están guardados en localStorage y listos
    window.dispatchEvent(new Event("datos-preparados"));

    // Opcional: depuración
    console.log("Datos procesados y almacenados. Evento 'datos-preparados' disparado.");

    //REALIZACION DE TEST CON CONSOLE.LOG-------
   console.log("0- resultado = "+ JSON.stringify(result.total));
    console.log("1- estado = "+ state);
    console.log("2- result = "+ JSON.stringify(result));
    console.log("3- percapita = "+JSON.stringify(result.per_capita));
    console.log("4- per_capita_estado = "+JSON.stringify(result.per_capita_estado));
    console.log("5- promedioUSA = "+JSON.stringify(result.promedioUSA));
    console.log("6- promedioMundial = "+JSON.stringify(result.promedioMundial));
    console.log("7- porcentEstado = "+JSON.stringify(result.porcentEstado));
    console.log("8- porcentUSA = "+JSON.stringify(result.porcentUSA));
    console.log("9- porcentMundial = "+ JSON.stringify(result.porcentM));

    console.log("10- lb/CO2 elect = "+ total);
    console.log("11- lb/CO2 comb = "+ e);
    console.log("12- lb/CO2 agua = "+ c);
    console.log("13- lb/CO2 lpg = "+ l);
    console.log("14- lb/CO2 GN = "+ o);
    console.log("15- lb/CO2 Flight = "+ f);
    console.log("16- lb/CO2 cogs = "+ u);

    console.log("17- lb/CO2 elect = "+ JSON.stringify("pcent_elect"+p));
    console.log("18- lb/CO2 elect = "+ JSON.stringify("pcent_gas"+v));
    console.log("19- lb/CO2 cogs = "+ JSON.stringify("pcent_water"+m));
    console.log("20- lb/CO2 elect = "+ JSON.stringify("pcent_lpg"+s));
    console.log("21- lb/CO2 elect = "+ JSON.stringify("pcent_gas"+v));
    console.log("22- lb/CO2 cogs = "+ JSON.stringify("pcent_gn"+M));
    console.log("23- lb/CO2 cogs = "+ JSON.stringify("pcent_fly"+F));
    console.log("24- lb/CO2 cogs = "+ JSON.stringify("pcent_cogs"+g));
 

    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al calcular huella de carbono: " + error.message);
    }
  });
