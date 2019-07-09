function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('jobs', {
            url: '/jobs',
            templateUrl: 'app/list/list.html',
            controller: 'JobListController',
            controllerAs: 'list'
        })
        .state('detail', {
            url: '/jobs/:id',
            templateUrl: 'app/detail/detail.html',
            controller: 'JobDetailController',
            controllerAs: 'detail',
            resolve: {
                job: function (SearchService, $stateParams, $q, $location) {
                    let deferred = $q.defer();

                    SearchService.loadJobData($stateParams.id, function (job) {
                        // Unset details
                        SearchService.currentDetailData = null;
                        // Set details
                        SearchService.currentDetailData = job;
                        deferred.resolve(job);
                    }, function () {
                        $location.path('/jobs');
                    });

                    return deferred.promise;
                }
            }
        })
        .state('employeur', {
            url: '/employeur',
            templateUrl: 'app/pages/employeur.html'
        })
        .state('candidat', {
            url: '/candidat',
            templateUrl: 'app/pages/candidat.html'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'app/pages/contact.html'
        })
        .state('programme', {
            url: '/programme',
            templateUrl: 'app/pages/programme.html'
        })
        .state('employeurDisponible', {
            url: '/emplois',
            templateUrl: 'app/list/list.html',
            controller: 'JobListController',
            controllerAs: 'list'
        });

    $urlRouterProvider.otherwise('/jobs');
}

export default routerConfig;
