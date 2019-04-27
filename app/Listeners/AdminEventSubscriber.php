<?php

namespace App\Listeners;

use App\Events\AccountPasswordReset;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Mail\PasswordReset;

use Illuminate\Support\Facades\Mail;
class AdminEventSubscriber implements ShouldQueue
{
	
	/**
	* Create the event listener.
	     *
	     * @return void
	     */
	    public function __construct()
	    {
		//
	}
	
	
	/**
	* Handle the event.
	     *
	     * @param  AccountPasswordReset  $event
	     * @return void
	     */
	    public function handle(AccountPasswordReset $event)
	    {
		//
	}
	public function ResetPassword($event){
		$user = $event->user;
		$token = $event->token;
		$user->name = $user->sn . ' ' . $user->on;
		Mail::to($user)->send(new PasswordReset(['name'=>$user->name,'token'=>$token]));
	}
	public function subscribe($events){
		
		
		// 		$events->listen('App\Events\ResetPassword','App\Listeners\UserEventSubscriber@ResetPassword');
		
		// 		$events->listen('App\Events\BlockUser','App\Listeners\UserEventSubscriber@UserBlocked');
		
		$events->listen('App\Events\AccountPasswordReset','App\Listeners\AdminEventSubscriber@ResetPassword');
	}
}
