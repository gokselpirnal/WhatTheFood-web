<?php

class Category extends Illuminate\Database\Eloquent\Model {
	protected $table = 'categories';
	protected $primaryKey = 'category_id';
	public $timestamps = false;

	public function foods(){
        return $this->hasMany('Food','category_id','category_id');
    } 
}