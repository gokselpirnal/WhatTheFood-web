<?php

class Food extends Illuminate\Database\Eloquent\Model {
	protected $table = 'foods';
	protected $primaryKey = 'food_id';
	public $timestamps = false;
	
	public function user(){
        return $this->hasOne('User','user_id','user_id')->first();
    } 

    public function profile(){
        return $this->hasOne('Profile','user_id','user_id')->first();
    } 
}