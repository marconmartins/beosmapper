<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org" lang="en" id="ng-app" ng-app="BeosmapperApp">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<title><?php $view['slots']->output('title', 'Beosmapper') ?></title>

	<link rel="shortcut icon" href="<?php echo $view['assets']->getUrl('favicon.ico') ?>" />


	<?php // Include Javascript libraries 
	$js_libraries = $view['assetic']->javascripts( array( '@BeosmapperMainBundle/Resources/public/js/lib/*' ) ); ?>

	<?php foreach ( $js_libraries as $url ) { ?>
		<script type="text/javascript" src="<?php echo $view->escape( $url ); ?>"></script>
	<?php }


	// Include Javascript files 
	$js_app = $view['assetic']->javascripts( array( '@BeosmapperMainBundle/Resources/public/js/*' ) ); ?>

	<?php foreach ( $js_app as $url ) { ?>
		<script type="text/javascript" src="<?php echo $view->escape( $url ); ?>"></script>
	<?php }

	// Include polyfills for old IE versions
	$appServices = $view['assetic']->javascripts( array( '@BeosmapperMainBundle/Resources/public/js/services/*' ) ); ?>

	<?php foreach ( $appServices as $url ) { ?>
		<script type="text/javascript" src="<?php echo $view->escape( $url ); ?>"></script>
	<?php }



	// Include polyfills for old IE versions
	$js_app = $view['assetic']->javascripts( array( '@BeosmapperMainBundle/Resources/public/js/polyfills/*' ) ); ?>

	<!--[if lte IE 8]>
	<?php foreach ( $js_app as $url ) { ?>
		<script type="text/javascript" src="<?php echo $view->escape( $url ); ?>"></script>
	<?php } ?>
	<![endif]-->


	<?php // Include Stylesheets
	$stylesheets = $view['assetic']->stylesheets( array('@BeosmapperMainBundle/Resources/public/css/*') ); ?>

	<?php foreach ( $stylesheets as $url ) { ?>
		<link rel="stylesheet" href="<?php echo $view->escape($url) ?>" />
	<?php }


	// OpenLayers default theme file ?>
	<link rel="stylesheet" href="/css/theme/default/style.css" />

</head>
<body ng-cloak >

	<div id="content" ng-controller="MainController">

		<h1>{{ pageTitle }}</h1>

		<p>Beosmapper is an extension to <a href="http://blindsquare.com/">BlindSquare</a> that indicates the building entrances and traffic lights for blind pedestrians.</p>
		
		<p>This is a project by **Group 2** for the course GIS Application Development - Aalto University</p>

		<div id="map" style="height: 500px; width: 500px;"></div>

		<?php $view['slots']->output('_content') ?>

		<!-- ng-model = two-way data binding - ->
		<input type='text' ng-model='inputValue' />

		{{ inputValue }}

	</div>

</body>
</html>