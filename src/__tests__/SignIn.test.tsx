import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("SignIn Component", () => {
  test("기본 UI 요소들이 렌더링되는지 테스트", () => {
    renderWithRouter(<SignIn />);

    // 버튼을 텍스트로 찾기
    const loginButton = screen.getByRole("button", { name: "로그인" });
    expect(loginButton).toBeTruthy();
    expect(loginButton.textContent).toBe("로그인");

    // input 필드들 확인
    expect(screen.getByLabelText("아이디")).toBeTruthy();
    expect(screen.getByLabelText("비밀번호")).toBeTruthy();
  });

  test("입력 필드에 값을 입력할 수 있는지 테스트", () => {
    renderWithRouter(<SignIn />);

    const idInput = screen.getByLabelText("아이디") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("비밀번호") as HTMLInputElement;

    // 값 입력
    fireEvent.change(idInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // 값 확인
    expect(idInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password123");
  });
});
