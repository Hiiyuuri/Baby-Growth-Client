import {
  COMBINED_DATA_FETCH_SUCCESS,
  RT_DATA_FETCH_SUCCESS,
  PREGNANCY_DATA_FETCH_SUCCESS,
  BABY_DATA_FETCH_SUCCESS
} from "./actionType";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = `http://localhost:3001`;

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

const dummy = [
  {
    data: [18, 27, 35]
  }
];

export function fetchCombinedData() {
  return async function(dispatch) {
    try {
      //   const res = await axios.get(`${baseURL}`);

      //   if (!res) {
      //     throw new Error(`Network Error`);
      //   }

      //   const result = res.json();

      dispatch(combinedDataFetchSucess(dummy[0].data));
    } catch (err) {
      console.log(err);
    }
  };
}

const rtDummy = [
  {
    noRT: 1,
    data: [4, 3, 1]
  },
  {
    noRT: 2,
    data: [0, 5, 3]
  },
  {
    noRT: 3,
    data: [2, 4, 0]
  }
];

export function fetchRTData(rt) {
  console.log(rt);
  return async function(dispatch) {
    try {
      //   const res = await axios.get(`${baseURL}`);

      //   if (!res) {
      //     throw new Error(`Network Error`);
      //   }

      //   const result = res.json();

      dispatch(rtDataFetchSucess(rtDummy[0]));
    } catch (err) {
      console.log(err);
    }
  };
}

const pregnancyDummy = [500, 600, 700, 400, 500, 300, 800, 700, 500];

const babyDummy = [500, 600, 700, 400, 500];

export function fetchPregnancyData(id) {
  return async function(dispatch) {
    try {
      dispatch(pregnancyDataFetchSucess(pregnancyDummy));
    } catch (err) {
      console.log(err);
    }
  };
}

export function fetchBabyData(id) {
  return async function(dispatch) {
    try {
      dispatch(babyDataFetchSucess(babyDummy));
    } catch (err) {
      console.log(err);
    }
  };
}
