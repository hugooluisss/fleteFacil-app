function panelPerfil(){
	var tplRegion = '<div class="row"><div class="col-12"><label class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input"><span class="custom-control-indicator"></span><span class="custom-control-description"></span></label></div></div>';
	$("#dvTitulo").html("Perfil de usuario");
	$("nav.footer").hide();
	$("nav.footer").html("");
	
	$.get("vistas/perfil.tpl", function(plantillaPerfil){
		jsShowWindowLoad("Estamos obteniendo tus datos");
		$("#modulo").html(plantillaPerfil);
		var transportista = new TTransportista();
		
		$("#btnCamara").click(function(){
			if (navigator.camera != undefined){
				navigator.camera.getPicture(function(imageData) {
						transportista.setImagenPerfil({
							"imagen": imageData,
							fn: {
								before: function(){
									$("#fotoPerfil").prop("src", "img/user.png");
								},
								after: function(resp){
									if (resp.band){
										alertify.success("La fotografía se cargó con éxito");
										$("#fotoPerfil").attr("src", "data:image/jpeg;base64," + imageData);
									}else
										alertify.error("Ocurrió un error al actualizar la fotografía");
								}
							}
						});
					}, function(message){
						alertify.error("Ocurrió un error al guardar la fotografía");
					}, { 
						quality: 100,
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
		
		$("#btnGaleria").click(function(){
			if (navigator.camera != undefined){
				navigator.camera.getPicture(function(imageData) {
						transportista.setImagenPerfil({
							"imagen": imageData,
							fn: {
								before: function(){
									$("#fotoPerfil").prop("src", "img/user.png");
								},
								after: function(resp){
									if (resp.band){
										alertify.success("La fotografía se cargó con éxito");
										$("#fotoPerfil").attr("src", "data:image/jpeg;base64," + imageData);
									}else
										alertify.error("Ocurrió un error al actualizar la fotografía");
								}
							}
						});
					}, function(message){
						alertify.error("Ocurrió un error al guardar la fotografía");
					}, { 
						quality: 100,
						destinationType: Camera.DestinationType.DATA_URL,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 250,
						targetHeight: 250,
						correctOrientation: true,
						allowEdit: true,
						source: navigator.camera.PictureSourceType.PHOTOLIBRARY
					});
			}else{
				alertify.error("No se pudo ingresar a la galería");
				console.log("No se pudo ingresar a la galería");
			}
		});
		
		transportista.getData({
			"id": idTransportista,
			fn: {
				after: function(resp){
					plantilla = $(plantillaPerfil);
					$.each(resp, function(campo, valor){
						$("#modulo").find("[campo=" + campo + "]").html(valor);
					});
					
					$("#fotoPerfil").prop("src", resp.imagenPerfil == ''?"img/user.png":(server + resp.imagenPerfil));
					
					$("[situacion]").click(function(){
						var el = $(this);
						alertify.confirm("¿Seguro?", function(e){
							if(e) {
								transportista.setSituacion({
									"situacion": el.attr("situacion"),
									fn: {
										before: function(){
											jsShowWindowLoad("Espera un momento");
										},
										after: function(resp){
											jsRemoveWindowLoad();
											
											if (!resp.band)
												alertify.error("No se pudo cambiar el estado");
											else{
												$("#dvNoDisponible").hide();
												$("#dvDisponible").hide();
												$("#dvEnRuta").hide();
												
												switch(el.attr("situacion")){
													case '1':
														$("#dvDisponible").show();
													break;
													case '2':
														$("#dvEnRuta").show();
													break;
													case '3':
														$("#dvNoDisponible").show();
													break;
												}
											}
										}
									}
								});
							}
						});
					});
					
					$("#dvNoDisponible").hide();
					$("#dvDisponible").hide();
					$("#dvEnRuta").hide();
					
					switch(resp.idSituacion){
						case '1':
							$("#dvDisponible").show();
						break;
						case '2':
							$("#dvEnRuta").show();
						break;
						case '3':
							$("#dvNoDisponible").show();
						break;
					}
					
					$.each(resp.regiones, function(i, region){
						var plantillaRegion = $(tplRegion);
						plantillaRegion.find(".custom-control-description").html(region.nombre);
						plantillaRegion.find("input").val(region.idRegion).prop("checked", region.checked == 1);
						
						
						plantillaRegion.find("input").click(function(){
							var el = $(this);
							if (el.is(":checked")){
								console.log("Checado", el.val());
								transportista.addRegion({
									"transportista": idTransportista,
									"region": region.idRegion,
									fn:{
										after: function(resp){
											if (!resp.band)
												alertify.error("No se pudo agregar la región");
										}
									}
								});
							}else{
								transportista.delRegion({
									"transportista": idTransportista,
									"region": region.idRegion,
									fn:{
										after: function(resp){
											if (!resp.band)
												alertify.error("No se pudo eliminar la región");
										}
									}
								});
								console.log("No checado", el.val());
							}
						});
						
						$("#regiones").append(plantillaRegion);
					});
					
					jsRemoveWindowLoad();
				}
			}
		});
	});
	
	
	function subirFotoPerfil(imageURI){
		$.post(server + 'cclientes', {
				"imagen": imageURI,
				"movil": 1,
				"identificador": idCliente,
				"action": "uploadImagenPerfil"
			}, function(data){
				if (data.band)
					alertify.success("La fotografía se cargó con éxito");
				else
					alertify.error("Ocurrió un error al subir la fotografía");
			}, "json");
	}
};