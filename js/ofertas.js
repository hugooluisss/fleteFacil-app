function panelOfertas(){
	$.get("vistas/oferta.html", function(plantillaOferta){
		jsShowWindowLoad("Espera mientras obtenemos las ofertas para ti");
		$.post(server + "listaOrdenesTransportista", {
			"transportista": idTransportista,
			"movil": 1
		}, function(resp){
			$("#modulo").html("");
			
			if(resp.length == 0){
				$.get("vistas/sinOfertas.tpl", function(sinOfertas){
					$("#modulo").html(sinOfertas);
				});
			}
				
			$.each(resp, function(i, el){
				var plantilla = $(plantillaOferta);
				
				$.each(el, function(campo, valor){
					plantilla.find("[campo=" + campo + "]").html(valor);
				});
				plantilla.find(".mapa").attr("id", "mapa_" + el.idOrden);
				
				plantilla.find("[campo=origen]").html(el.origen_json.direccion);
				plantilla.find("[campo=destino]").html(el.destino_json.direccion);
				$("#modulo").append(plantilla);
				
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
				
				plantilla.find(".btnAceptar").attr("oferta", el.idOrden).click(function(){
					var oferta = $(this).attr("oferta");
					alertify.confirm("¿Seguro?", function(e){
			    		if(e) {
			    		 var obj = new TOferta;
			    		 obj.aceptar({
			    		 	"id": idTransportista,
			    		 	"oferta": oferta,
			    		 	fn: {
				    		 	before: function(){
					    		 	jsShowWindowLoad("Estamos aceptando la propuesta");
				    		 	}, after: function(resp){
					    		 	jsRemoveWindowLoad();
					    		 	console.log(resp);
					    		 	if (resp.band){
						    		 	plantilla.remove();
						    		 	if ($("#modulo").html() == ''){
											$.get("vistas/sinOfertas.tpl", function(sinOfertas){
												$("#modulo").html(sinOfertas);
											});
										}
						    		 	
					    		 	}else{
						    		 	alertify.error("La propuesta no fue aceptada, intentalo más tarde");
					    		 	}
				    		 	}
			    		 	}
			    		 });
			    		}
			    	});
			    	
				});
			});
			
			jsRemoveWindowLoad()
		}, "json");
	});
}