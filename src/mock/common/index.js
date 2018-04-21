const auth = {
  code: "0000",
  desc: "店铺打烊",
  msg: {
    seriUserId: 3,
    token:
      "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNTIwMjE5Mjg0LCJzdWIiOiIiLCJleHAiOjE1MjA1NzkyODR9.KiSoSPymGV8yHyMRTAX_2raI3Husj5eZYVgLDyuuK0w"
  }
};

export default {
  auth: config => {
    return auth;
  }
};
