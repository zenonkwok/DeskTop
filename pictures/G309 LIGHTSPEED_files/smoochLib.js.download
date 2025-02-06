import {smoochConfig} from '../config/smoochConfig.js';
/**
 * smooch library
 * integrationId value is required
 */

/*! function(o, p, s, e, c) {
	var i, a, h, u = [],
		d = [];

	function t() {
		var t = "You must provide a supported major version.";
		try {
			if (!c) throw new Error(t);
			var e, n = "https://cdn.smooch.io/",
				r = "smooch";
			if ((e = "string" == typeof this.response ? JSON.parse(this.response) : this.response).url) {
				var o = p.getElementsByTagName("script")[0],
					s = p.createElement("script");
				s.async = !0;
				var i = c.match(/([0-9]+)\.?([0-9]+)?\.?([0-9]+)?/),
					a = i && i[1];
				if (i && i[3]) s.src = n + r + "." + c + ".min.js";
				else {
					if (!(4 <= a && e["v" + a])) throw new Error(t);
					s.src = e["v" + a]
				}
				o.parentNode.insertBefore(s, o)
			}
		} catch (e) {
			e.message === t && console.error(e)
		}
	}
	o[s] = {
		init: function() {
			i = arguments;
			var t = {
				then: function(e) {
					return d.push({
						type: "t",
						next: e
					}), t
				},
				catch: function(e) {
					return d.push({
						type: "c",
						next: e
					}), t
				}
			};
			return t
		},
		on: function() {
			u.push(arguments)
		},
		render: function() {
			a = arguments
		},
		destroy: function() {
			h = arguments
		}
	}, o.__onWebMessengerHostReady__ = function(e) {
		if (delete o.__onWebMessengerHostReady__, o[s] = e, i)
			for (var t = e.init.apply(e, i), n = 0; n < d.length; n++) {
				var r = d[n];
				t = "t" === r.type ? t.then(r.next) : t.catch(r.next)
			}
		a && e.render.apply(e, a), h && e.destroy.apply(e, h);
		for (n = 0; n < u.length; n++) e.on.apply(e, u[n])
	};
	var n = new XMLHttpRequest;
	n.addEventListener("load", t), n.open("GET", "https://" + e + ".webloader.smooch.io/", !0), n.responseType = "json", n.send()
}(window, document, "Smooch", smoochConfig.integrationId, "5");*/


    !function(s,p,o,c){var i,a,u,h=[],d=[];function e(){var n="You must provide a supported major version.";try{if(!c)throw new Error(n);var e,t=smoochConfig.smoochServerDomain,r="messaging";if((e="string"==typeof this.response?JSON.parse(this.response):this.response)){var s=p.getElementsByTagName("script")[0],o=p.createElement("script");o.async=!0;var i=c.match(/([0-9]+)\.?([0-9]+)?\.?([0-9]+)?/),a=i&&i[1];if(i&&i[3])o.src=t+r+"."+c+".min.js";else{if(!(1<=a&&e["v"+a]))throw new Error(n);o.src=e["v"+a]}s.parentNode.insertBefore(o,s)}}catch(e){e.message===n&&console.error(e)}}s[o]={init:function(){i=arguments;var n={then:function(e){return d.push({type:"t",next:e}),n},catch:function(e){return d.push({type:"c",next:e}),n}};return n},on:function(){h.push(arguments)},render:function(){a=arguments},destroy:function(){u=arguments}},s.__onWebMessengerHostReady__=function(e){if(delete s.__onWebMessengerHostReady__,s[o]=e,i)for(var n=e.init.apply(e,i),t=0;t<d.length;t++){var r=d[t];n="t"===r.type?n.then(r.next):n.catch(r.next)}a&&e.render.apply(e,a),u&&e.destroy.apply(e,u);for(t=0;t<h.length;t++)e.on.apply(e,h[t])};var n=new XMLHttpRequest;n.addEventListener("load",e),n.open("GET",`${smoochConfig.smoochServerDomain}loader.json`,!0),n.responseType="json",n.send()}(window,document,"Messaging","1");
