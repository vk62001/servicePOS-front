import { APISQZeus } from "./instanceZeuz";

export const SDKZeus = {
  getAllPOS: function () {
    return APISQZeus.get(`api/pos/getTiendas`);
  },
  getAllTables: function (id) {
    return APISQZeus.get(`api/pos/getTables/${id}`);
  },
  getLogConnection: function () {
    return APISQZeus.get(`api/logConnection`);
  },
  getCountInfo: function (tiendaId) {
    return APISQZeus.get(`api/pos/getCountInfo/${tiendaId}`);
  },
};
