'use strict';

angular.module('AnalyticsApp')

.factory('ChartDataService', ['$http', '$q', function($http, $q){

    var sufix='.json';

    return {
        
    getSpocPortValuation: function(date) {
        var url = './api/SpocPortValuation'+ sufix +'?requestDate='+date;
            var defered = $q.defer();
            $http.get(url).then(
                    function(response){
                        defered.resolve(response.data);
                    }, 
                    function(errResponse){
                        console.error('Error while fetching SpocPortValuation data');
                        defered.reject(errResponse);
                    }
            );

            return defered.promise;
        },
     
    getSpocPortView: function(date){

        var url = './api/SpocPortView'+ sufix +'?requestDate='+date;
            var defered = $q.defer();
            $http.get(url).then(
                    function(response){
                        defered.resolve(response.data);
                    }, 
                    function(errResponse){
                        console.error('Error while fetching SpocPortView data');
                        defered.reject(errResponse);
                    }
            );

            return defered.promise;

        }
         
    };
 
}]);
