export class LoginComponent {
    constructor(authService, renderHandler, templateFunction, router){
        this.authService = authService;
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.router = router; 
        this.loginHandler = this._loginHandler.bind(this); // _logoutHandler bind to use all 'this' services in constructor!
        this.showView = this._showView.bind(this); // _showView bind to use all 'this' services
    }


    async _showView(){
        let template = this.templateFunction(this.loginHandler);
        this.renderHandler(template);
    }

    async _loginHandler(e){
        e.preventDefault();
        console.log('test');
        // await this.authService.logout();
        // this.router.navigate('/')
    }
}
