const userAgent = "jcx/mcuuid/%s";

const uuidSources = [
  {
    url: "https://api.ashcon.app/mojang/v2/user/",
    json: true,
    key: "uuid",
  },
  {
    url: "https://api.minetools.eu/uuid/",
    json: true,
    key: "id",
  },
  {
    url: "https://api.mojang.com/users/profiles/minecraft/",
    json: true,
    key: "id",
  },
];

module.exports = { userAgent, uuidSources };
