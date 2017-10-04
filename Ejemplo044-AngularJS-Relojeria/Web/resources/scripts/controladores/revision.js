/**
 * Crear controlador asociado a la página resumenRevision.html
 * para pintar el contenido actual del carro y dar la posibilidad
 * de eliminar cualquier reloj que se haya añadido
 * 
 * Inyectar los servicios necesarios
 */
relojesApp.controller("resumenCarroCtrl", [
	"$carro", "$scope", function($carro, $scope) {
		// Recuperar contenido del carro y asignar a la
		// prpiedad datosCarro del $scope
		$scope.datosCarro = $carro.contenidoCarro();
		
		// Función para calcular y devolver el total de la
		// compra de los productos actuales
		$scope.total = function() {
			var total = 0;
			
			// Recorrer el carro
			for(var i = 0; i < $scope.datosCarro.length; i++) {
				// Recuperar elemento actual
				var item = $scope.datosCarro[i];
				
				// Recuperar unidades
				var unidades = item.cantidad;
				
				// Recuperar precio
				var precioUnidad = item.precio;
				
				total += unidades * precioUnidad;
			}
			
			// Devolver total
			return total;
		}
		
		// Función para eliminar un reloj por su id del carro
		$scope.eliminar = function(idReloj) {
			$carro.eliminarReloj(idReloj);
		}
	}
]);

