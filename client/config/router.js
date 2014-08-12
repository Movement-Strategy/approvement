Router.configure({
    layoutTemplate: 'basicLayout',
    notFoundTemplate: 'notFound',
    yieldTemplates: {
        'defaultHeader': { to: 'header' },
        'defaultFooter': { to: 'footer' }
    }
});