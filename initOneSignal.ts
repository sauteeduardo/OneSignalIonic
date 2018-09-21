initOneSignal(){
	if (this.platform.is('cordova')) {
		this.oneSignal.startInit("<<chaveOneSignal>>", "<<id do google cloud(id cloud messaging)>>");
		this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
		this.oneSignal.handleNotificationReceived().subscribe((result) => {
		 // do something when notification is received
		});

		this.oneSignal.handleNotificationOpened().subscribe((result) => {
			if(result && result.notification){
				let notification = result.notification;
				if(notification.payload && notification.payload.additionalData){
					let data = notification.payload.additionalData;
					let modulo = data.modulo;
					let dados = data.dados;
					let pages, page;
					switch(modulo){
						case 'tela1':
							pages = [{"page": modulo}];
							page = <any>{"page": null};
							pages.push(page);
							this.nav.setPages(pages);
							break;
						case 'tela2':
							this.nav.setPages([
								{"page": modulo},
								{"page": "PostDetalhes", "params": {"post": dados}}
							]);
							break;
					}
				}
			}
		});
		this.oneSignal.endInit();
	}
}
