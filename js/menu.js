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
	
	$("#btnSalir").click(function(){
		alertify.confirm("¿Seguro?", function(e){
    		if(e) {
    			window.plugins.PushbotsPlugin.removeTags(["transportista_" + idCliente]);
	    		window.localStorage.removeItem("sesion");
	    		location.href = "index.html";
	    	}
    	});
	});
	
	console.log("Cargando menu");
}

function setPrincipal(){
	$("#modulo").find("#btnOfertas").click(function(){
		panelOfertas();
	});
	
	$("#modulo").find("#btnPostuladas").click(function(){
		panelPostuladas();
	});
	
	$("#modulo").find("#btnAdjudicados").click(function(){
		panelAdjudicados();
	});
}