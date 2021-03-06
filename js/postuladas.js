function panelPostuladas(){
	$("#dvTitulo").html("<center>CARGAS PROPUESTAS</center>");
	$("nav.footer").hide();
	$("nav.footer").html("");
	
	$.get("vistas/listaOfertas.tpl", function(plantillaOferta){
		jsShowWindowLoad("Espera mientras obtenemos las ordenes donde te has postulado");
		$.post(server + "listaOrdenesPostuladas", {
			"transportista": objChofer.datos.idTransportista,
			"movil": 1
		}, function(resp){
			$("#modulo").html("");
			
			if(resp.length == 0){
				$.get("vistas/sinPostulaciones.tpl", function(sinOfertas){
					$("#modulo").html(sinOfertas);
					$(".btnOfertas").click(function(){
						panelOfertas();
					});
				});
			}else{
				$("#modulo").html('<h5 class="text-center"><span class="text-danger">' + resp.length + '</span> PROPUESTAS</h5>');
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
				
				plantilla.find(".btnDetalle").click(function(){
					getDetalle(el);
				});
				
				$("#modulo").append(plantilla);
			});
			jsRemoveWindowLoad()
		}, "json");
	});
	
	function getDetalle(el){
		$.get("vistas/ofertaPostulada.tpl", function(plantilla){
			plantilla = $(plantilla);
			
			$("#dvTitulo").html('<i class="fa fa-arrow-left" action="back" aria-hidden="true"></i> ORDEN Nº ' + el.folio).find("[action=back]").click(function(){
				panelPostuladas();
			});
			
			$.each(el, function(campo, valor){
				plantilla.find("[campo=" + campo + "]").html(valor);
			});
			
			plantilla.find(".mapa").attr("id", "mapa_" + el.idOrden);
			
			$("#modulo").html(plantilla);
			var mapa = new google.maps.Map(document.getElementById("mapa_" + el.idOrden), {
				center: {lat: el.origen_json.latitude, lng: el.origen_json.longitude},
				scrollwheel: true,
				fullscreenControl: true,
				zoom: 4,
				zoomControl: true
			});
				
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
			
			plantilla.find("[campo=destino]").html("");
			
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
			
			var cont = 0
			$.each(el.destinos, function(i, destino){
				var marca = new google.maps.Marker({title: cont.toString()});
				marca.setPosition(new google.maps.LatLng(destino.posicion.latitude, destino.posicion.longitude));
				marca.setMap(mapa);
				
				marca.addListener('click', function(){
					mapa.setCenter(marca.getPosition());
					mapa.setZoom(15);
					alertify.alert(destino.direccion);
				});
			});
			
			plantilla.find(".btnRegresar").click(function(){
				panelPostuladas();
			});
			
			var LatLng = new google.maps.LatLng(el.origen_json.latitude, el.origen_json.longitude);
			el.origen = new google.maps.Marker({label: "Origen"});
			mapa.setCenter(LatLng);
			el.origen.setPosition(LatLng);
			el.origen.setMap(mapa);
		});
	}
}