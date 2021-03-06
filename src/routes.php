﻿<?php
// Routes

// user token kontrolü
$UserToken = function ($request, $response, $next) {
	
	if(!isset($request->getHeader('token')[0])){
		$response->write('{"msg":"Yetkisiz erişim"}');
		return $response->withHeader('Content-type', 'application/json');
	}else{
		$token = Token::where('token','=',$request->getHeader('token')[0])->get()->first();
		if(!$token){
			$response->write('{"msg":"Yetkisiz erişim"}');
			return $response->withHeader('Content-type', 'application/json');
		}
	}

    $response = $next($request, $response->withHeader('Content-type', 'application/json'));

    return $response->withHeader('Content-type', 'application/json');
};

function createToken($length = 32) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}


$app->get('/',function($request, $response, $args){
	$response->getBody()->write("please read api documantation");
	return $response;
});

$app->post('/login',function($request, $response, $args){
	$email = $request->getParsedBody()["email"];
	$password = md5($request->getParsedBody()["password"]);

	$user = User::whereRaw('email = ? and password = ?',array($email,$password))->get();

	
	if ($user->isEmpty()){
		return $response->withHeader('Content-type', 'application/json')->write('{"msg":"Hatalı kullanıcı adı veya parola"}');
	}
	$user = $user->first();

	if($user->deleted == 1){
		return $response->withHeader('Content-type', 'application/json')->write('{"msg":"Hesabınız engellendi !"}');
	}
	
	$token = Token::where('user_id',$user->user_id)->get();

	if($token->isEmpty()){
		$token = new Token;
		$token->user_id = $user->user_id;
	}else{
		$token = $token->first();
	}

	$token->token = createToken();
	$token->create_date = date("YmdHi");
	$token->save();

	$user["token"] = $token;
	$user->password = null;
	
	$response->write(json_encode($user).'     ');
	return $response->withHeader('Content-type', 'application/json');
});

$app->post('/register',function($request, $response, $args){
	$newUser = new User;

	$email = $request->getParsedBody()["email"];
	$password = $request->getParsedBody()["password"];
	
	if(!isset($email) && !isset($password)){
		return $response->write('{"msg":"email ve password bilgisi zorunludur"}')->withHeader('Content-type', 'application/json');
	}
	
	$newUser->email = $request->getParsedBody()["email"];
	$newUser->password = md5($request->getParsedBody()["password"]);
	$newUser->create_date = date("YmdHi");;
	$newUser->last_update_date = date("YmdHi");
	
	try{
		$newUser->save();
		$response->getBody()->write(json_encode($newUser).'     ');
	}catch (Illuminate\Database\QueryException $e){
		$errorCode = $e->errorInfo[1];
		// column unique
		if($errorCode == 1062){
			return $response->write('{"msg":"Email adresi kullanılıyor !"}')->withHeader('Content-type', 'application/json');
		}
		return $response->getBody()->write('{"msg":"Kayıt esnasında bir hata oluştu !"}');
	}
	
	return $response->withHeader('Content-type', 'application/json');
});


