import {
  FETCH_LOADING,
  COMBINED_DATA_FETCH_SUCCESS,
  RT_DATA_FETCH_SUCCESS,
  PREGNANCY_DATA_FETCH_SUCCESS,
  BABY_DATA_FETCH_SUCCESS,
  PREGNANT_MOTHER_DATA,
  PREGNANCY_DETAIL,
  GIZI_KURANG_TERBANYAK,
  GIZI_CUKUP_TERBANYAK,
  GIZI_BERLEBIH_TERBANYAK,
  MOTHER_DETAIL,
  MOTHER_PREGNANCY,
  MOTHER_LIST_BY_RT_FETCH_SUCCESS,
  WATCHLIST_FETCH_SUCCESS,
  ALL_USER_FETCH_SUCCESS,
  USER_DETAIL,
  RECORDED_DATE,
  BABY_ID,
  PREGNANCY_ID
} from "./actionType";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const baseURL = `http://localhost:3001`;

export const isLoading = payload => {
  return {
    type: FETCH_LOADING,
    payload
  };
};
export const combinedDataFetchSucess = payload => {
  return {
    type: COMBINED_DATA_FETCH_SUCCESS,
    payload
  };
};
export const rtDataFetchSucess = payload => {
  return {
    type: RT_DATA_FETCH_SUCCESS,
    payload
  };
};
export const pregnancyDataFetchSucess = payload => {
  return {
    type: PREGNANCY_DATA_FETCH_SUCCESS,
    payload
  };
};
export const babyDataFetchSucess = payload => {
  return {
    type: BABY_DATA_FETCH_SUCCESS,
    payload
  };
};
export const pregnantMotherFetch = payload => {
  return {
    type: PREGNANT_MOTHER_DATA,
    payload
  };
};
export const pregnancyDetailFetch = payload => {
  return {
    type: PREGNANCY_DETAIL,
    payload
  };
};
export const motherProfileDetail = payload => {
  return {
    type: MOTHER_DETAIL,
    payload
  };
};
export const motherPregnancy = payload => {
  return {
    type: MOTHER_PREGNANCY,
    payload
  };
};
export const giziKurangFetch = payload => {
  return {
    type: GIZI_KURANG_TERBANYAK,
    payload
  };
};
export const giziCukupFetch = payload => {
  return {
    type: GIZI_CUKUP_TERBANYAK,
    payload
  };
};
export const giziBerlebihFetch = payload => {
  return {
    type: GIZI_BERLEBIH_TERBANYAK,
    payload
  };
};
export const motherList = payload => {
  return {
    type: MOTHER_LIST_BY_RT_FETCH_SUCCESS,
    payload
  };
};
export const watchlistFetch = payload => {
  return {
    type: WATCHLIST_FETCH_SUCCESS,
    payload
  };
};
export const allUserFetch = payload => {
  return {
    type: ALL_USER_FETCH_SUCCESS,
    payload
  };
};
export const userDetailFetch = payload => {
  return {
    type: USER_DETAIL,
    payload
  };
};
export const recordedDate = payload => {
  return {
    type: RECORDED_DATE,
    payload
  };
};
export const babyId = payload => {
  return {
    type: BABY_ID,
    payload
  };
};
export const pregnancyId = payload => {
  return {
    type: PREGNANCY_ID,
    payload
  };
};

export function fetchCombinedData() {
  return async function(dispatch) {
    try {
      const res = await axios.get(`${baseURL}/babyWeigthCategories`, {
        headers: {
          access_token: localStorage.getItem(`access_token`)
        }
      });

      if (!res) {
        throw new Error(`Network Error`);
      }

      const data = res.data.categories;
      const combinedData = [data.kurang, data.cukup, data.berlebih];
      const giziKurang = res.data.statistic.giziKurangTerbanyak.noRT;
      const giziCukup = res.data.statistic.giziCukupTerbanyak.noRT;
      const giziBerlebih = res.data.statistic.giziBerlebihTerbanyak.noRT;

      dispatch(combinedDataFetchSucess(combinedData));
      dispatch(pregnantMotherFetch(res.data.ibuBelumMelahirkan));
      dispatch(giziKurangFetch(giziKurang));
      dispatch(giziCukupFetch(giziCukup));
      dispatch(giziBerlebihFetch(giziBerlebih));
      dispatch(rtDataFetchSucess(0));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(isLoading(false));
    }
  };
}

export const useDataRT = () => {
  const dispatch = useDispatch();

  const fetchRTData = rt => {
    axios
      .get(`${baseURL}/babyWeigthCategories/${rt}`, {
        headers: {
          access_token: localStorage.getItem(`access_token`)
        }
      })
      .then(res => {
        if (!res) {
          throw new Error(`Network Error`);
        }
        return res;
      })
      .then(result => {
        const data = result.data.categories;
        const combinedData = [data.kurang, data.cukup, data.berlebih];

        dispatch(rtDataFetchSucess(rt));
        dispatch(combinedDataFetchSucess(combinedData));
        dispatch(pregnantMotherFetch(result.data.ibuBelumMelahirkan));
      })
      .catch(err => {
        console.log(err);
      });
  };
  return { fetchRTData };
};

