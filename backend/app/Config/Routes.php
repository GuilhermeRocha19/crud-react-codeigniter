<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type, Accept, API-KEY");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE,PATCH");

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');


//Rotas definidas para Controllers/Alunos
$routes->get('/alunos', 'Alunos::index');
$routes->post('/alunos', 'Alunos::create');
$routes->put('/alunos/(:num)', 'Alunos::update/$1');
$routes->delete('/alunos/(:num)', 'Alunos::delete/$1');
