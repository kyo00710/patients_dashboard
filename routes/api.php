<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group([ 'middleware' => ['guest'], 'prefix' => 'room', 'namespace' => 'App\Http\Controllers\API' ], function () {
    Route::post('/patient', 'PatientController@add')->name('api.room.add_patient');
    Route::delete('/patient/{id}', 'PatientController@remove')->name('api.room.remove_patient');

    Route::get('/patients', 'PatientController@list')->name('api.room.list_patients');

    Route::patch('/doctor/patient/{vseeId}', 'DoctorController@handle')->name('api.room.doctor.handle');
});
