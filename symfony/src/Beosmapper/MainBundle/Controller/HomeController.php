<?php

namespace Beosmapper\MainBundle\Controller;

use Symfony\Component\HttpFoundation\Response;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class HomeController extends Controller {

	/**
	 * Redering of the main view of the page which loads AngularJS, further template logic
	 * can be found in the AngularJS code
	 */
	public function indexAction( ) {

		return $this->render( 'BeosmapperMainBundle:Home:index.html.php' );

	}

}