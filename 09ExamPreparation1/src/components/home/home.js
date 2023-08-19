export class HomeComponent {
    constructor(renderHandler, templateFunction){
        this.renderHandler = renderHandler;
        this.templateFunction = templateFunction;
        this.showView = this._showView.bind(this); // _showView bind to use all 'this' services
    }


    async _showView(){
        let template = this.templateFunction();
        this.renderHandler(template);
    }

}

