/**
 * Controlador relojesAppCtrl con propiedad datos (objeto)
 * con propiedad relojes que es una matriz de objetos anónimos
 * que representan los relojes de la aplicación
 */

// Crear un servicio constant de nombre dataURL cuyo valor
// es la URL del fichero JSON con los datos
relojesApp.constant("$dataURL", "datos/relojes.json");

var relojesAppCtrl = relojesApp.controller(
		"relojesAppCtrl", 
		["$scope", "$http", "$dataURL", 
			function($scope, $http, $dataURL) {
		
			$scope.datos = {};
			
			// Cargar los datos mediante el servicio $http
			$http.get($dataURL).success(function(data) {
				// Asignar datos a la propiedad relojes
				// del objeto datos
				$scope.datos.relojes = data;
				
			}).error(function(err) {
				// Indicar que hay error
				$scope.datos.error = true;
			});
		}]);
