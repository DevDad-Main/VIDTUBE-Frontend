import { toast } from "react-toastify";

async function updateWithFormData(
  path,
  formData,
  credential = {},
  methodType = "POST",
) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${path}`, {
      method: methodType,
      body: formData,
      ...credential,
    });
    const data = await response.json();
    if (data.success) {
      toast.success(`${data.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return data.data;
    } else {
      toast.error(`${data.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  } catch (error) {
    alert(error);
    return null;
  }
}

async function fetchData(path, header = {}) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${path}`, {
      // const res = await fetch(`${import.meta.env.VITE_API_URL}/${path}`, {
      method: "GET",
      credentials: "include",
      headers: header,
    });
    const data = await res.json();
    if (data.success) {
      return data.data;
    } else {
      toast.error(`${data.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return null;
    }
  } catch (error) {
    toast.warn(`Please try again in a moment..`, {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
    });
  }
}

async function updateData(path, content, methodType = "POST") {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${path}`, {
      method: methodType,
      body: JSON.stringify(content),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (data.success) {
      toast.success(`${data.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return data.data;
    } else {
      toast.error(`${data.message}`, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return null;
    }
  } catch (error) {
    toast.warn(`Please try again in a moment..`, {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
    });
  }
}

export { fetchData, updateData, updateWithFormData };
