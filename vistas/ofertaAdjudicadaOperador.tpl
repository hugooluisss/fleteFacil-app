<div class="orden">
	<div class="viewEstado text-center text-danger" style="display: none"><b>REPORTE ENTREGADO</b></div>
	<div class="mapa"></div>
	<div class="row posiciones">
		<div class="col-12 text-center">
			<span campo="origen"></span><span campo="destino"></span>
		</div>
	</div>
	<p class="text-center"><i class="fa fa-calendar" aria-hidden="true"></i> <span campo="fechaservicio"></span> <span campo="hora"></span></p>
	
	<hr />
	<div class="row">
		<div class="col-6">
			<i class="fa fa-cubes text-success" aria-hidden="true"></i>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<span campo="volumen"></span>
		</div>
		<div class="col-6">
			<i class="fa fa-balance-scale text-success" aria-hidden="true"></i>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<span campo="peso"></span>
		</div>
	</div>
	<hr />
	<p campo="descripcion">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
	<hr />
	<span>REQUISITOS ESPECIALES</span>
	<p campo="requisitos">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
	
	<br />
	<div class="dvEnRuta">
		<hr />
		<p class="text-justify">Una vez la carga o proceso de entrega debes de colocar tu posición <b>EN RUTA</b> para informar tu posición y mejorar la información hacia el cliente</p>
		<div class="row">
			<div class="col-12 text-center">
				<div class="btn-group btn-group-justified" style="width: 90%" role="group">
					<div class="btn-group" role="group" style="width: 100%">
						<button type="button" class="btn btn-warning btn-block btnEnRuta">En ruta</button>
					</div>
				</div>
			</div>
		</div>
		<br />
	</div>
	<div class="dvReportar">
		<hr />
		<h6 class="card-subtitle text-danger text-center">Entregar carga</h6>
		<br />
		<div class="col-xs-12 botonesEntrega">
			
		</div>
		
		
		<!--
		<p class="text-justify">La carga se encuentra en ruta, recuerda que al finalizar la entrega debes de entregar tu reporte</p>
		<div class="row">
			<div class="col-xs-12 text-center" id="lstImg">
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-center">
				<button id="btnCamara" indice="1" class="btn btn-default btn-sm"><i class="fa fa-camera" aria-hidden="true"></i></button>
				<button id="btnGaleria" indice="1" class="btn btn-default btn-sm"><i class="fa fa-picture-o" aria-hidden="true"></i></button>
			</div>
		</div>
		<br />
		<div class="row">
			<div class="col-12 text-mute text-center">¿En que <b>punto de entrega</b> te encuentras?</div>
		</div>
		<div class="row">
			<div class="col-12 text-mute text-center">
				<select id="selPunto" name="selPunto" class="form-control">
				</select>
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-mute text-center">¿Algún comentario?</div>
		</div>
		<div class="row">
			<div class="col-12 text-center">
				<textarea id="txtComentario" name="txtComentario" class="form-control" rows="5"></textarea>
			</div>
		</div>
		<br />-->
	</div>
</div>



	<div class="modal fade" id="winTerminar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" punto="">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Terminar entrega</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-12 text-center titulo">
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12 text-center" id="lstImg">
						</div>
					</div>
					<div class="row">
						<div class="col-12 text-center">
							<button id="btnCamara" indice="1" class="btn btn-default btn-sm"><i class="fa fa-camera" aria-hidden="true"></i></button>
							<button id="btnGaleria" indice="1" class="btn btn-default btn-sm"><i class="fa fa-picture-o" aria-hidden="true"></i></button>
						</div>
					</div>
					<br />
					<div class="row">
						<div class="col-12 text-mute text-center">¿Algún comentario?</div>
					</div>
					<div class="row">
						<div class="col-12 text-center">
							<textarea id="txtComentario" name="txtComentario" class="form-control" rows="5"></textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button id="btnReset" class="btn btn-default" data-dismiss="modal">Cancelar</button>
					<button class="btn btn-danger pull-right" id="btnTerminar">Terminar entrega</button>
				</div>
			</div>
		</div>
	</div>