$app->group('/user', function () {

	// id'den user profili
	$this->get('/{id:[0-9]+}/profile', function ($request, $response, $args) {
        $profile = Profile::where('user_id','=',$args['id'])->where('deleted',0)->get()->first();
		return $response->getBody()->write(json_encode($profile).'     ');
    })->setName('user_profile');

    // id'den user profili
	$this->get('/profile', function ($request, $response, $args) {
		$token = Token::where("token",$request->getHeader('token')[0])->where('deleted',0)->get()->first();
        $profile = Profile::where('user_id','=',$token->user_id)->get()->first();
		return $response->getBody()->write(json_encode($profile).'     ');
    })->setName('user_profile');

    // profili güncelle
	$this->put('/profile', function ($request, $response, $args) {
		$token = Token::where("token",$request->getHeader('token')[0])->get()->first();
		$user = $token->user();
		$profile = $user->profile();

		$newProfile = json_decode($request->getBody());
		
		$profile->user_id = $user->user_id;
		$profile->firstname = $newProfile->firstname;
		$profile->lastname = $newProfile->lastname;
		$profile->about = $newProfile->about;
		$profile->birthdate = $newProfile->birthdate;
		$profile->last_update_date = date("YmdHi");

		try{
			$profile->save();
			return $response->getBody()->write(json_encode($profile).'     ');
		}catch (Illuminate\Database\QueryException $e){
			return $response->write('{"msg":"Profil güncellenemedi !"}');
		}
    })->setName('user_profile_update');
	
	// id'den yemekler
	$this->get('/{id:[0-9]+}/foods/{page:[0-9]+}', function ($request, $response, $args) {
        $foods = Food::where('user_id',$args['id'])->select('food_id','name','description')->take(6)->offset($args['page']*6)->orderBy('food_id','DESC')->get();
		return $response->getBody()->write(json_encode($foods).'     ');
    })->setName('user_foods');
	
})->add($UserToken);



$app->group('/category', function () {

	// tüm kategoriler
	$this->get('/all', function ($request, $response, $args) {
        $categories = Category::orderBy('name')->get();
		return $response->getBody()->write(json_encode($categories).'     ');
    })->setName('categories');
	
	// kategoriye ait yemekler
	$this->get('/{id:[0-9]+}/{page:[0-9]+}', function ($request, $response, $args) {
        $foods = Food::where('category_id',$args['id'])->select('food_id','name','description')->take(6)->offset($args['page']*6)->orderBy('food_id','DESC')->get();
		return $response->getBody()->write(json_encode($foods).'     ');
    })->setName('user_foods');
	
})->add($UserToken);


