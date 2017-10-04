/**
 * Crear módulo carro
 */
var carro = angular.module("carro", []);

// Crear servicio $carro (factory) para devolver objeto con
// las funciones de agregarReloj, eliminarReloj y contenidoCarro
carro.factory("$carro", function() {
	// Matriz con los datos del carro de la compra
	var datosCarro = [];

	// Devolver objeto con la funcionalidad del carro
	return {
		agregarReloj : function(id, producto, precio) {
			var esta = false;

			// Recorrer matriz con los productos
			for (var i = 0; i < datosCarro.length; i++) {
				// Recuperar cada elemento
				var item = datosCarro[i];

				// Comprobar si es el producto que se va a añadir
				if (item.id === id) {
					esta = true;

					// Incrementar una unidad para el producto
					item.cantidad += 1;

					// Salir del for
					break;
				}
			}

			// Comprobar si no estaba
			if (!esta) {
				// Añadir nuevo elemento al carro
				datosCarro.push({
					id : id,
					producto : producto,
					precio : precio,
					cantidad : 1
				});
			}
		},
		eliminarReloj : function(id) {
			// Recorrer matriz con los productos
			for (var i = 0; i < datosCarro.length; i++) {
				// Recuperar cada elemento
				var item = datosCarro[i];

				// Comprobar si es el producto que se va a añadir
				if (item.id === id) {
					// Eliminar de la matriz
					datosCarro.splice(i, 1);

					// Salir del for
					break;
				}
			}
		},
		contenidoCarro : function() {
			// Devolver matriz
			return datosCarro;
		}
	}
});

/**
 * Crear directiva resumen-carro para pintar el contenido del carro de la
 * compra. A la función de factoria de la directiva inyectamos nuestro servicio
 * $carro
 */
carro.directive("resumenCarro", [ "$carro", function($carro) {
	return {
		restrict: "E", // elemento
		templateUrl: "componentes/carro/resumenCarro.html", // pgina con el contenido del carro
		controller: function($scope) { // controlador
			// Recuperar los datos del carro
			var datosCarro = $carro.contenidoCarro();
			
			// Función para calcular y devolver el total de la
			// compra de los productos actuales
			$scope.total = function() {
				var total = 0;
				
				// Recorrer el carro
				for(var i = 0; i < datosCarro.length; i++) {
					// Recuperar elemento actual
					var item = datosCarro[i];
					
					// Recuperar unidades
					var unidades = item.cantidad;
					
					// Recuperar precio
					var precioUnidad = item.precio;
					
					total += unidades * precioUnidad;
				}
				
				// Devolver total
				return total;
			}
			
			// Función para devolver el numero de productos
			// actuales en el carro
			$scope.elementosCarro = function() {
				return datosCarro.length;
			}
		}
	}
} ]);
