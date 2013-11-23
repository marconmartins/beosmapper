<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org" lang="en" id="ng-app" ng-app="BeosmapperApp">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<title><?php $view['slots']->output('title', 'Beosmapper') ?></title>

	<link rel="shortcut icon" href="<?php echo $view['assets']->getUrl('favicon.ico') ?>" />

	<?php // Javascript libraries ?>
	<script type="text/javascript" src="/js/lib/xml2json.js"></script>
	<script type="text/javascript" src="/js/lib/OpenLayers.js"></script>
	<script type="text/javascript" src="/js/lib/angular.js"></script>

	<?php // Application (controller + services) ?>
	<script type="text/javascript" src="/js/app.js"></script>
	<script type="text/javascript" src="/js/maincontroller.js"></script>

	<script type="text/javascript" src="/js/services/olHandler.js"></script>
	<script type="text/javascript" src="/js/services/osmData.js"></script>

	<?php // Include polyfills for old IE versions ?>
	<!--[if lte IE 8]>
	<script type="text/javascript" src="/js/polyfills/json2.js"></script>
	<![endif]-->

	<?php // Stylesheets ?>
	<link rel="stylesheet" href="/css/lib/bootstrap.css" />
	<link rel="stylesheet" href="/css/app.css" />
	<link rel="stylesheet" href="/css/theme/default/style.css" />

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
			<a class="btn btn-primary btn-lg" href="" ng-click="locate()">Center map on my current location</a>
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
			<hr>
			<div class="input-group">
				<span class="input-group-addon">2. Describe entry</span>
				<input type="text" class="form-control" placeholder="Username">
			</div>
        </div>
      </div>
	  <p></p>
      <div class="row">
        <div class="col-lg-16">
          <div class="well text-center">
            <h6>This is a project by **Group 2** for the course GIS Application Development - Aalto University</h6>
          </div>
        </div>
      </div>  
		
		
			<!-- ng-model = two-way data binding - ->
			<input type='text' ng-model='inputValue' />

			{{ inputValue }}
		
	</div>

</body>
</html>