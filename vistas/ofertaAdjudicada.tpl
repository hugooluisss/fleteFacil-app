<div class="orden">
	<h4>Orden No. <span campo="folio" /></h4>
	<h6 class="card-subtitle text-mute">Presupuesto <span class="badge badge-success" campo="presupuesto"></span> <span campo="plazo"></span></h6>
	
	<hr />
	<div class="mapa"></div>
	<br />
	<hr />
	<div class="row">
		<div class="col-6 text-center text-success">Origen</div>
		<div class="col-6 text-center text-success">Destino</div>
	</div>
	<hr />
	<div class="row">
		<div class="col-6">
			<span campo="origen"></span>
		</div>
		<div class="col-6">
			<span campo="destino"></span>
		</div>
	</div>
	
	<hr />
	
	<p class="text-center"><i class="fa fa-calendar" aria-hidden="true"></i> <span campo="fechaservicio"></span> <span campo="hora"></span></p>
	
	<hr />
	<div class="row">
		<div class="col-6">
			<i class="fa fa-cubes text-success" aria-hidden="true"></i> <span campo="volumen"></span>
		</div>
		<div class="col-6">
			<i class="fa fa-balance-scale text-success" aria-hidden="true"></i> <span campo="peso"></span>
		</div>
	</div>
	<hr />
	<p campo="descripcion">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
	<br />
	<h6 class="card-subtitle text-success">REQUISITOS ESPECIALES</h6>
	<p campo="requisitos">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
	
	<br />
	<hr />
	<h6 class="card-subtitle text-danger text-center">Terminar servicio</span></h6>
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
	<div class="row">
		<div class="col-6">
			<button type="button" class="btn btn-warning btn-block btnTerminar">Terminar</button>
		</div>
		<div class="col-6">
			<button type="button" class="btn btn-danger btn-block btnRegresar">Cancelar</button>
		</div>
	</div>
</div>
