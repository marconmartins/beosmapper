<!DOCTYPE html>
<html lang="en" ng-app>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<title><?php $view['slots']->output('title', 'Beosmapper') ?></title>

		<?php /*$view['slots']->output('stylesheets')*/ ?>

		<link rel="shortcut icon" href="<?php echo $view['assets']->getUrl('favicon.ico') ?>" />


		<?php // Include Javascript files 
		$header_js_files = $view['assetic']->javascripts( array( '@BeosmapperMainBundle/Resources/public/js/*' ) ); ?>

		<?php foreach ( $header_js_files as $url ) { ?>

			<script type="text/javascript" src="<?php echo $view->escape( $url ); ?>"></script>

		<?php } ?>

	</head>

<body>
	<h1><?php echo "Besomapper Home"; ?></h1>

	<p>Beosmapper is an extension to <a href="http://blindsquare.com/">BlindSquare</a> that indicates the building entrances and traffic lights for blind pedestrians.</p>
	
	<p>This is a project by **Group 2** for the course GIS Application Development - Aalto University</p>

	<p>Nothing here {{'yet' + '!'}}</p>

	<?php $view['slots']->output('_content') ?>

	<div id="map"></div>
	
</body>
</html>