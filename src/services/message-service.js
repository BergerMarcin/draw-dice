import Swal from "sweetalert2";
import { APP_BACKGROUND } from "../helpers/constants";

export const showConfirmation = async function (msg) {
  return Swal.fire({
    title: msg,
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Yes",
    background: APP_BACKGROUND,
  });
};

export const showWarning = async function (msg) {
  return Swal.fire({
    title: msg,
    showCancelButton: false,
    background: APP_BACKGROUND,
  });
};

export const showError = async function (msg) {
  return Swal.fire({
    title: "Error",
    text: msg,
    icon: "error",
    showCancelButton: false,
    background: APP_BACKGROUND,
  });
};
