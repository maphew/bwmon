/*
 *    Copyright (C) 2010 - 2015 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
angular.module('BWMonApp.UsageByYear', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider.when('/UsageByYear', {
		templateUrl: 'usagebyyear/usageByYear.tpl.html',
		controller: 'UsageByYearController',
		controllerAs: 'usageByYearCtrl'
	});
})
.controller('UsageByYearController', function($scope, dataService, chartService) {
	var ctrl = this;
	var usageData = dataService.getUsageByYear();

	ctrl.predicate = 'id';
	ctrl.descending = true;
	ctrl.setOrder = function(predicate) {
		ctrl.descending = (ctrl.predicate === predicate) ? !ctrl.descending : true;
		ctrl.predicate = predicate;
	};
	ctrl.getOrder = function(predicate) {
		return ctrl.predicate === predicate ? (ctrl.descending ? {desc:true} : {asc: true}): {};
	};

	ctrl.selected = {};
	ctrl.data = usageData.data;
	ctrl.chartData = usageData.chartData;
	ctrl.chartOptions = chartService.getChartOptions(ctrl.chartData, chartService.getYearLabel, chartService.getYearLabel);

	$scope.$watch('usageByYearCtrl.selected.chartType', function() {
		ctrl.chartOptions.series[0].type = ctrl.selected.chartType;
	}, true);
})
;
