import uuid from '../helpers/uuid';

export const state = () => {
	return {
		items: [],
	};
};

export const getters = {
	items: state => Array.from(state.items).sort((a, b) => b.ts - a.ts),
};

export const mutations = {
	setItems: (state, payload) => {
		state.items = payload;
	},
	addItem: (state, payload) => {
		state.items.push(payload);
	},
	itemLoaded: (state, payload) => {
		const item = state.items.find(i => payload.correlationId && i.correlationId === payload.correlationId);
		if (!item) {
			// was removed before load finish
			// or received from another user
			state.items.push(payload);
			return;
		}
		item.guid = payload.guid;
	},
};

export const actions = {
	// TODO get all on init
	/* get: async (ctx) => {
		http fetch or websocket
	}, */
	saveItem: ({ rootState, commit }, payload) => {
		payload.guid = null;
		payload.ts = Date.now();
		payload.correlationId = uuid();
		commit('addItem', payload);

		if (rootState.socket.isConnected) {
			// TODO? add some queue for sync after reconnect
			rootState.socket.$ws.sendObj(payload);
		}
	},
	receiveItem: ({ commit }, payload) => {
		commit('itemLoaded', payload);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
