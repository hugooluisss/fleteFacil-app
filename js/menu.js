function setMenu(){
	$("#menu").find("a[role=button]").click(function(){
		$("#menuPrincipal").removeClass("show").prop("aria-expanded", "true");
	});
	
	$("#menu").find("#btnOfertas").click(function(){
		panelOfertas();
	});
	
	$("#menu").find("#btnPostuladas").click(function(){
		panelPostuladas();
	});
	
	$("#menu").find("#btnAdjudicados").click(function(){
		panelAdjudicados();
	});
	
	$("#menu").find("#btnPerfil").click(function(){
		panelPerfil();
	});
	
	if (objChofer.perfil == 5){
		$("#menu").find("#btnOfertas").hide();
		$("#menu").find("#btnPostuladas").hide();
	}
	
	$("#btnSalir").click(function(){
		alertify.confirm("¿Seguro?", function(e){
    		if(e) {
    			//window.plugins.PushbotsPlugin.removeTags(["transportistas"]);
	    		window.localStorage.removeItem("sesion");
	    		window.localStorage.removeItem("idOrden");
	    		//backgroundGeolocation.stop();
	    		location.href = "index.html";
	    	}
    	});
	});
}

function setPrincipal(){
	if (objChofer.perfil == 5){
		$("#modulo").find("#btnOfertas").parent().parent().hide();
		$("#modulo").find("#btnPostuladas").parent().parent().hide();
	}
		
	$("#modulo").find("#btnOfertas").click(function(){
		panelOfertas();
	});
	
	$("#modulo").find("#btnPostuladas").click(function(){
		panelPostuladas();
	});
	
	$("#modulo").find("#btnAdjudicados").click(function(){
		panelAdjudicados();
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
					
	$("[situacion]").click(function(){
		var el = $(this);
		alertify.confirm("¿Seguro?", function(e){
			if(e) {
				chofer.setSituacion({
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
}