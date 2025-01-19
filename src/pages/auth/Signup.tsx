import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";
// import { ArrowLeft } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  // 토큰 존재 시 홈 페이지로 리다이렉트
  useEffect(() => {
    if (token) {
      setTimeout(() => {
        alert("이미 로그인된 상태입니다.");
        navigate("/");
      }, 0);
    }
  }, [token, navigate]);

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // 유효성 검사 함수
  const validateForm = () => {
    let isValid = true;

    const newErrors = {
      id: "",
      password: "",
      nickname: "",
    };

    // id 검사: 4~20자
    if (formData.id.length < 4 || formData.id.length > 20) {
      newErrors.id = "아이디는 4~20자 사이여야 합니다.";
      isValid = false;
    }

    //비밀번호 검사: 8~12자자, 영문/숫자/특수문자 포함
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,12}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "비밀번호는 8~12자 사이여야 하며, 영문/숫자/특수문자를 포함해야 합니다.";
      isValid = false;
    }

    // 닉네임 검사: 2~10자
    if (formData.nickname.length < 2 || formData.nickname.length > 10) {
      newErrors.nickname = "닉네임은 2~10자 사이여야 합니다.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await authApi.register(formData);
      alert("회원가입에 성공했습니다. 로그인 페이지로 이동합니다!");
      navigate("/signin");
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다.");
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
          role="form"
          className="w-full h-full flex flex-col justify-center items-center gap-4"
        >
          {/* 아이디 필드 */}

          <div className="flex flex-col w-[267px]">
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
                  if (errors.id) setErrors({ ...errors, id: "" });
                }}
                className="border px-1"
              />
            </div>

            {errors.id && (
              <p className="mt-1 text-sm text-red-600 text-center">
                {errors.id}
              </p>
            )}
          </div>

          {/* 비밀번호 필드 */}

          <div className="flex flex-col w-[267px]">
            <div className="flex justify-center gap-2 w-full">
              <label
                htmlFor="password"
                className="bg-green-100 w-20 text-center"
              >
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
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                className="border px-1"
              />
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-600 text-center">
                {errors.password}
              </p>
            )}
          </div>

          {/* 닉네임 필드 */}

          <div className="flex flex-col w-[267px]">
            <div className="flex justify-center gap-2 w-full">
              <label
                htmlFor="nickname"
                className="bg-green-100 w-20 text-center"
              >
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                disabled={isLoading}
                required
                value={formData.nickname}
                onChange={(e) => {
                  setFormData({ ...formData, nickname: e.target.value });
                  if (errors.nickname) setErrors({ ...errors, nickname: "" });
                }}
                className="border px-1"
              />
            </div>

            {errors.nickname && (
              <p className="mt-1 text-sm text-red-600 text-center">
                {errors.nickname}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-100 hover:bg-green-200 py-2 px-4 rounded-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              {isLoading ? "회원가입 중..." : "회원가입"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
