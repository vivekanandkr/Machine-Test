import Swal from "sweetalert2";

export const showSuccess = (message) => {
    return Swal.fire({
        icon: "success",
        title: "Success",
        text: message,
        timer: 2000,
        showConfirmButton: false,
    });
};

export const showError = (error) => {
    const message = error?.response?.data?.message || error?.message || "Something went wrong.";
    return Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
    });
};

export const showConfirm = (message = "Are you sure?") => {
    return Swal.fire({
        title: "Are you sure?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
    });
};
