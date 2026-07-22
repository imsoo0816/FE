export const navigateBackOrHome = (navigate) => {
  if (window.history.state?.idx > 0) {
    navigate(-1);
    return;
  }

  navigate("/home", { replace: true });
};

