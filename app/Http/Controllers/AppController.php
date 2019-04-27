<?php

namespace App\Http\Controllers;

use App\Sale;
use App\User;
use App\Record;
use App\RecentActivity;
use App\Notification;
use App\Stock;
use App\Category;
use App\Role;

use Carbon\Carbon;
use Validator;
use Hash;
use Illuminate\Http\Request;


class AppController extends Controller
{
	protected $now;
	protected $expire_date;
	
	public function __construct(){
		$this->now= Carbon::now();
		$this->expire_date = Carbon::today()->addHours(24);
	}
	
	public function getAppData (){
		$today = Carbon::today();
		$cat = Category::all();
		$stock_item = Stock::orderBy('itemName', 'ASC')->get();
		$today_sales = Sale::where('created_at', '>=', $today)->get();
		$all_sales = Sale::all();
		$data = [
					'categories'=> $cat,
					'stock' => $stock_item,
					'allSales'=> $all_sales,
					'today_sales'=>$today_sales
					];
		return response()->json($data, 200);
	}

	public function loadUsers(){
		$users = User::all();
		if ($users){
			return response()->json($users, 200);
		}
	}
	public function loadStock(){
		$startofweek = $this->now->startOfWeek()->format('Y-m-d H:i');
		$endofweek = $this->now->endOfWeek()->format('Y-m-d H:i');
		$startofmonth = $this->now->startOfMonth()->format('Y-m-d H:i');
		$endofmonth = $this->now->endOfMonth()->format('Y-m-d H:i');
		$today = Carbon::today();
		$today_sales =[
					'total'=> 0,
					'amount'=> 0
				];
		$allsales =[
					'total'=> 0,
					'amount'=> 0
				];
		$weeksales =[
					'total'=> 0,
					'amount'=> 0
				];
		$monthsales =[
					'total'=> 0,
					'amount'=> 0
				];
		$refinedStock= [];
		$cat = Category::all();
		$stock_item = Stock::orderBy('itemName', 'ASC')->get();
		foreach ($stock_item as $key => $value) {
			$all_sales = Sale::select('price', 'quantity','created_at')->where('itemName', $value['itemName'])->get();
			if($all_sales){
				foreach ($all_sales as $key => $saleItem) {
					if ($saleItem['created_at'] >= $today){
						$today_sales['total'] = $today_sales['total'] + $saleItem['quantity'];
						$today_sales['amount'] = $today_sales['amount'] + $saleItem['price'];
					}
					if ($saleItem['created_at'] >= $startofweek && $saleItem['created_at'] <= $endofweek){
						$weeksales['total'] = $weeksales['total'] + $saleItem['quantity'];
						$weeksales['amount'] = $weeksales['amount'] + $saleItem['price'];
					}
					if ($saleItem['created_at'] >= $startofmonth && $saleItem['created_at'] <= $endofmonth){
						$monthsales['total'] = $monthsales['total'] + $saleItem['quantity'];
						$monthsales['amount'] = $monthsales['amount'] + $saleItem['price'];
					}
					$allsales['total'] = $allsales['total'] + $saleItem['quantity'];
					$allsales['amount'] = $allsales['amount'] + $saleItem['price'];
				}
				array_push($refinedStock, [
						'id'=> $value['id'],
						'category'=> $value['category'],
						'itemName'=> $value['itemName'],
						'numberInStock'=> $value['numberInStock'],
						'pricePerItem'=> $value['pricePerItem'],
						'minQty' => $value['minQty'],
						'todaySales' => $today_sales,
						'weekSales' => $weeksales,
						'monthSales' => $monthsales,
						'allSales' => $allsales,
					]);
			}
			$allsales['total'] = 0;
			$allsales['amount'] = 0;
			$weeksales['total'] = 0;
			$weeksales['amount'] = 0;
			$monthsales['total'] = 0;
			$monthsales['amount'] = 0;
			$today_sales['total'] = 0;
			$today_sales['amount'] = 0;
		}
		return response()->json(['stock'=>$refinedStock, 'categories'=>$cat], 200);
	}
	public function loadDashboard(){
		$allsales = 0;
		$revenue = 0;
		$users = User::all();
		$refinedStock= 0;
		$cat = Category::all();
		$stock_item = Stock::orderBy('itemName', 'ASC')->get();
		$all_sales = Sale::select('price', 'quantity')->get();
		
		if($all_sales){
			foreach ($all_sales as $key => $saleItem) {
					$allsales = $allsales + $saleItem['quantity'];
					$revenue = $revenue + $saleItem['price'];
			}
		}
		foreach ($stock_item as $key => $value) {
			$refinedStock = $refinedStock + $value['numberInStock'];
		}
		return response()->json([
		'stock'=>$refinedStock,
		'sales'=>$allsales,
		'revenue'=> $revenue,
		'users'=> sizeof($users, 1)
			], 200);
	}
	
