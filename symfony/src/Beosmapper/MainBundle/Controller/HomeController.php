<?php

namespace Beosmapper\MainBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class HomeController extends Controller {

	public function indexAction( ) {

		#return new Response( '<html><body><h1>beosmapper home</h1></body></html>' );

		return $this->render('BeosmapperMainBundle:Home:index.html.php');
		#return $this->render( 'BeosmapperMainBundle:Home:index.html.twig' );

	}


}