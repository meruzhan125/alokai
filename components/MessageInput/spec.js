import { Chance } from 'chance';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import MessageInput from './index.vue';
import Post from '~/components/Post';

const chance = new Chance();

describe('Message Input', () => {
	let localVue;
	let post;
	let sendComment;
	let actions;
	let store;
	let wrapper;

	beforeEach(() => {
		localVue = createLocalVue();
		localVue.use(Vuex);

		post = {
			guid: chance.guid(),
		};
		sendComment = 'sendComment';
		actions = {
			[sendComment]: jest.fn(),
		};
		store = new Vuex.Store({
			actions,
		});

		wrapper = shallowMount(MessageInput, {
			store,
			localVue,
			parentComponent: Post,
			propsData: {
				post,
				action: sendComment,
			},
		});
	});

	it('should dispatch action set in props', () => {
		const text = chance.sentence();
		wrapper.setData({
			text,
		});

		wrapper.vm.send();
		expect(actions[sendComment]).toHaveBeenCalled();
		const payload = actions[sendComment].mock.calls[0][1];
		expect(payload).toMatchObject({ post, text });
	});
});
