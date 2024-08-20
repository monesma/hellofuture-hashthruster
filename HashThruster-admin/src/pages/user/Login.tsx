import { useState } from "react";
import { LoginAdmin } from "../../types/admin.types";
import { loginAdmin, checkRefreshToken } from "../../api/admin";
import { useDispatch } from "react-redux";
import { connectAdmin } from "../../store/adminSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const datas: LoginAdmin = {
      email,
      password,
    };

    try {
      const res = await loginAdmin(datas);
      if (res.status === 200) {
        const { user, token } = res.content;

        window.localStorage.setItem("hash-token", token);

        const refreshRes = await checkRefreshToken({
          refreshToken: null,
          public_key: user.public_key,
          id: user.id,
          email: user.email,
          accessToken: null,
          role: user.role
        });

        const updatedUser = {
          ...user,
          token,
          refreshToken: refreshRes.refreshToken,
          accessToken: refreshRes.accessToken,
        };

        dispatch(connectAdmin(updatedUser));

        navigate("/");
      } else {
        setError(res.error.msg);
      }
    } catch (err) {
      setError("An error occurred, please try later!");
    }
  };

  return (
    <section className="login">
      <h1>Sign in</h1>
      {error && <p>{error}</p>}
      <form onSubmit={submitForm}>
        <input
          type="email"
          placeholder="Your email"
          autoComplete="false"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button type="submit">Connect</button>
      </form>
    </section>
  );
};

export default Login;
