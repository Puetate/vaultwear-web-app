import PRIVATE_API from "./private";
import PUBLIC_API from "./public";

const API = {
  ...PRIVATE_API,
  public: PUBLIC_API
};

export default API;
