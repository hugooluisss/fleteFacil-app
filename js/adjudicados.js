function panelAdjudicados(){
	$("#dvTitulo").html("Propuestas adjudicadas");
	
	$("#dvTitulo").html("<center>CARGAS ADJUDICADAS</center>");
	$("nav.footer").hide();
	$("nav.footer").html("");
	
	$(".modal-backdrop").remove();
	
	$.get("vistas/listaOfertas.tpl", function(plantillaOferta){
		jsShowWindowLoad("Espera mientras obtenemos tus ordenes");
		$.post(server + "listaOrdenesAdjudicadas", {
			"transportista": objChofer.datos.idTransportista,
			"chofer": objChofer.datos.idUsuario,
			"movil": 1
		}, function(resp){
			$("#modulo").html("");
			
			if(resp.length == 0){
				$.get("vistas/sinAdjudicaciones.tpl", function(sinOfertas){
					$("#modulo").html(sinOfertas);
					
					$(".btnOfertas").click(function(){
						panelOfertas();
					});
				});
			}else{
				$("#modulo").html('<h5 class="text-center"><span class="text-danger">' + resp.length + '</span> CARGAS ADJUDICADAS</h5>');
			}
			
			$.each(resp, function(i, el){
				var plantilla = $(plantillaOferta);
				
				$.each(el, function(campo, valor){
					plantilla.find("[campo=" + campo + "]").html(valor);
				});
				plantilla.find(".mapa").attr("id", "mapa_" + el.idOrden);
				
				plantilla.find("[campo=origen]").html(el.origen_json.direccion);
				$.each(el.destinos, function(i, destino){
					plantilla.find("[campo=destino]").html(destino.direccion);
				})
				
				plantilla.find(".btnDetalle").click(function(){
					getDetalle(el);
				});
				
				$("#modulo").append(plantilla);
			});
			jsRemoveWindowLoad()
		}, "json");
	});
	
	function getDetalle(el){
		var plantillaUsar = "";
		var puntos = [];
		
		if (objChofer.perfil == 4){
			plantillaUsar = "vistas/ofertaAdjudicadaSupervisor.tpl";
			console.log(objChofer.idUsuario, el.chofer);
			if (objChofer.id == el.chofer)
				plantillaUsar = "vistas/ofertaAdjudicadaOperador.tpl";
		}else
			plantillaUsar = "vistas/ofertaAdjudicadaOperador.tpl";
			
		$.get(plantillaUsar, function(plantilla){
			plantilla = $(plantilla);
			
			$("#dvTitulo").html('<i class="fa fa-arrow-left" action="back" aria-hidden="true"></i> ORDEN Nº ' + el.folio).find("[action=back]").click(function(){
				panelAdjudicados();
			});
			
			var idOrden = window.localStorage.getItem("idOrden");
			console.log(el.idEstado);
			switch(parseInt(el.idEstado)){
				case 4: //Asignada
					plantilla.find(".dvEnRuta").hide();
					plantilla.find(".dvTerminar").hide();
					
					if (idOrden == undefined)
						plantilla.find(".dvEnRuta").show();
					else
						plantilla.find(".dvTerminar").show();
				break;
				case '5': case '6': case '7':
				default: 
					plantilla.find(".dvTerminar").hide();
					plantilla.find(".dvEnRuta").hide();
					plantilla.find(".btnRegresar").html("REGRESAR");
					plantilla.find(".viewEstado").show();
				break;
			}
			
			$.each(el, function(campo, valor){
				plantilla.find("[campo=" + campo + "]").html(valor);
			});
			
			plantilla.find(".mapa").attr("id", "mapa_" + el.idOrden);
			
			if (el.destinos.length > 0){	
				plantilla.find("[campo=origen]").html("");
				var span = $("<a/>", {
					href: "#",
					text: el.origen_json.direccion
				});
				
				span.click(function(){
					mapa.setCenter(new google.maps.LatLng(el.origen_json.latitude, el.origen_json.longitude));
					mapa.setZoom(15);
					alertify.alert(el.origen_json.direccion);
				});
				plantilla.find("[campo=origen]").append(span);
			}
			
			$("#modulo").html(plantilla);
			
			mapa = new google.maps.Map(document.getElementById("mapa_" + el.idOrden), {
				center: {lat: el.origen_json.latitude, lng: el.origen_json.longitude},
				scrollwheel: true,
				fullscreenControl: true,
				zoom: 4,
				zoomControl: true
			});
			
			var LatLng = new google.maps.LatLng(el.origen_json.latitude, el.origen_json.longitude);
			puntos.push(new google.maps.LatLng(el.origen_json.latitude, el.origen_json.longitude));
			el.origen = new google.maps.Marker({label: "Origen"});
			mapa.setCenter(LatLng);
			el.origen.setPosition(LatLng);
			el.origen.setMap(mapa);
			
			plantilla.find("[campo=destino]").html("");
			var cont = 0
			destino = el.destinos[el.destinos.length-1];
			var span = $("<a/>", {
				href: "#",
				text: ' - ' + destino.direccion
			});
			span.click(function(){
				mapa.setCenter(new google.maps.LatLng(destino.posicion.latitude, destino.posicion.longitude));
				mapa.setZoom(15);
				alertify.alert(destino.direccion);
			});
			plantilla.find("[campo=destino]").append(span);
			
			$.each(el.destinos, function(i, destino){
				cont++;
				
				var marca = new google.maps.Marker({title: cont.toString()});
				marca.setPosition(new google.maps.LatLng(destino.posicion.latitude, destino.posicion.longitude));
				marca.setMap(mapa);
				
				marca.addListener('click', function(){
					mapa.setCenter(marca.getPosition());
					mapa.setZoom(15);
					alertify.alert(destino.direccion);
				});
				
				puntos.push(new google.maps.LatLng(destino.posicion.latitude, destino.posicion.longitude));
			});
			
			idOrden = window.localStorage.getItem("idOrden");
			plantilla.find(".btnRegresar").click(function(){
				panelAdjudicados();
			});
			
			var flightPath = new google.maps.Polyline({
				path: puntos,
				geodesic: true,
				strokeColor: '#F00000',
				strokeOpacity: 1.0,
				strokeWeight: 2
			});
			
			flightPath.setMap(mapa);
				
			if (objChofer.perfil == 4){
				if (objChofer.id == el.chofer)
					accionesOperador(el);
				else
					accionesSupervisor(el);
			}else
				accionesOperador(el);
		});
	}
	
	function accionesSupervisor(el){
		$.post(server + "ctransportistas", {
			"id": objChofer.datos.idTransportista,
			"movil": 1,
			"json": true,
			"action": "getChoferes"
		}, function(choferes){
			$("#selConductor").find("option").remove();
			$.each(choferes, function(i, chofer){
				$("#selConductor").append($("<option />", {
					value: chofer.idUsuario,
					text: chofer.nombre,
					json: chofer.json
				}))
			});
			
			setConductor();
		}, "json");
		
		$("#selConductor").change(function(){
			setConductor();
		});
		
		function setConductor(){
			console.log(conductor, $("#selConductor").find("option:selected").attr("json"));
			var conductor = jQuery.parseJSON($("#selConductor").find("option:selected").attr("json"));
			$.each(conductor, function(campo, valor){
				$("#winEquipo").find("[campo=" + campo + "]").val(valor);
			});
		}
		
		$("#frmEquipo").validate({
			debug: true,
			rules: {
				selConductor: "required",
				txtPatenteCamion: "required",
				txtPatenteRampla: "required"
			},
			wrapper: 'span', 
			submitHandler: function(form){
				alertify.confirm("¿Estás seguro?", function(e){
					if (e) {
						var obj = new TOferta;
						var objConductor = jQuery.parseJSON($("#selConductor").find("option:selected").attr("json"));
						console.log(objConductor);
						obj.asignarChofer({
							"conductor": objConductor.idUsuario, 
							"orden": el.idOrden, 
							"patenteCamion": $("#txtPatenteCamion").val(),
							"patenteRampla": $("#txtPatenteRampla").val(),
							"fn": {
								before: function(){
									$("[type=submit]").prop("disabled", true);
								},
								after: function(datos){
									$("[type=submit]").prop("disabled", false);
									$("#winEquipo").modal("hide");
									if (datos.band){
										alertify.success("Orden asignada al chofer");
										panelAdjudicados();
									}else{
										alertify.error("No pudo ser asignado al equipo");
									}
								}
							}
						});
					}
				});
	        }
	
	    });
	}
	
	function accionesOperador(el){
		navigator.geolocation.getCurrentPosition(function(position){
			console.log("Ok", position);
		}, function(error){
			console.log("Error", error);
		});
		
		cordova.plugins.backgroundMode.on('activate', function() {
			cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
		});
		
		cordova.plugins.backgroundMode.setDefaults({
			title: "En ruta",
			text: "Estas en ruta en la orden " + el.folio,
			icon: 'icon', // this will look for icon.png in platforms/android/res/drawable|mipmap
			color: "F14F4D", // hex format like 'F14F4D'
			resume: true,
			hidden: false,
			bigText: Boolean
		});
		
		cordova.plugins.backgroundMode.on('enable', function(){
			window.localStorage.removeItem("fecha");
			cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
			navigator.geolocation.watchPosition(function(position){
				var idOrden = window.localStorage.getItem("idOrden");
				
				var fecha = window.localStorage.getItem("fecha");
				var dt = new Date();
				
				fecha = fecha == null || fecha == NaN || fecha == 'NaN'?(dt.getTime()):fecha;
				
				if (idOrden != undefined && idOrden != ''){
					var ultimoUpdate = new Date(fecha);
					if (dt.getTime() - (60 * 8640) <= fecha){
						window.localStorage.setItem("fecha", ultimoUpdate.getTime());
						
						$.post(server + 'cordenes', {
							"orden": idOrden,
							"latitude": position.coords.latitude,
							"longitude": position.coords.longitude,
							"action": 'logPosicion',
							"movil": '1'
						}, function(resp){
							if (!resp.band)
								console.log("Error");
							else
								console.log("Posición reportada");
						}, "json").done(function(){
							console.log("Listo BG");
						}).fail(function(){
							console.log("Error bug");
						});
						console.log("Enviado");
					}else{
						console.log("No se envió, aun falta tiempo", dt.getTime(), ultimoUpdate.getTime(), fecha);
					}
				}else{
					cordova.plugins.backgroundMode.disable();
					console.log("Terminando seguimiento");
					window.localStorage.removeItem("fecha");
				}
					
			}, function(error){
				console.log("Error GPS", error);
			}, {
				enableHighAccuracy: false, 
				maximumAge        : 1200000, 
				timeout           : 1200000
			});
		});
		
		var idOrden = window.localStorage.getItem("idOrden");
		if (idOrden != undefined && idOrden != ''){
			cordova.plugins.backgroundMode.enable();
			console.log("Está en modo ruta");
		}else
			console.log("No estaba en modo ruta", idOrden);
		
		$(".btnEnRuta").attr("oferta", el.idOrden).click(function(){
			console.log(el.idOrden);
			
			window.localStorage.removeItem("idOrden");
			window.localStorage.removeItem("fecha");
			window.localStorage.setItem("idOrden", el.idOrden);
			
			$.post(server + 'cordenes', {
				"orden": el.idOrden,
				"action": 'setEnRuta',
				"movil": '1'
			}, function(resp){
				if (!resp.band)
					console.log("Error");
				else
					console.log("Cambio de estado en ruta OK");
			}, "json");
			
			cordova.plugins.backgroundMode.enable();
			
			alertify.log("Estaremos reportandole tu ubicación al cliente");
			panelAdjudicados();

			//$(".dvReportar").show();
			//$(".groupTerminar").show();
			//$(".dvEnRuta").hide();
		});
		
		$.each(el.destinos, function(i, destino){
			if (destino.estado == 0){
				var btn = $("<btn />", {
					class: "btn btn-danger btn-block",
					idPunto: destino.idPunto,
					text: destino.direccion,
					style: "font-size: 10px"
				});
				
				$(".botonesEntrega").append(btn).append("<br />");
				
				btn.click(function(){
					$("#winTerminar").modal();
					$("#winTerminar").attr("punto", destino.idPunto);
					$("#winTerminar").find(".titulo").text(destino.direccion);
				});
			}
		});
		
		$("#btnTerminar").attr("oferta", el.idOrden).click(function(){
			var punto = $("#winTerminar").attr("punto");
			//window.localStorage.removeItem("idOrden");
			//idOrden = undefined;
			if ($("#txtComentario").val() == ''){
				alertify.error("Escribe un comentario");
			}else if ($("#lstImg").find("img").length < 1){
				alertify.error("Envianos una evidencia en fotografía");
			}else{
				alertify.confirm("¿Estás seguro?", function (e) {
					if (e) {
						var fotografias = new Array;
						i = 0;
						$("#lstImg").find("img").each(function(){
							fotografias[i] = "";
							fotografias[i++] = $(this).attr("src2");
						});
						
						var obj = new TOferta;
						obj.terminar({
							//"id": idTransportista,
							"punto": punto,
							"comentario": $("#txtComentario").val(),
							"fotografias": fotografias,
							fn: {
							 	before: function(){
								 	jsShowWindowLoad("Estamos indicando que el servicio se ha completado, por favor espera");
							 	}, after: function(resp){
							 		jsRemoveWindowLoad();
							 		if (resp.faltantes == 0){
									 	cordova.plugins.backgroundMode.disable();
									 	window.localStorage.removeItem("latitude");
									 	window.localStorage.removeItem("longitude");
									 	window.localStorage.removeItem("idOrden");
									 	alertify.success("El reporte de tu ubicación ha finalizado");
									}else{
										alertify.success("Gracias, puedes continuar tu recorrido");
									}
								 	
								 	$("#winTerminar").modal("hide");
								 	
								 	if (resp.band){
									 	panelAdjudicados();
									 	alertify.success("Muchas gracias por la información, tu trabajo fue enviado");
								 	}else{
									 	alertify.error("Ocurrió un error, intentalo más tarde");
								 	}
								}
							}
						});
					}
				}); 
			}
		});
		
		function agregarFoto(imageURI){
			var img = $("<img />");
			
			$("#lstImg").append(img);				
			img.attr("src", "data:image/jpeg;base64," + imageURI);
			img.attr("src2", imageURI);
			
			img.click(function(){
				var foto = $(this);
				alertify.confirm("Se eliminará la fotografía del reporte ¿seguro?", function (e) {
					if (e) {
						foto.remove();
						alertify.success("Fotografía eliminada");
					}
				}); 
			});
		}
		
		$("#btnCamara").click(function(){
			if ($("#lstImg").find("img").length < 4){
				navigator.camera.getPicture(function(imageURI){
					agregarFoto(imageURI);
				}, function(message){
					alertify.error("Ocurrio un error al obtener la imagen");
				}, { 
					quality: 100,
					destinationType: Camera.DestinationType.DATA_URL,
					encodingType: Camera.EncodingType.JPEG,
					targetWidth: 800,
					targetHeight: 800,
					correctOrientation: true,
					allowEdit: false,
					saveToPhotoAlbum: true
				});
			}else{
				alertify.error("Solo se permiten 4 fotografías");
			}
		});
		
		$("#btnGaleria").click(function(){
			if ($("#lstImg").find("img").length < 4){
				navigator.camera.getPicture(function(imageURI){
					agregarFoto(imageURI);
				}, function(message){
					alertify.error("Ocurrio un error al obtener la imagen");
				}, { 
					quality: 100,
					destinationType: Camera.DestinationType.DATA_URL,
					encodingType: Camera.EncodingType.JPEG,
					targetWidth: 800,
					targetHeight: 800,
					correctOrientation: true,
					allowEdit: false,
					sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
				});
			}else
				alertify.error("Solo se permiten 4 fotografías");
		});
	}
}