	public function dailySales(Request $request){
		$data = $request['item'];
		$today = Carbon::today();
		$user = User::where('id', $request['user'])->first();
		if ($user['token'] === $request['token']){
			$added = Sale::create(
								[
									'itemName'=> $data['itemName'],
									'quantity'=> $data['quantity'],
									'price'=> $data['price'],
									'addedBy'=> $user['un']
								]
							);
			if ($added){
				$item = Stock::where('itemName', $data['itemName'])->first();
				if($item){
					$qty = $item['numberInStock'];
					$item['numberInstock'] = $qty - $data['quantity'];
					$item->update();
					$today_sales = Sale::where('created_at', '>=', $today)->get();
					$item  = Stock::orderBy('itemName', 'ASC')->get();
					return response()->json(['stock'=>$item, 'sales'=>$today_sales], 200);
				}
			}
		}
		return response()->json('you are not authorized to perform this action', 200);
		
	}
	public function dailySalesDrop(Request $request){
		$today = Carbon::today();
		$data = $request['item'];
		$user = User::where('id', $request['user'])->first();
		if ($user['token'] === $request['token'] && !is_array($data)){
			$droppable = Sale::where('id', $data)->first();
			if ($droppable){
				$item = Stock::where('itemName', $droppable['itemName'])->first();
				if($item){
					$qty = $item['numberInStock'];
					$item['numberInstock'] = $qty + $droppable['quantity'];
					$item->update();
					$droppable->delete();
					$today_sales = Sale::where('created_at', '>=', $today)->get();
					$item  = Stock::orderBy('itemName', 'ASC')->get();
					return response()->json(['stock'=>$item, 'sales'=>$today_sales], 200);
					
				}
			}
		} elseif ($user['token'] === $request['token'] && is_array($data)) {
			$droppable = Sale::where('id', $data['item'])->first();
			if ($droppable){
				$item = Stock::where('itemName', $droppable['itemName'])->first();
				if($item && $data['extra']['type'] == 'reduce'){
					$qty = $item['numberInStock'];
					$item['numberInstock'] = $qty + ($droppable['quantity'] - $data['extra']['newQty']);
					$item->update();
					$newPrice = ($droppable['price'] / $droppable['quantity']) * $data['extra']['newQty'];
					$droppable->quantity = $droppable['quantity'] - ($droppable['quantity'] - $data['extra']['newQty']);
					$droppable->price = $newPrice;
					$droppable->update();
					$today_sales = Sale::where('created_at', '>=', $today)->get();
					$item  = Stock::orderBy('itemName', 'ASC')->get();
					return response()->json(['stock'=>$item, 'sales'=>$today_sales], 200);
				}else{
					$qty = $item['numberInStock'];
					$item['numberInstock'] = $qty + $droppable['quantity'];
					$item->update();
					$droppable->delete();
					$today_sales = Sale::where('created_at', '>=', $today)->get();
					$item  = Stock::orderBy('itemName', 'ASC')->get();
					return response()->json(['stock'=>$item, 'sales'=>$today_sales], 200);
				}
			}
		}
		return response()->json('you are not authorized to perform this action', 200);
		
	}
	
