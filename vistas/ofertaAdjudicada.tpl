<div class="orden">
	<div class="row">
		<div class="col-12 text-center presupuesto">PRESUPUESTO <span class="badge badge-success" campo="presupuesto"></span> <span campo="plazo"></span></div>
	</div>
	<div class="viewEstado text-center text-danger" style="display: none"><b>REPORTE ENTREGADO</b></div>
	<div class="mapa"></div>
	<div class="row posiciones">
		<div class="col-12 text-center">
			<span campo="origen"></span> - <span campo="destino"></span>
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
	<div class="dvReportar">
		<hr />
		<h6 class="card-subtitle text-danger text-center">Terminar servicio</h6>
		<br />
		<br />
		<div class="row">
			<div id="lstImg" class="col-12 text-center"></div>
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
		<br />
	</div>
	<div class="row">
		<div class="col-12 text-center">
			<div class="btn-group btn-group-justified" style="width: 90%" role="group">
				<div class="btn-group groupTerminar" role="group" style="width: 100%">
					<button type="button" class="btn btn-primary btn-block btnTerminar">Terminar</button>
				</div>
				<div class="btn-group" role="group" style="width: 100%">
					<button type="button" class="btn btn-primary btn-block btnRegresar">Cancelar</button>
				</div>	
			</div>
		</div>
	</div>	
</div>