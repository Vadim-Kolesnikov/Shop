import axios from "axios";
import SETTINGS from "./settings";


// функции для взаимодействия с сервером
async function getData(trackPromise, apiUrl, token, setFn) {
  const instance = axios.create({
    baseURL: apiUrl,
    headers: { Authorization: `Token ${token}` },
  });

  trackPromise(
    instance.get().then((resp) => {
      const data = resp.data;
      setFn(data);
    })
  );
}

async function sendData(url, method, data, params = "", setFn = null, baseUrl=SETTINGS.BASE_URL) {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Token ${SETTINGS.TOKEN}` },
    data: data,
  });
  if (method == "patch") {
    instance.patch(url + params, data).then((resp) => {});
  } else if (method == "delete") {
    instance.delete(url + params, data).then((resp) => {});
  } else if (method == "post") {
    instance.post(url + params, data).then((resp) => {});
  } else if (method == "get") {
    instance.get(url + params, data).then((resp) => {
      if (setFn) {
        setFn(resp.data);
      }
    });
  }
  return null;
}


// функции для преобразования данных в квери параметры 
function makeQueryParamList(arr) {
  let st = "";
  let el;
  for (let i = 0; i < arr.length; i++) {
    el = arr[i];
    if (i == arr.length - 1) st += String(el);
    else st += String(el) + "+";
  }
  return st;
}

function makeQueryStrFromArrs(obj) {
  let params = "";
  let value;
  for (let key in obj) {
    value = obj[key];

    if (value.length > 0) {
      params += key + "=";
      value = makeQueryParamList(value);
      params += value + "&";
    }
  }
  return params;
}

function makeQueryStrFromStrings(obj) {
  let params = "";
  let value;
  for (let key in obj) {
    value = obj[key];

    params += key + "=";
    params += value + "&";
  }
  return params;
}

// функции для чекбоксов
function getChecked(values, elements) {
  let valueIds = [];
  for (let i = 0; i < elements.length; i++) {
    console.log(elements[i].checked);
    if (elements[i].checked) {
      valueIds.push(values[i].id);
    }
  }
  return valueIds;
}

function resetCheckBoxes(elements) {
  for (let elem of elements) {
    elem.checked = false;
  }
}

const utils = {
  sendData: sendData,
  getData: getData,
  makeQueryStrFromArrs: makeQueryStrFromArrs,
  makeQueryStrFromStrings: makeQueryStrFromStrings,
  getChecked: getChecked,
  resetCheckBoxes: resetCheckBoxes
};

export default utils;
