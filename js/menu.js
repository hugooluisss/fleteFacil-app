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
	
	$("#btnSalir").click(function(){
		alertify.confirm("¿Seguro?", function(e){
    		if(e) {
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