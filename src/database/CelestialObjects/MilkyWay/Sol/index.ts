import { ICelestialObject } from '@/core/data/types'
import { JupiterMass, JupiterRadius, SolarMass, SolarRadius } from '@/core/constants'

const Barycenters: ICelestialObject[] = [
  {
    name: 'Solar System Barycenter',
    parent: null,
    type: 'barycenter',
    description: '',
    color: '#ffff00'
  },
  {
    name: 'Earth System Barycenter',
    parent: 'Solar System Barycenter',
    type: 'barycenter',
    description: '',
    color: '#6495ed',
    keplerianParameters: {
      semiMajorAxis: 1.015601417621483,
      eccentricity: 1.230420399763895e-2,
      inclination: 1.4135427418053e-2,
      argOfPeriapsis: 1.078087167575372,
      ascendingNode: 1.313721358356782e2,
      meanAnomalyAtEpoch: 7.821567153449494e1
    }
  },
  {
    name: 'Mars System Barycenter',
    parent: 'Solar System Barycenter',
    type: 'barycenter',
    description: '',
    color: '#b22222',
    keplerianParameters: {
      semiMajorAxis: 1.533379932426865,
      eccentricity: 9.177002627547723e-2,
      inclination: 1.848437707858971,
      argOfPeriapsis: 2.891403516248217e2,
      ascendingNode: 4.952420185140623e1,
      meanAnomalyAtEpoch: 1.574682637864123e2
    }
  },
  {
    name: 'Jupiter System Barycenter',
    parent: 'Solar System Barycenter',
    type: 'barycenter',
    description: '',
    color: '#f17c7c',
    keplerianParameters: {
      semiMajorAxis: 5.184950080834474,
      eccentricity: 4.683671524202863e-2,
      inclination: 1.303489215996807,
      argOfPeriapsis: 2.7276005173184e2,
      ascendingNode: 1.005062332030465e2,
      meanAnomalyAtEpoch: 8.38471901544823
    }
  },
  {
    name: 'Saturn System Barycenter',
    parent: 'Solar System Barycenter',
    type: 'barycenter',
    description: '',
    color: '#cc9e26',
    keplerianParameters: {
      semiMajorAxis: 9.538069361500918,
      eccentricity: 5.500915585808187e-2,
      inclination: 2.487736019733611,
      argOfPeriapsis: 3.384907240487206e2,
      ascendingNode: 1.135920965911824e2,
      meanAnomalyAtEpoch: 20 //2.428301001217243e2
    }
  },
  {
    name: 'Uranus System Barycenter',
    parent: 'Solar System Barycenter',
    type: 'barycenter',
    description: '',
    color: '#6fc5c2',
    keplerianParameters: {
      semiMajorAxis: 1.918795881993872e1,
      eccentricity: 4.727283774789717e-2,
      inclination: 7.721255234387229e-1,
      argOfPeriapsis: 9.711199092848462e1,
      ascendingNode: 7.40035088011043e1,
      meanAnomalyAtEpoch: 2.419789679224791e2
    }
  },
  {
    name: 'Neptune System Barycenter',
    parent: 'Solar System Barycenter',
    type: 'barycenter',
    description: '',
    color: '#0f7eb9',
    keplerianParameters: {
      semiMajorAxis: 3.007414301520739e1,
      eccentricity: 8.747389736376581e-3,
      inclination: 1.770231254744001,
      argOfPeriapsis: 2.725291303408503e2,
      ascendingNode: 1.317827982567603e2,
      meanAnomalyAtEpoch: 3.114867601538639e2
    }
  },
  {
    name: 'Pluto System Barycenter',
    parent: 'Solar System Barycenter',
    type: 'barycenter',
    description: '',
    color: '#c9cfd2',
    keplerianParameters: {
      semiMajorAxis: 3.948888827027903e1,
      eccentricity: 2.490160934326204e-1,
      inclination: 1.714068039292916e1,
      argOfPeriapsis: 1.137738200595554e2,
      ascendingNode: 1.103009958695043e2,
      meanAnomalyAtEpoch: 4.868258169510125e1
    }
  }
]

