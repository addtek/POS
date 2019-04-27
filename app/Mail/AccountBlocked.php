<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AccountBlocked extends Mailable
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
        $app = config('app.name');
        $support = config('app.accounts.support');

        return $this->subject("$app Account Notification")
        ->from($support['mail'],$support['name'])
        ->markdown('emails.user.accountblocked')
        ->with([
            "name"=>$this->data['full_name'],
            "reason"=>$this->data['reason']
            ]);
        }
    }
