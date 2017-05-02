<div class="ordenes">
	<div class="container">
		<div class="page-header">
			<h1>Ordenes registradas</h1>
		</div>
		<div id="dvLista"></div>
	</div>
</div>

<div class="modal fade" id="winMensajes" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" orden="">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4>Mensajes de la orden</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-xs-12" id="dvMensajes"></div>
				</div>
			</div>
			<div class="modal-footer">
				<form role="form" id="frmAddMensaje" class="form-horizontal" onsubmit="javascript: return false;">		
					<div class="form-group">
						<div class="col-md-12">
							<textarea id="txtMensaje" name="txtMensaje" class="form-control" placeholder="Escribe el mensaje"></textarea>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 text-right">
							<button type="submit" class="btn btn-info pull-right">Enviar</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="winMovimientos" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" orden="">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4>Movimientos a la orden</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="row">
						<div class="col-xs-12 text-center">
							<button id="btnPagar" name="btnPagar" monto="" type="button" class="btn btn-warning">
								<i class="fa fa-money" aria-hidden="true"></i> Pagar <span campo="monto" />
							</button>
						</div>
					</div>
					<br />
					<ul class="list-group" id="dvMovimientos">
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="winMovimiento" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" orden="">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4>Pago</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-xs-12" id="dvDatosPago"></div>
				</div>
				<br />
				<div class="row">
					<div class="col-xs-12 text-center">
						Monto a pagar <span class="text-danger" campo="monto"/>
					</div>
				</div>
				<br />
				<br />
				<div class="row">
					<div class="col-xs-12 text-center">
						<button id="btnSendComprobante" class="btn btn-success"><i class="fa fa-camera-retro" aria-hidden="true"></i> Enviar comprobante</button>

					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="winNotificaciones" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" orden="">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4>Notificaciones</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div id="dvNotificaciones">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!--
<script type="text/javascript" data-conekta-public-key="key_FLvB3CMbt6MfrgTs5y7nvxw" src="https://conektaapi.s3.amazonaws.com/v0.5.0/js/conekta.js"></script>
-->


<!--<script type="text/javascript" data-conekta-public-key="key_FLvB3CMbt6MfrgTs5y7nvxw" src="librerias/conekta/conekta.js"></script>-->
<!--
<div class="modal fade" id="winMovimiento" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" orden="">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4>Pago</h4>
			</div>
			<div class="modal-body">
				<form onsubmit="javascript: return false" method="post" id="frmPago" name="frmPago" class="form-horizontal" action="">
					<div class="form-group">
						<div class="col-xs-12" campo="concepto"></div>
					</div>
					<div class="form-group">
						<div class="col-xs-12">
					    	<input type="text" class="form-control input-xs name" data-conekta="card[name]" placeholder="Nombre del tarjetahabiente"/>
						</div>
					</div>
					<div class="form-group">
						<div class="col-xs-12">
							<input type="text" class="form-control input-xs number" data-conekta="card[number]" placeholder="Número de tarjeta"/>
						</div>
					</div>
					<div class="form-group">
						<div class="col-xs-4">
							<input type="text" class="form-control input-xs cvc" data-conekta="card[cvc]" placeholder="CVC"/>
						</div>
						<label class="control-label col-xs-3">Monto</label>
						<div class="col-xs-5 text-right" campo="monto">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-xs-4">Expiración</label>
						<div class="col-xs-4">
							<select data-conekta="card[exp_month]" class="form-control input-xs exp_month">
								<option value="01">Enero</option>
								<option value="02">Febrero</option>
								<option value="03">Marzo</option>
								<option value="04">Abril</option>
								<option value="05">Mayo</option>
								<option value="06">Junio</option>
								<option value="07">Julio</option>
								<option value="08">Agosto</option>
								<option value="09">Septiembre</option>
								<option value="10">Octubre</option>
								<option value="11">Noviembre</option>
								<option value="12">Diciembre</option>
							</select>
						</div>
						<div class="col-xs-4">
							<select class="form-control input-xs exp_year" data-conekta="card[exp_year]"></select>
						</div>
					</div>
					<div class="form-group">
						<div class="row">
							<div class="col-xs-6 col-xs-offset-3 text-center">
								<button type="button" id="submitPago" class="btn btn-primary btn-block btn-flat">Pagar Ahora</button>
								<input type='hidden' name='conektaTokenId' id="conektaTokenId">
								<input type='hidden' name='idCargo' id="idCargo" campo="idCargo">
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
-->