import { takeLatest, all, call, put } from "redux-saga/effects";

import CATEGORIES_ACTION_TYPES from "./categories.types";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

function* fetchCategoriesAsync() {
  try {
    const catArray = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(catArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
