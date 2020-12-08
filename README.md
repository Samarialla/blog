# blog
 peliculas

para poder ejecutar esta aplicacion

debera contar con composer 
php >= 7.2
npm 

para poder ejecutar abrir dos terminales

la primera iniciar con composer install y despues npm install

posterior a ellos php artisan serve y en otra terminal npm run watch

Explicaciones

 estuve viendo la api , la intesion era realizar en angular, pero tenia un problema para acceder localhost de angular , el problema era que el servidor de local host no remitia Access-Control-Allow-Origin en el header , por falta de tiempo opte por tomar laravel para consumir la api y react para el front end, ademas verificando la api de las peliculas no pude visualizar el id de las peliculas para realizar la consulta sobre esas id para las criticas o comentarios (seguramente por algun motivo no pude obtener los id de las peliculas);

   