const Satellites: ICelestialObject[] = [
  {
    name: 'Moon',
    parent: 'Earth System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/moon/moon.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/moon/moon_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    renderingParameters: {
      bumpScale: 2
    },
    physicalParameters: {
      mass: 7.348e22,
      radius: 1735.97,
      axialTilt: 23.4608,
      orbitalPeriod: 2.731247317860291e1,
      rotationPeriod: 15542.212395883795
    },
    keplerianParameters: {
      semiMajorAxis: 2.540061764143003e-3,
      eccentricity: 5.617649722815178e-2,
      inclination: 5.277301391898843,
      argOfPeriapsis: 2.893273092914252e2,
      ascendingNode: 3.371301783530977e1,
      meanAnomalyAtEpoch: 9.789359527335836e1
    }
  },
  {
    name: 'Io',
    parent: 'Jupiter System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/io/io.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/io/io_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 893.2e20,
      radius: 1821.5,
      axialTilt: 0,
      orbitalPeriod: 1.772367152320881,
      rotationPeriod: 10
    },
    keplerianParameters: {
      semiMajorAxis: 2.82218832294024e-3,
      eccentricity: 4.96146144385352e-3,
      inclination: 2.195143520626085,
      argOfPeriapsis: 2.573296038386765e2,
      ascendingNode: 3.368644031474224e2,
      meanAnomalyAtEpoch: 2.372487513539017e1
    }
  },
  {
    name: 'Europa',
    parent: 'Jupiter System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/europa/europa.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/europa/europa_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 480.0e20,
      radius: 1561,
      axialTilt: 0,
      orbitalPeriod: 3.553265805980927,
      rotationPeriod: 10
    },
    keplerianParameters: {
      semiMajorAxis: 4.487227724459941e-3,
      eccentricity: 9.273203940409551e-3,
      inclination: 2.400596891861762,
      argOfPeriapsis: 8.360274788350202e1,
      ascendingNode: 3.274255214683653e2,
      meanAnomalyAtEpoch: 1.941256315037582e2
    }
  },
  {
    name: 'Ganymede',
    parent: 'Jupiter System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/ganymede/ganymede.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/ganymede/ganymede_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 1481.9e20,
      radius: 2631.2,
      axialTilt: 0,
      orbitalPeriod: 7.153113697741118,
      rotationPeriod: 10
    },
    keplerianParameters: {
      semiMajorAxis: 7.153745476462586e-3,
      eccentricity: 2.041271271358261e-3,
      inclination: 2.324748286426879,
      argOfPeriapsis: 3.422344264788978e2,
      ascendingNode: 3.399144987339523e2,
      meanAnomalyAtEpoch: 1.86468423823466e2
    }
  },
  {
    name: 'Callisto',
    parent: 'Jupiter System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/callisto/callisto.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/callisto/callisto_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 1075.9e20,
      radius: 2410.3,
      axialTilt: 0,
      orbitalPeriod: 1.669052351407539e1,
      rotationPeriod: 10
    },
    keplerianParameters: {
      semiMajorAxis: 1.258517683015779e-2,
      eccentricity: 7.224368755880143e-3,
      inclination: 1.955419441348968,
      argOfPeriapsis: 3.145618093014828e1,
      ascendingNode: 3.370223066759345e2,
      meanAnomalyAtEpoch: 9.448113489887868e1
    }
  },
  {
    name: 'Mimas',
    parent: 'Saturn System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/mimas/mimas.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/mimas/mimas_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    renderingParameters: {
      bumpScale: 2
    },
    physicalParameters: {
      mass: 3.75094e19,
      radius: 198.8,
      axialTilt: 6.48,
      orbitalPeriod: 9.423157476085949e-1,
      rotationPeriod: 10
    },
    keplerianParameters: {
      semiMajorAxis: 1.239165885435729e-3,
      eccentricity: 1.950436024693915e-2,
      inclination: 2.795621943188808e1,
      argOfPeriapsis: 3.466672914910517e2,
      ascendingNode: 1.661740298373831e2,
      meanAnomalyAtEpoch: 3.027023937857788e2
    }
  },
  {
    name: 'Enceladus',
    parent: 'Saturn System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/enceladus/enceladus.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/enceladus/enceladus_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 10.805e19,
      radius: 252.3,
      axialTilt: 6.48,
      orbitalPeriod: 1.370606981145769,
      rotationPeriod: 10
    },
    keplerianParameters: {
      semiMajorAxis: 1.590768765918404e-3,
      eccentricity: 4.0140443446043e-3,
      inclination: 2.806322790202351e1,
      argOfPeriapsis: 1.399095977238855e2,
      ascendingNode: 1.695182923367429e2,
      meanAnomalyAtEpoch: 1.877354952325927e2
    }
  },
  {
    name: 'Tethys',
    parent: 'Saturn System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/tethys/tethys.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/tethys/tethys_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 61.76e19,
      radius: 536.3,
      axialTilt: 6.48,
      orbitalPeriod: 1.886742973951342,
      rotationPeriod: 10
    },
    keplerianParameters: {
      semiMajorAxis: 1.96852016166366e-3,
      eccentricity: 4.906027912411796e-4,
      inclination: 2.904886167878648e1,
      argOfPeriapsis: 3.197000851891221e2,
      ascendingNode: 1.685967536524158e2,
      meanAnomalyAtEpoch: 2.675818565377689e2
    }
  },
  {
    name: 'Dione',
    parent: 'Saturn System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/dione/dione.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/dione/dione_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 109.572e19,
      radius: 562.5,
      axialTilt: 6.48,
      orbitalPeriod: 2.733943223759778,
      rotationPeriod: 10
    },
    keplerianParameters: {
      semiMajorAxis: 2.520716487003145e-3,
      eccentricity: 1.772672694750518e-3,
      inclination: 2.803649564874407e1,
      argOfPeriapsis: 1.725501166715131e2,
      ascendingNode: 1.694704183703563e2,
      meanAnomalyAtEpoch: 5.556262055816524e1
    }
  },
  {
    name: 'Rhea',
    parent: 'Saturn System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/rhea/rhea.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/rhea/rhea_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 230.9e19,
      radius: 764.5,
      axialTilt: 6.48,
      orbitalPeriod: 4.525634191766411,
      rotationPeriod: 10
    },
    keplerianParameters: {
      semiMajorAxis: 3.527359416096158e-3,
      eccentricity: 1.7382839097025e-3,
      inclination: 2.810246108935473e1,
      argOfPeriapsis: 1.552471560709482e2,
      ascendingNode: 1.701822622421989e2,
      meanAnomalyAtEpoch: 3.379116290699779e2
    }
  },
  {
    name: 'Titan',
    parent: 'Saturn System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    features: ['atmosphere'],
    textures: {
      diffuseMap: {
        path: 'planets/titan/titan.jpg',
        colorSpace: 'srgb-linear'
      },
      cloudMap: {
        path: 'planets/titan/titan_clouds.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/titan/titan_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    renderingParameters: {
      bumpScale: 0.2
    },
    physicalParameters: {
      mass: 13455.3e19,
      radius: 2575.5,
      axialTilt: 6.06,
      orbitalPeriod: 1.594742668590515e1,
      rotationPeriod: 10
    },
    keplerianParameters: {
      semiMajorAxis: 8.166252522600009e-3,
      eccentricity: 2.873938088882117e-2,
      inclination: 2.770963174933997e1,
      argOfPeriapsis: 1.765416296955062e2,
      ascendingNode: 1.690631881774317e2,
      meanAnomalyAtEpoch: 9.799308114269664e1
    }
  },
  {
    name: 'Iapetus',
    parent: 'Saturn System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/iapetus/iapetus.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/iapetus/iapetus_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 180.59e19,
      radius: 734.5,
      axialTilt: 6.48,
      orbitalPeriod: 7.934018039665129e1,
      rotationPeriod: 10
    },
    renderingParameters: {
      bumpScale: 3
    },
    keplerianParameters: {
      semiMajorAxis: 2.380451044016261e-2,
      eccentricity: 2.860016998904521e-2,
      inclination: 1.706111561628991e1,
      argOfPeriapsis: 2.310089498253412e2,
      ascendingNode: 1.38888266762586e2,
      meanAnomalyAtEpoch: 3.167927643486099e2
    }
  },
  {
    name: 'Miranda',
    parent: 'Uranus System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/miranda/miranda.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/miranda/miranda_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 6.59e19,
      radius: 240,
      axialTilt: 74.9,
      orbitalPeriod: 1.413302216921377,
      rotationPeriod: 1.413302216921377
    },
    keplerianParameters: {
      semiMajorAxis: 8.678811821407167e-4,
      eccentricity: 1.205911847411715e-3,
      inclination: 1.019532944431624e2,
      argOfPeriapsis: 3.960967232758146,
      ascendingNode: 1.663893180256808e2,
      meanAnomalyAtEpoch: 9.225490063516435e1
    }
  },
  {
    name: 'Ariel',
    parent: 'Uranus System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/ariel/ariel.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/ariel/ariel_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 1.353e21,
      radius: 577.9,
      axialTilt: 74.9,
      orbitalPeriod: 2.520985069377978,
      rotationPeriod: 2.520985069377978
    },
    keplerianParameters: {
      semiMajorAxis: 1.276471616533729e-3,
      eccentricity: 2.474425645652764e-4,
      inclination: 9.769555766645671e1,
      argOfPeriapsis: 1.74556061920439e2,
      ascendingNode: 1.676713791756605e2,
      meanAnomalyAtEpoch: 1.920572192997519e2
    }
  },
  {
    name: 'Umbriel',
    parent: 'Uranus System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/umbriel/umbriel.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/umbriel/umbriel_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 1.172e21,
      radius: 585,
      axialTilt: 74.9,
      orbitalPeriod: 4.144873237937239,
      rotationPeriod: 4.144873237937239
    },
    keplerianParameters: {
      semiMajorAxis: 1.778163507702681e-3,
      eccentricity: 3.857053820182882e-3,
      inclination: 9.770726827089726e1,
      argOfPeriapsis: 5.849026540934344e1,
      ascendingNode: 1.676986943271656e2,
      meanAnomalyAtEpoch: 4.144873237937239
    }
  },
  {
    name: 'Titania',
    parent: 'Uranus System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/titania/titania.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/titania/titania_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 3.527e21,
      radius: 788.9,
      axialTilt: 74.9,
      orbitalPeriod: 8.705875264578351,
      rotationPeriod: 8.705875264578351
    },
    keplerianParameters: {
      semiMajorAxis: 2.916275300662327e-3,
      eccentricity: 2.494144853515723e-3,
      inclination: 9.777101053663385e1,
      argOfPeriapsis: 2.381946120053947e2,
      ascendingNode: 1.676312871672664e2,
      meanAnomalyAtEpoch: 3.22281947804563e2
    }
  },
  {
    name: 'Oberon',
    parent: 'Uranus System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/oberon/oberon.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/oberon/oberon_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 3.014e21,
      radius: 761.5,
      axialTilt: 74.9,
      orbitalPeriod: 1.346519665013879e1,
      rotationPeriod: 1.346519665013879e1
    },
    keplerianParameters: {
      semiMajorAxis: 3.900290723343614e-3,
      eccentricity: 8.753966376853584e-4,
      inclination: 9.79099012720188e1,
      argOfPeriapsis: 1.529023950256606e2,
      ascendingNode: 1.677149941111006e2,
      meanAnomalyAtEpoch: 2.944471941367638e2
    }
  },
  {
    name: 'Triton',
    parent: 'Neptune System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    features: ['halo'],
    textures: {
      diffuseMap: {
        path: 'planets/triton/triton.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/triton/triton_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 2.1389e22,
      radius: 1352.6,
      axialTilt: 110.44,
      orbitalPeriod: 5.877059225888581,
      rotationPeriod: 208.94077099
    },
    keplerianParameters: {
      semiMajorAxis: 2.370964598801408e-3,
      eccentricity: 3.113005146619756e-5,
      inclination: 1.292220646598841e2,
      argOfPeriapsis: 2.635056322078647e2,
      ascendingNode: 2.219467611844911e2,
      meanAnomalyAtEpoch: 3.48455669539342e2
    }
  },
  {
    name: 'Charon',
    parent: 'Pluto System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/charon/charon.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/charon/charon_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 1.5897e21,
      radius: 606,
      axialTilt: 0,
      orbitalPeriod: 6.386965485763453,
      rotationPeriod: 10
    },
    keplerianParameters: {
      semiMajorAxis: 1.167384040646722e-4,
      eccentricity: 1.525988324897723e-4,
      inclination: 1.12887943699595e2,
      argOfPeriapsis: 1.669975140679648e2,
      ascendingNode: 2.273927902163876e2,
      meanAnomalyAtEpoch: 6.02945968046855e1
    }
  },
  {
    name: 'Dysnomia',
    parent: 'Eris',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/dysnomia/dysnomia.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/dysnomia/dysnomia_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 8.2e19,
      radius: 320,
      axialTilt: 0,
      orbitalPeriod: 1.578715398179681e1,
      rotationPeriod: 10
    },
    keplerianParameters: {
      semiMajorAxis: 2.491642854253084e-4,
      eccentricity: 6.074623100450718e-3,
      inclination: 6.160969712513381e1,
      argOfPeriapsis: 1.554079313960994e2,
      ascendingNode: 1.390978372358126e2,
      meanAnomalyAtEpoch: 2.03947910923442e2
    }
  }
]