$app->group('/food', function () {
	
	// arama
	$this->post('/search', function ($request, $response, $args) {
		$searchData = json_decode($request->getBody());
		$cleanStr = preg_replace('/[ ]*,[ ]*/i',',',$searchData->search);
		$materials = explode(",", $cleanStr);

		$materials = array_filter($materials);

		if(count($materials) > 20){
			return $response->write('{"msg":"çok fazla malzeme bilgisi var"}');
		}

		foreach ($materials as $material) {
			$oldMaterial = Material::where('name',$material)->get();

			if(!$oldMaterial->isEmpty()){
				$oldMaterial = $oldMaterial->first();
				$oldMaterial->count += 1;
				$oldMaterial->last_update_date = date("YmdHi");

				$oldMaterial->save();
			}else{
				$newMaterial = new Material;
				$newMaterial->name = $material;
				$newMaterial->create_date = date("YmdHi");
				$newMaterial->last_update_date = date("YmdHi");

				$newMaterial->save();
			}

		}

		$sqlStr = "*".implode("* *",$materials)."*";

		// giri *domates* *tavuk* *malzeme* şeklindedir
		// saklı yordam kullanılmıştır
        $foods = Food::hydrateRaw("CALL searchRecipe(?)",array($sqlStr));
		
		
		return $response->write(json_encode($foods)."     ");
    })->setName('search_foods');
	
	// sayfalı son yemekler 
	$this->get('/all/{page:[0-9]+}', function ($request, $response, $args) {
        $food = Food::select('food_id','name','description')->where('deleted',0)->take(6)->offset($args['page']*6)->orderBy('food_id','DESC')->get();
        if($food)
			return $response->write(json_encode($food).'     ');
		return $response->write('{"msg": "ERR"}');
    })->setName('foods');
	
	// sayfalı son yemekler 
	$this->get('/popular/{page:[0-9]+}', function ($request, $response, $args) {
        $food = Food::take(6)->offset($args['page']*6)->orderBy('displayed','DESC')->get();
		return $response->write(json_encode($food).'     ');
    })->setName('popular_foods');

    
	// id'den yemek
	$this->get('/{id:[0-9]+}', function ($request, $response, $args) {
        $food = Food::where('food_id',$args['id'])->where('deleted',0)->get()->first();

        $food->displayed = $food->displayed + 1;
        $food->save();
		if($food){
			$food->user = $food->profile();
			return $response->write(json_encode($food).'     ');
		}
		return $response->write('{"msg": "ERR"}');
    })->setName('food_detail');

    // yemeğe yapılan yorumlar
	$this->get('/{id:[0-9]+}/comments/{page:[0-9]+}', function ($request, $response, $args) {
        $comments = Comment::where('food_id',$args['id'])->where('deleted',0)->take(10)->offset($args['page']*10)->orderBy('comment_id','DESC')->get();
		return $response->write(json_encode($comments).'     ');
    })->setName('food_comments');
	
	// yemek ekle
	$this->post('', function ($request, $response, $args) {
		$user = Token::where('token','=',$request->getHeader('token')[0])->get()->first()->user();
		$newFood = json_decode($request->getBody());
		
        $food = new Food;
		
		$food->user_id = $user->user_id;
		$food->category_id = $newFood->category_id;
		$food->name = $newFood->name;
		$food->materials = $newFood->materials;
		$food->description = $newFood->description;
		$food->create_date = date("YmdHi");
		$food->last_update_date = date("YmdHi");
		
		try{
			$food->save();
			return $response->write(json_encode($food).'     ');
		}catch (Illuminate\Database\QueryException $e){
			return $response->write('{"msg": "ERR"}');
		}

    })->setName('food_create');
	
	// yemek güncelle
	$this->put('/{id:[0-9]+}', function ($request, $response, $args) {
		$newFood = json_decode($request->getBody());
        $user = Token::where('token','=',$request->getHeader('token')[0])->get()->first()->user();
        $food = Food::find($args['id']);
		
		if($food->user_id != $user->user_id){
			return $response->write('{"msg":"Yetkisiz erişim"}');
		}
		
		$food->name = $newFood->name;
		$food->materials = $newFood->materials;
		$food->description = $newFood->description;
		$food->last_update_date = date("YmdHi");
		
		if($food->save()){
			return $response->getBody()->write(json_encode($food).'     ');
		}
		return $response->getBody()->write('{"msg": "ERR"}');
    })->setName('food_update');
	
	// yemek sil
	$this->delete('/{id:[0-9]+}', function ($request, $response, $args) {
		$user = Token::where('token','=',$request->getHeader('token')[0])->get()->first()->user();
        $food = Food::find($args['id']);
		
		if($food->user_id != $user->user_id){
			return $response->write('{"msg":"Yetkisiz erişim"}');
		}
		
		$food->deleted = true;
		if($food->save()){
			return $response->write('{"msg": "OK"}');
		}
		return $response->write('{"msg": "ERR"}');
    })->setName('food_delete');
	
})->add($UserToken);


$app->group('/comment', function () {
	
	// yorum ekle
	$this->post('', function ($request, $response, $args) {
		$user = Token::where('token','=',$request->getHeader('token')[0])->get()->first()->user();
		$newComment = json_decode($request->getBody());
		
        $comment = new Comment;
		
		$comment->user_id = $user->user_id;
		$comment->food_id = $newComment->food_id;
		$comment->comment = $newComment->comment;
		$comment->create_date = date("YmdHi");
		
		try{
			$comment->save();
			return $response->write(json_encode($comment).'     ');
		}catch (Illuminate\Database\QueryException $e){
			return $response->write('{"msg": "ERR"}');
		}

    })->setName('comment_create');
	
	
	// yorum sil
	$this->delete('/{id:[0-9]+}', function ($request, $response, $args) {
		$user = Token::where('token','=',$request->getHeader('token')[0])->get()->first()->user();
        $comment = Comment::find($args['id']);
		
		if($comment->user_id != $user->user_id || !$user->isAdmin){
			return $response->write('{"msg":"Yetkisiz erişim"}');
		}
		
		$comment->deleted = true;
		if($comment->save()){
			return $response->write('{"msg": "OK"}');
		}
		return $response->write('{"msg": "ERR"}');
    })->setName('comment_delete');
	
})->add($UserToken);