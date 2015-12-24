<?php

class Comment extends Illuminate\Database\Eloquent\Model {
	protected $table = 'comments';
	public $timestamps = false;
	
	public function user(){
        return $this->hasOne('User','user_id','user_id')->first();
    } 
	
	public function food(){
        return $this->hasOne('Food','food_id','food_id')->first();
    } 
}