<?php


/*
--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('', function() {
	return redirect('/admin');
});
Route::group(['prefix'=>'pos'], function ($app) {
	$app->get('/login',function(){
		return redirect('/admin');
	}
	);
	$app->get('/app',function(){
		return redirect('/admin');
	}
	);
}
);
Route::group(['prefix'=>'POS','middleware'=>'CORS'], function($app){
	$app->post('users/authenticate', ['uses'=>'AppAuthController@LoginUser']);
	$app->post('users/authenticate/logout', ['uses'=>'AppAuthController@signout']);
	$app->post('users/reset/password','AppAuthController@resetPassword');
	$app->put('users/account/activation','AppController@blockUser');
	$app->put('users/update','AppController@updateUser');
	$app->get('load/users','AppController@loadUsers');
	$app->post('admin/register', ['uses'=>'AppAuthController@register']);
	$app->post('admin/notify', ['uses'=>'AppController@notifyStudent']);
	$app->post('sales/add', ['uses'=>'AppController@dailySales']);
	$app->post('sales/drop', ['uses'=>'AppController@dailySalesDrop']);
	$app->get('load/sales/history', ['uses'=>'AppController@jsonLoadSales']);
	$app->get('load/categories', ['uses'=>'AppController@getAppData']);
	$app->get('load/stock', ['uses'=>'AppController@loadStock']);
	$app->get('load/dashboard', ['uses'=>'AppController@loadDashboard']);
	$app->post('stock/update', ['uses'=>'AppController@updateStockItem']);
	$app->post('stock/add', ['uses'=>'AppController@addStockItem']);
	$app->post('stock/drop', ['uses'=>'AppController@deleteStockItem']);
	$app->get('load/departments-roles', ['uses'=>'AppController@jsonLoadDepartmentsAndRoles']);
}
);
