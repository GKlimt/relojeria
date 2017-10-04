// Crear servicio constant para definir estilo CSS para resaltar
// botones deleccionados en la vista
relojesApp.constant("$resaltarSeleccion", "btn-primary");

// Crear servicio constant para definir numéro de elementos
// por página
relojesApp.constant("$elementosPorPagina", 3);

// Inyectar servicios necesarios por el controlador
var listaRelojesCtrl = relojesApp.controller(
		"listaRelojesCtrl", 
		["$scope", "$resaltarSeleccion", "$elementosPorPagina", 
			"$carro", function($scope, $resaltarSeleccion,
					$elementosPorPagina, $carro) {
			
			
			var marcaSeleccionada = null;
			
			$scope.paginaSeleccionada = 1;
			$scope.tamanioPagina = $elementosPorPagina;
			
			$scope.seleccionarMarca = function(nuevaMarca) {
				// Comprobar si viene parámetro
				if(!angular.isDefined(nuevaMarca)) {
					// Boton de inicio
					marcaSeleccionada = null;
				} else {
					marcaSeleccionada = nuevaMarca;
				}
				
				$scope.paginaSeleccionada = 1;
			}
			
			$scope.resaltarMarca = function(nuevaMarca) {
				// Devolvemos clase CSS de Bootstrap btn-primary
				// para seleccionar el botón
				return marcaSeleccionada === nuevaMarca ?
						$resaltarSeleccion : "";
			}
			
			$scope.resaltarPagina = function(pagina) {
				// Devolvemos clase CSS de Bootstrap btn-primary
				// para seleccionar el botón
				return $scope.paginaSeleccionada === pagina ?
						$resaltarSeleccion : "";
			}
			
			$scope.seleccionarPagina = function(nuevaPagina) {
				// Actualizar la pagina seleccionada con la
				// pagina correspondiente al botón sobre el
				// que hemos pulsado
				return $scope.paginaSeleccionada = nuevaPagina;
			}
			
			/*
			 * Función para filtrar la matriz con los relojes
			 * dependiendo de la marca seleccionada
			 * 
			 * Hay que devolver true para cada reloj que queremos 
			 * que aparezca en la pagina
			 */
			$scope.filtrarPorMarca = function(reloj) {
				return marcaSeleccionada === null ||
					reloj.marca === marcaSeleccionada;
			}
			
			/*
			 * Función para añadir un relos al carro
			 */
			$scope.agregarRelojCarro = function(reloj) {
				$carro.agregarReloj(reloj.id,
						reloj.modelo, reloj.precio);
			}
			
		}]);