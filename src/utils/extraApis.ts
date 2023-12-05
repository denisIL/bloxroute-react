import axios from "axios";
import { backendUrl } from "../constants/config";
import { SigninRequestDto } from "../redux/dto/auth";
import { CreateBlogRequestDto } from "../redux/dto/blog";
import { getCookie } from "./cookie";

export const signin = (dto: SigninRequestDto) =>
  axios.post(`${backendUrl}/auth/signin/`, dto);

export const createBlog = (dto: CreateBlogRequestDto) => {
  const token = getCookie("authToken");
  const authHead = token ? {headers: {"Authorization" : `Bearer ${token}`}} : {};
  return axios.post(`${backendUrl}/blogs/create/`, dto, authHead);
}