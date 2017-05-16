function setMenu(){
	$("#menu").find("a[role=button]").click(function(){
		$("#menuPrincipal").removeClass("show").prop("aria-expanded", "true");
	});
	
	$("#btnOfertas").click(function(){
		panelOfertas();
	});
	
	$("#btnAdjudicados").click(function(){
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