	public function updateStockItem(Request $request){
		$data = $request['item'];
		$user = User::where('id', $request['user'])->first();
		if ($user['token'] === $request['token']){
			foreach($data as $key => $value) {
				$item = Stock::where('id', $value['itemID'])->first();
				if($item) {
					$item->update(['numberInStock'=> $value['qty'], 'pricePerItem'=> $value['price']]);
				}
			}
			$item  = Stock::orderBy('itemName', 'ASC')->get();
			return response()->json($item, 200);
		}
		return response()->json('not authorized', 200);
	}
	public function addStockItem(Request $request){
		$data = $request['data'];
		$user = User::where('id', $request['user'])->first();
		if ($user['token'] === $request['token']){
			$itemExist = Stock::where('itemName', $data['itemName'] )->first();
			if($itemExist)
														return response()->json('item already exist', 200);
			$cat = Category::where('id', $data['category'])->first();
			$item = Stock::create (
				[
					'category'=> $cat['categoryID'],
					'itemName'=> $cat['categoryID'].' '.$data['itemName'],
					'numberInStock'=> $data['quantity'],
					'pricePerItem'=> $data['price'],
					'minQty'=> 1,
					'addedBy'=> $user['un'],
				]
				);
			if($item){
				$item = Stock::orderBy('itemName', 'ASC')->get();
				return response()->json($item, 200);
			}
			return response()->json('failed to add item try again later', 200);
		}
		return response()->json('not authorized', 200);
		
	}
	public function deleteStockItem(Request $request){
		$data = $request['item'];
		$user = User::where('id', $request['user'])->first();
		if ($user['token'] === $request['token']){
			foreach ($data as $key => $value) {
				$droppable = Stock::where('id', $value['id'])->first();
				if ($droppable){
					$droppable->delete();
					$item  = Stock::orderBy('itemName', 'ASC')->get();
					return response()->json(['stock'=>$item], 200);
				}
			}
		}
		return response()->json('you are not authorized to perform this action', 200);
		
	}
	public function jsonLoadSales(Request $request){
		$all= $request->all();
		$saleData = Sale::orderBy('created_at', 'DESC')
		->whereRaw('DATE_FORMAT(sales.created_at, "%Y-%m-%d") BETWEEN ? AND ?', [ $all['from'], $all['to']])
		->get();
		$saleData->each(function ($item){
			$item->makeVisible(['created_at']);
		});
		return response()->json($saleData, 200);
	}
	// 	Alert uncleared students
								public function notifyStudent(Request $request){
		$students = Student::wherein('index_no', $request->std_id)->get();
		$recievers = [];
		$studentNotification = [];
		foreach($students as $key => $student){
			$stdClearance = Clearance::where('student_id', $student->index_no)->first();
			if($stdClearance){
				if (!$stdClearance->hod || !$stdClearance->sc || !$stdClearance->acc || !$stdClearance->lb || !$stdClearance->hm || 
								!$stdClearance->vd || !$stdClearance->wt || !$stdClearance->pc) {
					array_push($recievers, $student->phoneNumber);
					array_push($studentNotification, $this->generateNotification($student->last_name));
				}
			}
		}
		event(new AlertUnclearedStudent($recievers,$studentNotification));
		return response()->json("Notification sent",200);
	}
public function jsonLoadDepartmentsAndRoles (){
		$roles = Role::get();
		$data = [
				"roles" => $roles
			];
		return response()->json($data, 200);
	}
public function updateUser(Request $request){
		$data = $request->all();
		$user = User::where('id', $data['id'])->first();
		if ($user && $user['token'] === $data['token']){
			$user->un = $data['un'];
			$user->sn = $data['sn'];
			$user->on = $data['on'];
			$user->phoneNum = $data['phoneNum'];
			$user->email = $data['email'];

			$update = $user->update();
			if($update) {
				return response()->json('profile updated', 200);
			}
		}
		return response()->json('not authorized', 401);
	}
	public function updatePassword(Request $request){
		$user = $request->user;
		$password = $request->old_password;
		if(password_verify($password,$user->password)){
			$new = Hash::make($request->new_password);
			$user->update(['password'=>$new]);
			return response()->json("password changed successfully",200);
		}
		return response()->json("Old password did not match account",401);
	}
	public function blockUser(Request $request){
		$user= User::find($request->id);
		return $user->active == 1 ? $this->block($user) : $this->unblock($user) ;
	}
	
	protected function block(User $user){
		$user->update(['active'=>0]);
			// event(new BlockUser($user,"Failure to confirm a pledge before expire date."));
		$users = User::all();
		return response()->json(['info'=>'blocked', "users"=> $users],200);
	}
	
	protected function unblock(User $user){
		$user->update(['active'=>1]);
		 $users = User::all();
		return response()->json(["info"=>'unblocked', "users"=>$users], 200);
	}
	
	public function deleteUser(Request $request){
		$user= User::destroy( $request->id);
		return response()->json('user deleted',200);
	}
	
	protected function generateNotification($user, $type=1){
		$unclearedBy = '';
		if (!$clearance->hod || !$clearance->sc || !$clearance->acc || !$clearance->lb || !$clearance->hm || 
					!$clearance->vd || !$clearance->wt || !$clearance->pc) {
			
		}
		$content  = $type == 1 ? "Dear $user, Your School clearance is not complete please login to 
		the clearance portal and visted the respective clearance Offices. Thank You.":
				".";
		
		// 		$title = "Clearance Alert";
		// 		$sent_on = Carbon::now()->toDateTimeString();
		return $content;
		// 		return ["title"=>$title,"content"=>$content,"sent_on"=>$sent_on,"type"=>$type];
	}
}