export const SolObjects: ICelestialObject[] = [
  ...Barycenters,
  ...Satellites,
  {
    name: 'Sun',
    parent: 'Solar System Barycenter',
    type: 'star',
    description: '',
    color: '#ffff00',
    physicalParameters: {
      mass: SolarMass,
      radius: SolarRadius,
      axialTilt: 0,
      orbitalPeriod: 6.050707298909615e3,
      rotationPeriod: 10,
      temperature: 5778
    },
    keplerianParameters: {
      semiMajorAxis: 8.711991402682097e-3,
      eccentricity: 1.573621288870041e-1,
      inclination: 1.415516823547642,
      argOfPeriapsis: 1.837072799690148e2,
      ascendingNode: 1.096044971242844e2,
      meanAnomalyAtEpoch: 2.701775106938757e2
    }
  },
  {
    name: 'Mercury',
    parent: 'Solar System Barycenter',
    type: 'planet',
    description: '',
    color: '#a8a6a6',
    textures: {
      diffuseMap: {
        path: 'planets/mercury/mercury.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/mercury/mercury_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    renderingParameters: {
      bumpScale: 0.8
    },
    physicalParameters: {
      mass: 3.3022e23,
      radius: 2440,
      axialTilt: 28.55,
      orbitalPeriod: 8.796918597597157e1,
      rotationPeriod: 1407.509405
    },
    keplerianParameters: {
      semiMajorAxis: 3.870984701463686e-1,
      eccentricity: 2.056312911931819e-1,
      inclination: 7.003578203679799,
      argOfPeriapsis: 2.919216956787836e1,
      ascendingNode: 4.830112279108046e1,
      meanAnomalyAtEpoch: 9.078989315913019e1
    }
  },
  {
    name: 'Venus',
    parent: 'Solar System Barycenter',
    type: 'planet',
    description: '',
    color: '#cd853f',
    features: ['atmosphere'],
    textures: {
      diffuseMap: {
        path: 'planets/venus/venus.jpg',
        colorSpace: 'srgb-linear'
      },
      cloudMap: {
        path: 'planets/venus/venus_clouds.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 4.868e24,
      radius: 6051.8,
      axialTilt: 157.16,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 7.233252229901025e-1,
      eccentricity: 6.751907969864723e-3,
      inclination: 3.394434609923295,
      argOfPeriapsis: 5.479854817958076e1,
      ascendingNode: 7.661630839251018e1,
      meanAnomalyAtEpoch: 8.70215692138923
    }
  },
  {
    name: 'Earth',
    parent: 'Earth System Barycenter',
    type: 'planet',
    description: '',
    color: '#6495ed',
    features: ['atmosphere'],
    textures: {
      diffuseMap: {
        path: 'planets/earth/earth.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/earth/earth_bump.jpg'
      },
      cloudMap: {
        path: 'planets/earth/earth_clouds.jpg'
      },
      nightMap: {
        path: 'planets/earth/earth_night.jpg',
        colorSpace: 'srgb-linear'
      }
    },
    physicalParameters: {
      mass: 5.9736e24,
      radius: 6378.1,
      axialTilt: 23.4392911,
      orbitalPeriod: 2.731247317860557e1,
      rotationPeriod: 23.93447117
    },
    keplerianParameters: {
      semiMajorAxis: 3.124285376730603e-5,
      eccentricity: 5.617649722814247e-2,
      inclination: 5.277301391898843,
      argOfPeriapsis: 1.093273092914739e2,
      ascendingNode: 3.371301783530973e1,
      meanAnomalyAtEpoch: 9.789359527330966e1
    }
  },
  {
    name: 'Mars',
    parent: 'Mars System Barycenter',
    type: 'planet',
    description: '',
    color: '#b22222',
    features: ['atmosphere'],
    textures: {
      diffuseMap: {
        path: 'planets/mars/mars.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/mars/mars_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    renderingParameters: {
      bumpScale: 3
    },
    physicalParameters: {
      mass: 6.4185e23,
      radius: 3389.9,
      axialTilt: 37.1135,
      orbitalPeriod: 7.210940705945861e-2,
      rotationPeriod: 24.622962156
    },
    keplerianParameters: {
      semiMajorAxis: 4.370705490542326e-13,
      eccentricity: 6.196051266211704e-1,
      inclination: 2.824494300127015e1,
      argOfPeriapsis: 3.313744137139106e2,
      ascendingNode: 8.495344593394634e1,
      meanAnomalyAtEpoch: 1.937056046775105e2
    }
  },
  {
    name: 'Ceres',
    parent: 'Solar System Barycenter',
    type: 'planet',
    description: '',
    color: '#939191',
    textures: {
      diffuseMap: {
        path: 'planets/ceres/ceres.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/ceres/ceres_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    renderingParameters: {
      bumpScale: 10
    },
    physicalParameters: {
      mass: 5.21e-10,
      radius: 469.7,
      axialTilt: 2.9,
      orbitalPeriod: 1.681454717456132e3,
      rotationPeriod: 9.07417
    },
    keplerianParameters: {
      semiMajorAxis: 2.767310129303423,
      eccentricity: 7.886606256402912e-2,
      inclination: 1.058639765537056e1,
      argOfPeriapsis: 7.346865094531189e1,
      ascendingNode: 8.025853087926154e1,
      meanAnomalyAtEpoch: 2.942043932157666e1
    }
  },
  {
    name: 'Jupiter',
    parent: 'Jupiter System Barycenter',
    type: 'planet',
    description: '',
    color: '#f17c7c',
    features: ['atmosphere'],
    textures: {
      diffuseMap: {
        path: 'planets/jupiter/jupiter.jpg',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: JupiterMass,
      radius: JupiterRadius,
      axialTilt: 2.22,
      orbitalPeriod: 1.734883989257963,
      rotationPeriod: 9.927953
    },
    keplerianParameters: {
      semiMajorAxis: 5.75962940626438e-7,
      eccentricity: 9.47722561814191e-1,
      inclination: 2.110945165369154,
      argOfPeriapsis: 1.530063994438263e2,
      ascendingNode: 3.356574912314962e2,
      meanAnomalyAtEpoch: 2.392475877165691e2
    }
  },
  {
    name: 'Saturn',
    parent: 'Saturn System Barycenter',
    type: 'planet',
    description: '',
    color: '#cc9e26',
    features: ['atmosphere', 'ring'],
    textures: {
      diffuseMap: {
        path: 'planets/saturn/saturn.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/saturn/saturn_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 5.6846e26,
      radius: 58232,
      axialTilt: 28.052,
      orbitalPeriod: 1.176084225722678e1,
      rotationPeriod: 10.65622222
    },
    keplerianParameters: {
      semiMajorAxis: 1.648145096703172e-6,
      eccentricity: 1.568915841885989e-1,
      inclination: 2.818861123721728e1,
      argOfPeriapsis: 2.840335655056192e2,
      ascendingNode: 1.690012496244485e2,
      meanAnomalyAtEpoch: 1.684566859059781e2
    }
  },
  {
    name: 'Uranus',
    parent: 'Uranus System Barycenter',
    type: 'planet',
    description: '',
    color: '#6fc5c2',
    features: ['atmosphere', 'ring'],
    textures: {
      diffuseMap: {
        path: 'planets/uranus/uranus.jpg',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 8.681e25,
      radius: 25362,
      axialTilt: 97.722,
      orbitalPeriod: 6.607931280358359e-1,
      rotationPeriod: 17.24
    },
    keplerianParameters: {
      semiMajorAxis: 5.459913214588566e-8,
      eccentricity: 9.9683142501055e-1,
      inclination: 9.799856058349746e1,
      argOfPeriapsis: 1.362298036478842e2,
      ascendingNode: 1.676908888481596e2,
      meanAnomalyAtEpoch: 1.858799885109246e2
    }
  },
  {
    name: 'Neptune',
    parent: 'Neptune System Barycenter',
    type: 'planet',
    description: '',
    color: '#0f7eb9',
    features: ['atmosphere', 'ring'],
    textures: {
      diffuseMap: {
        path: 'planets/neptune/neptune.jpg',
        colorSpace: 'srgb-linear'
      },
      cloudMap: {
        path: 'planets/neptune/neptune_clouds.jpg'
      },
      bumpMap: {
        path: 'planets/neptune/neptune_clouds.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    renderingParameters: {
      bumpScale: 0.3
    },
    physicalParameters: {
      mass: 1.0243e26,
      radius: 24624,
      axialTilt: -28.03,
      orbitalPeriod: 5.644116357717567e1,
      rotationPeriod: 16.11
    },
    keplerianParameters: {
      semiMajorAxis: 2.238804251362252e-6,
      eccentricity: 9.620175047143015e-1,
      inclination: 1.292142793568033e2,
      argOfPeriapsis: 3.45239514571138e2,
      ascendingNode: 2.219454809369289e2,
      meanAnomalyAtEpoch: 3.428968064104422e2
    }
  },
  {
    name: 'Pluto',
    parent: 'Pluto System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    features: ['halo'],
    textures: {
      diffuseMap: {
        path: 'planets/pluto/pluto.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/pluto/pluto_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 1.305e22,
      radius: 1188.3,
      axialTilt: 119.591,
      orbitalPeriod: 6.38756595397599,
      rotationPeriod: 153.2935
    },
    keplerianParameters: {
      semiMajorAxis: 1.424922488074943e-5,
      eccentricity: 1.513645144197374e-4,
      inclination: 1.1288795512431e2,
      argOfPeriapsis: 3.547156039222869e2,
      ascendingNode: 2.273927766163783e2,
      meanAnomalyAtEpoch: 5.257727266003623e1
    }
  },
  {
    name: 'Haumea',
    parent: 'Solar System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/haumea/haumea.jpg',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 4.006e21,
      radius: 816,
      axialTilt: 0,
      orbitalPeriod: 1.02657569818199e5,
      rotationPeriod: 3.9154
    },
    keplerianParameters: {
      semiMajorAxis: 4.290702155272246e1,
      eccentricity: 1.999538534122253e-1,
      inclination: 2.821006341432563e1,
      argOfPeriapsis: 2.404781854260978e2,
      ascendingNode: 1.220136091863266e2,
      meanAnomalyAtEpoch: 2.196310505561194e2
    }
  },
  {
    name: 'Makemake',
    parent: 'Solar System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/makemake/makemake.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/makemake/makemake_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 3.1e21,
      radius: 739,
      axialTilt: 0,
      orbitalPeriod: 1.112600602113746e5,
      rotationPeriod: 22.8266
    },
    keplerianParameters: {
      semiMajorAxis: 4.527174581361132e1,
      eccentricity: 1.660010762933981e-1,
      inclination: 2.902039045994402e1,
      argOfPeriapsis: 2.959193551113156e2,
      ascendingNode: 7.934779518762248e1,
      meanAnomalyAtEpoch: 1.676461239736858e2
    }
  },
  {
    name: 'Eris',
    parent: 'Solar System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    features: ['halo'],
    textures: {
      diffuseMap: {
        path: 'planets/eris/eris.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/eris/eris_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 1.66e22,
      radius: 1163,
      axialTilt: 78,
      orbitalPeriod: 2.054788963660803e5,
      rotationPeriod: 25.9
    },
    keplerianParameters: {
      semiMajorAxis: 6.814686260277956e1,
      eccentricity: 4.320832797908185e-1,
      inclination: 4.375695362578097e1,
      argOfPeriapsis: 1.509618557241282e2,
      ascendingNode: 3.607217566239468e1,
      meanAnomalyAtEpoch: 2.089430642429761e2
    }
  },
  {
    name: 'Sedna',
    parent: 'Solar System Barycenter',
    type: 'planet',
    description: '',
    color: '#c9cfd2',
    textures: {
      diffuseMap: {
        path: 'planets/sedna/sedna.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/sedna/sedna_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 1.705e21,
      radius: 800,
      axialTilt: 0,
      orbitalPeriod: 2.054788963660803e5,
      rotationPeriod: 25.9
    },
    keplerianParameters: {
      semiMajorAxis: 5.348803422684762e2,
      eccentricity: 8.572051652452971e-1,
      inclination: 1.193013045961979e1,
      argOfPeriapsis: 3.108597815541983e2,
      ascendingNode: 1.442705583371275e2,
      meanAnomalyAtEpoch: 3.584852142405097e2
    }
  }
]
