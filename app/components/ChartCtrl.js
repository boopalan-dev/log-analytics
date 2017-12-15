'use strict';

angular.module('AnalyticsApp')

.controller('ChartCtrl', function($scope, ChartDataService){
        $scope.options = {
            chart: {
                type: 'linePlusBarChart',
                height: 500,
                margin: {
                    top: 30,
                    right: 75,
                    bottom: 50,
                    left: 75
                },
                bars: {
                    forceY: [0]
                },
                color: ['#2ca02c', 'darkred'],
                x: function(d,i) { return i },
                xAxis: {
                    axisLabel: 'Hours in a Day',
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                        if (dx > 0) {
                            return dx ;//d3.time.format('%x')(new Date(dx))
                        }
                        return null;
                    }
                },
                x2Axis: {
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                        return d3.time.format('%b-%Y')(new Date(dx))
                    },
                    showMaxMin: false
                },
                y1Axis: {
                    axisLabel: 'Number of Request',
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    },
                    axisLabelDistance: 12
                },
                y2Axis: {
                    axisLabel: 'Average Timing in Seconds',
                    tickFormat: function(d) {
                        return d3.format(',.2f')(d) + 's'
                    }
                },
                focusEnable:false
            }
        };

        $scope.requestOptions = [{id: '1', name: 'All'}, {id: '2', name: 'SpocPortValuation'}, {id: '3', name: 'SpocPortView'}];
        $scope.requestOptionSelected = '1';
        $scope.logDate = "";

        function getAxisdata(d){

           var barData = [];
            var lineData = [];

            for(var i=0; i<d.length; i++) {
                barData.push({
                    x:parseFloat(d[i]["hourId"]),
                    y:parseFloat(d[i]["count"])
                })

                 lineData.push({
                    x:parseFloat(d[i]["hourId"]),
                    y:parseFloat(d[i]["average"])
                })

            }

            return {
                bar:barData,
                line:lineData
            }
        }

        function populateChart(ctData){

            $scope.data = [
                    {
                        "key" : "Count" ,
                        "bar": true,
                        "values" : ctData.bar
                    },
                    {
                        "key" : "Average Time" ,
                        "values" : ctData.line
                    }
                ];
        }

        function getAverageOfRequest(d1, d2) {

            var barData = [];
            var lineData = [];

            for(var i=0; i<d1.length; i++) {

                var count = (parseFloat(d1[i]['count']) + parseFloat(d2[i]['count']));
                var average = (parseFloat(d1[i]['average']) + parseFloat(d2[i]['average']));

                 barData.push({
                    x:parseFloat(d1[i]['hourId']),
                    y:count
                })

                 lineData.push({
                    x:parseFloat(d1[i]['hourId']),
                    y:average
                })
            }

            return {
                bar:barData,
                line:lineData
            }

        }


        function transforData(portValueData, portViewData){
            if($scope.requestOptionSelected == '2') {
                var d = getAxisdata(portValueData.analyticsData);
                populateChart(d);
            } else if($scope.requestOptionSelected == '3') {
                var c = getAxisdata(portViewData.analyticsData);
                populateChart(c);
            } else {
                var b = getAverageOfRequest(portValueData.analyticsData, portViewData.analyticsData)
                    populateChart(b);
            }           

        }

         $scope.getData = function(){
            var date = $scope.logDate;

            ChartDataService.getSpocPortValuation(date).then(function(data1){
                ChartDataService.getSpocPortView(date).then(function(data2){
                    console.log(data1);
                    console.log(data2);
                    transforData(data1, data2);
                });

            },function(){
                console.log(error);
            });
        }
    });
