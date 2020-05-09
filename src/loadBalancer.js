const axios = require("axios").default;

const consts = require("./consts");

const loadBalanceRequest = async (username) => {
  let data = undefined;

  // Iterate through the available APIs until we get a valid response.
  for (var i = 0; i < consts.uuidSources.length; i++) {
    try {
      const res = await axios.get(consts.uuidSources[i].url + username);

      // if we get here, 2xx recieved, make sure the response is valid
      if (!res.data[consts.uuidSources[i].key]) {
        // User does not exist.
        console.log("uuid #" + i + " had a 2xx but no ID!");
        data = { ok: false, code: 404, msg: "could not resolve uuid" };
        break;
      }

      // if we get here, valid uuid found
      data = {
        ok: true,
        code: res.status,
        uuid: res.data[consts.uuidSources[i].key].replace(/-/g, ""),
        server: i,
      };
      console.log("UUID found! - #" + i + ", " + data.uuid);
      break;
    } catch (err) {
      //console.log(err);
      console.log(
        `Error code ${err.response.status} trying to fetch from api #${i}, using next...`
      );
      //if (err.response.status == 404) return { uuid: undefined, error: 404 };

      if (err.response.status == 404) {
        data = { ok: false, code: 404, msg: "could not resolve uuid" };
        break;
      } else {
        // 429, etc. Use a different service.
        continue;
      }
    }
  }

  // UUID can still be undefined!
  return data == undefined
    ? { ok: false, code: 500, msg: "unknown error" }
    : data;
};

module.exports = loadBalanceRequest;
