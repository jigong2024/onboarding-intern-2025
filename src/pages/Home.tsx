import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
// import TodoTest from "../components/todo/TodoTest";

const Home = () => {
  // 나중에 로그인 상태 확인을 위해 필요
  const { token, user, logout } = useAuthStore();

  return (
    <div>
      {/* 헤더 */}
      <div className="flex justify-center items-center h-20">
        <h1 className="text-4xl font-bold text-gray-900">북마크 관리 서비스</h1>
      </div>
      <div className="flex justify-end items-center">
        {!token ? (
          <div className="flex gap-4">
            <Link
              to="/signin"
              className="border-2 border-black px-2 rounded-sm"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="border-2 border-black px-2 rounded-sm"
            >
              회원가입
            </Link>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/mypage"
              className="border-2 border-black px-2 rounded-sm"
            >
              마이페이지
            </Link>
            <button
              onClick={logout}
              className="border-2 border-black px-2 rounded-sm"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
      {/* 서비스 소개 섹션 */}
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">간편한 북마크 저장</h2>
          <p className="text-gray-600">
            자주 방문하는 웹사이트를 쉽게 저장하고 관리하세요.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">카테고리 관리</h2>
          <p className="text-gray-600">
            북마크를 카테고리별로 구분하여 체계적으로 관리할 수 있습니다.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">어디서나 접근 가능</h2>
          <p className="text-gray-600">
            로그인만 하면 어디서든 내 북마크에 접근할 수 있습니다.
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          throw new Error("This is your first error!");
        }}
      >
        Break the world
      </button>
      {/* <TodoTest /> */}
    </div>
  );
};

export default Home;
