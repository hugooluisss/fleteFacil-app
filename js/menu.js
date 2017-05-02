function setMenu(){
	$("[action=perfil]").click(function(){
		actualizarDatos();
	});
	
	$("[action=reparaciones]").click(function(){
		panelReparaciones();
	});
	
	$("[action=ordenes]").click(function(){
		panelOrdenes();
	});
	
	console.log("Cargando menu");
}