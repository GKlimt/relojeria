/**
 * Crear modulo dentro de la aplicación
 */
var filtros = angular.module("filtros", []);

/**
 * Creación de un filtro llamado noduplicados utilizando la función filter del
 * modulo Segundo argumento función de factoría (callback) para crear
 */
filtros.filter("noduplicados", function() {
	// Devolvemos lo que nos devuelva la funcion de
	// creacion que recibe como argumento una matriz y
	// la propiedad a utilizar
	return function(array, propiedad) {
		// Comprobar que los datos recibidos son una matriz
		// y dos números
		if (angular.isArray(array) && angular.isString(propiedad)) {
			var marcas = [];

			var claves = {};

			// Recorrer la matriz recibida
			for (var i = 0; i < array.length; i++) {
				// Recuperar propiedad del elemento actual
				var marca = array[i][propiedad];

				// Comprobar que no esta en el array a devolver
				// buscando por clave
				if (angular.isUndefined(claves[marca])) {
					// No existe
					claves[marca] = true;

					// Añadir a la matriz de devolucion
					marcas.push(marca);
				}
			}

			// Devolver matriz
			return marcas;
			
		} else {
			return array;
		}
	};
})

/**
 * Creación de un filtro llamado paginar utilizando la función filter del modulo
 * Segundo argumento función de factoría (callback) cuyos argumentos son:
 * 
 * array con los elementos a filtar pagina que queremos visualizar numero de
 * elementopor pagina
 * 
 * Inyectamos el servicio $filter para acceder a los filtros integrados de
 * AngularJS desde el código JavaScript
 */
filtros.filter("paginar", [
		"$filter",
		function($filter) {
			// Devolvemos lo que nos devuelva la funcion de
			// creacion que recibe como argumento una matriz y
			// la propiedad a utilizar
			return function(array, pagina, registrosPorPagina) {

				// Comprobar que los datos recibidos son una matriz
				// y dos números
				if (angular.isArray(array) && angular.isNumber(pagina)
						&& angular.isNumber(registrosPorPagina)) {

					// Calcular indice del primer elemento a visualizar
					var indiceInicio = (pagina - 1) * registrosPorPagina;

					// Si el numero de elementos de la matriz es menor
					// que el primer calculado devolvemos matriz vacia
					if (array.lenght < indiceInicio) {
						return [];
					} else {
						// Devolver matriz empezando en la posicion calculada
						// y tantos elementos como haya en cada pagina
						return $filter("limitTo")(array.splice(indiceInicio),
								registrosPorPagina);
					}
				}

				// Si los parámetros no son correctos devolvemos la matriz
				// que hemos recibido
				return array;

			};
		} ]);

/**
 * Creación de un filtro llamado numeroPaginas Segundo argumento función de
 * factoría (callback) cuyos argumentos son:
 * 
 * array con los elementos a filtar numero de elementos por pagina
 * 
 * Devolvemos una matriz de enteros con tantos elementos como paginas haya que
 * generar en los resultados. Cada elemento es el número de página
 */
filtros.filter("numeroPaginas", function() {
	// Devolvemos lo que nos devuelva la funcion de
	// creacion que recibe como argumento una matriz y
	// la propiedad a utilizar
	return function(array, registrosPorPagina) {

		// Comprobar que los datos recibidos son una matriz
		// y un número
		if (angular.isArray(array) && angular.isNumber(registrosPorPagina)) {

			// Crear matriz para devolucion
			var numerosPagina = [];

			// Calcular el números de páginas que hay que
			// generar redondeando al entero más cercano
			// por encima
			var totalPaginas = Math.ceil(array.length / registrosPorPagina);

			// Generar los números de cada página
			for (var i = 0; i < totalPaginas; i++) {
				// Añadir número a la matriz
				numerosPagina.push(i);
			}

			// Devolver matriz
			return numerosPagina;

		}

		// Si los parámetros no son correctos devolvemos la matriz
		// que hemos recibido
		return array;

	};
});
