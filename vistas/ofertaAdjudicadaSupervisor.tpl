<div class="orden">
	<div class="row">
		<div class="col-12 text-center presupuesto">PRESUPUESTO <span class="badge badge-success" campo="presupuesto"></span> <span campo="plazo"></span></div>
	</div>
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
	<div class="row">
		<div class="col-12 text-center">
			<div class="btn-group btn-group-justified" style="width: 90%" role="group">
				<div class="btn-group" role="group" style="width: 100%">
					<button type="button" class="btn btn-warning btn-block" data-toggle="modal" data-target="#winEquipo">ASIGNAR EQUIPO</button>
				</div>
			</div>
		</div>
	</div>
</div>

<form onsubmit="javascript: return false" method="post" id="frmEquipo" name="frmEquipo" class="form-horizontal" >
	<div class="modal fade" id="winEquipo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Equipo operador</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group row">
						<label for="selConductor" class="col-12">Conductor</label>
						<div class="col-12">
							<select id="selConductor" name="selConductor" class="form-control">
							</select>
						</div>
					</div>
					<div class="form-group row">
						<label for="txtRut" class="col-6">RUT</label>
						<div class="col-6">
							<input id="txtRut" name="txtRut" value="" class="form-control" disabled="true" readonly="true" campo="nit"/>
						</div>
					</div>
					<div class="form-group row">
						<label for="txtTelefono" class="col-6">Teléfono</label>
						<div class="col-6">
							<input id="txtTelefono" name="txtTelefono" value="" class="form-control" disabled="true" readonly="true" campo="celular"/>
						</div>
					</div>
					<div class="form-group row">
						<label for="txtPatenteCamion" class="col-6">Patente camión</label>
						<div class="col-6">
							<input id="txtPatenteCamion" name="txtPatenteCamion" value="" class="form-control" campo="patentecamion"/>
						</div>
					</div>
					<div class="form-group row">
						<label for="txtPatenteRampla" class="col-6">Patente rampla</label>
						<div class="col-6">
							<input id="txtPatenteRampla" name="txtPatenteRampla" value="" class="form-control" campo="patenterampla"/>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="reset" id="btnReset" class="btn btn-default" data-dismiss="modal">Cancelar</button>
					<button type="submit" class="btn btn-info pull-right" id="btnAsignarEquipo">ASIGNAR EQUIPO</button>
				</div>
			</div>
		</div>
	</div>
</form>