<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org" lang="en" id="ng-app" ng-app="BeosmapperApp">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<title><?php $view['slots']->output('title', 'Beosmapper') ?></title>

	<link rel="shortcut icon" href="<?php echo $view['assets']->getUrl( 'favicon.ico' ) ?>" />

	<?php // Javascript libraries ?>
	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/lib/xml2json.js' ); ?>"></script>
	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/lib/OpenLayers.js'); ?>"></script>
	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/lib/angular.js' ); ?>"></script>
	<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/lib/angular-base64.js' ); ?>"></script>

	<?php // Application (controller + services) ?>
	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/app.js' ); ?>"></script>
	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/maincontroller.js' ); ?>"></script>

	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/services/olHandler.js' ); ?>"></script>
	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/services/osmData.js?t=' . date('U') ); ?>"></script>

	<?php // Include polyfills for old IE versions ?>
	<!--[if lte IE 8]>

	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/polyfills/json2.js' ); ?>"></script>
	<![endif]-->

	<?php // Stylesheets ?>
	<link rel="stylesheet" href="<?php echo $view['assets']->getUrl( 'css/theme/default/style.css' ); ?>" />
	<link rel="stylesheet" href="<?php echo $view['assets']->getUrl( 'css/lib/bootstrap.css' ); ?>" />
	<link rel="stylesheet" href="<?php echo $view['assets']->getUrl( 'css/app.css' ); ?>" />

</head>
<body ng-cloak >

	<div id="content" ng-controller="MainController">

	<?php $view['slots']->output('_content') ?>

	<div class="container">
		
			
		<div class="text-center">

			<h2>Welcome to Beosmapper!</h2>

			<h4>Beosmapper is an extension to <a href="http://blindsquare.com/" target="_blank">BlindSquare</a> that indicates the building entrances, stairs and traffic lights for blind pedestrians</h4>   

		</div>
			
	  <div id="submission-area" class="row">

		<div id="map-block" class="col-xs-8">

			<div id="map"></div>

			<a class="locate btn btn-primary btn-sm" href="" ng-click="locate()">Show my current location</a>

		</div>
		
		
		<div id="information-block" class="col-xs-4">

			<div class="panel-group" id="accordion">

				<div class="panel panel-default">
					<div class="panel-heading">
				  		<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" ng-click="initAreaSelection();">1. Select area</a>
						</h4>
					</div>

					<div id="collapseOne" class="panel-collapse collapse in">
						<div class="panel-body">
							Click on the map at the location where your object is situated and see which features already exist in that area.

							<br><br><a class="btn btn-default pull-right" href="#" role="button" ng-click="nextSection( $event ); selectFeatureType();">Next</a>
						</div>
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" ng-click="selectFeatureType();">2. What do you want add?</a>
						</h4>
					</div>

					<div id="collapseTwo" class="panel-collapse collapse">
						<div class="panel-body">

							<div class="form-group">

								<select id="feature-type" class="form-control has-error" ng-model='entry.featureType'>

									<option value="entrance" selected>Building Entrance</option>

									<!--<option value="">Choose the feature type</option>

									<option value="tlight">Traffic light</option>

									<option value="Stairs">Stairs</option>-->

								</select>

								<br><br><a class="btn btn-default pull-right" href="#" role="button" ng-click="nextSection( $event ); selectLocation();">Next</a>
							</div>
						</div>
					</div>
				</div>


				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion" href="#collapseThree" ng-click="selectLocation();">3. Select location</a>
				  		</h4>
					</div>

					<div id="collapseThree" class="panel-collapse collapse">
						<div class="panel-body">
							Click one more time on the exact location of your entrance/traffic lights.

							<br><br><a class="btn btn-default pull-right" href="#" role="button" ng-click="nextSection( $event )">Next</a>
						</div>
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion" href="#collapseFour">4. Describe</a>
						</h4>
					</div>

					<div id="collapseFour" class="panel-collapse collapse">
						<div class="panel-body">



							<?php // Entrance ?>
							<div class="form-group">
								<label for="tag-entrance"><a href="http://wiki.openstreetmap.org/wiki/Key:entrance" target="_blank">Importance or type of use</a></label>

								<select id="tag-entrance" name="tag-entrance" class="form-control has-error" ng-model='entry.tags.entrance'>

									<option value="yes" selected> Normal</option>

									<option value="main">Main</option>

									<option value="service">Service</option>

									<option value="exit">Exit</option>

									<option value="emergency">Emergency</option>

									<option value="staircase">Staircase</option>

									<option value="home">Home</option>

								</select>

							</div>

							<?php // Access ?>
							<div class="form-group">

								<label for="tag-access">Allowed to enter</label>

								<select id="tag-access" name="tag-access" class="form-control has-error" ng-model='entry.tags.access'>

									<option value="yes" selected>Yes</option>

									<option value="delivery">Delivery</option>

									<option value="private">Private</option>

									<option value="no">No</option>

								</select>

							</div>

							<?php // Access ?>
							<div class="form-group">

								<label for="tag-wheelchair">Wheelchair access</label>

								<select id="tag-wheelchair" name="tag-wheelchair" class="form-control has-error" ng-model='entry.tags.wheelchair'>

									<option value="yes" selected>Yes</option>

									<option value="no">No</option>

									<option value="limited">Limited</option>

								</select>

							</div>


							<?php // Automatic doors ?>
							<div class="form-group">
								<div class="checkbox">
									<label><input type="checkbox" value="" ng-model='entry.tags.automatic_door' ng-true-value="yes" ng-false-value="no">Automatic doors</label>
								</div>
							</div>

							<?php // Reference ?>
							<div class="form-group">

								<label for="tag-ref">Entrance Reference</label>

								<input type="text" id="tag-ref" name="tag-ref" class="form-control has-error" placeholder="example: A" ng-model='entry.ref' >

							</div>


							<br><br><a class="btn btn-default pull-right" href="#" role="button" ng-click="nextSection( $event )">Next</a>
						</div>
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion" href="#collapseFive">5. Add your OpenStreetMap login</a>
						</h4>
					</div>

					<div id="collapseFive" class="panel-collapse collapse">
						<div class="panel-body">
							<div class="form-group">

								<p class="text-muted"><small><small>Don't have a OpenStreetMap account? Sign up <a href="https://www.openstreetmap.org/user/new" target="_blank">here</a>.</small></small></p>

								<label class="sr-only" for="osm_password">OpenStreetMap Username</label>
								<input type="text" id="username" class="form-control" placeholder="Username" ng-model='entry.login.username'><p></p>

								<label class="sr-only" for="osm_password">OpenStreetMap Password</label>
								<input type="text" id="osm_password" class="form-control has-error" placeholder="Password" ng-model='entry.login.password'>

								<p class="text-info"><small><small>Note: Your OpenStreetMap login information will not be stored, it will be used only to submit the data.</small></small></p>

							</div>
						</div>
					</div>
				</div>


			</div>

			<div class="input-group pull-right">

				<button type="submit" class="btn btn-default" ng-click='submitEntry()'>Submit</button>
				<div class="alert alert-success">Your entry has been successfully submitted!<p>You can continue to add new entries.</div>
				<div class="alert alert-danger">Please, check all the steps carefully! Something is missing.</div>

			</div>

		</div>
	</div>
			<div class="well text-center">
				<h6>This is a project by **Group 2** for the course GIS Application Development - Aalto University</h6>
			
			</div>	
	<!-- ng-model = two-way data binding 
	<input type='text' ng-model='inputValue' />

	{{ inputValue }}
		
	</div>-->

</body>
</html>