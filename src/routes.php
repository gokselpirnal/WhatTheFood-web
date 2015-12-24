<?php
// Routes

header('Content-Type: application/json; charset=utf-8');

$UserToken = function ($request, $response, $next) {
	
	if(!isset($request->getHeader('token')[0])){
		$response->write('{"message":"Yetkisiz erişim"}');
		return $response->withHeader('Content-type', 'application/json')->withStatus(401);
	}else{
		$token = Token::where('token','=',$request->getHeader('token')[0])->get()->first();
		if(!$token){
			$response->write('{"message":"Yetkisiz erişim"}');
			return $response->withHeader('Content-type', 'application/json')->withStatus(401);
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
	$response->getBody()->write("please read api documantation")->withStatus(200);
	return $response;
});

$app->post('/login',function($request, $response, $args){
	$email = $request->getParsedBody()["email"];
	$password = md5($request->getParsedBody()["password"]);
	
	$user = User::whereRaw('email = ? and password = ?',array($email,$password))->get();

	
	if ($user->isEmpty()){
		$response->write('{"message":"Hatalı kullanıcı adı veya parola"}')->withStatus(204);
		return $response;
	}
	$user = $user->first();
	
	$token = Token::where('user_id',$user->user_id)->get()->first();
	$token->token = createToken();
	$token->create_date = date("YmdHi");
	$token->save();

	$user["token"] = $token;
	$user->password = null;
	
	$response->write(json_encode($user));
	return $response->withHeader('Content-type', 'application/json')->withStatus(200);
});

$app->post('/register',function($request, $response, $args){
	$newUser = new User;

	$email = $request->getParsedBody()["email"];
	$password = $request->getParsedBody()["password"];
	
	if(!isset($email) && !isset($password)){
		$response->write('{"message":"email ve password bilgisi zorunludur"}');
		return $response->withHeader('Content-type', 'application/json')->withStatus(203);
	}
	
	$newUser->email = $request->getParsedBody()["email"];
	$newUser->password = md5($request->getParsedBody()["password"]);
	$newUser->create_date = date("YmdHi");;
	$newUser->last_update_date = date("YmdHi");
	
	try{
		$newUser->save();
		$response->getBody()->write(json_encode($newUser));
	}catch (Illuminate\Database\QueryException $e){
		$errorCode = $e->errorInfo[1];
		// column unique
		if($errorCode == 1062){
			$response->getBody()->write('{"message":"Email adresi kullanılıyor !"}');
			return $response->withHeader('Content-type', 'application/json')->withStatus(205);
		}
		$response->getBody()->write('{"message":"Kayıt esnasında bir hata oluştu !"}')->withStatus(500);
	}
	
	return $response->withHeader('Content-type', 'application/json')->withStatus(201);
});


$app->group('/user', function () {

	// id'den user profili
	$this->get('/{id:[0-9]+}/profile', function ($request, $response, $args) {
        $profile = Profile::where('user_id','=',$args['id'])->get()->first();
		return $response->withStatus(200)->getBody()->write(json_encode($profile));
    })->setName('user_profile');
	
	// id'den yemekler
	$this->get('/{id:[0-9]+}/foods/{page:[0-9]+}', function ($request, $response, $args) {
        $foods = Food::find($args['id'])->select('food_id','name','description')->take(6)->offset($args['page']*6)->orderBy('food_id','DESC')->get();
		return $response->withStatus(200)->getBody()->write(json_encode($foods));
    })->setName('user_foods');
	
})->add($UserToken);


$app->group('/food', function () {
	
	// arama
	$this->get('/search', function ($request, $response, $args) {
		// domates* tavuk* malzeme* şeklinde olacak
        $foods = Food::hydrateRaw("
			SELECT *, ( LENGTH( `materials` ) - LENGTH( REPLACE( `materials`, '\n', '' ) ) + 1 ) as materials_count, 
			MATCH(`materials`) AGAINST(? IN BOOLEAN MODE) AS relevance 
			FROM `foods` 
			WHERE MATCH(`materials`) AGAINST(? IN BOOLEAN MODE) 
			ORDER BY relevance/( LENGTH( `materials` ) - LENGTH( REPLACE( `materials`, '\n', '' ) ) + 1 ) DESC LIMIT 0,50",array($searchedItems,$searchedItems));
		$response->getBody()->write(json_encode($foods));
		return $response;
    })->setName('search_foods');
	
	// sayfalı son yemekler 
	$this->get('/all/{page:[0-9]+}', function ($request, $response, $args) {
        $food = Food::select('food_id','name','description')->take(6)->offset($args['page']*6)->orderBy('food_id','DESC')->get();
		return $response->withStatus(200)->write(json_encode($food));
    })->setName('foods');
	
	// sayfalı son yemekler 
	$this->get('/popular/{page:[0-9]+}', function ($request, $response, $args) {
        $food = Food::take(10)->offset($args['page']*10)->orderBy('displayed','DESC')->get();
		return $response->withStatus(200)->write(json_encode($food));
    })->setName('foods');

	// id'den yemek
	$this->get('/{id:[0-9]+}', function ($request, $response, $args) {
        $food = Food::where('food_id','=',$args['id'])->get()->first();
		$response->getBody()->write(json_encode($food));
		return $response->withStatus(200);
    })->setName('food');
	
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
		
		if($food->save()){
			return $response->withStatus(200)->getBody()->write(json_encode($food));
		}
		return $response->withStatus(304)->getBody()->write("ERR");
    })->setName('food');
	
	// yemek güncelle
	$this->put('/{id:[0-9]+}', function ($request, $response, $args) {
		$newFood = json_decode($request->getBody());
        $user = Token::where('token','=',$request->getHeader('token')[0])->get()->first()->user();
        $food = Food::find($args['id']);
		
		if($food->user_id != $user->user_id){
			return $response->withStatus(401)->write('{"message":"Yetkisiz erişim"}');
		}
		
		$food->name = $newFood->name;
		$food->materials = $newFood->materials;
		$food->description = $newFood->description;
		$food->last_update_date = date("YmdHi");
		
		if($food->save()){
			return $response->withStatus(200)->getBody()->write(json_encode($food));
		}
		return $response->withStatus(304)->getBody()->write("ERR");
    })->setName('food');
	
	// yemek sil
	$this->delete('/{id:[0-9]+}', function ($request, $response, $args) {
		$user = Token::where('token','=',$request->getHeader('token')[0])->get()->first()->user();
        $food = Food::find($args['id']);
		
		if($food->user_id != $user->user_id){
			return $response->withStatus(401)->write('{"message":"Yetkisiz erişim"}');
		}
		
		$food->deleted = true;
		if($food->save()){
			return $response->withStatus(200)->getBody()->write("OK");
		}
		return $response->withStatus(304)->getBody()->write("ERR");
    })->setName('food');
	
})->add($UserToken);
