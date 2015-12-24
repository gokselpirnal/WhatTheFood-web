<?php

class Category extends Illuminate\Database\Eloquent\Model {
	protected $table = 'categories';
	public $timestamps = false;

	public function foods(){
        return $this->hasMany('Food','category_id','category_id');
    } 
}