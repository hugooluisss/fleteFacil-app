/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var db = null;
var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		jsShowWindowLoad();
		idTransportista = window.localStorage.getItem("sesion");
		
		if (idTransportista != null && idTransportista != undefined && idTransportista != '')
			location.href = "inicio.html";
		
		jsRemoveWindowLoad();
		
		window.plugins.PushbotsPlugin.initialize("591c5d2d4a9efa6e888b4567", {
			"android":{
				"sender_id":"298644715501"
			}
		});
	}
};

app.initialize();

$(document).ready(function(){
	//app.onDeviceReady();	
	
	$("#lnkLostPass").click(function(){
		$("#winInicioSesion").modal("hide");
		alertify.prompt("<b>¿Olvidaste tu contraseña?</b>, introduce tu correo electrónico:", function (e, str) { 
			if (e){
				if (str == '')
					alertify.error("No se indicó un correo electrónico");
				else{
					var transportista = new TTransportista;
					
					transportista.recuperarPass(str, {
						before: function(){
							$("#lnkLostPass").prop("disabled", true);
							alertify.success("Gracias, enviaremos un correo a <b>" + str + "</b> para la recuperación de tu contraseña");
						},
						afert: function(resp){
							$("#lnkLostPass").prop("disabled", false);
						}
					});
				}
					
			}else
				$("#winInicioSesion").modal();
		}, $("#frmLogin").find("#txtUsuario").val());
	});
	
	$("#frmLogin").find("#txtUsuario").focus();
	$("#frmLogin").validate({
		debug: true,
		errorClass: "validateError",
		rules: {
			txtUsuario: {
				required : true,
				email: true
			},
			txtPass: {
				required : true
			}
		},
		wrapper: 'span',
		submitHandler: function(form){
			var obj = new TTransportista;
			
			obj.login({
				usuario: $("#txtUsuario").val(), 
				pass: $("#txtPass").val(),
				before: function(){
					$("#frmLogin [type=submit]").prop("disabled", true);
				},
				after: function(data){
					if (data.band == false){
						alertify.alert("Tus datos no son válidos");
						$("#frmLogin [type=submit]").prop("disabled", false);
					}else{
						window.localStorage.removeItem("sesion");
						window.localStorage.setItem("sesion", data.transportista);
						
						location.href = "inicio.html";
					}
				}
			});
		}
	});
});