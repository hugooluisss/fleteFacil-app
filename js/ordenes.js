function panelOrdenes(){
	jsShowWindowLoad("Estamos buscando tus ordenes");
	
	$.get("vistas/ordenes.tpl", function(tags){
		$("#modulo").html(tags);
		
		$.post(server + "ordenesCliente", {
			"cliente": idCliente,
			"movil": 1
		}, function(ordenes){
			//console.log(ordenes);
			
			$.get("vistas/orden.tpl", function(plantillaOrden){
				$.each(ordenes, function(i, orden){
					var plantilla = $(plantillaOrden);
					$.each(orden, function(campo, valor){
						plantilla.find("[campo=" + campo + "]").html(valor);
					});
					
					if(orden.saldo < 0)
						plantilla.find("[accion=movimientos]").show();
					else
						plantilla.find("[accion=movimientos]").hide();
					
					plantilla.find("[campo=equipo]").css("color", orden.colorEstado);
					plantilla.find("[accion=mensajes]").attr("orden", orden.idOrden).click(function(){
						$("#winMensajes").attr("orden", $(this).attr("orden"));
					});
					
					plantilla.find("[accion=movimientos]").attr("orden", orden.idOrden).click(function(){
						$("#winMovimientos").attr("orden", $(this).attr("orden"));
					});
					
					if (orden.notificaciones > 0){
						plantilla.find("[accion=notificaciones]").html(orden.notificaciones + " nuevas notificaciones").show();
					}else
						plantilla.find("[accion=notificaciones]").hide();
					
					plantilla.find("[accion=notificaciones]").attr("notificaciones", orden.notificaciones);
					plantilla.find("[accion=notificaciones]").attr("orden", orden.idOrden);
					
					$("#dvLista").append(plantilla);
					
					plantilla.find("[accion=notificaciones]").click(function(){
						var elemento = $(this);
						$("#winNotificaciones").attr("orden", elemento.attr("orden"));
						$("#winMensajes").attr("orden", elemento.attr("orden"));
					});
				});
			});
			
			jsRemoveWindowLoad();
			
			$("#winMensajes").on("show.bs.modal", function(e){
				getListaMensajes();
				$("#winNotificaciones").modal("hide");
			});
			
			function getListaMensajes(){
				jsShowWindowLoad("Estamos actualizando la conversación");
				
				$.post(server + "listaMensajes", {
					'orden': $("#winMensajes").attr("orden"),
					'lector': idCliente,
					"movil": 1
				},function(data){
					$("#dvMensajes").html(data);
					jsRemoveWindowLoad();
				});
			}
			
			$("#frmAddMensaje").validate({
				debug: true,
				errorClass: "validateError",
				rules: {
					txtMensaje: "required"
				},
				wrapper: 'span', 
				submitHandler: function(form){
					var obj = new TMensaje;
					obj.add({
						orden: $("#winMensajes").attr("orden"),
						mensaje: $("#txtMensaje").val(),
						tipoEmisor: "C",
						emisor: idCliente,
						fn: {
							before: function(){
								jsShowWindowLoad("Estamos enviando el mensaje");	
							},
							after: function(datos){
								jsRemoveWindowLoad();
								if (datos.band){
									getListaMensajes();
									$("#txtMensaje").val("").focus();
									
									alertify.success("Mensaje enviado");
								}else{
									alertify.error("Upps... No se pudo enviar el mensaje");
								}
							}
						}
					});
				}
			});
			
			$("#btnPagar").click(function(){
				$("#winMovimiento").modal();
			});
		}, "json");
		
		
		$("#winMovimientos").on("show.bs.modal", function(e){
			getListaMovimientos();
			$("#winNotificaciones").modal("hide");
		});
		
		function getListaMovimientos(){
			$("#winMovimientos").find("#dvMovimientos").find("li").remove();
			
			$.post(server + "listaMovimientos", {
				"orden": $("#winMovimientos").attr("orden"),
				"json": 1,
				"movil": 1
			}, function(datos){
				console.log(datos);
				if (datos.saldoDeudor > 0){
					$("#winMovimientos").find("#btnPagar").attr("monto", datos.saldoDeudor);
					$("#winMovimientos").find("[campo=monto]").html(datos.saldoDeudor);
					$("#winMovimiento").find("[campo=monto]").html(datos.saldoDeudor);
					$("#winMovimientos").find("#btnPagar").show();
				}else{
					$("#winMovimientos").find("#btnPagar").hide();
				}
				
				$.each(datos.movimientos, function(i, movimiento){
					var li = $("<li />").addClass("list-group-item").attr("json", movimiento.json);
					
					if (movimiento.tipo == 'C'){
						li.html('<span class="badge">' + movimiento.monto + '</span><i class="fa fa-minus" aria-hidden="true"></i> ' + movimiento.concepto);
						li.addClass("text-danger");
					}else{
						if (movimiento.aprobado == 1)
							li.html('<span class="badge">' + movimiento.monto + '</span><i class="fa fa-plus" aria-hidden="true"></i> ' + movimiento.concepto);
						else
							li.html('<span class="badge">' + movimiento.monto + ' Sin aprobar</span><i class="fa fa-plus" aria-hidden="true"></i> ' + movimiento.concepto);
						li.addClass("text-success");
					}
					$("#winMovimientos").find("#dvMovimientos").append(li);
				});
			}, "json");
		}
		
		$("#winMovimiento").on("show.bs.modal", function(e){
			$.get(server + "datosPago", function(resp){
				$("#winMovimiento").find("#dvDatosPago").html(resp)
			})
			$("#winMovimientos").hide();
		});
		
		$("#winMovimiento").on("hide.bs.modal", function(e){
			$("#winMovimientos").show();
		});
		
		$("#winNotificaciones").on("show.bs.modal", function(e){
			$.post(server + "notificacionescliente", {
				"cliente": idCliente,
				"movil": 1
			},function(resp){
				$("#winNotificaciones").find("#dvNotificaciones").html(resp);
				
				$("#winNotificaciones").find("#dvNotificaciones").find(".list-group-item").click(function(){
					var el = $(this);
					$.post(server + "chome", {
						"id": el.attr("notificacion"),
						"action": "setLeido",
						"movil": 1
					}, function(resp){
						console.log(resp);
					});
				});
			})
		});
		
		$("#btnSendComprobante").click(function(){
			if (navigator.camera != undefined){
				navigator.camera.getPicture(function(imageData) {
					var orden = new TOrden;
					orden.addAbono({
						concepto: "Pago desde app por " + $("#winMovimiento").find("[campo=monto]").html(),
						monto: $("#winMovimiento").find("[campo=monto]").html(),
						orden: $("#winMovimientos").attr("orden"),
						comprobante: imageData,
						fn: {
							before: function(){
								alertify.log("Espera un momento en lo que enviamos el comprobante");
							}, after: function(resp){
								if (resp.band){
									alertify.success("El comprobante fue entregado, espera a que este sea aprobado");
									getListaMovimientos();
									$("#winMovimiento").modal("hide");
								}else
									alertify.error("Ocurrió un error al subir el comprobante");
							}
						}
					});
					
				}, function(message){
					alertify.error("Ocurrio un error al subir la imagen");
				}, { 
					quality: 100,
					//destinationType: Camera.DestinationType.FILE_URI,
					destinationType: Camera.DestinationType.DATA_URL,
					encodingType: Camera.EncodingType.JPEG,
					targetWidth: 250,
					targetHeight: 250,
					correctOrientation: true,
					allowEdit: true
				});
			}else{
				alertify.error("No se pudo iniciar la cámara");
				console.log("No se pudo inicializar la cámara");
			}
		});
		
		/*
		var fecha = new Date();
		var ano = fecha.getFullYear();
		
		for(var i = 0 ; i  < 10 ; i++, ++ano)
			$("#winMovimiento").find(".exp_year").append('<option value="' + ano + '">' + ano + '</option>');
		
		
		$("#submitPago").click(function(){
			jsShowWindowLoad("Espere mientras procesamos el pago");
			
			$(".name").val("hugo Santiago");
			$(".number").val("4242424242424242");
			$(".cvc").val("121");
			$(".exp_month").val("11");
			$(".exp_year").val("2018");
			Conekta.setPublicKey(conekta_public);
			//Conekta.setPublishableKey(conektaPublic);
			var $form = $("#frmPago");	
			// Previene hacer submit más de una vez
			$form.find("#submitPago").prop("disabled", true);
			Conekta.Token.create($form, function(token) {
				var $form = $("#frmPago");
				
				$("#conektaTokenId").val(token.id);
				
				//$form.get(0).submit();
				$.post(server + 'ccargos', {
					"token": token.id,
					"cargo": $("#idCargo").val(),
					"movil": 1,
					"action": "cobroTarjeta"
				}, function(resp) {
					$form.find("button").prop("disabled", false);
					
					if (!resp.band)
						alertify.error(resp.mensaje);
					else{
						alertify.success("Su pago fue procesado con éxito");
						$("#winMovimiento").modal("hide");
						$("#winCargos").modal();
					}
					
					jsRemoveWindowLoad();
				}, "json");
			}, function(response) {
				console.log(response);
				var $form = $("#frmPago");
				jsRemoveWindowLoad();
				alertify.error(response.message_to_purchaser);
				$form.find("button").prop("disabled", false);
			});
		});*/
	});
}