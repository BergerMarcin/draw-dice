import { shallowMount } from "@vue/test-utils";
import AppHeader from "@/components/AppHeader.vue";

describe("AppHeader.vue", () => {
  let wrapper;
  const msg = "new message";
  beforeAll(() => {
    wrapper = shallowMount(AppHeader, {
      propsData: { msg },
    });
  });

  it("renders props.msg when passed", () => {
    expect(wrapper.text()).toMatch(msg);
  });

  it("has class .header", () => {
    expect(wrapper.classes()).toContain("header");
  });
});
