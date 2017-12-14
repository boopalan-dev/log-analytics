'use strict';

angular.module('AnalyticsApp')

.controller('ChartCtrl', function($scope){
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
                }/*,
                x2Axis: {
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                        return d3.time.format('%b-%Y')(new Date(dx))
                    },
                    showMaxMin: false
                }*/,
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

        $scope.data = [
            {
                "key" : "Quantity" ,
                "bar": true,
                "values" : [[0,955],[1,434],[2,254],[3,270],[4,344],[5,793],[6,2135],[7,4184],[8,6656],[9,8815],[10,8763],[11,8779],[12,8944],[13,7992],[14,7604],[15,7210],[16,7494],[17,7640],[18,6936],[19,6306],[20,6009],[21,4985],[22,4062],[23,2205]]
            },
            {
                "key" : "Price" ,
                "values" : [[0,0.09],[1,0.11],[2,0.34],[3,0.15],[4,0.09],[5,0.10],[6,0.14],[7,0.16],[8,0.14],[9,0.13],[10,0.11],[11,0.09],[12,0.08],[13,0.08],[14,0.11],[15,0.12],[16,0.10],[17,0.08],[18,0.07],[19,0.07],[20,0.07],[21,0.07],[22,0.16],[23,0.20]]
            }
        ].map(function(series) {
                series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
                return series;
            });
    })
