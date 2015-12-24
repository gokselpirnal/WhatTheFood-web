<?php

class Profile extends Illuminate\Database\Eloquent\Model {
	protected $table = 'profiles';
	public $timestamps = false;

	public function user(){
        return $this->hasOne('User','user_id','user_id')->first();
    }
}