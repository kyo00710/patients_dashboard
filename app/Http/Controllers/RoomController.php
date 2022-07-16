<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;

class RoomController extends BaseController
{
    public function enter()
    {
        return view('enter_room');
    }
}
