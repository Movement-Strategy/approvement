Router.configure({
    layoutTemplate: 'basicLayout',
    notFoundTemplate: 'notFound',
    yieldTemplates: {
        'mainNav': { to: 'header' },
        'defaultFooter': { to: 'footer' }
    }
});