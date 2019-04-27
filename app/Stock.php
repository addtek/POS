<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    //
	protected $table = 'stock';
	protected $hidden = ['created_at', 'updated_at', 'addedBy'];
	protected $fillable = [
	        'category', 'itemName', 'numberInStock', 'pricePerItem', 'addedBy',
	    ];
}
