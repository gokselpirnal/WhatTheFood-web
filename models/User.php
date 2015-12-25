<?php

class User extends Illuminate\Database\Eloquent\Model {
	protected $table = 'users';
	protected $primaryKey = 'user_id';
	public $timestamps = false;

	public function foods(){
        return $this->hasMany('Food','user_id');
    }
	
	public function token(){
        return $this->hasOne('Token','user_id','user_id')->first();
    }  

	public function profile(){
        return $this->hasOne('Profile','user_id','user_id')->first();
    }    	
}