import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../api";
import Logo from '../assets/svg/logo.svg';
import StarBubblesEffect from './StarBubblesEffect';

<div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div>


const passwordChecks = [
  { label: "8+ characters", test: v => v.length >= 8 },
  { label: "Uppercase (A-Z)", test: v => /[A-Z]/.test(v) },
  { label: "Lowercase (a-z)", test: v => /[a-z]/.test(v) },
  { label: "Number (0-9)", test: v => /\d/.test(v) },
  { label: "Special symbol (!@#...)", test: v => /[!@#$%^&*(),.?":{}|<>]/.test(v) },
];
<div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div>

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

useEffect(() => {
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  const adminToken = localStorage.getItem("adminToken");

  if (adminUser && adminToken && adminUser.role === "admin") {
    navigate("/admin");
  }
}, [navigate]);


  // Email validation
  const isEmailValid = email =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);

  // Password checks
  const pwdResults = passwordChecks.map(chk => chk.test(password));
  const pwdValid = pwdResults.every(Boolean);


  const handleLogin = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setError("");

    if (!isEmailValid(email)) {
      setError("Invalid email address!");
      return;
    }
    if (!pwdValid) {
      setError("Password is not strong enough!");
      return;
    }
    setLoading(true);

    try {
      // استدعاء الـ API باستخدام النسخة المعدّلة
      const res = await axios.post("/api/login", { email, password }); // ✅

      const { user, token } = res.data;

      // حفظ التوكن واليوزر
localStorage.setItem("adminUser", JSON.stringify(user));
localStorage.setItem("adminToken", token);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        setError("This user is not admin!");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (

    
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #f3f6ff 0%, #f7f0ff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "inherit"
    }}>

      
      <form
        style={{
          width: 390,
          padding: 32,
          borderRadius: 24,
          background: "#fff",
          boxShadow: "0 6px 32px #7c4dff19",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          direction: "ltr", // Left to right
          textAlign: "left"
        }}
        onSubmit={handleLogin}

        
      >


        <StarBubblesEffect/>
        <StarBubblesEffect/>
        <StarBubblesEffect/>
        <StarBubblesEffect/>
        <div style={{ textAlign: "center", marginBottom: 15 }}>
          <StarBubblesEffect/>
          <StarBubblesEffect/>
  <img src={Logo} alt="Monjez Logo" width={350} /><StarBubblesEffect/><StarBubblesEffect/><StarBubblesEffect/><StarBubblesEffect/><StarBubblesEffect/><StarBubblesEffect/><div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div>

</div>
<StarBubblesEffect/>
<StarBubblesEffect/>
<StarBubblesEffect/>
        <div style={{ marginBottom: 10 }}>
          <h2 style={{
            color: "#7c4dff",
            fontWeight: 900,
            letterSpacing: ".5px",
            margin: 0,
            textAlign: "center"
            
          }}>Admin Login</h2>
          <div style={{ fontSize: 17, color: "#888", marginTop: 20 ,textAlign: "center" }}>Monjez Admin Panel</div>
        </div>

        <div>
          <label style={{
            display: "block",
            color: "#7c4dff",
            fontWeight: 600,
            marginBottom: 6
          }}>Email address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, email: true }))}
            style={{
              width: "100%",
              border: isEmailValid(email) || !touched.email ? "1.5px solid #dadbf7" : "1.5px solid #ff4d6d",
              borderRadius: 13,
              padding: "11px 16px",
              fontSize: 16,
              background: "#f6f6ff",
              outline: "none",
              fontWeight: 500,
              boxSizing: 'border-box',
              marginBottom: 5,
              transition: "border .15s"
            }}
            placeholder="admin@monjez.com"
            autoComplete="username"
          />
        </div>

        <div style={{ position: "relative" }}>
          <label style={{
            display: "block",
            color: "#7c4dff",
            fontWeight: 600,
            marginBottom: 6
          }}>Password</label>
          <input
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, password: true }))}
            style={{
              width: "100%",
              border: pwdValid || !touched.password ? "1.5px solid #dadbf7" : "1.5px solid #ff4d6d",
              borderRadius: 13,
              padding: "11px 42px 11px 16px",
              fontSize: 18,
              background: "#f6f6ff",
              outline: "none",
              fontWeight: 600,
              boxSizing: 'border-box',
              letterSpacing: ".2em",
              transition: "border .15s"
            }}
            placeholder="Your password"
            autoComplete="current-password"
          />
          <StarBubblesEffect/>
          <StarBubblesEffect/>
          <span
          
            onClick={() => setShowPwd(s => !s)}
            style={{
              position: "absolute",
              right: 14,
              top: 36,
              cursor: "pointer",
              fontSize: 19,
              color: "#5e72e4"
            }}
            title={showPwd ? "Hide" : "Show"}
          >{showPwd ? "🙈" : "👁️"}</span>
        </div>

        <div style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 5
        }}>
          {passwordChecks.map((chk, idx) => (
            <span key={chk.label}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "3.5px 12px",
                fontSize: 14,
                borderRadius: 8,
                background: pwdResults[idx] ? "#e3fbee" : "#f3f3f3",
                color: pwdResults[idx] ? "#30db5b" : "#888",
                fontWeight: pwdResults[idx] ? 700 : 500,
                border: pwdResults[idx] ? "1px solid #30db5b55" : "1px solid #eee",
                marginBottom: 3
              }}>
              {pwdResults[idx] ? "✔" : "•"}&nbsp;{chk.label}
            </span>
          ))}
        </div>

        {error && (
          <div style={{
            background: "#ff4d6d14",
            color: "#ff2e50",
            fontWeight: 700,
            borderRadius: 9,
            padding: "8px 14px",
            marginBottom: 5,
            textAlign: "center"
          }}>{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: "#7c4dff",
            color: "#fff",
            border: "none",
            borderRadius: 13,
            padding: "13px 0",
            fontWeight: 800,
            fontSize: 17,
            letterSpacing: ".2px",
            boxShadow: "0 4px 18px #7c4dff18",
            marginTop: 12,
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "opacity .17s"
          }}
        >
          {loading ? "Signing in..." : "Admin Login"}
        </button>
      </form>
    </div>
  );
}
