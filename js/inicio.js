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
var idCliente;
var mapa = null;
var marca = null;

//var conektaPublic = "key_bqFat52tN6nohmtcU7AFYwg";

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
	onDeviceReady: function(){
		document.addEventListener("backbutton", function(){
			return false;
		}, true);
		//window.localStorage.removeItem("sesion");
		idCliente = window.localStorage.getItem("sesion");
		if (idCliente == null || idCliente == undefined || idCliente == '')
			location.href = "index.html";
		
		setMenu();
		
		checkConnection();
		
		setInterval(function(){
			getNotificaciones();
		}, 60 * 1000);
		
		function getNotificaciones(){
			$.get(server + "chome", {
				"action": "getNotificaciones".
				"cliente": idCliente,
				"movil": 1
			}, function(data){
				if (data.total)
					alertify.log("Tienes nuevas notificaciones, ingresa al panel Ordenes");
			}, "json");
		}
		
		window.plugins.PushbotsPlugin.initialize("59026bc34a9efa502f8b456b", {
			"android":{
				"sender_id":"89928880199"
			}
		});
		
		// Should be called once app receive the notification only while the application is open or in background
		window.plugins.PushbotsPlugin.on("notification:received", function(data){
			console.log("received:" + JSON.stringify(data));
			
			//Silent notifications Only [iOS only]
			//Send CompletionHandler signal with PushBots notification Id
			window.plugins.PushbotsPlugin.done(data.pb_n_id);
		});
		
		// Should be called once the notification is clicked
		window.plugins.PushbotsPlugin.on("notification:clicked", function(data){
			console.log("clicked:" + JSON.stringify(data));
			if (data.message != undefined)
				alertify.success(data.message);
			panelOrdenes();
		});	
		
		//window.plugins.PushbotsPlugin.debug(true);
		// Should be called once the device is registered successfully with Apple or Google servers
		window.plugins.PushbotsPlugin.on("registered", function(token){
			console.log("Token de registro", token);
		});
		
		//Get device token
		window.plugins.PushbotsPlugin.getRegistrationId(function(token){
		    console.log("Registration Id:" + token);
		});	
		
		window.plugins.PushbotsPlugin.on("user:ids", function (data) {
			console.log("user:ids" + JSON.stringify(data));
			// userToken = data.token; 
			// userId = data.userId
		});
		
		window.plugins.PushbotsPlugin.resetBadge();
		
		//window.plugins.PushbotsPlugin.toggleNotifications(false);
		window.plugins.PushbotsPlugin.setTags(["cliente_" + idCliente]);
	}
};

app.initialize();

$(document).ready(function(){
	//$("body").css("height", $(window).height());
	$("#modulo").css("height", $(window).height() - $(".navbar-fixed-bottom").height() - 10 - $(".navbar-fixed-top").height());
	$( window ).resize(function(){
		$("#modulo").css("height", $(window).height() - $(".navbar-fixed-bottom").height() - 10 - $(".navbar-fixed-top").height());
	});
	
	//app.onDeviceReady();
});