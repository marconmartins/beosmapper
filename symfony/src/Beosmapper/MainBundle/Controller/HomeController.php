<?php

namespace Beosmapper\MainBundle\Controller;

use Symfony\Component\HttpFoundation\Response;


class HomeController {

	public function indexAction( ) {

		return new Response( '<html><body><h1>beosmapper home</h1></body></html>' );

	}



}
