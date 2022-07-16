<?php

namespace App\Http\Controllers\API;

use App\Events\CallPatientEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class DoctorController extends BaseController
{
    public function __construct()
    {
    }

    public function handle($vseeId): JsonResponse
    {
        broadcast(new CallPatientEvent($vseeId))->toOthers();
        return response()->json('Doctor was in busy', 201);
    }
}
