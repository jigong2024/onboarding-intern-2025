import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useEffect, useState } from "react";
import { authApi } from "../../api/auth";
import * as Sentry from "@sentry/react";
// import { ArrowLeft } from "lucide-react";
// import { AxiosError } from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const { token, setAuth } = useAuthStore();

  // 토큰 존재 시 홈 페이지로 리다이렉트
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApi.login(formData);
      setAuth(response.accessToken, {
        id: response.userId,
        nickname: response.nickname,
        avatar: response.avatar,
      });
      navigate("/");
    } catch (error: unknown) {
      // if (error instanceof AxiosError) {
      //   // 타임아웃 에러
      //   if (error.code === "ECONNABORTED") {
      //     alert("서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.");
      //   }
      //   // 네트워크 에러
      //   else if (error.code === "ERR_NETWORK") {
      //     alert("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      //   }
      //   // API 에러 (response가 있는 경우)
      //   else if (error.response) {
      //     alert("아이디 또는 비밀번호를 확인해주세요.");
      //   }
      //   // 기타 에러
      //   else {
      //     alert("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      //   }
      // }

      // Sentry에 에러 보고
      Sentry.captureException(error);

      if (error instanceof Error) {
        // 에러 메시지에 따라 다른 처리
        switch (error.message) {
          case "Invalid id":
            alert("존재하지 않는 아이디입니다. 회원가입을 진행해주세요.");
            break;
          case "Password mismatch":
            alert("비밀번호가 일치하지 않습니다. 다시 시도해주세요!");
            break;
          default:
            alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요!");
        }
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex justify-end w-[400px] mb-1">
        <button className="hover:bg-gray-100" onClick={() => navigate(-1)}>
          {/* <ArrowLeft size={24} /> */}
          ◀️
        </button>
      </div>

      <div className="border-2 rounded-sm w-[400px] h-[300px]">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-center items-center gap-4"
        >
          {/* 아이디 필드 */}

          <div className="flex justify-center gap-2 w-full">
            <label htmlFor="id" className="bg-green-100 w-20 text-center">
              아이디
            </label>
            <input
              type="text"
              id="id"
              disabled={isLoading}
              required
              value={formData.id}
              onChange={(e) => {
                setFormData({ ...formData, id: e.target.value });
              }}
              className="border px-1"
            />
          </div>

          {/* 비밀번호 필드 */}

          <div className="flex justify-center gap-2 w-full">
            <label htmlFor="password" className="bg-green-100 w-20 text-center">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              disabled={isLoading}
              required
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              className="border px-1"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-100 hover:bg-green-200 py-2 px-4 rounded-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
