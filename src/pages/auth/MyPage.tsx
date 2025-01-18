import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useEffect, useState } from "react";
import { authApi } from "../../api/auth";
import defaultProfileImage from "/profileImage.jpg";

const MyPage = () => {
  const navigate = useNavigate();
  const { user, token, setAuth, logout } = useAuthStore();
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(
    user?.avatar || null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          navigate("/signin");
          return;
        }

        const profileData = await authApi.getProfile(token);

        setNickname(profileData.nickname);
        // 프로필 이미지가 있다면 미리보기 설정
        setPreviewAvatar(profileData.avatar || null);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        alert("프로필 정보를 불러오는 중 오류가 발생했습니다.");
        logout();
        navigate("/signin");
      }
    };

    fetchProfile();
  }, [token, navigate, logout]);

  // 프로필 이미지 변경 핸들러
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setAvatar(file);

      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  // 프로필 업데이트 핸들러
  const handleUpdateProfile = async () => {
    try {
      // 닉네임 유효성 검사
      if (nickname.length < 2 || nickname.length > 10) {
        alert("닉네임은 2~10자 사이여야 합니다.");
        return;
      }

      // 토큰 확인
      if (!token) {
        alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
        navigate("/signin");
        return;
      }

      // 변경 사항 확인
      if (nickname === user?.nickname && !avatar) {
        alert("변경된 내용이 없습니다.");
        return;
      }

      // 프로필 업데이트 API 호출
      const updatedProfile = await authApi.updateProfile(token, {
        nickname: nickname,
        avatar: avatar || undefined,
      });

      // Zustand 스토어 업데이트
      setAuth(token, {
        id: user!.id,
        nickname: updatedProfile.nickname,
        avatar: updatedProfile.avatar,
      });

      alert("프로필이 업데이트 되었습니다.");
    } catch (error) {
      console.error(error);
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 로그인 상태 확인
  if (!user) {
    alert("로그인이 필요합니다.");
    navigate("/signin");
    return null;
  }

  // 로딩 상태
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex justify-end w-[400px] mb-1">
        <button className="hover:bg-gray-100" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="flex justify-center items-center border-2 rounded-sm w-[500px] h-[300px]">
        <div className="flex gap-5">
          <div className="flex flex-col">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-5">
              <img
                src={previewAvatar || defaultProfileImage}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className="bg-green-100 hover:bg-green-200 px-1 rounded-sm cursor-pointer text-center"
            >
              이미지 변경
            </label>
          </div>
          <div className="flex flex-col justify-between items-center">
            <div className="flex flex-col gap-5 mt-8">
              <div className="flex gap-2">
                <label htmlFor="nickname">닉네임</label>
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="border px-1"
                />
              </div>
              {/* 아이디는 읽기 전용 */}
              <div className="flex gap-2">
                <label className="block">아이디</label>
                <input
                  type="text"
                  value={user.id}
                  disabled
                  className="border px-1"
                />
              </div>
            </div>

            <div className="flex gap-7">
              <button
                onClick={handleUpdateProfile}
                className="bg-blue-100 px-1 hover:bg-blue-200"
              >
                수정
              </button>
              <button
                onClick={handleLogout}
                className="bg-purple-100 p-1 hover:bg-purple-200"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
