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
		<div class="row">
			<div class="col-lg-16">
			<div class="well text-center">
				<h1>Welcome to Beosmapper!</h1>
				<h3>Beosmapper is an extension to <a href="http://blindsquare.com/">BlindSquare</a> that indicates the building entrances and traffic lights for blind pedestrians.</h3>   
			</div>
			</div>
		</div>
      <div class="row">
        <div class="col-lg-8">
			<p></p>
			<div id="map" style="height: 300px; width: 90%; "></div>
			<p></p>
			<a class="btn btn-primary btn-lg" href="" ng-click="locate()">Show my current location</a>
		</div>

		<hr>
		
		<div class="col-lg-4">

			<h3>Add new entry</h3>

			<div class="btn-group">

				<button type="button" class="btn btn-danger">1. Choose entry type</button>

				<button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown">

					<span class="caret"></span>

					<span class="sr-only">Toggle Dropdown</span>

				</button>

				<ul class="dropdown-menu" role="menu">

					<li><a href="#">Entrance</a></li>

					<li><a href="#">Traffic light</a></li>

					<li><a href="#">Stairs</a></li>

				</ul>

			</div>
			
			<div class="dropdown">
				<button class="btn dropdown-toggle sr-only" type="button" id="dropdownMenu1" data-toggle="dropdown">
				Dropdown
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
					<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
					<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
					<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
					<li role="presentation" class="divider"></li>
					<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
				</ul>
			</div>

			<hr>

			<div class="input-group">

				<span class="input-group-addon">2. Describe entry</span>

				<input type="text" class="form-control" placeholder="Your description" ng-model='entry.description' >

			</div>

			<hr>

			<div class="input-group">
				<button type="submit" class="btn btn-primary" ng-click='submitEntry()'>Submit</button>
			</div>
			<h3>Registration</h3>
			<div class="input-group">
				<input type="text" class="form-control" placeholder="Username" ng-model='entry.login.username'><p></p>
				<input type="text" class="form-control" placeholder="Password" ng-model='entry.login.password'>
			</div>
			
			<hr>

			
			
			
		</div>
	</div>

	<div class="row">
		<div class="col-lg-16">
			<div class="well text-center">
				<h6>This is a project by **Group 2** for the course GIS Application Development - Aalto University</h6>
			</div>
		</div>
	</div>
				
	<!-- ng-model = two-way data binding 
	<input type='text' ng-model='inputValue' />

	{{ inputValue }}
		
	</div>-->

</body>
</html>