<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Validator;
use App\Events\AccountPasswordReset;

use App\User;

class AppAuthController extends Controller
{
	use AuthenticatesUsers;
	
	protected $redirectTo = "/";
	
	public function LoginUser(Request $request){
		$all= $request->all();
		return  $this->attemptLogin($all);
		
	}
	public function LogoutUser(Request $request){
		$all= $request->all();
		return  $this->attemptLogout($all);
		
	}
	
	protected function attemptLogin($values){
		// $values= json_decode($values);
		$user = User::where('un',$values['username'])->first();
		return $user ? $this->checkpassword($user,$values['password']) : response('Invalid username',401);
	}
	protected function attemptLogout($values){
		$user = User::where('un',$values['username'])->first();
		return $user ? $this->signout($user) : response('Invalid username',401);
	}
	protected function checkpassword(User $user,$password){
		// 		if(!$user->active) return response()->json("Account blocked", 401);
		
		if(password_verify($password,$user->password)){
			if(!$user["active"]) {
				return response()->json("your account is not active, contact administrator", 401);
			}
			$token = $this->generateToken();
			$data = [
						'id'=>$user['id'],
						'on'=>$user['on'],
						'sn'=>$user['sn'],
						'un'=>$user['un'],
						'email'=>$user['email'],
						'phoneNum'=>$user['phoneNum'],
						"userRole"=> $user["userRole"],
						"token"=> $token,
						"active"=> $user["active"]
					
					];
			$user->update(['token'=>$token]);
			return response()->json($data, 200);
		}
		
		return response('Invalid password',401);
		
	}

		/** REGISTRATION */
	public function register(Request $request){		
		$all = $request->all();
		$userExist = User::where('un',$all['username'])->first();
		return  $userExist ? response()->json('username taken', 405) : $this->attemptRegister($all);
		
	}
	protected function attemptRegister($values){
		User::create([
		'sn'=>$values['sname'],
		'on'=>$values['oname'],
		'un'=>$values['username'],
		'email'=>$values['email'],
		'password'=>Hash::make($values['password']),
		'phoneNum'=>$values['phone'],
		'userRole'=>$values['role'],
		'active'=>1,
		'token'=>$this->generateToken()
		]);
		return response()->json("Account Created Successfully", 200);
	}
	protected function signout(request $request){
		$user = User::where('id',$request->id)->first();
		
		if($user->update(['token'=>null])){
			return response()->json('done', 200);
		}
		
		return response('Cant Logout at the monent, try agian later',500);
		
	}
		/** PASSWORD RESET */
	public function resetPassword(Request $request){	
		$all = $request->all();
		$validator = Validator::make($all,[
		'email'=>'required|email'
		]);
		
		return $validator->fails() ? response()->json($validator->messages(), 422): $this->attemptPasswordReset($all['email']);
		
	}
	protected function attemptPasswordReset($email){
		$user = User::where('email',$email)->first();
		
        if($user){
			$token = strtolower(str_random(10));
			$hash = Hash::make($token);
			$user->update(['password'=>$hash]);
			event(new AccountPasswordReset($user,$token));
            return response()->json("Password reset token was sent to your email.", 200);
        }
        return response()->json("E-mail not recognized by system", 401);	
	}

	protected function generateToken(){
		$s = str_random(40);
		return base64_encode($s);
	}
}
