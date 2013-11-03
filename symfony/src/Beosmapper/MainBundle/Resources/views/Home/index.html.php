<!DOCTYPE html>
<html lang="en" ng-app="BeosmapperApp">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<title><?php $view['slots']->output('title', 'Beosmapper') ?></title>

	<link rel="shortcut icon" href="<?php echo $view['assets']->getUrl('favicon.ico') ?>" />

	<?php 
	// TODO: INCLUDE OL THEME CSS
	/*$view['slots']->output('stylesheets')*/
	?>

	<?php
	// Include Javascript libraries 
	$js_libraries = $view['assetic']->javascripts( array( '@BeosmapperMainBundle/Resources/public/js/lib/*' ) ); ?>

	<?php foreach ( $js_libraries as $url ) { ?>

		<script type="text/javascript" src="<?php echo $view->escape( $url ); ?>"></script>

	<?php }

	// Include Javascript files 
	$js_app = $view['assetic']->javascripts( array( '@BeosmapperMainBundle/Resources/public/js/*' ) ); ?>

	<?php foreach ( $js_app as $url ) { ?>

		<script type="text/javascript" src="<?php echo $view->escape( $url ); ?>"></script>

	<?php } ?>

</head>
<body>

	<div id="content" ng-controller="MainController">

		<h1><?php echo "Besomapper Home"; ?></h1>

		<p>Beosmapper is an extension to <a href="http://blindsquare.com/">BlindSquare</a> that indicates the building entrances and traffic lights for blind pedestrians.</p>
		
		<p>This is a project by **Group 2** for the course GIS Application Development - Aalto University</p>

		<div id="map" style="height: 400px; width: 400px;"></div>

		<?php $view['slots']->output('_content') ?>

		<input type='text' ng-model='inputValue' />

		{{ inputValue }}

	</div>

</body>
</html>