export function fetchDetailData(id) {
  return async function(dispatch) {
    try {
      const res = await axios.get(`${baseURL}/detailpregnancy/${id}`, {
        headers: {
          access_token: localStorage.getItem(`access_token`)
        }
      });

      dispatch(pregnancyDetailFetch(res.data.data));
      dispatch(pregnancyDataFetchSucess(res.data.selisihBulananHamil));
      dispatch(babyDataFetchSucess(res.data.selisihBulananBayi));
      dispatch(motherProfileDetail(res.data.data.MotherProfile));
      dispatch(motherPregnancy(res.data.data.PregnancyDatum));
      dispatch(pregnancyId(res.data.data.PregnancyDatum.id));
      dispatch(babyId(res.data.data.BabyDatum.id));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(isLoading(false));
    }
  };
}

export function motherListByRT(id) {
  return async function(dispatch) {
    try {
      const res = await axios.get(`${baseURL}/listMotherProfile/${id}`, {
        headers: {
          access_token: localStorage.getItem(`access_token`)
        }
      });

      dispatch(motherList(res.data));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(isLoading(false));
    }
  };
}

export function allUsers() {
  return async function(dispatch) {
    try {
      const res = await axios.get(`${baseURL}/listUser`, {
        headers: {
          access_token: localStorage.getItem(`access_token`)
        }
      });

      dispatch(allUserFetch(res.data));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(isLoading(false));
    }
  };
}

export const registerMother = inputCreate => {
  return async dispatch => {
    let created = await axios({
      method: "POST",
      url: baseURL + "/registerMotherProfile",
      headers: {
        access_token: localStorage.getItem(`access_token`)
      },

      data: {
        ...inputCreate,
        latitude: +inputCreate.lat,
        longitude: +inputCreate.lng
      }
    });
    dispatch(fetchCombinedData());

    return created;
  };
};

export const registerUser = inputCreate => {
  return async dispatch => {
    let created = await axios({
      method: "POST",
      url: baseURL + "/registerUser",
      headers: {
        access_token: localStorage.getItem(`access_token`)
      },
      data: { ...inputCreate, noRT: inputCreate.RT }
    });
    dispatch(fetchCombinedData());

    return created;
  };
};

export const registerPregnancy = inputCreate => {
  return async dispatch => {
    let created = await axios({
      method: "POST",
      url: baseURL + "/registerPregnancy",
      headers: {
        access_token: localStorage.getItem(`access_token`)
      },
      data: { ...inputCreate }
    });
    dispatch(fetchCombinedData());

    console.log(inputCreate.sudahLahir, `<<<<<<`);
    if (inputCreate.sudahLahir === "true") {
      return { ...created, sudahLahir: true };
    } else {
      return { ...created, sudahLahir: false };
    }

    return created;
  };
};

