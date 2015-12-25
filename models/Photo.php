<?php

class Photo extends Illuminate\Database\Eloquent\Model {
	protected $table = 'photos';
	protected $primaryKey = 'photo_id';
	public $timestamps = false;

	public function food(){
        return $this->hasOne('Food','food_id','food_id')->first();
    } 
}