import React, { useEffect, useState } from "react";
import axios from "../api";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // "error" or "success"

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const adminId = decoded.id;

  useEffect(() => {
    axios
      .get(`https://monjez-online.onrender.com/api/admin/${adminId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAdmin(res.data);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setEmail(res.data.email);
        setAvatar(res.data.avatar);
      })
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, [adminId, token]);

  // Inline avatar preview
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInfoUpdate = () => {
    setMsg("");
    setMsgType("");
    axios
      .patch(
        `https://monjez-online.onrender.com/api/admin/${adminId}`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          avatar,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setMsg("Profile updated!");
        setMsgType("success");
      })
      .catch(() => {
        setMsg("Update failed!");
        setMsgType("error");
      });
  };

  const handlePasswordUpdate = () => {
    setMsg("");
    setMsgType("");
    if (newPwd !== confirmPwd) {
      setMsg("Passwords do not match!");
      setMsgType("error");
      return;
    }
    if (newPwd.length < 6) {
      setMsg("Password must be at least 6 characters!");
      setMsgType("error");
      return;
    }
    axios
      .patch(
        `https://monjez-online.onrender.com/api/admin/${adminId}/password`,
        { new_password: newPwd },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setMsg("Password changed!");
        setMsgType("success");
        setNewPwd("");
        setConfirmPwd("");
      })
      .catch(() => {
        setMsg("Password update failed!");
        setMsgType("error");
      });
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", margin: "70px 0", color: "#888", fontSize: 20 ,boxSizing: 'border-box'}}>
        Loading…
      </div>
    );
  if (error)
    return (
      <div style={{ textAlign: "center", margin: "70px 0", color: "red", fontSize: 20 ,boxSizing: 'border-box',}}>
        {error}
      </div>
    );

  return (

<div
  style={{
    position: "absolute",
    top: 150,
    left: 200,
    width: "90vw",
    maxHeight:1600,
    zIndex: 1000,
    
    
    
    
  }}
>




    <div
      style={{

        minHeight: "0vh",
        padding: "40px 0",
        
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          
          background: "#fff",
          
          borderRadius: 18,
          maxWidth: 1400,
          margin: "auto",
          boxShadow: "0 6px 32px #a78bfa17",
          overflow: "hidden",
          padding: "0",
        }}
      >
        {/* Title */}
        <div style={{ padding: "36px 50px 12px 50px" }}>
          <div
            style={{
              
              fontWeight: 800,
              fontSize: 28,
              color: "#6d28d9",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Admin Profile
          </div>
          <div
            style={{
              color: "#c4b5fd",
              fontWeight: 500,
              fontSize: 15,
              marginTop: 2,
            }}
          >
            View & edit your admin account information ✨
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            margin: "36px 40px 20px 40px",
            background: "#f8fafc",
            borderRadius: 15,
            boxShadow: "0 2px 10px #a78bfa0c",
            padding: "36px 38px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
            <div style={{ position: "relative" }}>
              <img
                src={avatar || "/avatars/default.svg"}
                alt=""
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: "50%",
                  border: "4px solid #ddd6fe",
                  objectFit: "cover",
                  boxShadow: "0 2px 12px #a78bfa17",
                  background: "#fff",
                }}
              />
              <label
                style={{
                  position: "absolute",
                  bottom: 6,
                  right: 6,
                  background: "#a78bfa",
                  color: "#fff",
                  fontSize: 14,
                  borderRadius: 11,
                  padding: "3px 18px",
                  cursor: "pointer",
                  
                  fontWeight: 600,
                  boxShadow: "0 2px 10px #a78bfa22",
                  border: "none",
                }}
                htmlFor="avatar"
                title="Change avatar"
              >
                Change
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  
                  hidden
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <div style={{ marginLeft: 26 }}>
              <div style={{ fontWeight: "bold", fontSize: 24, marginBottom: 6 }}>
                {admin.full_name}
              </div>
              <span style={{ color: "#777", textTransform: "capitalize", fontSize: 15 }}>
                {admin.role}
              </span>
            </div>
            <button
              onClick={handleInfoUpdate}
              style={{
                marginLeft: "auto",
                background: "linear-gradient(90deg,#a78bfa 0,#7c3aed 100%)",
                color: "#fff",
                fontWeight: 700,
                padding: "12px 38px",
                border: "none",
                
                borderRadius: 11,
                fontSize: 17,
                cursor: "pointer",
                boxShadow: "0 1px 8px #a78bfa15",
                transition: ".2s",
              }}
            >
              Save
            </button>
          </div>

          {/* Alert/Msg */}
          {msg && (
            <div
              style={{
                background: msgType === "success" ? "#e0fce9" : "#fee2e2",
                color: msgType === "success" ? "#166534" : "#b91c1c",
                marginBottom: 18,
                borderRadius: 8,
                padding: "12px 28px",
                fontWeight: 500,
                fontSize: 16,
                border: `1px solid ${msgType === "success" ? "#22c55e" : "#ef4444"}`,
              }}
            >
              {msg}
            </div>
          )}

          {/* Basic Info */}
          <div style={{ marginTop: 4 }}>
            <div style={{ fontWeight: 600, marginBottom: 14, fontSize: 18, color: "#7c3aed" }}>
              Basic Info
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
              <div>
                <label style={{ fontSize: 14, color: "#6b7280" }}>First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: 9,
                    fontSize: 16,
                    marginTop: 3,
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 14, color: "#6b7280" }}>Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: 9,
                    fontSize: 16,
                    marginTop: 3,
                  }}
                />
              </div>
              <div style={{ gridColumn: "1/3" }}>
                <label style={{ fontSize: 14, color: "#6b7280" }}>Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: 9,
                    fontSize: 16,
                    marginTop: 3,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div style={{ marginTop: 38 }}>
            <div style={{ fontWeight: 600, marginBottom: 14, fontSize: 18, color: "#7c3aed" }}>
              Change Password
            </div>
            <div style={{ display: "flex", gap: 22 }}>
              <input
                type="password"
                placeholder="New Password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  border: "1px solid #d1d5db",
                  borderRadius: 9,
                  fontSize: 16,
                  marginBottom: 6,
                  marginTop: 3,
                }}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  border: "1px solid #d1d5db",
                  borderRadius: 9,
                  fontSize: 16,
                  marginBottom: 6,
                  marginTop: 3,
                }}
              />
              <button
                onClick={handlePasswordUpdate}
                style={{
                  background: "#111827",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9,
                  padding: "12px 38px",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  boxShadow: "0 1px 4px #3331",
                  marginLeft: 12,
                  transition: ".2s",
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
