function setMenu(){
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