<?php

namespace Beosmapper\MainBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class HomeController extends Controller {

	public function indexAction( ) {

		return $this->render( 'BeosmapperMainBundle:Home:index.html.php' );

	}


}