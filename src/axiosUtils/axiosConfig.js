import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://vshwandrx.in/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "multipart/form-data",
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdnNod2FuZHJ4LmluXC91c2VybG9naW4iLCJpYXQiOjE3MTY4ODUxNzAsImV4cCI6MTcxNzA1Nzk3MCwibmJmIjoxNzE2ODg1MTcwLCJqdGkiOiJ2Yk1ZZ1l6ZkhJdk5VcXVEIiwic3ViIjo0NSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.8OXRrUIiC5WKHcQluBIaQOw9_cum7NwzvINbvZB1Kkw`,
  },
});

export default axiosInstance;
