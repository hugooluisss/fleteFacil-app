function panelPerfil(){
	var tplRegion = '<div class="row"><div class="col-12"><label class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input"><span class="custom-control-indicator"></span><span class="custom-control-description"></span></label></div></div>';
	$("#dvTitulo").html("Perfil de usuario");
	
	$.get("vistas/perfil.tpl", function(plantillaPerfil){
		jsShowWindowLoad("Estamos obteniendo tus datos");
		$("#modulo").html(plantillaPerfil);
		
		var transportista = new TTransportista();
		transportista.getData({
			"id": idTransportista,
			fn: {
				after: function(resp){
					plantilla = $(plantillaPerfil);
					$.each(resp, function(campo, valor){
						$("#modulo").find("[campo=" + campo + "]").html(valor);
					});
					
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
											if (resp.band)
												alertify.success("Región agregada");
											else
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
											if (resp.band)
												alertify.success("Región eliminada");
											else
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
};