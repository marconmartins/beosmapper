<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<title><?php $view['slots']->output('title', 'Welcome to Beosmapper') ?></title>

		<?php $view['slots']->output('stylesheets') ?>

		<link rel="shortcut icon" href="<?php echo $view['assets']->getUrl('favicon.ico') ?>" />
	</head>

<body>
	<?php echo "Besomapper Home"; ?>

	<p>Beosmapper is an extension to <a href="http://blindsquare.com/">BlindSquare</a> that indicates the building entrances and traffic lights for blind pedestrians.</p>
	
	<p>This is a project by **Group 2** for the course GIS Application Development - Aalto University</p>

	<img src="http://www.cug.edu.gh/images/page%20construction.jpg" alt="Page under construction"> 

	<?php $view['slots']->output('_content') ?>
	<?php $view['slots']->output('javascripts') ?>
</body>
</html>