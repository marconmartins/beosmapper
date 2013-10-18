<?php

namespace beosmapper\mainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('beosmappermainBundle:Default:template.html.php');
    }
}
