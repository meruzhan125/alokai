import activity from './activity';
import feed from './feed';
import post from './post';
import squad from './squad';
import user from './user';

export const state = () => ({
	locales: ['en'],
	locale: 'en',
	socket: {
		isConnected: false,
		isAuth: false,
		isPendingAuth: true,
		reconnectError: false,
		$ws: {
			sendObj: () => {},
		},
		_ws: null,
	},
	merchant: {
		id: null,
		siteUrl: null,
		siteTitle: null,
	},
});

export const mutations = {
	SET_LANG (state, locale) {
		if (state.locales.includes(locale)) {
			state.locale = locale;
		}
	},
	SOCKET_ONOPEN (state, event) {
		state.socket.isConnected = true;
		state.socket._ws = event.currentTarget;
	},
	jSocket (state, $ws) {
		state.socket.$ws = $ws;
	},
	SOCKET_ONCLOSE (state, event) {
		state.socket.isConnected = false;
	},
	SOCKET_ONERROR (state, event) {
	},
	SOCKET_ONMESSAGE (state, message) {
	},
	SOCKET_RECONNECT (state, event) {
	},
	SOCKET_RECONNECT_ERROR (state, event) {
	},
	SET_MERCHANT_PARAMS (state, msg) {
		const { id, siteUrl, siteTitle } = msg;
		state.merchant.id = id;
		state.merchant.siteUrl = siteUrl;
		state.merchant.siteTitle = siteTitle;
	},
	SET_SOCKET_AUTH (state, flag) {
		state.socket.isAuth = flag;
	},
	SET_PENDING (state, flag) {
		state.socket.isPendingAuth = flag;
	},
};

export const modules = {
	activity,
	feed,
	post,
	squad,
	user,
};

export default {
	state,
	mutations,
	modules,
	strict: false,
};
