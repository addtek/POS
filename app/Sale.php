<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
	//
	protected $fillable = [
	       'id', 'itemName', 'quantity', 'price', 'remarks', 'addedBy',
		];
	protected $hidden = ['addedBy', 'created_at', 'updated_at'];
}
