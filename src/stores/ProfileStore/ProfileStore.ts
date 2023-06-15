import { createStore } from "effector";

import { loadProfile, loadProfileDone, loadProfileFail } from "./ProfileEvents";

import { ProfileState } from "./ProfileState";

const initialState: ProfileState = {
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

const ProfileStore = createStore<ProfileState>(initialState)
  .on(loadProfile, (state) => ({
    ...state,
    isLoading: true,
    hasError: false,
    errorMessage: "",
  }))
  .on(loadProfileDone, (state) => ({
    ...state,
    isLoading: false,
    hasError: false,
    errorMessage: "",
  }))
  .on(loadProfileFail, (_, data) => ({
    hasError: data.hasError,
    errorMessage: data.message,
    isLoading: false,
  }));

export default ProfileStore;
