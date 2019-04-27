<?php

namespace App\Mail;

use Config;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordReset extends Mailable
{
	use SerializesModels;
	
	
	/**
	* Create a new message instance.
	     *
	     * @return void
	     */
	protected $data;
	public function __construct($data){
		$this->data = $data;
	}
	
	
	/**
	* Build the message.
	     *
	     * @return $this
	     */
	    public function build(){
		$email = config('app.accounts.noreply');
		$support = config('app.accounts.support');
		$app = config('app.name');

		return
		$this->from($email['mail'],$email['name'])
			->subject("$app Account Notification")
			->replyTo($support['mail'],$support['name'])
			->markdown('emails.user.passwordreset')
			->with([
				"name"=>$this->data['name'],
				"token"=>$this->data['token']
				]);
	}
}
