function panelAdjudicados(){
	$("#dvTitulo").html("Propuestas adjudicadas");
	$.get("vistas/listaOfertas.tpl", function(plantillaOferta){
		jsShowWindowLoad("Espera mientras obtenemos las ofertas para ti");
		$.post(server + "listaOrdenesAdjudicadas", {
			"transportista": idTransportista,
			"movil": 1
		}, function(resp){
			$("#modulo").html("");
			
			if(resp.length == 0){
				$.get("vistas/sinAdjudicaciones.tpl", function(sinOfertas){
					$("#modulo").html(sinOfertas);
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
				plantilla.find("[campo=destino]").html(el.destino_json.direccion);
				
				plantilla.find(".btnDetalle").click(function(){
					getDetalle(el);
				});
				
				$("#modulo").append(plantilla);
			});
			jsRemoveWindowLoad()
		}, "json");
	});
	
	function getDetalle(el){
		$.get("vistas/ofertaAdjudicada.tpl", function(plantilla){
			plantilla = $(plantilla);
			
			$.each(el, function(campo, valor){
				plantilla.find("[campo=" + campo + "]").html(valor);
			});
			
			plantilla.find(".mapa").attr("id", "mapa_" + el.idOrden);
				
			plantilla.find("[campo=origen]").html(el.origen_json.direccion);
			plantilla.find("[campo=destino]").html(el.destino_json.direccion);
			
			$("#modulo").html(plantilla);
			
			el.mapa = new google.maps.Map(document.getElementById("mapa_" + el.idOrden), {
				center: {lat: el.origen_json.latitude, lng: el.origen_json.longitude},
				scrollwheel: true,
				fullscreenControl: true,
				zoom: 8,
				zoomControl: true
			});
			
			var LatLng = new google.maps.LatLng(el.origen_json.latitude, el.origen_json.longitude);
			el.origen = new google.maps.Marker({label: "Origen"});
			el.mapa.setCenter(LatLng);
			el.origen.setPosition(LatLng);
			el.origen.setMap(el.mapa);
			
			var LatLng = new google.maps.LatLng(el.destino_json.latitude, el.destino_json.longitude);
			el.destino = new google.maps.Marker({label: "Destino"});
			el.destino.setPosition(LatLng);
			el.destino.setMap(el.mapa);
			
			
			plantilla.find(".btnTerminar").attr("oferta", el.idOrden).click(function(){
				var oferta = $(this).attr("oferta");
				alertify.prompt("¿Algún comentario?", function (e, str) { 
			    	if(e) {
						var obj = new TOferta;
						obj.terminar({
							"id": idTransportista,
							"oferta": oferta,
							"comentario": str,
							fn: {
							 	before: function(){
								 	jsShowWindowLoad("Estamos indicando que el servicio se ha completado, por favor espera");
							 	}, after: function(resp){
								 	jsRemoveWindowLoad();
								 	console.log(resp);
								 	if (resp.band){
									 	panelAdjudicados();
								 	}else{
									 	alertify.error("Ocurrió un error, intentalo más tarde");
								 	}
								}
							}
						});
		    		}
		    	});
			});
			
			plantilla.find(".btnRegresar").click(function(){
				panelAdjudicados();
			});
			
			$("#btnCamara").click(function(){
				navigator.camera.getPicture(function(imageURI){
					var img = $("<img />");
									
					$("#lstImg").append(img);
					img.attr("src", "data:image/jpeg;base64," + imageURI);
					img.attr("src2", imageURI);
				}, function(message){
					alertify.error("Ocurrio un error al subir la imagen");
				}, { 
					quality: 100,
					destinationType: Camera.DestinationType.DATA_URL,
					encodingType: Camera.EncodingType.JPEG,
					targetWidth: 250,
					targetHeight: 250,
					correctOrientation: true,
					allowEdit: false,
					saveToPhotoAlbum: true
				});
			});
			
			$("#btnGaleria").click(function(){
				navigator.camera.getPicture(function(imageURI){
					var img = $("<img />");
									
					$("#lstImg").append(img);
					img.attr("src", "data:image/jpeg;base64," + imageURI);
					img.attr("src2", imageURI);
				}, function(message){
					alertify.error("Ocurrio un error al subir la imagen");
				}, { 
					quality: 100,
					destinationType: Camera.DestinationType.DATA_URL,
					encodingType: Camera.EncodingType.JPEG,
					targetWidth: 250,
					targetHeight: 250,
					correctOrientation: true,
					allowEdit: false,
					sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
				});
			});
		});
	}
}