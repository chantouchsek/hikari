<?php

use Illuminate\Http\Request;

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

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'as'         => 'user.',
    'prefix'     => 'users',
], function () {
    Route::get('', ['as' => 'index', 'uses' => 'UsersController@index']);
    Route::post('', ['as' => 'store', 'uses' => 'UsersController@store']);
    Route::get('{user}', ['as' => 'show', 'uses' => 'UsersController@show']);
    Route::put('{user}', ['as' => 'update', 'uses' => 'UsersController@update']);
    Route::delete('{user}', ['as' => 'destroy', 'uses' => 'UsersController@destroy']);
});

Route::prefix('departments')->as('departments.')->group(function () { // ->namespace('Users')->middleware(['auth:api'])
    Route::get('', 'DepartmentsController@index')->name('index');
});

Route::resource('stores', 'StoreController');
