<?php

class Token extends Illuminate\Database\Eloquent\Model {
	protected $table = 'tokens';
	protected $primaryKey = 'user_id';
	public $timestamps = false;

	public function user(){
        return $this->hasOne('User','user_id','user_id')->first();
    }    
}