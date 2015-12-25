-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 25 Ara 2015, 19:24:42
-- Sunucu sürümü: 5.6.17
-- PHP Sürümü: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Veritabanı: `wtf_db`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `upper_category_id` int(11) DEFAULT NULL,
  `create_date` varchar(12) COLLATE utf8_turkish_ci NOT NULL,
  `last_update_date` varchar(12) COLLATE utf8_turkish_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`category_id`),
  KEY `upper_category_id` (`upper_category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci AUTO_INCREMENT=4 ;

--
-- Tablo döküm verisi `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `upper_category_id`, `create_date`, `last_update_date`, `deleted`) VALUES
(1, 'Tatlı', NULL, '201512240704', '201512240704', 0),
(2, 'Makarna', NULL, '201512240704', '201512240704', 0),
(3, 'Kızartma', NULL, '201512251920', '201512251920', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `comment` varchar(1000) COLLATE utf8_turkish_ci NOT NULL,
  `create_date` varchar(12) COLLATE utf8_turkish_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `food_id` (`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `foods`
--

CREATE TABLE IF NOT EXISTS `foods` (
  `food_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `materials` text COLLATE utf8_turkish_ci NOT NULL,
  `description` text COLLATE utf8_turkish_ci NOT NULL,
  `displayed` int(11) NOT NULL,
  `create_date` varchar(12) COLLATE utf8_turkish_ci NOT NULL,
  `last_update_date` varchar(12) COLLATE utf8_turkish_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`food_id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  FULLTEXT KEY `materials` (`materials`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci AUTO_INCREMENT=14 ;

--
-- Tablo döküm verisi `foods`
--

INSERT INTO `foods` (`food_id`, `user_id`, `category_id`, `name`, `materials`, `description`, `displayed`, `create_date`, `last_update_date`, `deleted`) VALUES
(2, 1, 2, 'Fırında Kolay Tavuk Sote', '2 adet iri tavuk göğsü\r\n2 adet biber\r\n2 adet havuç\r\n3 adet büyük boy domates\r\n2 adet orta boy patates\r\n10 adet arpacık soğan yoksa\r\n1 adet büyük boy soğan\r\n1, 5 çay bardağı sıvı yağ\r\n1 tatlı kaşığı tepeleme biber salçası\r\nBen(ev yapımı kullandım) ölçüyü kendinize göre ayarlayın\r\nTuz, karabiber, pul biber\r\n2 adet fırın torbası', 'Öncelikle malzemelerimizi çok küçük olmayacak şekilde doğramamız gerekli fırında erimesin. Şimdi başlayabiliriz .Tavuklarımızı temizleyip güzelce yıkayalım .Karıştırma kabına küp şeklinde doğrayalım .Havuçlarımızı soyalım .Yuvarlak şekilde doğrayalım .Biberlerimizi yuvarlak şekilde doğrayalım. Patateslerimizi küp şeklinde doğrayalım .Soğanımızı büyük boy küp şeklinde doğrayalım .Domateslerimizi iri küp şeklinde doğrayalım .Suyunu da kabımıza katalım .Sıvı yağ, tuz, salça ve baharatlarımızı ilave edip güzelce karıştıralım .Yemeğimizi 2 adet fırın torbasına bölelim .Rahat pişsin .Yalnız böldüğümüz için torbadaki yağ oranımızı kontrol edelim .Az gözüküyorsa biraz ilave edelim .Torbamızı kapandıktan sonra torbanın üzerine kürdanla delikler açalım (sadece üzerine yoksa yemeğin suyu akar)160 derece fırında orta gözde 30 dk tepsinin on tarafını 30 dk sonra ters çevirip tepsinin arka tarafının pişmesini sağlayalım.\nNot:benim fırınımda bu sürede pişiyor .Siz kontrollü pişirin.Deneyeceklere şimdiden afiyet olsun.', 0, '201512240645', '201512240647', 0),
(3, 1, 2, 'Sosa Yatırılmış Fırında Tavuk', '2 parça tavuk göğsü\r\n1 orta boy soğan\r\n2 adet patates\r\n1 adet domates\r\n2 3 diş sarımsak\r\n1 adet yeşil biber\r\n2 yemek kaşığı domates salçası\r\n7- 8 yemek kaşığı sıvı yağı (gözünüze az gelirse biraz daha ekleyebilirsiniz )\r\nTuz\r\nKekik ,kimyon, karabiber, nane, pul biber', 'Tavukları kuşbaşı doğrayın ve üzerine 1 soğanı rendeleyin. Sırayla salça sıvı yağı rendelenmiş sarımsak damak tadınıza göre tuz ve baharatları ekleyin iyice birbirine harmanlayın ve 20 dk bekletin. Daha sonra bir borcamın altına tavukları yayın. Üzerine elma dilimi şeklinde patatesleri dilimleyin daha sonra domates ve biberi sıralayın önceden ısıtılmış 190 derece fırında pişirin. Afiyet olsun.', 3, '201512240415', '201512240415', 0),
(5, 1, 2, 'Beşamel Soslu Tavuk', '1 paket tavuk göğsü\r\n1 kavanoz garnitür\r\n1 adet soğan\r\n2-3 adet yeşil biber\r\n1 adet kapya biber\r\n1 adet domates\r\n1 yemek kaşığı domates salçası\r\nTuz\r\nKarabiber\r\nTercihe göre kırmızı pul veya toz biber\r\n2 yemek kaşığı tereyağ\r\n1 yemek kaşığı sıvı yağ\r\n1, 5 yemek kaşığı un\r\n2 su bardağı süt\r\nKaşar peyniri rendesi', 'Tavaya 5-6 yemek kaşığı sıvı yağ koyalım daha sonra yarım daire şeklinde doğradığımız soğanlarımızı içine ilave ederek kavuralım. Ardından doğradığımız biberleri de ekleyelim. Biraz kavurduktan sonra kuşbaşı şeklinde doğradığımız tavuk göğsünü de ilave edelim ve tavuklar suyunu bırakıp çekene kadar kavuralım. Ardından domates, domates salçası (Biraz sulandırabilirsiniz), tuz ve baharatları da kattıktan sonra 5 dk daha kavuralım. Diğer yandan ufak tenceremizde beşamel sosumuzu hazırlamak üzere 2 kaşık tereyağı, 1 kaşık sıvı yağı eritelim ve unu da ekledikten sonra topaklanmaması için karıştırarak harmanlayalım. Ardından sütümüzü ekleyip harcımız koyulaşana kadar çırpma teliyle karıştıralım. En son koyulaşan harcımıza karabiber ve tuzu da ekleyip bir kere karıştırdıktan sonra ateşten alalım. Bor camın içine önce tavuklu harcımızı yayalım üzerine garnitürümüzü ekleyelim. En son olarak beşamel sosumuzu da yaydıktan sonra üzerine kaşar rendesi serpelim ve 180 derecelik fırında üzeri kızarana kadar pişmeye bırakalım.\nAfiyet olsun inşAllah.', 3, '201512240645', '201512240645', 1),
(6, 1, 1, 'Ekler Pasta', '2 paket kedidili bisküvisi\n1 paket muzlu puding\n1 paket krem şanti\nYarım paket çikolata sosu\n1 litre süt', 'İlk önce bir tencereye muzlu pudingi sütle beraber pişiriyoruz ,soğuduktan sonrada krem şantiyle iyice karıştırıyoruz ,bunu beklemeye alıyoruz ,daha sonra bisküvileri sütle ıslatın arasına pudingi kaşık yardımı ile koyuyoruz ve diğer bisküviyi de üzerine kapatıyoruz ,en üste hazırlamış olduğumuz çikolata sosunu sürüyoruz, Hindistan cevizi yada toz fıstıkla süsleyebilirsiniz.', 2, '201512220415', '201512240645', 0),
(7, 1, 2, 'Kuru Fasulye', '250 gram (1, 5 su bardağı)fasulye\n1 büyük soğan\n1 yemek kaşığı salça\n1 biber\n1 kase kuşbaşı dana eti veya kuzu eti\n5 bardak kaynamış su\nSıvı yağ\nTuz, toz biber', 'Akşamdan ıslattığımız fasulyeleri güzelce yıkıyoruz. Düdüklü tencereye sıvı yağ ekleyip sıvı yağ kızdı mı diye anlamak için bir ufak et atıp cız diye ses çıkardı mı etleri atıp rengini değiştirene kadar kavuruyoruz. Sonra küçük küçük doğradığımız soğanı ve biberi salçayı içine atıp bir dk daha kavuruyoruz. Sonra fasulyeleri atıp baharatları ve suyu ekleyip kapağını kapatıyoruz. (Eğer akşamda ıslatmadıysanız gündüzüne 1 saat ıslatabilirsiniz. 1 saat 10 dk da düdüklüde pişen süresi) Düdüklüde ses çıkana kadar 5 dk harlı kaynatıyoruz. Sonra kısıyoruz ve 35-40 dk kısıkta ocağın en küçük bölümünde kaynatıyoruz. Afiyet olsun.', 3, '201512240916', '201512240916', 0),
(8, 1, 2, 'Kahvaltılık Krep Tarifi', '2 adet yumurta\r\n2 su bardağından biraz az un\r\n1 su bardağı su\r\n1 su bardağı süt\r\n1 çay kaşığı tuz\r\npişirmek için margarin veya sıvı yağ', 'Kahvaltılık krep hazırlamak un, süt ve su ile hiç topak kalmayana kadar iyice çırpın. Yumurtaları ekleyin biraz daha çırpın. Kek hamurundan daha akıcı bir kıvamda hamur edin.  Teflon tavaya 1 çay kaşığı kadar margarin veya sıvı yağ koyup kızdırın. Tavaya 1 kepçe krep hamuru dökerek yayın. Her iki tarafını çevirerek orta ateşte pişirin. İyi bir krep yapmak karışımdan çok el becerisi ister. Biraz pratik yapmanız gerekecektir ;) Bu arada hamura tuz koymazsanız reçel veya çikolata sürerek de tüketebilirsiniz. Tuzlu sevenlere ise önerim içine peynir sarılmasıdır. Kahvaltılık krep tarifini deneyecek herkese afiyet olsun :)', 3, '201512240916', '201512240916', 0),
(9, 1, 2, 'Kahvaltılık Krep Tarifi', '2 adet yumurta\r\n2 su bardağından biraz az un\r\n1 su bardağı su\r\n1 su bardağı süt\r\n1 çay kaşığı tuz\r\npişirmek için margarin veya sıvı yağ', 'Kahvaltılık krep hazırlamak un, süt ve su ile hiç topak kalmayana kadar iyice çırpın. Yumurtaları ekleyin biraz daha çırpın. Kek hamurundan daha akıcı bir kıvamda hamur edin.  Teflon tavaya 1 çay kaşığı kadar margarin veya sıvı yağ koyup kızdırın. Tavaya 1 kepçe krep hamuru dökerek yayın. Her iki tarafını çevirerek orta ateşte pişirin. İyi bir krep yapmak karışımdan çok el becerisi ister. Biraz pratik yapmanız gerekecektir ;) Bu arada hamura tuz koymazsanız reçel veya çikolata sürerek de tüketebilirsiniz. Tuzlu sevenlere ise önerim içine peynir sarılmasıdır. Kahvaltılık krep tarifini deneyecek herkese afiyet olsun :)', 3, '201512240916', '201512240916', 0),
(10, 1, 2, 'Kahvaltılık Krep Tarifi', '2 adet yumurta\n2 su bardağından biraz az un\n1 su bardağı su\n1 su bardağı süt\n1 çay kaşığı tuz\npişirmek için margarin veya sıvı yağ', 'Kahvaltılık krep hazırlamak un, süt ve su ile hiç topak kalmayana kadar iyice çırpın. Yumurtaları ekleyin biraz daha çırpın. Kek hamurundan daha akıcı bir kıvamda hamur edin.  Teflon tavaya 1 çay kaşığı kadar margarin veya sıvı yağ koyup kızdırın. Tavaya 1 kepçe krep hamuru dökerek yayın. Her iki tarafını çevirerek orta ateşte pişirin. İyi bir krep yapmak karışımdan çok el becerisi ister. Biraz pratik yapmanız gerekecektir ;) Bu arada hamura tuz koymazsanız reçel veya çikolata sürerek de tüketebilirsiniz. Tuzlu sevenlere ise önerim içine peynir sarılmasıdır. Kahvaltılık krep tarifini deneyecek herkese afiyet olsun :)', 9, '201512240917', '201512240917', 0),
(11, 1, 1, 'Kalbura bastı', 'kalbur\nayak', 'ayak ile kalbura basınız', 32, '201512250048', '201512250048', 0),
(12, 3, 2, 'Tolgadan Makarda', 'Makarna\ndomates\nbiber\nkaşar\ntuz', 'makarnayı iyice kaynatmaya başlıyoruz bu sırada tavamızda domates ve bieri kavuruyoruz makarnamız kaynadıktan sonra dinlendirin ve sosumuzu üstüne döküp üzerine kaşar rendeleyin afiyet olsun :)', 21, '201512250626', '201512250626', 0),
(13, 1, 3, 'Kaşarlı Ton Balıklı Schnitzel Köfte', '1 büyük kutu ton balık\n2 tane orta büyüklükte patates\n1 yumurta\n1 ufak kase kaşar peyniri rendesi\n1 çay kaşığı tuz\nKarabiber\n2 yumurta\n2 yemek kaşığı un\n1 kase galeta unu', 'Patatesler yumuşayana kadar haşlanır.\nHaşlandıktan sonra bir kaba alınır .Çatal veya ezici ile güzelce ezilir.\n1 kutu ton balığı ve 1 yumurta konulur güzelce karıştırılır.\nKaşar peyniri rendesi, kıyılmış maydanoz, tuz ve karabiber eklenir iyice karıştırılıp elle yoğurulur.\nİstenirse hemen de yapılabilir ama vakit varsa dolapta 15-20 dakika dinlendirilir.\nUfak mandalina büyüklüğünde parça koparılıp yuvarlanır ve avuç içinde yassı hale getirilir.\nÖnce una sonra çırpılmış yumurtaya en son galeta ununa bulanıp kızgın yağda orta ateşte kızartılır.\nServis tabağına alınır.\nAfiyet Olsun', 3, '201512251925', '201512251925', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `materials`
--

CREATE TABLE IF NOT EXISTS `materials` (
  `material_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `count` int(11) NOT NULL,
  `create_date` varchar(12) COLLATE utf8_turkish_ci NOT NULL,
  `last_update_date` varchar(12) COLLATE utf8_turkish_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`material_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `photos`
--

CREATE TABLE IF NOT EXISTS `photos` (
  `photos_id` int(11) NOT NULL AUTO_INCREMENT,
  `food_id` int(11) NOT NULL,
  `photo_path` varchar(500) COLLATE utf8_turkish_ci NOT NULL,
  `create_date` varchar(12) COLLATE utf8_turkish_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`photos_id`),
  KEY `food_id` (`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `profiles`
--

CREATE TABLE IF NOT EXISTS `profiles` (
  `user_id` int(11) NOT NULL,
  `firstname` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `lastname` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `about` varchar(2000) COLLATE utf8_turkish_ci DEFAULT NULL,
  `birthdate` varchar(8) COLLATE utf8_turkish_ci DEFAULT NULL,
  `photo_path` varchar(200) COLLATE utf8_turkish_ci DEFAULT NULL,
  `create_date` varchar(12) COLLATE utf8_turkish_ci NOT NULL,
  `last_update_date` varchar(12) COLLATE utf8_turkish_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `profiles`
--

INSERT INTO `profiles` (`user_id`, `firstname`, `lastname`, `about`, `birthdate`, `photo_path`, `create_date`, `last_update_date`, `deleted`) VALUES
(1, 'Göksel', 'Pırnal', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."', '19950424', '/no-pic.jpg', '201512220608', '201512251959', 0),
(3, 'Tolga', 'Kuyucuk', 'Tavukları pişirin hacıyı çarşıya gönderin', '19940101', NULL, '201512250746', '201512250829', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tokens`
--

CREATE TABLE IF NOT EXISTS `tokens` (
  `user_id` int(11) NOT NULL,
  `token` varchar(32) COLLATE utf8_turkish_ci NOT NULL,
  `create_date` varchar(12) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `tokens`
--

INSERT INTO `tokens` (`user_id`, `token`, `create_date`) VALUES
(1, 'GSlKCnKidSt6HgwLNQlmIuVvbwIhqNHg', '201512252005'),
(3, 'Yd18xybAriquxpjy8mY078YzNbqt1tTp', '201512250624');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `password` varchar(32) COLLATE utf8_turkish_ci NOT NULL,
  `status` enum('passive','active','banned','') COLLATE utf8_turkish_ci NOT NULL DEFAULT 'active',
  `create_date` varchar(12) COLLATE utf8_turkish_ci NOT NULL,
  `last_update_date` varchar(12) COLLATE utf8_turkish_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci AUTO_INCREMENT=8 ;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `status`, `create_date`, `last_update_date`, `deleted`) VALUES
(1, 'gokselpirnal@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'active', '201512220413', '201512220413', 0),
(2, 'doganderya59@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'active', '201512220415', '201512220415', 0),
(3, 'tolgakuyucuk@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'active', '201512250607', '201512250607', 0),
(7, 'gokselpirnal2@gmail.com.', 'd41d8cd98f00b204e9800998ecf8427e', 'active', '201512250609', '201512250609', 0);

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`upper_category_id`) REFERENCES `categories` (`category_id`);

--
-- Tablo kısıtlamaları `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `foods` (`food_id`);

--
-- Tablo kısıtlamaları `foods`
--
ALTER TABLE `foods`
  ADD CONSTRAINT `foods_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `foods_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Tablo kısıtlamaları `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `foods` (`food_id`);

--
-- Tablo kısıtlamaları `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Tablo kısıtlamaları `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
