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
					console.log("No se pudo recuperar la informaci�n del usuario");
					
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
				console.log("Ocurri� un error");
				
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
				console.log("Ocurri� un error");
				
			if (datos.fn.after !== undefined)
				datos.fn.after(data);
		}, "json");
	}
	
	this.setSituacion = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		$.post(server + 'ctransportistas', {
			"transportista": idTransportista,
			"situacion": datos.situacion,
			"action": 'setSituacion',
			"movil": 1
		}, function(data){
			if (data.band == 'false')
				console.log("Ocurri� un error");
				
			if (datos.fn.after !== undefined)
				datos.fn.after(data);
		}, "json");
	}
	
	this.setImagenPerfil = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		$.post(server + 'ctransportistas', {
			"transportista": idTransportista,
			"imagen": datos.imagen,
			"action": 'setImagenPerfil',
			"movil": 1
		}, function(data){
			if (data.band == false)
				console.log("Ocurri� un error");
				
			if (datos.fn.after !== undefined)
				datos.fn.after(data);
		}, "json");
	}
};