function panelOfertas(){
	$("#dvTitulo").html("<center>CARGAS DISPONIBLES</center>");
	$("nav.footer").hide();
	$("nav.footer").html("");
	
	$.get("vistas/listaOfertas.tpl", function(plantillaOferta){
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
			}else{
				$("#modulo").html('<h5 class="text-center"><span class="text-danger">' + resp.length + '</span> CARGAS DISPONIBLES</h5>');
			}
				
			$.each(resp, function(i, el){
				var plantilla = $(plantillaOferta);
				
				$.each(el, function(campo, valor){
					plantilla.find("[campo=" + campo + "]").html(valor);
				});
				
				plantilla.find("[campo=presupuesto]").html("$ " + el.presupuesto);
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
		$("#dvTitulo").html('<i class="fa fa-arrow-left" action="back" aria-hidden="true"></i> ORDEN Nº ' + el.folio).find("[action=back]").click(function(){
			panelOfertas();
		});
		
		$("nav.footer").show();
		
		$.get("vistas/oferta.tpl", function(plantilla){
			plantilla = $(plantilla);
			
			$.each(el, function(campo, valor){
				plantilla.find("[campo=" + campo + "]").html(valor);
			});
			
			plantilla.find("[campo=presupuesto]").html("$ " + el.presupuesto);
			plantilla.find(".mapa").attr("id", "mapa_" + el.idOrden);
				
			plantilla.find("[campo=origen]").html(el.origen_json.direccion);
			plantilla.find("[campo=destino]").html(el.destino_json.direccion);
			
			$("#modulo").html(plantilla);
			
			el.mapa = new google.maps.Map(document.getElementById("mapa_" + el.idOrden), {
				center: {lat: el.origen_json.latitude, lng: el.origen_json.longitude},
				scrollwheel: true,
				fullscreenControl: true,
				zoom: 4,
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
			
			$("nav.footer").html('<div class="btn-group btn-group-justified" role="group"><div class="btn-group" role="group" style="width: 100%"><button type="button" class="btn btnRegresar btn-primary btn-block">VER OTRO</button></div><div class="btn-group" role="group" style="width: 100%"><button type="button" class="btnAceptar btn btn-primary btn-block">ACEPTAR</button></div></div>');
			
			$("nav.footer").find(".btnAceptar").attr("oferta", el.idOrden).click(function(){
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
					    		 	panelOfertas();
					    		 	
					    		 	alertify.success("Muchas gracias por tu interes, te mantendremos informado de la adjudicación de la orden de trabajo");
				    		 	}else{
					    		 	alertify.error("La propuesta no fue aceptada, intentalo más tarde");
				    		 	}
			    		 	}
		    		 	}
		    		 });
		    		}
		    	});
			});
			
			$("nav.footer").find(".btnRegresar").click(function(){
				panelOfertas();
			});
		});
	}
}