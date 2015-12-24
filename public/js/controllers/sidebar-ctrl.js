/**
 * Created by Gox-PC on 14.12.2015.
 */


angular.module('wtf')
    .controller('SidebarCtrl', ['$scope', '$cookies', function ($scope, $cookies) {
        $scope.menus = [
            {"name": "Yemek Ara", "href": "#/search", "icon": "fa-home"},
            {"name": "Yemek Ekle", "href": "#/new-food", "icon": "fa-pencil"},
            {"name": "Kullanıcı Yönetimi", "href": "#/users", "icon": "fa-users"},
            {"name": "Kategori Yönetimi", "href": "#/categories", "icon": "fa-folder-open"}
        ];
    }]);