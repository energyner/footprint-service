/*ESTA PAGINA DE JAVASCRIPT LOAD_ALL.JS ES LA CONTIENE LA RUTA PARA ENCONTRAR LOS 
FILES MENU Y FOOTER QUE ESTAN ALMACENADO EN LA SUB-CARPETA DOC, DENTRO DE LA 
SUB-CARPETA ASSETS.
ESTA FUNCTION LOADALL() SE UTILIZA DESDE LOS ARCHIVOS QUE SE ENCUENTRA EN LAS  
 00-intro, 01-ESTILOS, 02-tipos, 03-variables, ETC, DEL SITIO WEB. 
LA RUTA PARA CAPTAR LOS FILES DENTRO DE LA SUB-CARPETA DOC DESDE ESTA POSICION 
EN EL ARBOL, ES TOTALMENTE DIFERENTE A LA RUTA PARA ENCONTRAR ESTOS FILES 
DESDE LOS ARCHIVOS QUE ESTAN ALOJADOS EN LA RAIZ DEL SITIO, COMO 
SON INDEX.HTML. ENTRENAMIENTO.HTML,  ETC*/
/*PARA LOS ARCHIVOS EN LA RAIZ DEL SITIO DEBE USARSE LA PAGINA LOAD_ALL_HOME.JS*/

/*La function loadALL tiene la tarea de cargar las paginas exteriores que se incluiran en la principal.*/
/*Dentro de la function se pueden agregar multipes file a cargar, con sus propiedades en loadHTML('url.html','id de la div');*/

/* Cuando usas onload="loadAll()" en la etiqueta <body>, estás indicando que la función loadAll 
debe ejecutarse solo después de que todo el contenido de la página esté completamente cargado. 
Esto asegura que todos los elementos del DOM estén disponibles para su manipulación.  */

async function loadHTML(url, elementId) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        const el = document.getElementById(elementId);
        if (el) {
          el.innerHTML = html;
          console.log(`Contenido cargado en #${elementId}`);
        } else {
          console.warn(`Elemento con ID "${elementId}" no encontrado.`);
        }
      } catch (error) {
        console.error(`Error cargando ${url}:`, error);
      }
    }

    function loadAll() {
      const elements = [
        { url: './html/menu.html', id: 'nav1' },
        { url: './html/dropdown.html', id: 'nav2' },
        { url: './html/footer.html', id: 'footer' }
      ];

      elements.forEach(el => loadHTML(el.url, el.id));
    }

    // Asegúrate de ejecutar solo cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', loadAll);