describe('BWMonApp UsageByYear feature', function() {
	var scope,
		compile,
		controller,
		chartOptions = {
			series: [{
				type: 'type'
			}]
		},
		chartService,
		data = {id: 11},
		dataService;

	beforeEach(module('BWMonApp.DataService'));
	beforeEach(module('BWMonApp.ChartService'));
	beforeEach(module('BWMonApp.UsageByYear'));
	beforeEach(module('BWMonApp.Filters'));

	beforeEach(inject(function(_$compile_, $rootScope, _$controller_, _dataService_, _chartService_){
		compile = _$compile_;
		scope = $rootScope.$new();

		dataService = _dataService_;
		spyOn(dataService, 'getUsageByYear').and.returnValue({data: data, chartData: {1: data}});

		chartService = _chartService_;
		spyOn(chartService, 'getChartOptions').and.returnValue(chartOptions);

		controller = _$controller_('UsageByYearController', {
			$scope: scope,
			dataService: dataService,
			chartService: chartService
		});
	}));

	it('should map UsageByYear route', inject(function($route){
		var route = $route.routes['/UsageByYear'];
		expect(route.controller).toBe('UsageByYearController');
		expect(route.controllerAs).toBe('usageByYearCtrl');
		expect(route.templateUrl).toBe('usagebyyear/usageByYear.tpl.html');
	}));

	it('should update data with getUsageByYear', function() {
		expect(controller.data).toEqual(data);
		expect(dataService.getUsageByYear).toHaveBeenCalled();
	});

	it('should update chart data with getUsageByYear', function() {
		expect(controller.chartData).toEqual({1:data});
	});

	it('should update chart options with chart options from ChartService', function() {
		expect(controller.chartOptions).toEqual(chartOptions);
		expect(chartService.getChartOptions).toHaveBeenCalledWith(controller.chartData, chartService.getYearLabel, chartService.getYearLabel);
	});

	it('should change chart type in chart options', function() {
		controller.selected.chartType = 'test';
		scope.$digest();
		expect(controller.chartOptions.series[0].type).toEqual(controller.selected.chartType);
	});

	it('should have yearTable template', function() {
		var template = '<div><year-table></year-table></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<table');
		expect(element.html()).toContain('</table>');
	});

	it('should have yearHeader template', function() {
		var template = '<div><year-header></year-header></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<year-header>');
		expect(element.html()).toContain('</year-header>');
	});

	it('should have yearBody template', function() {
		var template = '<div><year-body></year-body></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<year-body class="ng-binding">');
		expect(element.html()).toContain('</year-body>');
	});

	it('should have yearChartForm template', function() {
		var template = '<div><year-chart-form></year-chart-form></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<chart-type');
		expect(element.html()).toContain('</chart-type>');
	});

	it('should have yearChart template', function() {
		var template = '<div><year-chart></year-chart></div>',
			element = compile(template)(scope);
		scope.displayType = true;
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toEqual('<div><linechart id="chartData" data="usageByYearCtrl.chartData" options="usageByYearCtrl.chartOptions"></linechart></div>');
	});

});
