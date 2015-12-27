<?php

class Admin extends Illuminate\Database\Eloquent\Model {
	protected $table = 'admins';
	protected $primaryKey = 'user_id';
	public $timestamps = false;

	public function user(){
        return $this->hasOne('User','user_id','user_id')->first();
    }  
 	
}