function panelOfertas(){
	$("#dvTitulo").html("<center>CARGAS DISPONIBLES</center>");
	$("nav.footer").hide();
	$("nav.footer").html("");
	
	$.get("vistas/listaOfertas.tpl", function(plantillaOferta){
		jsShowWindowLoad("Espera mientras obtenemos las ofertas para ti");
		$.post(server + "listaOrdenesTransportista", {
			"transportista": objChofer.datos.idTransportista,
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
				$.each(el.destinos, function(i, destino){
					plantilla.find("[campo=destino]").html(destino.direccion);
				})
				
				//plantilla.find("[campo=destino]").html(el.destino_json.direccion);
				
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
			
			plantilla.find("[campo=presupuestoFormat]").html("$ " + el.presupuesto);
			plantilla.find(".mapa").attr("id", "mapa_" + el.idOrden);
				
			plantilla.find("[campo=origen]").html("");
			var span = $("<a/>", {
				href: "#",
				text: el.origen_json.direccion
			});
			cont++;
			span.click(function(){
				el.mapa.setCenter(new google.maps.LatLng(el.origen_json.latitude, el.origen_json.longitude));
				el.mapa.setZoom(15);
				alertify.alert(el.origen_json.direccion);
			});
			plantilla.find("[campo=origen]").append(span);

			plantilla.find("[campo=destino]").html("");
			var cont = 0;
			destino = el.destinos[el.destinos.length-1];
			var span = $("<a/>", {
				href: "#",
				text: ' - ' + destino.direccion
			});
			span.click(function(){
				el.mapa.setCenter(new google.maps.LatLng(destino.posicion.latitude, destino.posicion.longitude));
				el.mapa.setZoom(15);
				alertify.alert(destino.direccion);
			});
			plantilla.find("[campo=destino]").append(span);
			
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
			var cont = 0;
			$.each(el.destinos, function(i, destino){
				cont++;
				var marca = new google.maps.Marker({title: cont.toString()});
				marca.setPosition(new google.maps.LatLng(destino.posicion.latitude, destino.posicion.longitude));
				marca.setMap(el.mapa);
				
				marca.addListener('click', function(){
					el.mapa.setCenter(marca.getPosition());
					el.mapa.setZoom(15);
					alertify.alert(destino.direccion);
				});
			});
			
			$("nav.footer").html('<div class="btn-group btn-group-justified" role="group"><div class="btn-group" role="group" style="width: 100%"><button type="button" class="btn btnRegresar btn-primary btn-block">VER OTRO</button></div><div class="btn-group" role="group" style="width: 100%"><button type="button" class="btnAceptar btn btn-primary btn-block">ACEPTAR</button></div></div>');
			
			$(".btnAceptar").attr("oferta", el.idOrden).click(function(){
				alertify.prompt("El presupuesto es de $ " + el.presupuesto + " <br />¿Cual es tu mejor oferta?", function (e, monto){
					if (e){
						console.log(monto, el.presupuesto, idTransportista);
						if (Number(monto) <= Number(el.presupuesto) && Number(monto) > 0){
							var oferta = $(this).attr("oferta");
				    		var obj = new TOferta;
				    		obj.aceptar({
				    			"id": objChofer.datos.idTransportista,
				    			"oferta": el.idOrden,
				    			"monto": monto,
				    			fn: {
									before: function(){
										jsShowWindowLoad("Estamos aceptando la propuesta");
									}, after: function(resp){
										jsRemoveWindowLoad();
	
										if (resp.band){
										 	panelOfertas();
									 	
										 	alertify.success("Muchas gracias por tu interes, te mantendremos informado de la adjudicación de la orden de trabajo");
									 	}else{
									 		alertify.error("La propuesta no fue aceptada, intentalo más tarde");
										}
									}
								}
							});
						}else
							alertify.alert("Tiene que ser un valor menor o igual que el presupuesto");
					}
				});
			});
			
			$(".btnRegresar").click(function(){
				panelOfertas();
			});
		});
	}
}