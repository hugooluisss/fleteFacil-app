TTransportista = function(fn){
	var self = this;
	
	this.login = function(datos){
		if (datos.before !== undefined) datos.before();
		
		$.post(server + 'ctransportistas', {
				"usuario": datos.usuario,
				"pass": datos.pass,
				"action": 'login',
				"movil": '1'
			}, function(resp){
				if (resp.band == 'false')
					console.log(resp.mensaje);
					
				if (datos.after !== undefined)
					datos.after(resp);
			}, "json");
	}
		
	this.getData = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		$.post(server + 'ctransportistas', {
				"id": datos.id,
				"action": 'getData',
				"movil": 1
			}, function(data){
				if (data.band == 'false')
					console.log("No se pudo recuperar la información del usuario");
					
				if (datos.fn.after !== undefined)
					datos.fn.after(data);
			}, "json");
	}
	
	this.recuperarPass = function(correo, fn){
		if (fn.before !== undefined) fn.before();
		
		$.post(server + 'ctransportistas', {
				"correo": correo,
				"action": 'recuperarPass',
				"movil": '1'
			}, function(data){
				if (data.band == 'false')
					console.log(data.mensaje);
					
				if (fn.after !== undefined)
					fn.after(data);
			}, "json");
	};
	
	this.addRegion = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		$.post(server + 'ctransportistas', {
			"transportista": datos.transportista,
			"region": datos.region,
			"action": 'addRegion',
			"movil": 1
		}, function(data){
			if (data.band == 'false')
				console.log("Ocurrió un error");
				
			if (datos.fn.after !== undefined)
				datos.fn.after(data);
		}, "json");
	}
	
	this.delRegion = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		$.post(server + 'ctransportistas', {
			"transportista": datos.transportista,
			"region": datos.region,
			"action": 'delRegion',
			"movil": 1
		}, function(data){
			if (data.band == 'false')
				console.log("Ocurrió un error");
				
			if (datos.fn.after !== undefined)
				datos.fn.after(data);
		}, "json");
	}
	
	this.guardar = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cclientes', {
				"id": datos.id,
				"nombre": datos.nombre,
				"direccion": datos.direccion,
				"correo": datos.correo,
				"telefono": datos.telefono,
				"facebook": datos.facebook,
				"twitter": datos.twitter,
				"telegram": datos.telegram,
				"whatsapp": datos.whatsapp,
				"instagram": datos.instagram,
				"pass": datos.pass,
				"movil": '1', 
				"action": "add"
			}, function(data){
				if (data.band == false)
					console.log(data);
					
				if (datos.fn.after !== undefined)
					datos.fn.after(data);
			}, "json");
	};
};