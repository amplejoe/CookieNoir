/** global namespace **/
let CookieNoir = {};

/** constants **/
CookieNoir.SCREEN_WIDTH = 800;
CookieNoir.SCREEN_HEIGHT = 600;

CookieNoir.SERVER_ADDRESS = "localhost";
CookieNoir.SERVER_PORT = "8080";

CookieNoir.CLIENT_TYPE = {
  NONE: 0,
  PLAYER: 1,
  OBSERVER: 2,
};

CookieNoir.DirectionIcons = {
  up: "\uf062",
  down: "\uf063",
  left: "\uf060",
  right: "\uf061"
};

// layers start at 0, platforms at 1
CookieNoir.level1 = {
  "pf_0_1": {
    "file": "0_1.png",
    "connections": [{
      "pfkey": "pf_1_1",
      "posX": -700
    }, {
      "pfkey": "pf_1_1",
      "posX": 1800
    }]
  },
  "pf_1_1": {
    "file": "1_1.png",
    "connections": [{
        "pfkey": "pf_2_1",
        "posX": -1100
      }, {
        "pfkey": "pf_2_2",
        "posX": 1600
      }, {
        "pfkey": "pf_0_1",
        "posX": 0.75
      }
    ]
  },
  "pf_2_1": {
    "file": "2_1.png",
    "connections": [{
      "pfkey": "pf_3_1",
      "posX": 0.0
    }, {
      "pfkey": "pf_3_2",
      "posX": 0.75
    }, {
      "pfkey": "pf_1_1",
      "posX": 0.75
    }]
  },
  "pf_2_2": {
    "file": "2_2.png",
    "connections": [{
      "pfkey": "pf_4_2",
      "posX": 0.5
    }, {
      "pfkey": "pf_1_1",
      "posX": 0.5
    }],
    "right": {
      "pfkey": "pf_5_1",
      "posX": 0.0
    }
  },
  "pf_3_1": {
    "file": "3_1.png",
    "connections": [{
      "pfkey": "pf_4_1",
      "posX": 0.5
    }, {
      "pfkey": "pf_2_1",
      "posX": 0.0
    }],
    "right": {
      "pfkey": "pf_3_2",
      "posX": 0.0
    }
  },
  "pf_3_2": {
    "file": "3_2.png",
    "connections": [{
      "pfkey": "pf_4_1",
      "posX": 0.5
    }, {
      "pfkey": "pf_2_1",
      "posX": 0.75
    }],
    "left": {
      "pfkey": "pf_3_1",
      "posX": 1.0
    }
  },
  "pf_4_1": {
    "file": "4_1.png",
    "connections": [{
      "pfkey": "pf_5_1",
      "posX": 0.5
    }, {
      "pfkey": "pf_3_1",
      "posX": 0.25
    }, {
      "pfkey": "pf_3_2",
      "posX": 0.75
    }]
  },
  "pf_4_2": {
    "file": "4_2.png",
    "connections": [{
      "pfkey": "pf_5_2",
      "posX": 0.5
    }, {
      "pfkey": "pf_2_2",
      "posX": 0.25
    }]
  },
  "pf_5_1": {
    "file": "5_1.png",
    "connections": [{
      "pfkey": "pf_6_1",
      "posX": 1.0
    }, {
      "pfkey": "pf_4_1",
      "posX": 0.5
    }]
  },
  "left": {
    "pfkey": "pf_4_1",
    "posX": 1.0
  },
  "pf_5_2": {
    "file": "5_2.png",
    "connections": [{
      "pfkey": "pf_6_1",
      "posX": 1.0
    }, {
      "pfkey": "pf_4_2",
      "posX": 0.25
    }]
  },
  "pf_6_1": {
    "file": "6_1.png",
    "connections": [{
      "pfkey": "pf_5_1",
      "posX": 0.0
    }, {
      "pfkey": "pf_5_2",
      "posX": 0.75
    }]
  }
}
