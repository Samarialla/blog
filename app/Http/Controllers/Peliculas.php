<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Peliculas extends Controller
{
    public static function getPeliculas(Request $request)
    {
        'https://movies.z4.tdplab.com/api/pelicula/?limit=10&offset=1';
        $limit = $request->limit != null? $request->limit :10;
        $offset = $request->offset;
        $datos = file_get_contents('https://movies.z4.tdplab.com/api/pelicula/?limit='.$limit.'&offset='.$offset);
        echo ($datos);
        // return $datos;
    }

    public static function getComentarios(Request $request)
    {
        'https://movies.z4.tdplab.com/api/pelicula/?limit=10&offset=1';
        $id =  $request->id;
        $datos = file_get_contents('https://movies.z4.tdplab.com/api/pelicula/'.$id.'/comentarios/');
        echo ($datos);
        // return $datos;
    }

    public static function getCriticas(Request $request)
    {
        'https://movies.z4.tdplab.com/api/pelicula/?limit=10&offset=1';
        $id =  $request->id;
        $datos = file_get_contents('https://movies.z4.tdplab.com/api/pelicula/'.$id.'/criticas/');
        echo ($datos);
        // return $datos;
    }
}
