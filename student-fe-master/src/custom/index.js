import popup from './popup'
import plainhead from './plain-head'
import photopreview from './photo-preview'
import viewpreview from './view-preview';

const myPlug = {
	install: function(Vue){
		Vue.component('axc-popup',popup);
		Vue.component('axc-plain-head',plainhead);
		Vue.component('axc-photo-preview',photopreview);
		Vue.component('axc-view-preview',viewpreview);
	}
}

export default myPlug