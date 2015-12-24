<?php

class Food extends Illuminate\Database\Eloquent\Model {
	protected $table = 'foods';
	public $timestamps = false;
	
	public function user(){
        return $this->hasOne('User','user_id','user_id')->first();
    } 
}