export function fetchMotherListOnly() {
  return async function(dispatch) {
    try {
      const res = await axios.get(`${baseURL}/listMotherProfile`, {
        headers: {
          access_token: localStorage.getItem(`access_token`)
        }
      });
      // console.log(res)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
}

export const createPregnancyData = inputCreate => {
  return async dispatch => {
    let created = await axios({
      method: "POST",
      url: baseURL + "/registerPregnancyData",
      headers: {
        access_token: localStorage.getItem(`access_token`)
      },

      data: { ...inputCreate }
    });
    dispatch(fetchCombinedData());

    return created;
  };
};

export const createBabyData = inputCreate => {
  return async dispatch => {
    let created = await axios({
      method: "POST",
      url: baseURL + "/registerBabyData",
      headers: {
        access_token: localStorage.getItem(`access_token`)
      },
      data: { ...inputCreate }
    });
    dispatch(fetchCombinedData());

    return created;
  };
};

export const inputBabyDataAct = inputCreate => {
  return async dispatch => {
    console.log(inputCreate);

    let arr = [
      inputCreate.b1,
      inputCreate.b2,
      inputCreate.b3,
      inputCreate.b4,
      inputCreate.b5,
      inputCreate.b6,
      inputCreate.b7,
      inputCreate.b8,
      inputCreate.b9,
      inputCreate.b10,
      inputCreate.b11,
      inputCreate.b12,
      inputCreate.b13,
      inputCreate.b14,
      inputCreate.b15,
      inputCreate.b16,
      inputCreate.b17,
      inputCreate.b18,
      inputCreate.b19,
      inputCreate.b20,
      inputCreate.b21,
      inputCreate.b22,
      inputCreate.b23,
      inputCreate.b24
    ];

    let beratBulananStr = "";

    arr.forEach(el => {
      if (el) {
        beratBulananStr += el + ",";
      }
    });
    beratBulananStr = beratBulananStr.slice(0, -1);

    // console.log(beratBulananStr)
    console.log({ ...inputCreate, beratBulanan: beratBulananStr }, `ini zlr`);

    let created = await axios({
      method: "PUT",
      url: baseURL + `/babyData/${inputCreate.BabyDataId}`,
      headers: {
        access_token: localStorage.getItem(`access_token`)
      },
      data: { ...inputCreate, beratBulanan: beratBulananStr }
    });
    dispatch(fetchCombinedData());

    return created;
  };
};

export const fetchBabyData = id => {
  return async dispatch => {
    let data = await axios({
      method: "GET",
      url: baseURL + `/babyData/${id}`,
      headers: {
        access_token: localStorage.getItem(`access_token`)
      }
    });

    return { data };
  };
};

export const inputPregnancyData = inputCreate => {
  return async dispatch => {
    console.log(inputCreate);

    let arr = [
      inputCreate.b1,
      inputCreate.b2,
      inputCreate.b3,
      inputCreate.b4,
      inputCreate.b5,
      inputCreate.b6,
      inputCreate.b7,
      inputCreate.b8,
      inputCreate.b9
    ];

    let beratBulananStr = "";

    arr.forEach(el => {
      if (el) {
        beratBulananStr += el + ",";
      }
    });
    beratBulananStr = beratBulananStr.slice(0, -1);

    // console.log(beratBulananStr)
    console.log({ ...inputCreate, beratBulanan: beratBulananStr }, `ini zlr`);

    let created = await axios({
      method: "PUT",
      url: baseURL + `/pregnancyData/${inputCreate.PregnancyDataId}`,
      headers: {
        access_token: localStorage.getItem(`access_token`)
      },
      data: { ...inputCreate, beratBulanan: beratBulananStr }
    });
    dispatch(fetchCombinedData());

    return created;
  };
};

export const fetchPregnancyData = id => {
  return async dispatch => {
    let data = await axios({
      method: "GET",
      url: baseURL + `/pregnancyData/${id}`,
      headers: {
        access_token: localStorage.getItem(`access_token`)
      }
    });

    return { data };
  };
};

export function watchlist() {
  return async function(dispatch) {
    try {
      const res = await axios.get(`${baseURL}/RTStatus`, {
        headers: {
          access_token: localStorage.getItem(`access_token`)
        }
      });

      dispatch(watchlistFetch(res.data));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(isLoading(false));
    }
  };
}

export const useLogin = () => {
  const navigate = useNavigate();

  const PostLogin = form => {
    return async function(dispatch) {
      try {
        const response = await axios.post(`${baseURL}/login`, form, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response) {
          throw { message: response.statusText };
        }

        const access_token = response.data.access_token;
        const id = response.data.id;
        const username = response.data.username;
        const role = response.data.role;

        const userDetail = {
          id: response.data.id,
          username: response.data.username,
          role: response.data.role
        };

        localStorage.setItem(`access_token`, access_token);
        localStorage.setItem(`id`, id);
        localStorage.setItem(`username`, username);
        localStorage.setItem(`role`, role);

        navigate("/");

        Swal.fire({
          title: "Login Success",
          text: "Welcome",
          icon: "success"
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "ERROR",
          text: err.message,
          icon: "error"
        });
      }
    };
  };

  return {
    PostLogin
  };
};

export const useConverter = () => {
  const dispatch = useDispatch();
  const dateConverter = str => {
    try {
      let arr = str.split("T");

      let date = arr[0];

      let result = date.split("-").reverse().join("-");

      dispatch(recordedDate(result));
    } catch (err) {
      console.log(err);
    }
  };

  const islandConverter = value => {
    const islands = [
      "Pulau Pari",
      "Pulau Tidung",
      "Pulau Panggang",
      "Pulau Kelapa",
      "Pulau Putri",
      "Pulau Harapan",
      "Pulau Untung Jawa",
      "Pulau Lancang Besar",
      "Pulau Pramuk"
    ];

    let result = "";

    for (let i = 0; i < islands.length; i++) {
      const island = islands[i];

      if (value === i + 1) {
        result = island;
      }
    }

    return result;
  };

  return {
    dateConverter,
    islandConverter
  };
};

export function fetchUserDetail() {
  return async function(dispatch) {
    try {
      const id = localStorage.getItem(`id`);
      const username = localStorage.getItem(`username`);
      const role = localStorage.getItem(`role`);

      const userDetail = {
        id,
        username,
        role
      };

      dispatch(userDetailFetch(userDetail));
      dispatch();
    } catch (err) {
      console.log(err);
    }
  };
}
