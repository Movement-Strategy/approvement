var HomeController = RouteController.extend({
    template: 'defaultBody'
});

Router.map(function () {
    this.route('home', {
        path :  '/',
        controller :  HomeController
    });
});
