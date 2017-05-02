<div class="container" id="misDatos">
	<form onsubmit="javascript: return false" method="post" id="frmActualizarDatos" name="frmActualizarDatos">
		<div class="page-header">
			<h1>Perfil de usuario</h1>
		</div>
		<div class="row">
			<div class="col-xs-12 text-center">
				<img src="./img/user.png" class="img-circle" id="fotoPerfil" onerror="this.onerror=null;this.src='./img/user.png';"/>
				<br />
				<a href="#" id="btnCamara" class="action"><i class="fa fa-camera" aria-hidden="true"></i></a>
			</div>
		</div>
		<div class="form-group has-feedback">
			<input type="email" class="form-control" placeholder="Correo electrónico" id="txtUsuario" name="txtUsuario" autocomplete="no" readonly="true">
			<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
		</div>
		<div class="form-group has-feedback">
			<input type="password" class="form-control" placeholder="Contraseña" id="txtPass" name="txtPass" autocomplete="no">
			<span class="form-control-feedback">
				<i class="fa fa-key" aria-hidden="true"></i>
			</span>
		</div>
		<hr />
		<div class="form-group has-feedback">
			<input type="text" class="form-control" placeholder="Nombre completo" id="txtNombre" name="txtNombre" autocomplete="no">
			<span class="glyphicon glyphicon-user form-control-feedback"></span>
		</div>
		
		<div class="form-group has-feedback">
			<input type="text" class="form-control" placeholder="Teléfono" id="txtTelefono" name="txtTelefono" autocomplete="no">
			<span class="form-control-feedback">
				<i class="fa fa-mobile" aria-hidden="true"></i>
			</span>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-6">
				<div class="form-group has-feedback">
					<input type="text" class="form-control" placeholder="Facebook" id="txtFB" name="txtFB" autocomplete="no">
					<span class="form-control-feedback">
						<i class="fa fa-facebook" aria-hidden="true"></i>
					</span>
				</div>
			</div>
			<div class="col-xs-12 col-sm-6">
				<div class="form-group has-feedback">
					<input type="text" class="form-control" placeholder="Instragram" id="txtInstagram" name="txtInstagram" autocomplete="no">
					<span class="form-control-feedback">
						<i class="fa fa-instagram" aria-hidden="true"></i>
					</span>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-6">
				<div class="form-group has-feedback">
					<input type="text" class="form-control" placeholder="Whatsapp" id="txtWhatsapp" name="txtWhatsapp" autocomplete="no">
					<span class="form-control-feedback">
						<i class="fa fa-whatsapp" aria-hidden="true"></i>
					</span>
				</div>
			</div>
			<div class="col-xs-12 col-sm-6">
				<div class="form-group has-feedback">
					<input type="text" class="form-control" placeholder="Telegram" id="txtTelegram" name="txtTelegram" autocomplete="no">
					<span class="form-control-feedback">
						<i class="fa fa-telegram" aria-hidden="true"></i>
					</span>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 text-right">
				<button type="button" id="btnSalir" class="btn btn-danger"><i class="fa fa-sign-out" aria-hidden="true"></i> Cerrar sesión</button>
				<button type="submit" id="agregar" class="btn btn-primary">Actualizar</button>
			</div>
		</div>
	</form>
</div>