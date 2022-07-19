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
  ALL_USER_FETCH_SUCCESS
} from "./actionType";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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

      console.log(res.data);
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

    return created;
  };
};

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

export const inputBabyDataAct = inputCreate => {
  return async dispatch => {
    let created = await axios({
      method: "POST",
      url: baseURL + "/inputBabyData",
      headers: {
        access_token: localStorage.getItem(`access_token`)
      },
      data: { ...inputCreate }
    });
    dispatch(fetchCombinedData());

    return created;
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

// export function PostLogin(form) {
//   return async function (dispatch) {
//     try{
//       const res = await axios({
//         method: "post",
//         url: `${baseURL}/login`,
//         data: form
//       })
//       console.log(res)
//       localStorage.setItem("access_token", res.data.access_token);
//     }
//     catch (err){
//       console.log(err)

//     }
//   }
// }
export function PostLogin(form) {
  return dispatch => {
    return fetch(baseURL + "/login", {
      method: "Post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });
  };
}
