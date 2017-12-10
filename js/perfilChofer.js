function panelPerfil(){
	var tplEmpresa = '<div class="panel panel-danger"><div class="panel-heading"><b campo="razonsocial"></b></div><div class="panel-body"></div></div>';
	var tplRegion = '<div class="row"><div class="col-12"><label class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input"><span class="custom-control-indicator"></span><span class="custom-control-description"></span></label></div></div>';
	$("#dvTitulo").html("Perfil de usuario");
	$("nav.footer").hide();
	$("nav.footer").html("");
	
	$.get("vistas/perfil.tpl", function(plantillaPerfil){
		jsShowWindowLoad("Estamos obteniendo tus datos");
		$("#modulo").html(plantillaPerfil);
		
		$("#btnCamara").click(function(){
			if (navigator.camera != undefined){
				navigator.camera.getPicture(function(imageData) {
						objChofer.setImagenPerfil({
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
		
		$("#btnAdjudicadas").click(function(){
			panelAdjudicados();
		});
		
		$.each(objChofer.datos, function(campo, valor){
			$("#modulo").find("[campo=" + campo + "]").html(valor);
		});
		$("#fotoPerfil").prop("src", objChofer.imagenPerfil == ''?"img/user.png":(server + objChofer.imagenPerfil));
		
		$("[situacion]").click(function(){
			var el = $(this);
			alertify.confirm("¿Seguro?", function(e){
				if(e) {
					objChofer.setSituacion({
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
		switch(objChofer.situacion){
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
		
		$("#btnWinRegiones").hide();
		
		if (objChofer.perfil == 4){
			$("#btnWinRegiones").show();
			
			$.each(objChofer.datos.empresas, function(i, empresa){
				plantillaEmpresa = $(tplEmpresa);
				plantillaEmpresa.find("[campo=razonsocial]").text(empresa.razonsocial);
				$("#regiones").append(plantillaEmpresa);
				
				$.each(empresa.regiones, function(i, region){
					var plantillaRegion = $(tplRegion);
					plantillaRegion.find(".custom-control-description").html(region.nombre);
					plantillaRegion.find("input").val(region.idRegion).attr("empresa", empresa.idEmpresa).prop("checked", region.checked == 1);
					
					plantillaRegion.find("input").click(function(){
						var el = $(this);
						if (el.is(":checked")){
							console.log("Checado", el.val());
							objChofer.addRegion({
								"region": region.idRegion,
								"empresa": el.attr("empresa"),
								fn:{
									after: function(resp){
										if (!resp.band)
											alertify.error("No se pudo agregar la región");
									}
								}
							});
						}else{
							objChofer.delRegion({
								"region": region.idRegion,
								"empresa": el.attr("empresa"),
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
					
					plantillaEmpresa.find(".panel-body").append(plantillaRegion);
				});
			});
		}
		
		jsRemoveWindowLoad();
		
		$("#winRegiones").on('hide.bs.modal', function(e){
			objChofer.getData({fn:{}});
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