import { shallowMount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("App.vue", () => {
  let wrapper;
  let store;
  let actions;
  let getters;

  beforeEach(() => {
    actions = {
      loadResults: jest.fn(),
    };
    getters = {
      areResultsValid: () => true,
      currentRoundNumber: jest.fn(),
    };
    store = new Vuex.Store({ actions, getters });

    wrapper = shallowMount(App, { store, localVue });
  });

  it("contains all components (AppHeader.vue, ...)", () => {
    const requiredChildComponents = ["AppHeader", "DiceRotating", "Round", "ResultTable", "RoundResultModal"];
    const mountedChildComponents = Object.keys(wrapper.findAllComponents(App).selector.components);
    requiredChildComponents.forEach((component) => expect(mountedChildComponents.includes(component)).toBeTruthy());
  });
});
