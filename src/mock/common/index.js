const auth = {
  code: "1001",
  desc: "操作成功",
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
