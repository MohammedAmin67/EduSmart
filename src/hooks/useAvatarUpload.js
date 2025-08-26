import API from "../api/axios";

export const useAvatarUpload = () => {
  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const { data } = await API.post("/users/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  };

  return uploadAvatar;
};