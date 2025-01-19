import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../pages/auth/SignUp";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("SignUp Component", () => {
  test("유효성 검사가 제대로 작동하는지 테스트", async () => {
    renderWithRouter(<SignUp />);

    const idInput = screen.getByLabelText("아이디") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("비밀번호") as HTMLInputElement;
    const nicknameInput = screen.getByLabelText("닉네임") as HTMLInputElement;
    const form = screen.getByRole("form") as HTMLFormElement;

    // 1. 아이디 유효성 검사
    fireEvent.change(idInput, { target: { value: "abc" } });
    fireEvent.submit(form);

    await waitFor(() => {
      const error = screen.getByText(/아이디는 4~20자 사이여야 합니다/);
      expect(error).toBeTruthy();
    });

    // 2. 비밀번호 유효성 검사
    fireEvent.change(idInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });
    fireEvent.submit(form);

    await waitFor(() => {
      const error = screen.getByText(/비밀번호는 8~12자 사이여야 하며/);
      expect(error).toBeTruthy();
    });

    // 3. 닉네임 유효성 검사
    fireEvent.change(passwordInput, { target: { value: "Test123!@" } });
    fireEvent.change(nicknameInput, { target: { value: "a" } });
    fireEvent.submit(form);

    await waitFor(() => {
      const error = screen.getByText(/닉네임은 2~10자 사이여야 합니다/);
      expect(error).toBeTruthy();
    });
  });
});
