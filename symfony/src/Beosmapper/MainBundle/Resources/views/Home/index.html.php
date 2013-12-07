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
	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/lib/ui-bootstrap-tpls-0.7.0.js' ); ?>"></script>

	<?php // Application (controller + services) ?>
	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/app.js' ); ?>"></script>
	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/maincontroller.js' ); ?>"></script>

	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/services/olHandler.js' ); ?>"></script>
	<script type="text/javascript" src="<?php echo $view['assets']->getUrl( 'js/services/osmData.js' ); ?>"></script>

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

			<h4>Beosmapper is an extension to <a href="http://blindsquare.com/">BlindSquare</a> that indicates the building entrances, stairs and traffic lights for blind pedestrians</h4>   

		</div>
			
		

      <div id="submission-area" class="row">

        <div id="map-block" class="col-xs-8">

			<div id="map"></div>

			<a class="btn btn-primary btn-sm" href="" ng-click="locate()">Show my current location</a>
			<hr></hr>
			<div class="well text-center">
				<h6>This is a project by **Group 2** for the course GIS Application Development - Aalto University</h6>
			
		</div>
		</div>
		
		
		<div id="information-block" class="col-xs-4">
			Help blind people - add your data in few steps!<p></p><p></p>
			<h5><b>Step 1.</b> Once click on the map at the place where your object is situated</h5><p></p>
			<h5><b>Step 2.</b> Click one more time on exact point that you want to describe</h5><p></p>
			<h5><b>Step 3.</b> Add the description of your data:</h5><p></p>

			<div class="form-group">
		
				<select id="feature-type" class="form-control has-error">

					<option value="">Choose the feature type</option>

					<option value="entrance">Building Entrance</option>

					<option value="tlight">Traffic light</option>

					<option value="Stairs">Stairs</option>

				</select>

			</div>
			

			<div class="input-group">

				<span class="input-group-addon">Describe entry</span>

				<input type="text" class="form-control has-error" placeholder="Your description" ng-model='entry.description' >

			</div>


			<div class="form-group">

				<h5><b>Step 4.</b> Add your OpenStreetMap Login</h5>
				<p class="text-muted"><small><small>Don't have a OpenStreetMap account? Sign up <a href="https://www.openstreetmap.org/user/new" target="_blank">here</a>.</small></small></p>

				<label class="sr-only" for="osm_password">OpenStreetMap Username</label>
				<input type="text" id="username" class="form-control" placeholder="Username" ng-model='entry.login.username'><p></p>

				<label class="sr-only" for="osm_password">OpenStreetMap Password</label>
				<input type="text" id="osm_password" class="form-control has-error" placeholder="Password" ng-model='entry.login.password'>

				<p class="text-info"><small><small>Note: Your OpenStreetMap login information will not be stored, it will be used only to add the data.</small></small></p>

			</div>
			<h5><b>Step 5.</b> Submit your entry:</h5><p></p>
			<div class="input-group pull-left">

			<button type="submit" class="btn btn-default" ng-click='submitEntry()'>Submit</button>

			</div>
			<p></p>
			
			<div class="text-right">
			<b>Done!</b><p></p>
			</div>
		</div>
	</div>
				
	<!-- ng-model = two-way data binding 
	<input type='text' ng-model='inputValue' />

	{{ inputValue }}
		
	</div>-->

</body>
</html>