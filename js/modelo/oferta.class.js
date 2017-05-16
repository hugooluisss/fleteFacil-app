TOferta = function(fn){
	var self = this;
	
	this.aceptar = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cordenes', {
				"transportista": datos.id,
				"orden": datos.oferta,
				"action": 'aceptar',
				"movil": '1'
			}, function(resp){
				if (resp.band == false)
					console.log(resp.mensaje);
					
				if (datos.fn.after !== undefined)
					datos.fn.after(resp);
			}, "json");
	}
	
	this.terminar = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cordenes', {
				"orden": datos.oferta,
				"comentario": datos.comentario,
				"foto1": datos.fotografias[0],
				"foto2": datos.fotografias[1],
				"foto3": datos.fotografias[2],
				"foto4": datos.fotografias[3],
				"action": 'terminar',
				"movil": '1'
			}, function(resp){
				if (resp.band == false)
					console.log(resp.mensaje);
					
				if (datos.fn.after !== undefined)
					datos.fn.after(resp);
			}, "json");
	}
};