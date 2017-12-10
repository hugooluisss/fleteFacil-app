TChofer = function(chofer){
	var self = this;
	this.id = chofer;
	this.perfil;
	this.nombre;
	this.transportista;
	this.situacion;
	this.datos;
	
	this.login = function(datos){
		if (datos.before !== undefined) datos.before();
		
		$.post(server + 'clogin', {
				"usuario": datos.usuario,
				"pass": datos.pass,
				"action": 'login',
				"movil": '1'
			}, function(resp){
				if (resp.band == false)
					console.log(resp.mensaje);
					
				if (datos.after !== undefined)
					datos.after(resp);
			}, "json");
	}
		
	this.getData = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		$.post(server + 'cchofer', {
				"id": datos.id == undefined?self.id:datos.id,
				"action": 'getData',
				"movil": 1
			}, function(data){
				if (data.band == false)
					console.log("No se pudo recuperar la información del usuario");
				else{
					self.perfil = data.idPerfil;
					self.nombre = data.nombre;
					self.transportista = data.transportista;
					self.situacion = data.idSituacion;
					self.datos = data;
				}
					
				if (datos.fn.after !== undefined)
					datos.fn.after(data);
			}, "json").fail(function(){
				console.log("Falló al obtener los datos del chofer");
				
				if (datos.fn.after !== undefined)
					datos.fn.after({band: false});
			});
	}
	
	this.recuperarPass = function(correo, fn){
		if (fn.before !== undefined) fn.before();
		
		$.post(server + 'cusuarios', {
				"correo": correo,
				"action": 'recuperarPass',
				"movil": '1'
			}, function(data){
				if (data.band == false)
					console.log(data.mensaje);
					
				if (fn.after !== undefined)
					fn.after(data);
			}, "json");
	};
	
	this.addRegion = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		$.post(server + 'ctransportistas', {
			"transportista": self.transportista.idTransportista,
			"region": datos.region,
			"empresa": datos.empresa,
			"action": 'addRegion',
			"movil": 1
		}, function(data){
			if (data.band == false)
				console.log("Ocurrió un error");
				
			if (datos.fn.after !== undefined)
				datos.fn.after(data);
		}, "json");
	}
	
	this.delRegion = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		$.post(server + 'ctransportistas', {
			"transportista": self.transportista.idTransportista,
			"region": datos.region,
			"action": 'delRegion',
			"empresa": datos.empresa,
			"movil": 1
		}, function(data){
			if (data.band == 'false')
				console.log("Ocurrió un error");
				
			if (datos.fn.after !== undefined)
				datos.fn.after(data);
		}, "json");
	}
	
	this.setSituacion = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		$.post(server + 'cchofer', {
			"chofer": self.id,
			"situacion": datos.situacion,
			"action": 'setSituacion',
			"movil": 1
		}, function(data){
			if (data.band == 'false')
				console.log("Ocurrió un error");
				
			if (datos.fn.after !== undefined)
				datos.fn.after(data);
		}, "json");
	}
	
	this.setImagenPerfil = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		$.post(server + 'cchofer', {
			"chofer": self.id,
			"imagen": datos.imagen,
			"action": 'setImagenPerfil',
			"movil": 1
		}, function(data){
			if (data.band == false)
				console.log("Ocurrió un error");
				
			if (datos.fn.after !== undefined)
				datos.fn.after(data);
		}, "json");
	}
};