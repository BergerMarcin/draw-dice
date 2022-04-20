import { createLocalVue, shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import { diceApiMixin } from "@/mixins/diceApiMixin.js";
import { API_HOST_DRAW_SUFFIX_URIS } from "@/helpers/constants";
import Vuex from "vuex";

// TODO: probably below 2 lines are not needed because source of issue is Axios plugin (used in diceApiMixin) or CORS
// below acc. https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/ and https://stackoverflow.com/questions/45016033/how-do-i-test-axios-in-jest
// import * as axios from "axios";
// jest.mock("axios");

const localVue = createLocalVue();
localVue.use(Vuex);

describe("diceApiMixin.js", () => {
  let MockComponent;
  let wrapper;
  let store;
  let getters;

  beforeAll(() => {
    getters = {
      isDev: () => true,
    };
    store = new Vuex.Store({ getters });
    // thanks to https://dev.to/individualit/comment/1fdne and https://livebook.manning.com/book/testing-vue-js-applications/chapter-11/
    MockComponent = {
      render() {},
    };
    // TODO: add plugin axios-api.js or fix CORS
    wrapper = shallowMount(MockComponent, { store, localVue, mixins: [diceApiMixin] });
  });

  it("API host is correct", () => {
    expect(process.env.VUE_APP_API_HOST).toEqual("http://roll.diceapi.com/");
  });

  it("constructs Url properly", () => {
    let host = process.env.VUE_APP_API_HOST;
    if (host.slice(-1) === "/") host = host.slice(0, -1);
    const url = [host, ...API_HOST_DRAW_SUFFIX_URIS].join("/");
    expect(wrapper.vm.constructUrl(API_HOST_DRAW_SUFFIX_URIS).toString()).toEqual(url);
  });

  // it("test1", () => {
  //   var createCORSRequest = function (method, url) {
  //     var xhr = new XMLHttpRequest();
  //     if ("withCredentials" in xhr) {
  //       // Most browsers.
  //       xhr.open(method, url, true);
  //     } else if (typeof XDomainRequest != "undefined") {
  //       // IE8 & IE9
  //       xhr = new XDomainRequest();
  //       xhr.open(method, url);
  //     } else {
  //       // CORS not supported.
  //       xhr = null;
  //     }
  //     return xhr;
  //   };
  //
  //   var url = "http://roll.diceapi.com/json/d6";
  //   var method = "GET";
  //   var xhr = createCORSRequest(method, url);
  //
  //   xhr.onload = function () {
  //     // Success code goes here.
  //     console.log("this.response: ", JSON.parse(this.response));
  //     console.log("this.responseText: ", JSON.parse(this.responseText));
  //   };
  //
  //
  //   xhr.onerror = function () {
  //     // Error code goes here.
  //   };
  //
  //   xhr.send();
  //
  //   console.log("xhr: ", xhr);
  //
  //   expect(true).toBeTruthy();
  // });

  it("test2", async () => {
    // TODO: try to update to Axios object like Axios plugin
    // below acc. https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/ and https://stackoverflow.com/questions/45016033/how-do-i-test-axios-in-jest
    // axios.get.mockImplementation(() =>
    //   Promise.resolve({
    //     status: 200,
    //     data: {
    //       success: true,
    //       dice: [{ value: 6, type: "d6" }],
    //     },
    //   })
    // );

    // TODO: fix CORS issue
    const drawDiceValue = await wrapper.vm.getDiceValue(API_HOST_DRAW_SUFFIX_URIS);

    // TODO: remove below if not needed (it does not see axios promise). Remove also package with `yarn remove flush-promises`
    await flushPromises();
    console.log("drawDiceValue: ", drawDiceValue);
    expect(drawDiceValue).toBeGreaterThanOrEqual(1);
    expect(drawDiceValue).toBeLessThanOrEqual(7);
  });
});
