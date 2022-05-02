import api from "../utils/axios-api";
import { API_ERROR } from "@/helpers/constants";
import { mapGetters } from "vuex";

export const diceApiMixin = {
  computed: {
    ...mapGetters(["isDev"]),
  },

  methods: {
    constructUrl(host, apiSuffixUris = []) {
      if (!host) {
        if (this.isDev) console.error(API_ERROR.NO_URL_HOST.DEV_MSG);
        throw new Error(API_ERROR.NO_URL_HOST.USER_MSG);
      }

      let urlWithPathname;
      try {
        urlWithPathname = new URL(host);
        urlWithPathname.pathname = apiSuffixUris.join("/");
      } catch (e) {
        if (this.isDev) console.error(API_ERROR.WRONG_URL.DEV_MSG);
        throw new Error(API_ERROR.WRONG_URL.USER_MSG);
      }

      return urlWithPathname;
    },

    getDiceValue(apiSuffixUris = []) {
      let urlWithPathname;
      try {
        urlWithPathname = this.constructUrl(process.env.VUE_APP_API_HOST, apiSuffixUris);
      } catch (error) {
        throw new Error(error);
      }

      return api
        .simple("GET", urlWithPathname)
        .then(async (resp) => {
          if (this.isDev) console.log(`Response from ${urlWithPathname}: `, resp);
          if (resp.status !== 200 || !resp.data.success || !resp.data.dice[0]?.value) {
            if (this.isDev) console.error(API_ERROR.WRONG_RESPONSE_STATUS.DEV_MSG);
            throw new Error(API_ERROR.WRONG_RESPONSE_STATUS.USER_MSG);
          } else {
            return resp.data.dice[0].value;
          }
        })
        .catch(() => {
          if (this.isDev) console.error(API_ERROR.GENERAL_RESPONSE_ERROR.DEV_MSG);
          throw new Error(API_ERROR.GENERAL_RESPONSE_ERROR.USER_MSG);
        });
    },

    getDiceImgUrlPath(apiSuffixUris = []) {
      let urlWithPathname;
      try {
        urlWithPathname = this.constructUrl(process.env.VUE_APP_ASSETS_HOST, apiSuffixUris);
      } catch (error) {
        return "";
      }
      return urlWithPathname;
    },
  },
};
