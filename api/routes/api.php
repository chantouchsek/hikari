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
  'as' => 'user.',
  'prefix' => 'users',
], function () {
  Route::get('', ['as' => 'index', 'uses' => 'UsersController@index']);
  Route::post('', ['as' => 'store', 'uses' => 'UsersController@store']);
  Route::get('{user}', ['as' => 'show', 'uses' => 'UsersController@show']);
  Route::put('{user}', ['as' => 'update', 'uses' => 'UsersController@update']);
  Route::delete('{user}', ['as' => 'destroy', 'uses' => 'UsersController@destroy']);
  Route::get('{user}/store', ['as' => 'store.show', 'uses' => 'Users\StoreController@show']);
});

Route::prefix('departments')->as('departments.')->group(function () { // ->namespace('Users')->middleware(['auth:api'])
  Route::get('', 'DepartmentsController@index')->name('index');
});

Route::get('stores/all', 'Store\StoreController@index');
Route::get('stores/{store}/user', 'Store\StoreController@show');
Route::resource('stores', 'StoreController');
Route::get('time_cards/{time_card}/user', 'TimeCard\UserController@show');
Route::resource('time_cards', 'TimeCardController');
Route::get('quests/{quest}/user', 'Quest\UserController@show');
Route::resource('quests', 'QuestController');
Route::resource('branches', 'BranchController');
Route::get('attendances/{attendance}/user', 'Attendance\UserController@show');
Route::get('attendances/{attendance}/branch', 'Attendance\BranchController@show');
Route::resource('attendances', 'AttendanceController');
Route::get('daily_reports/{daily_report}/branch', 'DailyReport\BranchController@show');
Route::resource('daily_reports', 'DailyReportController');
Route::get('posts/drafts', 'PostController@draftPost');
Route::delete('posts/drafts/{post}', 'PostController@destroy');
Route::resource('posts', 'PostController');
Route::resource('chats', 'ChatMessageController');
