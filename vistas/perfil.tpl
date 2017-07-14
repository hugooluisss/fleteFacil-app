<div id="misDatos">
	<div class="text-center">
		<h4 class="card-title">Hola <span campo="nombre" /></h4>
		<img src="img/user.png" alt="" class="img-thumbnail" id="fotoPerfil">
		<br />
		<button class="btn btn-xs btn-link" id="btnCamara"><i class="fa fa-camera" aria-hidden="true"></i></button>
	</div>
	
	<div class="row" id="dvDisponible" class="situacion">
		<div class="col-12 text-justify">
			<p>
			<small><b>Tu estado  es <span class="text-success">Disponible</span></b>, te estaremos enviando las nuevas cargas a las cuales puedes calificar</small>
			</p>
			<button type="button" class="btn btn-info btn-lg btn-block" data-toggle="modal" data-target="#winRegiones">Actualizar regiones</button>
			<button type="button" class="btn btn-danger btn-lg btn-block" situacion="3">Cambiar a no disponible</button>
		</div>
	</div>
	
	<div class="row" id="dvEnRuta">
		<div class="col-12 text-justify">
			<p>
			<small><b>Tu estado  es <span class="text-success">En ruta</span>, tienes una o varias cargas adjudicadas</b>
			<button type="button" class="btn btn-info btn-lg btn-block" id="btnAdjudicadas">Cargas adjudicadas</button>
		</div>
	</div>
	
	<div class="row" id="dvNoDisponible" class="situacion">
		<div class="col-12 text-justify">
			<p>
			<small><b>Tu estado es <span class="text-danger">No disponible</span></b>, cambialo a disponible para recibir notificaciones de nuevas cargas</small>
			</p>
			<button type="button" class="btn btn-primary btn-lg btn-block" situacion="1">Cambiar a disponible</button>
		</div>
	</div>
	
	
	<div class="modal fade" id="winRegiones" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Regiones</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form onsubmit="javascript: return false" method="post" id="frmActualizarDatos" name="frmActualizarDatos">
						<div class="alert alert-success" role="alert">
							¿En que regiones puedes trabajar?
							<small class="text-muted">Esto servirá para informarte de nuevas ordenes de trabajo en las regiones</small>
						</div>
						<div id="regiones">
							
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	
</div>