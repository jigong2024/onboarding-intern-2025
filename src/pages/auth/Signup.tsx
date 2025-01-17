import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/auth";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authApi.register(formData);
      navigate("/signin");
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border-2 rounded-sm w-[300px] h-[300px]">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-center items-center gap-10"
        >
          {/* 아이디 필드 */}
          <div className="flex justify-center gap-2 w-full">
            <label htmlFor="id" className="bg-green-100 w-20 text-center">
              아이디
            </label>
            <input
              type="text"
              id="id"
              required
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="border"
            />
          </div>

          {/* 비밀번호 필드 */}
          <div className="flex justify-center gap-2 w-full">
            <label htmlFor="password" className="bg-green-100 w-20 text-center">
              비밀번호
            </label>
            <input
              type="text"
              id="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="border"
            />
          </div>

          {/* 닉네임 필드 */}
          <div className="flex justify-center gap-2 w-full">
            <label htmlFor="nickname" className="bg-green-100 w-20 text-center">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              required
              value={formData.id}
              onChange={(e) =>
                setFormData({ ...formData, nickname: e.target.value })
              }
              className="border"
            />
          </div>

          <div>
            <button type="submit" className="border-2 rounded-sm px-2">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
