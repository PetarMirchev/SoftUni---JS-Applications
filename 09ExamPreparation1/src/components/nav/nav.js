export class NavComponent {
    constructor(authService, renderHandler, templateFunction, router){
        this.authService = authService;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.router = router; 
        this.logoutHandler = this._logoutHandler.bind(this); // _logoutHandler bind to use all 'this' services in constructor!
        this.showView = this._showView.bind(this); // _showView bind to use all 'this' services
    }


    async _showView(ctx, next){
        let isUserLoggedIn = this.authService.isUserLoggedIn();
        let template = this.templateFunction(isUserLoggedIn, this.logoutHandler);
        this.renderHandler(template);
        next();
    }

    async _logoutHandler(){
        await this.authService.logout();
        this.router.navigate('/')
    }
}

