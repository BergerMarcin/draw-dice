import { createLocalVue, shallowMount } from "@vue/test-utils";
import { diceApiMixin } from "@/mixins/diceApiMixin.js";
import api from "@/utils/axios-api";
import { API_PATH_DRAW } from "@/helpers/constants";
import Vuex from "vuex";

// below mocking axios module IS NOT WORKING due to nonstandard implementation of Axios at "@/utils/axios-api"
// (api.simple as this function bind axios and use its this without mentioned if it is GET, POST, PUT or other method (below can not deliver object from axios.create react only on axios.get))
// below thanks to https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/ and https://stackoverflow.com/questions/45016033/how-do-i-test-axios-in-jest
// import mockAxios from "axios";  // for creating mocked-responses at tests
// jest.mock("axios");

// adding globally `api-axios`-util (global-Vue-util) to this test; this `api-axios`-util is required by API-mixin `diceApiMixin`;
// thanks to https://lmiller1990.github.io/vue-testing-handbook/mocking-global-objects.html#the-mocks-mounting-option
// below required also: import { config } from "@vue/test-utils";
// config.mocks = {$api: api};

const localVue = createLocalVue();
localVue.use(Vuex);

describe("diceApiMixin.js (required to start before cors-server)", () => {
  let MockComponent;
  let wrapper;
  let store;
  let getters;

  beforeAll(() => {
    getters = {
      isDev: () => false,
    };
    store = new Vuex.Store({ getters });
    // mock-component is required to have possibility to test mixin (thanks to https://dev.to/individualit/comment/1fdne and https://livebook.manning.com/book/testing-vue-js-applications/chapter-11/)
    MockComponent = { render() {} };
    wrapper = shallowMount(MockComponent, {
      localVue,
      store,
      mocks: { $api: api }, // adding `api-axios` (global-Vue-util) to the mock-component; `api-axios` is required by API-mixin; thanks to https://lmiller1990.github.io/vue-testing-handbook/mocking-global-objects.html#the-mocks-mounting-option
      mixins: [diceApiMixin], // adding API-mixin
    });
  });

  it("API-host is correct", () => {
    expect(process.env.VUE_APP_API_HOST).toEqual("http://localhost:3000/");
  });

  it("API-pathname is correct", () => {
    expect(API_PATH_DRAW).toEqual([]);
  });

  it("drawDiceValue returns correct value (if API is working)", async () => {
    const drawDiceValue = await wrapper.vm.getDiceValue(API_PATH_DRAW);
    console.log("drawDiceValue: ", drawDiceValue);
    expect(drawDiceValue).toBeGreaterThanOrEqual(1);
    expect(drawDiceValue).toBeLessThanOrEqual(6);
  });
});
