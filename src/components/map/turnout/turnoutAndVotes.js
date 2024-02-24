const turnoutAndVotes = [
  {
    seat: "NA-1",
    voterTurnout: 53.2,
    totalVotes: 162053,
  },
  {
    seat: "NA-2",
    voterTurnout: 36.54,
    totalVotes: 171349,
  },
  {
    seat: "NA-3",
    voterTurnout: 36.1,
    totalVotes: 162062,
  },
  {
    seat: "NA-4",
    voterTurnout: 30.46,
    totalVotes: 155774,
  },
  {
    seat: "NA-5",
    voterTurnout: 35.94,
    totalVotes: 203184,
  },
  {
    seat: "NA-6",
    voterTurnout: 36.91,
    totalVotes: 164184,
  },
  {
    seat: "NA-7",
    voterTurnout: 42.66,
    totalVotes: 172278,
  },
  {
    seat: "NA-8",
    voterTurnout: undefined,
    totalVotes: undefined,
  },
  {
    seat: "NA-9",
    voterTurnout: 43.09,
    totalVotes: 196146,
  },
  {
    seat: "NA-10",
    voterTurnout: 37.3,
    totalVotes: 201230,
  },
  {
    seat: "NA-11",
    voterTurnout: 32.61,
    totalVotes: 146110,
  },
  {
    seat: "NA-12",
    voterTurnout: 50.89,
    totalVotes: 98200,
  },
  {
    seat: "NA-13",
    voterTurnout: 28.47,
    totalVotes: 90231,
  },
  {
    seat: "NA-14",
    voterTurnout: 44.77,
    totalVotes: 253919,
  },
  {
    seat: "NA-15",
    voterTurnout: 38.38,
    totalVotes: 238518,
  },
  {
    seat: "NA-16",
    voterTurnout: 44.8,
    totalVotes: 241058,
  },
  {
    seat: "NA-17",
    voterTurnout: 44.37,
    totalVotes: 172663,
  },
  {
    seat: "NA-18",
    voterTurnout: 49.88,
    totalVotes: 349897,
  },
  {
    seat: "NA-19",
    voterTurnout: 40,
    totalVotes: 211710,
  },
  {
    seat: "NA-20",
    voterTurnout: 39.54,
    totalVotes: 212976,
  },
  {
    seat: "NA-21",
    voterTurnout: 45.12,
    totalVotes: 230402,
  },
  {
    seat: "NA-22",
    voterTurnout: 39.25,
    totalVotes: 213088,
  },
  {
    seat: "NA-23",
    voterTurnout: 44.33,
    totalVotes: 198031,
  },
  {
    seat: "NA-24",
    voterTurnout: 39.38,
    totalVotes: 193308,
  },
  {
    seat: "NA-25",
    voterTurnout: 39.92,
    totalVotes: 219077,
  },
  {
    seat: "NA-26",
    voterTurnout: 27.27,
    totalVotes: 93757,
  },
  {
    seat: "NA-27",
    voterTurnout: 21.93,
    totalVotes: 135401,
  },
  {
    seat: "NA-28",
    voterTurnout: 62.06,
    totalVotes: 241123,
  },
  {
    seat: "NA-29",
    voterTurnout: 39.72,
    totalVotes: 122708,
  },
  {
    seat: "NA-30",
    voterTurnout: 33.8,
    totalVotes: 131994,
  },
  {
    seat: "NA-31",
    voterTurnout: 36.61,
    totalVotes: 143078,
  },
  {
    seat: "NA-32",
    voterTurnout: 38.38,
    totalVotes: 220490,
  },
  {
    seat: "NA-33",
    voterTurnout: 45.58,
    totalVotes: 196833,
  },
  {
    seat: "NA-34",
    voterTurnout: 47.12,
    totalVotes: 208095,
  },
  {
    seat: "NA-35",
    voterTurnout: 37.19,
    totalVotes: 242064,
  },
  {
    seat: "NA-36",
    voterTurnout: 24.62,
    totalVotes: 133184,
  },
  {
    seat: "NA-37",
    voterTurnout: 37.67,
    totalVotes: 153220,
  },
  {
    seat: "NA-38",
    voterTurnout: 45,
    totalVotes: 214553,
  },
  {
    seat: "NA-39",
    voterTurnout: 39.43,
    totalVotes: 277991,
  },
  {
    seat: "NA-40",
    voterTurnout: 33.29,
    totalVotes: 141461,
  },
  {
    seat: "NA-41",
    voterTurnout: 48.1,
    totalVotes: 241969,
  },
  {
    seat: "NA-42",
    voterTurnout: 16.33,
    totalVotes: 73598,
  },
  {
    seat: "NA-43",
    voterTurnout: 43.32,
    totalVotes: 164839,
  },
  {
    seat: "NA-44",
    voterTurnout: 55.59,
    totalVotes: 210736,
  },
  {
    seat: "NA-45",
    voterTurnout: 49.98,
    totalVotes: 152117,
  },
  {
    seat: "NA-46",
    voterTurnout: 43,
    totalVotes: 148783,
  },
  {
    seat: "NA-47",
    voterTurnout: 58.8,
    totalVotes: 253570,
  },
  {
    seat: "NA-48",
    voterTurnout: 61.1,
    totalVotes: 181642,
  },
  {
    seat: "NA-49",
    voterTurnout: 50.34,
    totalVotes: 317451,
  },
  {
    seat: "NA-50",
    voterTurnout: 54,
    totalVotes: 415913,
  },
  {
    seat: "NA-51",
    voterTurnout: 52.49,
    totalVotes: 349119,
  },
  {
    seat: "NA-52",
    voterTurnout: 50.48,
    totalVotes: 328083,
  },
  {
    seat: "NA-53",
    voterTurnout: 53.07,
    totalVotes: 207835,
  },
  {
    seat: "NA-54",
    voterTurnout: 50.57,
    totalVotes: 230624,
  },
  {
    seat: "NA-55",
    voterTurnout: 39.99,
    totalVotes: 169980,
  },
  {
    seat: "NA-56",
    voterTurnout: 41.84,
    totalVotes: 214992,
  },
  {
    seat: "NA-57",
    voterTurnout: 42.2,
    totalVotes: 179289,
  },
  {
    seat: "NA-58",
    voterTurnout: 62.05,
    totalVotes: 366325,
  },
  {
    seat: "NA-59",
    voterTurnout: 58.49,
    totalVotes: 331039,
  },
  {
    seat: "NA-60",
    voterTurnout: 44.08,
    totalVotes: 231836,
  },
  {
    seat: "NA-61",
    voterTurnout: 47.51,
    totalVotes: 236415,
  },
  {
    seat: "NA-62",
    voterTurnout: 43.98,
    totalVotes: 228805,
  },
  {
    seat: "NA-63",
    voterTurnout: 51.32,
    totalVotes: 265331,
  },
  {
    seat: "NA-64",
    voterTurnout: 40,
    totalVotes: 223082,
  },
  {
    seat: "NA-65",
    voterTurnout: 48.95,
    totalVotes: 277854,
  },
  {
    seat: "NA-66",
    voterTurnout: 48.46,
    totalVotes: 304248,
  },
  {
    seat: "NA-67",
    voterTurnout: undefined,
    totalVotes: undefined,
  },
  {
    seat: "NA-68",
    voterTurnout: 50.01,
    totalVotes: 297621,
  },
  {
    seat: "NA-69",
    voterTurnout: 49.66,
    totalVotes: 287271,
  },
  {
    seat: "NA-70",
    voterTurnout: 52.6,
    totalVotes: 285249,
  },
  {
    seat: "NA-71",
    voterTurnout: 43.54,
    totalVotes: 244751,
  },
  {
    seat: "NA-72",
    voterTurnout: 50.52,
    totalVotes: 290327,
  },
  {
    seat: "NA-73",
    voterTurnout: 48.41,
    totalVotes: 253726,
  },
  {
    seat: "NA-74",
    voterTurnout: 50.66,
    totalVotes: 267518,
  },
  {
    seat: "NA-75",
    voterTurnout: 51.56,
    totalVotes: 314394,
  },
  {
    seat: "NA-76",
    voterTurnout: 50.27,
    totalVotes: 299826,
  },
  {
    seat: "NA-77",
    voterTurnout: 51.57,
    totalVotes: 241513,
  },
  {
    seat: "NA-78",
    voterTurnout: 41.13,
    totalVotes: 235061,
  },
  {
    seat: "NA-79",
    voterTurnout: 50.62,
    totalVotes: 293978,
  },
  {
    seat: "NA-80",
    voterTurnout: 39.85,
    totalVotes: 234327,
  },
  {
    seat: "NA-81",
    voterTurnout: 52.02,
    totalVotes: 266622,
  },
  {
    seat: "NA-82",
    voterTurnout: 52.09,
    totalVotes: 284402,
  },
  {
    seat: "NA-83",
    voterTurnout: 52.55,
    totalVotes: 268068,
  },
  {
    seat: "NA-84",
    voterTurnout: 45.74,
    totalVotes: 236454,
  },
  {
    seat: "NA-85",
    voterTurnout: 54.75,
    totalVotes: 271104,
  },
  {
    seat: "NA-86",
    voterTurnout: 50.83,
    totalVotes: 260812,
  },
  {
    seat: "NA-87",
    voterTurnout: 55.39,
    totalVotes: 269553,
  },
  {
    seat: "NA-88",
    voterTurnout: undefined,
    totalVotes: undefined,
  },
  {
    seat: "NA-89",
    voterTurnout: 54.49,
    totalVotes: 300394,
  },
  {
    seat: "NA-90",
    voterTurnout: 58.2,
    totalVotes: 284580,
  },
  {
    seat: "NA-91",
    voterTurnout: 62.93,
    totalVotes: 307057,
  },
  {
    seat: "NA-92",
    voterTurnout: 67.38,
    totalVotes: 347558,
  },
  {
    seat: "NA-93",
    voterTurnout: 54.45,
    totalVotes: 228744,
  },
  {
    seat: "NA-94",
    voterTurnout: 57.22,
    totalVotes: 248293,
  },
  {
    seat: "NA-95",
    voterTurnout: 55.41,
    totalVotes: 278347,
  },
  {
    seat: "NA-96",
    voterTurnout: 49.88,
    totalVotes: 274676,
  },
  {
    seat: "NA-97",
    voterTurnout: 51.17,
    totalVotes: 242133,
  },
  {
    seat: "NA-98",
    voterTurnout: 50.79,
    totalVotes: 285585,
  },
  {
    seat: "NA-99",
    voterTurnout: 52.73,
    totalVotes: 249487,
  },
  {
    seat: "NA-100",
    voterTurnout: 55.25,
    totalVotes: 275022,
  },
  {
    seat: "NA-101",
    voterTurnout: 49.68,
    totalVotes: 259009,
  },
  {
    seat: "NA-102",
    voterTurnout: 48.87,
    totalVotes: 259655,
  },
  {
    seat: "NA-103",
    voterTurnout: 48.25,
    totalVotes: 259161,
  },
  {
    seat: "NA-104",
    voterTurnout: 49.58,
    totalVotes: 257744,
  },
  {
    seat: "NA-105",
    voterTurnout: 56.6,
    totalVotes: 284957,
  },
  {
    seat: "NA-106",
    voterTurnout: 56.78,
    totalVotes: 313826,
  },
  {
    seat: "NA-107",
    voterTurnout: 58.14,
    totalVotes: 285324,
  },
  {
    seat: "NA-108",
    voterTurnout: 59.32,
    totalVotes: 334765,
  },
  {
    seat: "NA-109",
    voterTurnout: 52,
    totalVotes: 299456,
  },
  {
    seat: "NA-110",
    voterTurnout: 60.58,
    totalVotes: 339331,
  },
  {
    seat: "NA-111",
    voterTurnout: 52.89,
    totalVotes: 248133,
  },
  {
    seat: "NA-112",
    voterTurnout: 54.45,
    totalVotes: 244447,
  },
  {
    seat: "NA-113",
    voterTurnout: 49.88,
    totalVotes: 258993,
  },
  {
    seat: "NA-114",
    voterTurnout: 51.92,
    totalVotes: 228600,
  },
  {
    seat: "NA-115",
    voterTurnout: 50.34,
    totalVotes: 268534,
  },
  {
    seat: "NA-116",
    voterTurnout: 51.72,
    totalVotes: 294418,
  },
  {
    seat: "NA-117",
    voterTurnout: 44.97,
    totalVotes: 228400,
  },
  {
    seat: "NA-118",
    voterTurnout: 35.83,
    totalVotes: 258137,
  },
  {
    seat: "NA-119",
    voterTurnout: 38.59,
    totalVotes: 196885,
  },
  {
    seat: "NA-120",
    voterTurnout: 44.94,
    totalVotes: 159762,
  },
  {
    seat: "NA-121",
    voterTurnout: 40.08,
    totalVotes: 184078,
  },
  {
    seat: "NA-122",
    voterTurnout: 40.54,
    totalVotes: 227357,
  },
  {
    seat: "NA-123",
    voterTurnout: 47.08,
    totalVotes: 155642,
  },
  {
    seat: "NA-124",
    voterTurnout: 41.76,
    totalVotes: 124991,
  },
  {
    seat: "NA-125",
    voterTurnout: 48.12,
    totalVotes: 160021,
  },
  {
    seat: "NA-126",
    voterTurnout: 44,
    totalVotes: 151276,
  },
  {
    seat: "NA-127",
    voterTurnout: 41.67,
    totalVotes: 217114,
  },
  {
    seat: "NA-128",
    voterTurnout: 56.26,
    totalVotes: 377029,
  },
  {
    seat: "NA-129",
    voterTurnout: 40.36,
    totalVotes: 209574,
  },
  {
    seat: "NA-130",
    voterTurnout: 52.45,
    totalVotes: 315707,
  },
  {
    seat: "NA-131",
    voterTurnout: 53.37,
    totalVotes: 294072,
  },
  {
    seat: "NA-132",
    voterTurnout: 57.75,
    totalVotes: 297783,
  },
  {
    seat: "NA-133",
    voterTurnout: 56.96,
    totalVotes: 315971,
  },
  {
    seat: "NA-134",
    voterTurnout: 55.7,
    totalVotes: 307908,
  },
  {
    seat: "NA-135",
    voterTurnout: 57.64,
    totalVotes: 292741,
  },
  {
    seat: "NA-136",
    voterTurnout: 52.12,
    totalVotes: 257937,
  },
  {
    seat: "NA-137",
    voterTurnout: 54.74,
    totalVotes: 281363,
  },
  {
    seat: "NA-138",
    voterTurnout: 55.64,
    totalVotes: 282271,
  },
  {
    seat: "NA-139",
    voterTurnout: 52.11,
    totalVotes: 313678,
  },
  {
    seat: "NA-140",
    voterTurnout: 55.72,
    totalVotes: 323112,
  },
  {
    seat: "NA-141",
    voterTurnout: 49.83,
    totalVotes: 283161,
  },
  {
    seat: "NA-142",
    voterTurnout: 53.74,
    totalVotes: 302321,
  },
  {
    seat: "NA-143",
    voterTurnout: 55.96,
    totalVotes: 321205,
  },
  {
    seat: "NA-144",
    voterTurnout: 58.98,
    totalVotes: 265434,
  },
  {
    seat: "NA-145",
    voterTurnout: 53.57,
    totalVotes: 242011,
  },
  {
    seat: "NA-146",
    voterTurnout: 53.85,
    totalVotes: 272897,
  },
  {
    seat: "NA-147",
    voterTurnout: 56.95,
    totalVotes: 279115,
  },
  {
    seat: "NA-148",
    voterTurnout: 52.5,
    totalVotes: 216842,
  },
  {
    seat: "NA-149",
    voterTurnout: 43.76,
    totalVotes: 233206,
  },
  {
    seat: "NA-150",
    voterTurnout: 43.31,
    totalVotes: 248572,
  },
  {
    seat: "NA-151",
    voterTurnout: 53.62,
    totalVotes: 237879,
  },
  {
    seat: "NA-152",
    voterTurnout: 51.36,
    totalVotes: 264306,
  },
  {
    seat: "NA-153",
    voterTurnout: 52,
    totalVotes: 272307,
  },
  {
    seat: "NA-154",
    voterTurnout: 53.87,
    totalVotes: 301008,
  },
  {
    seat: "NA-155",
    voterTurnout: 53.08,
    totalVotes: 287797,
  },
  {
    seat: "NA-156",
    voterTurnout: 53.47,
    totalVotes: 254998,
  },
  {
    seat: "NA-157",
    voterTurnout: 55.19,
    totalVotes: 248257,
  },
  {
    seat: "NA-158",
    voterTurnout: 54.41,
    totalVotes: 261805,
  },
  {
    seat: "NA-159",
    voterTurnout: 54.89,
    totalVotes: 263799,
  },
  {
    seat: "NA-160",
    voterTurnout: 60.84,
    totalVotes: 261529,
  },
  {
    seat: "NA-161",
    voterTurnout: 54.09,
    totalVotes: 242383,
  },
  {
    seat: "NA-162",
    voterTurnout: 55.91,
    totalVotes: 267285,
  },
  {
    seat: "NA-163",
    voterTurnout: 57.25,
    totalVotes: 274482,
  },
  {
    seat: "NA-164",
    voterTurnout: 57.78,
    totalVotes: 276292,
  },
  {
    seat: "NA-165",
    voterTurnout: 63.65,
    totalVotes: 298985,
  },
  {
    seat: "NA-166",
    voterTurnout: 50.34,
    totalVotes: 212770,
  },
  {
    seat: "NA-167",
    voterTurnout: 51.9,
    totalVotes: 232550,
  },
  {
    seat: "NA-168",
    voterTurnout: 47.77,
    totalVotes: 210789,
  },
  {
    seat: "NA-169",
    voterTurnout: 50.09,
    totalVotes: 254625,
  },
  {
    seat: "NA-170",
    voterTurnout: 49.21,
    totalVotes: 245044,
  },
  {
    seat: "NA-171",
    voterTurnout: 47.23,
    totalVotes: 236194,
  },
  {
    seat: "NA-172",
    voterTurnout: 50.52,
    totalVotes: 253822,
  },
  {
    seat: "NA-173",
    voterTurnout: 50.46,
    totalVotes: 236797,
  },
  {
    seat: "NA-174",
    voterTurnout: 52.07,
    totalVotes: 255122,
  },
  {
    seat: "NA-175",
    voterTurnout: 60.06,
    totalVotes: 266686,
  },
  {
    seat: "NA-176",
    voterTurnout: 53.25,
    totalVotes: 227979,
  },
  {
    seat: "NA-177",
    voterTurnout: 53.59,
    totalVotes: 223598,
  },
  {
    seat: "NA-178",
    voterTurnout: 52.35,
    totalVotes: 224337,
  },
  {
    seat: "NA-179",
    voterTurnout: 42.19,
    totalVotes: 158166,
  },
  {
    seat: "NA-180",
    voterTurnout: 51.9,
    totalVotes: 198688,
  },
  {
    seat: "NA-181",
    voterTurnout: 59.2,
    totalVotes: 328384,
  },
  {
    seat: "NA-182",
    voterTurnout: 60.22,
    totalVotes: 320637,
  },
  {
    seat: "NA-183",
    voterTurnout: 56.27,
    totalVotes: 261685,
  },
  {
    seat: "NA-184",
    voterTurnout: 56.29,
    totalVotes: 246693,
  },
  {
    seat: "NA-185",
    voterTurnout: 45.84,
    totalVotes: 176476,
  },
  {
    seat: "NA-186",
    voterTurnout: 54.79,
    totalVotes: 212043,
  },
  {
    seat: "NA-187",
    voterTurnout: 49.19,
    totalVotes: 186775,
  },
  {
    seat: "NA-188",
    voterTurnout: 50.5,
    totalVotes: 181694,
  },
  {
    seat: "NA-189",
    voterTurnout: 51.73,
    totalVotes: 184421,
  },
  {
    seat: "NA-190",
    voterTurnout: 42.68,
    totalVotes: 199087,
  },
  {
    seat: "NA-191",
    voterTurnout: 46.11,
    totalVotes: 214547,
  },
  {
    seat: "NA-192",
    voterTurnout: 55.21,
    totalVotes: 212534,
  },
  {
    seat: "NA-193",
    voterTurnout: 44.53,
    totalVotes: 216770,
  },
  {
    seat: "NA-194",
    voterTurnout: 42.78,
    totalVotes: 180613,
  },
  {
    seat: "NA-195",
    voterTurnout: 45.92,
    totalVotes: 189235,
  },
  {
    seat: "NA-196",
    voterTurnout: 34.89,
    totalVotes: 135379,
  },
  {
    seat: "NA-197",
    voterTurnout: 32.86,
    totalVotes: 124872,
  },
  {
    seat: "NA-198",
    voterTurnout: 55.16,
    totalVotes: 235322,
  },
  {
    seat: "NA-199",
    voterTurnout: 46.92,
    totalVotes: 205747,
  },
  {
    seat: "NA-200",
    voterTurnout: 39.31,
    totalVotes: 173148,
  },
  {
    seat: "NA-201",
    voterTurnout: 50.44,
    totalVotes: 181965,
  },
  {
    seat: "NA-202",
    voterTurnout: 45.38,
    totalVotes: 196903,
  },
  {
    seat: "NA-203",
    voterTurnout: 57.05,
    totalVotes: 234727,
  },
  {
    seat: "NA-204",
    voterTurnout: 43.52,
    totalVotes: 207411,
  },
  {
    seat: "NA-205",
    voterTurnout: 46.47,
    totalVotes: 215057,
  },
  {
    seat: "NA-206",
    voterTurnout: 49.16,
    totalVotes: 220455,
  },
  {
    seat: "NA-207",
    voterTurnout: 44.52,
    totalVotes: 214726,
  },
  {
    seat: "NA-208",
    voterTurnout: 50.67,
    totalVotes: 206064,
  },
  {
    seat: "NA-209",
    voterTurnout: 52.06,
    totalVotes: 304473,
  },
  {
    seat: "NA-210",
    voterTurnout: 47.08,
    totalVotes: 275074,
  },
  {
    seat: "NA-211",
    voterTurnout: 43.86,
    totalVotes: 181810,
  },
  {
    seat: "NA-212",
    voterTurnout: 47.27,
    totalVotes: 196512,
  },
  {
    seat: "NA-213",
    voterTurnout: 50.56,
    totalVotes: 280391,
  },
  {
    seat: "NA-214",
    voterTurnout: 70.94,
    totalVotes: 211497,
  },
  {
    seat: "NA-215",
    voterTurnout: 67.06,
    totalVotes: 266664,
  },
  {
    seat: "NA-216",
    voterTurnout: 53.83,
    totalVotes: 216314,
  },
  {
    seat: "NA-217",
    voterTurnout: 47.77,
    totalVotes: 208523,
  },
  {
    seat: "NA-218",
    voterTurnout: 40.84,
    totalVotes: 133402,
  },
  {
    seat: "NA-219",
    voterTurnout: 34.91,
    totalVotes: 145151,
  },
  {
    seat: "NA-220",
    voterTurnout: 38.6,
    totalVotes: 175324,
  },
  {
    seat: "NA-221",
    voterTurnout: 48.23,
    totalVotes: 162760,
  },
  {
    seat: "NA-222",
    voterTurnout: 44.86,
    totalVotes: 199753,
  },
  {
    seat: "NA-223",
    voterTurnout: 49.75,
    totalVotes: 221482,
  },
  {
    seat: "NA-224",
    voterTurnout: 46.72,
    totalVotes: 185999,
  },
  {
    seat: "NA-225",
    voterTurnout: 37.33,
    totalVotes: 186701,
  },
  {
    seat: "NA-226",
    voterTurnout: 48.42,
    totalVotes: 222339,
  },
  {
    seat: "NA-227",
    voterTurnout: 44.66,
    totalVotes: 205020,
  },
  {
    seat: "NA-228",
    voterTurnout: 39.37,
    totalVotes: 169084,
  },
  {
    seat: "NA-229",
    voterTurnout: 45.62,
    totalVotes: 103712,
  },
  {
    seat: "NA-230",
    voterTurnout: 40.88,
    totalVotes: 99546,
  },
  {
    seat: "NA-231",
    voterTurnout: 38.71,
    totalVotes: 130081,
  },
  {
    seat: "NA-232",
    voterTurnout: 43.6,
    totalVotes: 255270,
  },
  {
    seat: "NA-233",
    voterTurnout: 46.82,
    totalVotes: 246391,
  },
  {
    seat: "NA-234",
    voterTurnout: 45.39,
    totalVotes: 173082,
  },
  {
    seat: "NA-235",
    voterTurnout: 40.5,
    totalVotes: 67258,
  },
  {
    seat: "NA-236",
    voterTurnout: 24.93,
    totalVotes: 135164,
  },
  {
    seat: "NA-237",
    voterTurnout: 35.66,
    totalVotes: 144709,
  },
  {
    seat: "NA-238",
    voterTurnout: 30.49,
    totalVotes: 167993,
  },
  {
    seat: "NA-239",
    voterTurnout: 31.22,
    totalVotes: 129221,
  },
  {
    seat: "NA-240",
    voterTurnout: 30,
    totalVotes: 114982,
  },
  {
    seat: "NA-241",
    voterTurnout: 23,
    totalVotes: undefined,
  },
  {
    seat: "NA-242",
    voterTurnout: 43.71,
    totalVotes: 188901,
  },
  {
    seat: "NA-243",
    voterTurnout: 37.49,
    totalVotes: 167013,
  },
  {
    seat: "NA-244",
    voterTurnout: 38.95,
    totalVotes: 59391,
  },
  {
    seat: "NA-245",
    voterTurnout: 43.23,
    totalVotes: 159103,
  },
  {
    seat: "NA-246",
    voterTurnout: 44.32,
    totalVotes: 185083,
  },
  {
    seat: "NA-247",
    voterTurnout: 43.4,
    totalVotes: 186478,
  },
  {
    seat: "NA-248",
    voterTurnout: 44.36,
    totalVotes: 265193,
  },
  {
    seat: "NA-249",
    voterTurnout: 36.63,
    totalVotes: 200433,
  },
  {
    seat: "NA-250",
    voterTurnout: 34.51,
    totalVotes: 188364,
  },
  {
    seat: "NA-251",
    voterTurnout: 44.92,
    totalVotes: 138094,
  },
  {
    seat: "NA-252",
    voterTurnout: 56.58,
    totalVotes: 190871,
  },
  {
    seat: "NA-253",
    voterTurnout: 51.16,
    totalVotes: 224275,
  },
  {
    seat: "NA-254",
    voterTurnout: 47,
    totalVotes: 144875,
  },
  {
    seat: "NA-255",
    voterTurnout: 36.96,
    totalVotes: 180598,
  },
  {
    seat: "NA-256",
    voterTurnout: 48.27,
    totalVotes: 136373,
  },
  {
    seat: "NA-257",
    voterTurnout: 51.1,
    totalVotes: 177704,
  },
  {
    seat: "NA-258",
    voterTurnout: 27,
    totalVotes: 59463,
  },
  {
    seat: "NA-259",
    voterTurnout: 38.19,
    totalVotes: 113560,
  },
  {
    seat: "NA-260",
    voterTurnout: 48.51,
    totalVotes: 170015,
  },
  {
    seat: "NA-261",
    voterTurnout: 36.78,
    totalVotes: 106840,
  },
  {
    seat: "NA-262",
    voterTurnout: 32.32,
    totalVotes: 75926,
  },
  {
    seat: "NA-263",
    voterTurnout: 28.34,
    totalVotes: 115726,
  },
  {
    seat: "NA-264",
    voterTurnout: 28.68,
    totalVotes: 55727,
  },
  {
    seat: "NA-265",
    voterTurnout: 40.9,
    totalVotes: 124369,
  },
  {
    seat: "NA-266",
    voterTurnout: 57,
    totalVotes: 201394,
  },
];

export { turnoutAndVotes };
