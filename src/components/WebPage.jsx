import React, { useRef, useEffect, useState } from "react";


import { useNavigate } from "react-router-dom";

// صور SVG استخدم نفس الأسماء في مشروعك!
import heroIcon from "../assets/svg/web-bot.svg";
import service1 from "../assets/svg/web-landing.svg";
import service2 from "../assets/svg/web-portfolio.svg";
import service3 from "../assets/svg/web-shop.svg";
import service4 from "../assets/svg/web-company.svg";
import service5 from "../assets/svg/web-blog.svg";
import service6 from "../assets/svg/web-edu.svg";
import service7 from "../assets/svg/web-service.svg";
import service8 from "../assets/svg/web-chat.svg";
import cartIcon from "../assets/svg/cart.svg";
import product1 from "../assets/svg/prod-shirt.svg";
import product2 from "../assets/svg/prod-bag.svg";
import product3 from "../assets/svg/prod-phone.svg";
import payVisa from "../assets/svg/pay-visa.svg";
import payMaster from "../assets/svg/pay-master.svg";
import payCash from "../assets/svg/pay-cash.svg";
import companyLogo from "../assets/svg/web-company.svg";
import banner from "../assets/svg/company-banner.svg";
import team1 from "../assets/svg/team1.svg";
import team2 from "../assets/svg/team2.svg";
import team3 from "../assets/svg/team3.svg";
import work1 from "../assets/svg/work1.svg";
import work2 from "../assets/svg/work2.svg";
import work3 from "../assets/svg/work3.svg";

import profile from "../assets/svg/profile.svg";
import cert1 from "../assets/svg/cert1.svg";
import cert2 from "../assets/svg/cert2.svg";
import mailIcon from "../assets/svg/mail.svg";
import githubIcon from "../assets/svg/github.svg";
import linkedinIcon from "../assets/svg/linkedin.svg";


import eduIcon from "../assets/svg/web-edu.svg";
import course1 from "../assets/svg/course1.svg";
import course2 from "../assets/svg/course2.svg";
import course3 from "../assets/svg/course3.svg";
import user1 from "../assets/svg/user1.svg";
import user2 from "../assets/svg/user2.svg";
import user3 from "../assets/svg/user3.svg";
import playIcon from "../assets/svg/play.svg"


import user4 from "../assets/svg/user4.svg";
import sendIcon from "../assets/svg/send.svg";
import chatIcon from "../assets/svg/web-chat.svg";
import lockIcon from "../assets/svg/lock.svg";


import attachIcon from "../assets/svg/attach.svg";
import emojiIcon from "../assets/svg/emoji.svg";
import sunIcon from "../assets/svg/sun.svg";
import moonIcon from "../assets/svg/moon.svg";

// داخل ملف WebPage.jsx فوق sections (أو خارج الـ export default):

function ShopDemo() {
  const [cart, setCart] = useState([]);
  const products = [
    { id: 1, name: "تيشيرت منجز", price: 59, img: product1 },
    { id: 2, name: "حقيبة أعمال", price: 120, img: product2 },
    { id: 3, name: "جهاز ذكي", price: 789, img: product3 },
  ];

  // إضافة منتج للسلة
  const addToCart = (prod) => setCart([...cart, prod]);
  // حذف منتج من السلة (بالفهرس)
  const removeFromCart = (i) => setCart(cart.filter((_, idx) => idx !== i));

  return (
    <div style={{
      background: "#fff", borderRadius: 23, padding: "0 0 0 0",
      maxWidth: "100%", minWidth: 0, width: "100%", margin: "0 auto",
      boxShadow: "0 8px 30px #ececec19, 0 2px 12px #7c4dff08", border: "2px solid #e7e9fa"
    }}>
      {/* هيدر داخلي للمتجر */}
      <div style={{
        background: "linear-gradient(96deg,#13d47b 80%,#ffe17b 100%)",
        padding: "24px 32px 17px 32px",
        borderTopLeftRadius: 23, borderTopRightRadius: 23,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ fontWeight: 900, fontSize: 21, color: "#23273c", letterSpacing: ".8px", display: "flex", alignItems: "center", gap: 8 }}>
          <img src={cartIcon} alt="" style={{ width: 36, marginLeft: 5 }} />
          <span>متجر منجز</span>
        </div>
        <div style={{ color: "#fff", background: "#ffab03", borderRadius: 11, padding: "7px 19px", fontWeight: 800, fontSize: 17, boxShadow: "0 2px 7px #ffe8bb63" }}>
          تخفيضات اليوم!
        </div>
      </div>

      {/* المنتجات الرئيسية */}
      <div style={{
        display: "flex", gap: 19, justifyContent: "center", alignItems: "stretch",
        padding: "23px 0 15px 0", background: "#f7fafd"
      }}>
        {products.map((prod, idx) => (
          <div key={prod.id} style={{
            background: "#fff", borderRadius: 15, boxShadow: "0 2px 14px #e7e9fa13",
            width: 145, padding: "13px 13px 13px 13px", textAlign: "center",
            border: "1.4px solid #f0f3fe"
          }}>
            <img src={prod.img} alt={prod.name} style={{ width: 58, height: 58 }} />
            <div style={{ fontWeight: 800, color: "#0bb76d", fontSize: 15, margin: "10px 0 3px" }}>{prod.name}</div>
            <div style={{ color: "#7c4dff", fontSize: 15, fontWeight: 900 }}>{prod.price} ر.س</div>
            <button
              style={{
                marginTop: 10, padding: "6px 0", width: "100%", borderRadius: 8,
                background: "linear-gradient(93deg,#13d47b 60%,#ffe17b 100%)", color: "#23273c",
                border: "none", fontWeight: 800, fontSize: 14, cursor: "pointer",
                boxShadow: "0 1px 6px #7c4dff08"
              }}
              onClick={() => addToCart(prod)}
            >أضف للسلة 🛒</button>
          </div>
        ))}
      </div>

      {/* السلة */}
      <div style={{
        background: "#f7fafd", borderTop: "2.1px solid #e9e9ef", padding: "22px 34px 18px 34px"
      }}>
        <div style={{ fontWeight: 900, color: "#0bb76d", fontSize: 18, marginBottom: 7, display: "flex", alignItems: "center", gap: 8 }}>
          🛍️ السلة
          {cart.length > 0 && <span style={{
            color: "#fff", background: "#7c4dff", borderRadius: 10, padding: "2px 9px",
            fontSize: 13, fontWeight: 700, marginRight: 5
          }}>{cart.length}</span>}
        </div>
        {cart.length === 0 ? (
          <div style={{ color: "#b9b7c8" }}>سلتك فارغة… جرب إضافة منتج!</div>
        ) : (
          <table style={{ width: "100%", background: "transparent" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "right", color: "#7c4dff", fontWeight: 900, fontSize: 14, paddingBottom: 8 }}>المنتج</th>
                <th style={{ textAlign: "center", color: "#7c4dff", fontWeight: 900, fontSize: 14, paddingBottom: 8 }}>السعر</th>
                <th style={{ textAlign: "center" }}></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((prod, i) => (
                <tr key={i}>
                  <td style={{ padding: "4px 0", fontWeight: 700, color: "#23273c" }}>{prod.name}</td>
                  <td style={{ padding: "4px 0", fontWeight: 900, color: "#0bb76d" }}>{prod.price} ر.س</td>
                  <td style={{ padding: "4px 0", textAlign: "center" }}>
                    <button
                      onClick={() => removeFromCart(i)}
                      style={{
                        background: "#ffe2e0", color: "#ed254e",
                        border: "none", borderRadius: 7, fontSize: 16, fontWeight: 800,
                        padding: "2px 8px", cursor: "pointer"
                      }}
                    >حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ fontWeight: 900, color: "#7c4dff", fontSize: 16, paddingTop: 7 }}>الإجمالي:</td>
                <td style={{ fontWeight: 900, color: "#0bb76d", fontSize: 16, paddingTop: 7 }}>{cart.reduce((sum, p) => sum + p.price, 0)} ر.س</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        )}

        {/* طرق الدفع */}
        <div style={{
          marginTop: 18, display: "flex", justifyContent: "center", gap: 14, alignItems: "center"
        }}>
          <img src={payVisa} style={{ width: 34 }} alt="Visa" />
          <img src={payMaster} style={{ width: 31 }} alt="MasterCard" />
          <img src={payCash} style={{ width: 29 }} alt="كاش" />
        </div>
      </div>

      {/* فوتر المتجر */}
      <div style={{
        background: "#23273c",
        color: "#fff",
        padding: "13px 28px",
        fontWeight: 800,
        borderBottomLeftRadius: 21, borderBottomRightRadius: 21,
        fontSize: 15, letterSpacing: ".6px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <span>منجز Shop Demo</span>
        <span style={{ color: "#ffe17b", fontWeight: 900 }}>2025 &copy;</span>
      </div>
    </div>
  );
}

function CompanyDemo() {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 22,
      padding: 0,
      width: "100%",
      minWidth: 0,
      margin: "0 auto",
      boxShadow: "0 7px 24px #e7e9fa18, 0 1.5px 7px #7c4dff09",
      border: "2.3px solid #e8e8fc",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* هيدر الشركة */}
      <div style={{
        background: "linear-gradient(97deg,#0b99ce 70%,#7c4dff 100%)",
        padding: "22px 34px 17px 32px",
        borderTopLeftRadius: 22, borderTopRightRadius: 22,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={companyLogo} alt="" style={{ width: 40 }} />
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 21, letterSpacing: 1 }}>
            شركة منجز للحلول التقنية
          </span>
        </div>
        <img src={banner} alt="Banner" style={{ width: 56, borderRadius: 13, boxShadow: "0 1px 6px #fff2" }} />
      </div>

      {/* محتوى تعريفي + الفريق + معرض أعمال */}
      <div style={{
        background: "#f8faff",
        padding: "28px 32px 18px 32px",
        display: "flex", flexDirection: "row", gap: 25, alignItems: "flex-start", justifyContent: "center"
      }}>
        {/* تعريف وفريق */}
        <div style={{ flex: 1.2, minWidth: 210 }}>
          <div style={{
            color: "#0b99ce", fontWeight: 900, fontSize: 17, marginBottom: 8
          }}>نبذة عن الشركة</div>
          <div style={{ color: "#666", fontWeight: 600, fontSize: 14, marginBottom: 15 }}>
            منجز شركة تقنية سعودية تقدم خدمات البرمجة، تصميم المواقع، التسويق الرقمي والاستشارات. خبرة من 2019، عشرات المشاريع، حلول مبتكرة، ودعم كامل لكل عملائنا.
          </div>
          <div style={{
            marginBottom: 15, display: "flex", gap: 10, alignItems: "center"
          }}>
            <img src={team1} alt="فريق" style={{ width: 38, borderRadius: "50%" }} />
            <img src={team2} alt="فريق" style={{ width: 38, borderRadius: "50%" }} />
            <img src={team3} alt="فريق" style={{ width: 38, borderRadius: "50%" }} />
            <span style={{ color: "#7c4dff", fontWeight: 900, fontSize: 13 }}>فريق محترف</span>
          </div>
        </div>
        {/* معرض أعمال مختصر */}
        <div style={{
          flex: 1.4,
          display: "flex", flexDirection: "column", alignItems: "center"
        }}>
          <div style={{ color: "#7c4dff", fontWeight: 800, fontSize: 15.5, marginBottom: 6 }}>معرض مشاريعنا</div>
          <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
            <img src={work1} alt="عمل" style={{ width: 70, borderRadius: 10 }} />
            <img src={work2} alt="عمل" style={{ width: 70, borderRadius: 10 }} />
            <img src={work3} alt="عمل" style={{ width: 70, borderRadius: 10 }} />
          </div>
          <div style={{
            color: "#0b99ce", fontWeight: 800, fontSize: 14, marginBottom: 3
          }}>أكثر من 45 مشروع ناجح</div>
        </div>
      </div>

      {/* بيانات تواصل */}
      <div style={{
        background: "#eaf8f8",
        borderTop: "2px solid #eee",
        padding: "13px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <span style={{ fontWeight: 800, color: "#0b99ce", fontSize: 15 }}>
          📧 info@monjez.com
        </span>
        <span style={{ color: "#7c4dff", fontWeight: 800, fontSize: 14 }}>
          الرياض – شارع التقنية
        </span>
        <span style={{ color: "#fea600", fontWeight: 900, fontSize: 15 }}>
          9200-12345 ☎️
        </span>
      </div>
      {/* فوتر خاص */}
      <div style={{
        background: "#1b253a",
        color: "#fff",
        padding: "10px 25px",
        borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
        fontWeight: 800,
        fontSize: 14.5, letterSpacing: ".5px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <span>شركة منجز | جميع الحقوق محفوظة</span>
        <span style={{ color: "#fea600", fontWeight: 900 }}>2025 &copy;</span>
      </div>
    </div>
  );
}


function PortfolioDemo() {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 19,
      padding: 0,
      width: "100%",
      minWidth: 0,
      boxShadow: "0 7px 24px #f0f0fc21, 0 1.5px 7px #7c4dff09",
      border: "2.3px solid #ece7fd",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* هيدر البورتفوليو */}
      <div style={{
        background: "linear-gradient(93deg,#ffba7d 30%,#7c4dff 100%)",
        padding: "18px 32px 12px 32px",
        borderTopLeftRadius: 19, borderTopRightRadius: 19,
        display: "flex", alignItems: "center", gap: 17
      }}>
        <img src={profile} alt="Profile" style={{
          width: 44, borderRadius: "50%", border: "2.3px solid #fff", marginLeft: 8
        }} />
        <span style={{
          color: "#fff", fontWeight: 900, fontSize: 20, letterSpacing: ".5px"
        }}>يوسف أحمد – مطور واجهات أمامية</span>
      </div>
      {/* بيانات وعني */}
      <div style={{
        padding: "28px 28px 20px 28px",
        background: "#f9f8fe",
        display: "flex", flexDirection: "row", gap: 35, alignItems: "flex-start"
      }}>
        {/* أقسام جانبية: عني، شهادات */}
        <div style={{ flex: 1.3, minWidth: 190 }}>
          <div style={{
            color: "#7c4dff", fontWeight: 900, fontSize: 16.5, marginBottom: 7
          }}>نبذة عني</div>
          <div style={{ color: "#555", fontWeight: 700, fontSize: 14, marginBottom: 13 }}>
            خبرة +5 سنوات في برمجة المواقع، متخصص React, Node.js, Tailwind، إنجاز مشاريع أعمال وتجارية وتقنية.  
            شغوف بالتعلم والتطوير الدائم.
          </div>
          <div style={{
            color: "#0bb76d", fontWeight: 800, fontSize: 14, marginBottom: 7
          }}>الشهادات والجوائز:</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <img src={cert1} alt="شهادة" style={{ width: 34 }} />
            <img src={cert2} alt="شهادة" style={{ width: 34 }} />
            <span style={{ color: "#7c4dff", fontWeight: 900, fontSize: 13 }}>3 شهادات دولية</span>
          </div>
        </div>
        {/* معرض أعمال مصغر */}
        <div style={{
          flex: 1.5,
          display: "flex", flexDirection: "column", alignItems: "center"
        }}>
          <div style={{ color: "#7c4dff", fontWeight: 800, fontSize: 15.5, marginBottom: 6 }}>معرض الأعمال</div>
          <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
            <img src={work1} alt="عمل" style={{ width: 68, borderRadius: 8 }} />
            <img src={work2} alt="عمل" style={{ width: 68, borderRadius: 8 }} />
            <img src={work3} alt="عمل" style={{ width: 68, borderRadius: 8 }} />
          </div>
          <div style={{
            color: "#ffba7d", fontWeight: 800, fontSize: 14, marginBottom: 2
          }}>+20 مشروع شخصي وعملي</div>
        </div>
      </div>
      {/* تواصل */}
      <div style={{
        background: "#f7fafd",
        borderTop: "2px solid #eee",
        padding: "12px 28px",
        display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16
      }}>
        <a href="mailto:you@email.com" style={{ color: "#21c692", fontWeight: 900, textDecoration: "none", fontSize: 15 }}>
          <img src={mailIcon} alt="Mail" style={{ width: 22, verticalAlign: "middle", marginLeft: 3 }} />
          you@email.com
        </a>
        <a href="#" style={{ color: "#333", fontWeight: 800 }}>
          <img src={githubIcon} alt="Github" style={{ width: 22, verticalAlign: "middle", marginLeft: 3 }} />
          GitHub
        </a>
        <a href="#" style={{ color: "#0073b1", fontWeight: 800 }}>
          <img src={linkedinIcon} alt="LinkedIn" style={{ width: 22, verticalAlign: "middle", marginLeft: 3 }} />
          LinkedIn
        </a>
      </div>
      {/* فوتر خاص */}
      <div style={{
        background: "#353858",
        color: "#fff",
        padding: "9px 22px",
        borderBottomLeftRadius: 19, borderBottomRightRadius: 19,
        fontWeight: 800,
        fontSize: 14.5, letterSpacing: ".5px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <span>Portfolio Demo | جميع الحقوق محفوظة</span>
        <span style={{ color: "#ffba7d", fontWeight: 900 }}>2025 &copy;</span>
      </div>
    </div>
  );
}


function EducationDemo() {
  const courses = [
    { id: 1, title: "أساسيات البرمجة", teacher: "أ.يوسف", price: "مجانية", img: course1, lessons: 22 },
    { id: 2, title: "تطوير المواقع", teacher: "أ.محمد", price: "149 ر.س", img: course2, lessons: 14 },
    { id: 3, title: "تصميم واجهات UI", teacher: "أ.سارة", price: "99 ر.س", img: course3, lessons: 18 },
  ];

  return (
    <div style={{
      background: "#fff",
      borderRadius: 21,
      padding: 0,
      width: "100%",
      minWidth: 0,
      boxShadow: "0 7px 24px #e7e9fa15, 0 1.5px 7px #7c4dff09",
      border: "2.3px solid #ece7fd",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* هيدر المنصة */}
      <div style={{
        background: "linear-gradient(95deg,#26de81 65%,#7c4dff 100%)",
        padding: "18px 32px 11px 32px",
        borderTopLeftRadius: 21, borderTopRightRadius: 21,
        display: "flex", alignItems: "center", gap: 12
      }}>
        <img src={eduIcon} alt="" style={{ width: 38, borderRadius: 10, background: "#fff", padding: 3 }} />
        <span style={{
          color: "#fff", fontWeight: 900, fontSize: 20, letterSpacing: ".7px"
        }}>منصة منجز التعليمية</span>
      </div>
      {/* قائمة الدورات */}
      <div style={{
        padding: "26px 30px 15px 30px",
        background: "#f8faff",
        display: "flex", gap: 17, justifyContent: "center"
      }}>
        {courses.map(c =>
          <div key={c.id} style={{
            background: "#fff", borderRadius: 14, boxShadow: "0 2px 10px #26de8121",
            width: 155, minHeight: 165, padding: "13px 9px 14px 9px", textAlign: "center",
            border: "1.5px solid #e7f9f2", display: "flex", flexDirection: "column", alignItems: "center"
          }}>
            <img src={c.img} alt={c.title} style={{ width: 48, height: 48, marginBottom: 7 }} />
            <div style={{ fontWeight: 900, color: "#26de81", fontSize: 15, marginBottom: 2 }}>{c.title}</div>
            <div style={{ color: "#7c4dff", fontWeight: 800, fontSize: 13 }}>{c.teacher}</div>
            <div style={{ color: "#555", fontWeight: 700, fontSize: 13, margin: "4px 0" }}>{c.price}</div>
            <div style={{ color: "#222", fontWeight: 700, fontSize: 13, margin: "2px 0" }}>
              <img src={playIcon} alt="عدد الدروس" style={{ width: 15, verticalAlign: "middle", marginLeft: 3 }} />
              {c.lessons} درس
            </div>
            <button style={{
              marginTop: 5,
              padding: "4px 0", width: "96%",
              borderRadius: 7,
              background: "linear-gradient(93deg,#26de81 65%,#7c4dff 100%)",
              color: "#fff",
              border: "none", fontWeight: 800, fontSize: 13, cursor: "pointer"
            }}>ابدأ الآن</button>
          </div>
        )}
      </div>
      {/* الطلاب المميزون */}
      <div style={{
        background: "#f4f8fb", padding: "9px 30px", display: "flex", alignItems: "center", gap: 11
      }}>
        <span style={{ color: "#7c4dff", fontWeight: 900, fontSize: 14 }}>الطلاب المميزون:</span>
        <img src={user1} alt="طالب" style={{ width: 29, borderRadius: "50%" }} />
        <img src={user2} alt="طالب" style={{ width: 29, borderRadius: "50%" }} />
        <img src={user3} alt="طالب" style={{ width: 29, borderRadius: "50%" }} />
        <span style={{ color: "#26de81", fontWeight: 800, fontSize: 13, marginRight: 5 }}>+1000 متدرب!</span>
      </div>
      {/* فوتر خاص */}
      <div style={{
        background: "#23273c",
        color: "#fff",
        padding: "9px 19px",
        borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
        fontWeight: 800,
        fontSize: 14.5, letterSpacing: ".5px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <span>منصة منجز التعليمية | جميع الحقوق محفوظة</span>
        <span style={{ color: "#26de81", fontWeight: 900 }}>2025 &copy;</span>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span style={{
      display: "inline-block", marginRight: 5,
      fontWeight: 900, color: "#7c4dff", fontSize: 18, letterSpacing: 0.8
    }}>
      <span style={{ animation: "blinker 1s infinite" }}>.</span>
      <span style={{ animation: "blinker 1s .33s infinite" }}>.</span>
      <span style={{ animation: "blinker 1s .66s infinite" }}>.</span>
      <style>
        {`@keyframes blinker {
            50% { opacity: 0.1; }
        }`}
      </style>
    </span>
  );
}

function EmojiBar({ onReact }) {
  const emojis = ["👍", "😂", "❤️", "🔥", "😍"];
  return (
    <span style={{ marginLeft: 6 }}>
      {emojis.map(e => (
        <button
          key={e}
          onClick={() => onReact && onReact(e)}
          style={{
            background: "none", border: "none", fontSize: 17, cursor: "pointer", margin: "0 1px"
          }}
        >{e}</button>
      ))}
    </span>
  );
}


function ChatDemo() {
  // محادثة وهمية
 const [night, setNight] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { user: "يوسف", avatar: user1, msg: "أهلًا! مرحبًا بك في منصة منجز للشات 👋", time: "08:20", type: "me", reactions: [] },
    { user: "سارة", avatar: user2, msg: "جميل جدًا! هل تدعم إرسال صور وملفات؟", time: "08:21", reactions: [] },
    { user: "يوسف", avatar: user1, msg: "طبعًا! كل شيء مشفر وآمن 👍", time: "08:21", type: "me", reactions: ["👍"] },
    { user: "سارة", avatar: user2, msg: "طيب، ممكن أفتح غرفة خاصة؟", time: "08:22", reactions: ["❤️"] },
    { user: "يوسف", avatar: user1, msg: "أكيد! اكتب/اضغطي رد + فوق وادعي أي صديق.", time: "08:22", type: "me", reactions: [] },
  ]);
  const [typing, setTyping] = useState(true);
  const [picker, setPicker] = useState(false);

  const usersOnline = [
    { name: "يوسف", avatar: user1, online: true },
    { name: "سارة", avatar: user2, online: true },
    { name: "خالد", avatar: user3, online: false },
    { name: "هند", avatar: user4, online: true },
  ];
  const chatRef = useRef();

  // Scroll آخر رسالة
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  // ديمو الكتابة
  useEffect(() => {
    const timer = setTimeout(() => setTyping(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // إضافة رسالة
  function sendMessage(msg) {
    if (!msg) return;
    setMessages([...messages, {
      user: "يوسف", avatar: user1, msg, time: "08:23", type: "me", reactions: []
    }]);
    setInput("");
    // ديمو صوت إرسال رسالة (تشغيل صوت قصير — يمكنك إضافة mp3 في public وتشغيله هنا)
    // new Audio("/send.mp3").play(); // Uncomment لو عندك ملف صوت
  }

  // رد فعل Emoji
  function reactTo(index, emoji) {
    setMessages(messages =>
      messages.map((m, i) =>
        i === index ? { ...m, reactions: [...(m.reactions || []), emoji] } : m
      )
    );
  }

  // تبديل الوضع الليلي
  function toggleNight() {
    setNight(v => !v);
  }

  // إضافة صورة/مرفق (ديمو)
  function handleAttach() {
    setShowAttach(true);
    setTimeout(() => setShowAttach(false), 1400);
  }

  // إضافة Emoji من Picker ديمو
  function addEmoji(e) {
    setInput(input + e);
    setPicker(false);
  }

  return (
    <div style={{
      background: night ? "#1d1e30" : "#fff",
      borderRadius: 22,
      width: "100%",
      boxShadow: "0 7px 24px #e7e9fa18, 0 1.5px 7px #7c4dff09",
      border: "2.3px solid #ece7fd",
      display: "flex",
      flexDirection: "column",
      color: night ? "#fff" : "#222"
    }}>
      {/* هيدر الشات */}
      <div style={{
        background: night
          ? "linear-gradient(93deg,#23273c 60%,#21c692 100%)"
          : "linear-gradient(93deg,#21c692 75%,#7c4dff 100%)",
        padding: "15px 20px 10px 20px",
        borderTopLeftRadius: 22, borderTopRightRadius: 22,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={chatIcon} alt="" style={{ width: 34, borderRadius: 8, background: "#fff", padding: 3 }} />
          <span style={{
            color: "#fff", fontWeight: 900, fontSize: 18, letterSpacing: ".7px"
          }}>منصة منجز للدردشة</span>
          <span style={{
            background: "#fff3", color: "#fff", fontWeight: 800, fontSize: 13, borderRadius: 10, padding: "2px 10px", marginRight: 10, display: "flex", alignItems: "center", gap: 4
          }}>
            مشفرة وآمنة <img src={lockIcon} alt="قفل" style={{ width: 15, verticalAlign: "middle" }} />
          </span>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {/* زر الوضع الليلي */}
          <button onClick={toggleNight} title={night ? "وضع نهاري" : "وضع ليلي"} style={{
            background: "none", border: "none", cursor: "pointer", marginRight: 2, marginLeft: 6
          }}>
            <img src={night ? sunIcon : moonIcon} alt="night" style={{ width: 20 }} />
          </button>
          {/* أونلاين */}
          {usersOnline.map((u, idx) =>
            <span key={u.name + idx} style={{ position: "relative", display: "inline-block" }}>
              <img src={u.avatar} alt={u.name} style={{
                width: 27, borderRadius: "50%", border: u.online ? "2px solid #21c692" : "2px solid #ddd"
              }} />
              {u.online && <span style={{
                position: "absolute", bottom: 2, left: 2, width: 8, height: 8,
                background: "#26de81", borderRadius: "50%", border: "2px solid #fff",
                animation: "onlineflash 1.1s infinite alternate"
              }} />}
            </span>
          )}
          <style>
            {`@keyframes onlineflash {
              0% { box-shadow: 0 0 2px #21c69244;}
              100% { box-shadow: 0 0 8px #21c692cc;}
            }`}
          </style>
        </div>
      </div>
      {/* نافذة الشات */}
      <div ref={chatRef} style={{
        background: night ? "#23273c" : "#f6fafd",
        padding: "21px 10px 13px 10px",
        minHeight: 180,
        maxHeight: 225,
        overflowY: "auto",
        display: "flex", flexDirection: "column", gap: 10,
        transition: "background .21s"
      }}>
        {messages.map((m, i) =>
          <div key={i} style={{
            display: "flex",
            flexDirection: m.type === "me" ? "row-reverse" : "row",
            alignItems: "flex-end",
            gap: 7
          }}>
            <img src={m.avatar} alt={m.user} style={{
              width: 29, borderRadius: "50%", border: "1.3px solid #e8e8f9"
            }} />
            <div style={{ position: "relative" }}>
              <div style={{
                background: m.type === "me"
                  ? "linear-gradient(90deg,#7c4dff 45%,#21c692 100%)"
                  : "linear-gradient(90deg,#fff 70%,#e0ece7 100%)",
                color: m.type === "me" ? "#fff" : night ? "#23273c" : "#444",
                borderRadius: m.type === "me" ? "13px 15px 2px 15px" : "15px 13px 15px 2px",
                padding: "8px 14px",
                fontWeight: 700,
                fontSize: 15,
                minWidth: 60,
                maxWidth: 220,
                boxShadow: m.type === "me"
                  ? "0 4px 16px #21c69219"
                  : "0 2px 7px #7c4dff18",
                marginBottom: 2,
                display: "inline-block",
                position: "relative"
              }}>
                {m.msg}
                {/* ردود أفعال */}
                {m.reactions && m.reactions.length > 0 && (
                  <span style={{
                    marginRight: 6,
                    marginLeft: 4,
                    fontSize: 15,
                    verticalAlign: "middle"
                  }}>
                    {m.reactions.map((e, ii) =>
                      <span key={ii} style={{ margin: "0 1px" }}>{e}</span>
                    )}
                  </span>
                )}
                {/* ردود فعل Emoji Bar عند Hover */}
                <span style={{
                  position: "absolute", left: m.type === "me" ? "unset" : -38, right: m.type === "me" ? -38 : "unset", top: 8,
                  opacity: 0.85
                }}>
                  <EmojiBar onReact={e => reactTo(i, e)} />
                </span>
              </div>
              <span style={{
                color: "#bbb", fontSize: 12, margin: m.type === "me" ? "0 7px 0 0" : "0 0 0 7px"
              }}>{m.time}</span>
            </div>
          </div>
        )}
        {/* حالة الكتابة */}
        {typing && (
          <div style={{
            display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10
          }}>
            <img src={user2} alt="typing" style={{ width: 28, borderRadius: "50%" }} />
            <span style={{
              background: "#fff",
              color: "#21c692",
              fontWeight: 900,
              borderRadius: "11px 11px 3px 12px",
              fontSize: 14,
              padding: "5px 11px",
              marginRight: 6,
              display: "inline-block",
              border: "1.1px solid #f0f5fa"
            }}>
              يكتب الآن <TypingDots />
            </span>
          </div>
        )}
      </div>
      {/* نافذة كتابة الرسالة */}
      <div style={{
        background: night ? "#23273c" : "#f8fafd",
        borderTop: "2px solid #eee",
        padding: "13px 12px 13px 8px",
        display: "flex", alignItems: "center", gap: 7
      }}>
        {/* زر مرفق/إيموجي */}
        <button title="إرفاق ملف/صورة" onClick={handleAttach} style={{
          background: "none", border: "none", cursor: "pointer"
        }}>
          <img src={attachIcon} alt="Attach" style={{ width: 21 }} />
        </button>
        <button title="إيموجي" onClick={() => setPicker(!picker)} style={{
          background: "none", border: "none", cursor: "pointer"
        }}>
          <img src={emojiIcon} alt="Emoji" style={{ width: 20 }} />
        </button>
        {picker && (
          <div style={{
            position: "absolute", bottom: 57, left: 110,
            background: "#fff", borderRadius: 12, boxShadow: "0 6px 22px #bbb8ff34", padding: 8, zIndex: 1000
          }}>
            {["😀", "😂", "😍", "😭", "👍", "🙏", "🔥", "😎"].map(e => (
              <button key={e} onClick={() => addEmoji(e)} style={{
                background: "none", border: "none", fontSize: 24, cursor: "pointer", margin: "0 1px"
              }}>{e}</button>
            ))}
          </div>
        )}
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{
            flex: 1, border: "none", borderRadius: 9, padding: "10px 13px", fontSize: 15, fontWeight: 700,
            background: night ? "#1d1e30" : "#f1f4fd", color: night ? "#fff" : "#333", outline: "none"
          }}
          placeholder="اكتب رسالة…"
        />
        <button
          onClick={() => sendMessage(input)}
          style={{
            background: "linear-gradient(93deg,#7c4dff 70%,#21c692 100%)", color: "#fff",
            border: "none", borderRadius: 10, padding: "8px 13px", fontWeight: 900, fontSize: 17,
            boxShadow: "0 1px 5px #7c4dff19", cursor: input ? "pointer" : "not-allowed", opacity: input ? 1 : 0.7
          }}
          disabled={!input}
        >
          <img src={sendIcon} alt="إرسال" style={{ width: 20, marginRight: 2, verticalAlign: "middle" }} />
        </button>
        {/* مرفق صورة (ديمو) */}
        {showAttach && (
          <span style={{
            background: "#7c4dff", color: "#fff", fontWeight: 900, borderRadius: 8,
            fontSize: 14, padding: "4px 13px", marginLeft: 11, position: "absolute", left: 110, bottom: 52,
            boxShadow: "0 3px 10px #7c4dff22", zIndex: 1000
          }}>تم إرفاق صورة! (ديمو)</span>
        )}
      </div>
      {/* فوتر خاص */}
      <div style={{
        background: night ? "#151724" : "#23273c",
        color: "#fff",
        padding: "8px 16px",
        borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
        fontWeight: 800,
        fontSize: 14.5, letterSpacing: ".5px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <span>دردشة منجز | آمنة بالكامل</span>
        <span style={{ color: "#21c692", fontWeight: 900 }}>2025 &copy;</span>
      </div>
    </div>
  );
}

// تعريف الأقسام مع ديمو محتوى لكل واحد (عدل أي نص أو صورة بحرية!)
const sections = [
{
  label: "متجر إلكتروني",
  icon: service3,
  demo: <ShopDemo />,
},
{
  label: "موقع شركة",
  icon: service4,
  demo: <CompanyDemo />,
},
  {
  label: "بورتفوليو",
  icon: service2,
  demo: <PortfolioDemo />,
},
  {
    label: "صفحة هبوط",
    icon: service1,
    demo: (
      <div>
        <h2 style={{ color: "#7c4dff" }}>Landing Page</h2>
        <img src={service1} style={{ width: 54, margin: "8px 0" }} alt="" />
        <div style={{ color: "#555", margin: "8px 0" }}>
          حملة تسويقية – CTA واضح – صور متحركة – نماذج تواصل
        </div>
      </div>
    ),
  },
  {
    label: "مدونة",
    icon: service5,
    demo: (
      <div>
        <h2 style={{ color: "#7c4dff" }}>مدونة/مقالات</h2>
        <img src={service5} style={{ width: 48, margin: "8px 0" }} alt="" />
        <div style={{ color: "#555", margin: "8px 0" }}>
          نشر مقالات – وسوم وتصنيفات – مشاركة تلقائية – تعليقات
        </div>
      </div>
    ),
  },
 {
  label: "منصة تعليمية",
  icon: service6,
  demo: <EducationDemo />,
},
  {
    label: "موقع خدمات",
    icon: service7,
    demo: (
      <div>
        <h2 style={{ color: "#7c4dff" }}>موقع خدمات احترافي</h2>
        <img src={service7} style={{ width: 50, margin: "8px 0" }} alt="" />
        <div style={{ color: "#555", margin: "8px 0" }}>
          صفحة لكل خدمة – معرض صور – حجوزات وتواصل سريع
        </div>
      </div>
    ),
  },
  {
  label: "تطبيق دردشة",
  icon: service8,
  demo: <ChatDemo />,
}
,
];




export default function WebPage() {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  useEffect(() => { document.title = " برمجة المواقع"; }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(108deg,#f9f9fe 67%,#ede7ff 100%)",
      fontFamily: "Tajawal, Arial",
      position: "relative",
      padding: 0,
      overflow: "hidden"
    }}>
      {/* موجة عليا */}
      <svg style={{
        width: "100%", height: 120, position: "absolute", top: 0, left: 0, zIndex: 1
      }} viewBox="0 0 1440 120">
        <path d="M0,60 Q600,140 1440,80 L1440,0 L0,0Z" fill="#a18fff" opacity="0.48" />
        <path d="M0,95 Q1200,180 1440,45 L1440,0 L0,0Z" fill="#7c4dff" opacity="0.16" />
      </svg>

      {/* نافذة الموقع الديمو */}
      <div style={{
        maxWidth: 1100,
        margin: "92px auto 40px auto",
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 12px 44px #a18fff13, 0 2px 16px #7c4dff09",
        border: "2.3px solid #f1f0fc",
        position: "relative",
        overflow: "hidden",
        minHeight: 560,
        zIndex: 6
      }}>
        {/* هيدر داخلي */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "22px 38px 11px 28px", borderBottom: "2px solid #f4f2fa",
          background: "linear-gradient(94deg,#f4f0ff 70%,#ede7ff 100%)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 17 }}>
            <img src={heroIcon} alt="Site Bot" style={{ width: 46 }} />
            <span style={{ color: "#7c4dff", fontWeight: 900, fontSize: 24, letterSpacing: 1.2 }}>
              {sections[selected].label}
            </span>
          </div>
  <button
  style={{
    background: "linear-gradient(93deg,#7c4dff 60%,#a18fff 100%)",
    color: "#fff", fontWeight: 800, fontSize: 17,
    borderRadius: 13, border: "none",
    boxShadow: "0 5px 18px #7c4dff1a",
    padding: "10px 24px", letterSpacing: 0.2, cursor: "pointer"
  }}
  onClick={() => navigate(`/web/weborder?type=${sections[selected].label}`)}
>
  اطلب موقع مشابه
</button>

        </div>

        {/* محتوى ديمو القسم المختار */}
        <div style={{
          display: "flex",
          minHeight: 380,
          flexDirection: "row",
          alignItems: "stretch"
        }}>
          {/* سايدبار الأقسام */}
          <div style={{
            width: 200, background: "#f9f6fe",
            borderRight: "2px solid #f2eaff",
            padding: "23px 0 18px 0", display: "flex", flexDirection: "column",
            gap: 4, alignItems: "center"
          }}>
            {sections.map((sec, idx) => (
              <button
                key={sec.label}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: selected === idx
                    ? "linear-gradient(93deg,#7c4dff 65%,#a18fff 100%)"
                    : "#fff",
                  color: selected === idx ? "#fff" : "#7c4dff",
                  border: "none",
                  borderRadius: 13,
                  fontWeight: 800, fontSize: 16.2,
                  padding: "8px 18px",
                  width: 174, textAlign: "right",
                  boxShadow: selected === idx
                    ? "0 6px 26px #7c4dff19"
                    : "0 2px 6px #7c4dff09",
                  marginBottom: 4, cursor: "pointer",
                  transition: "all .17s"
                }}
                onClick={() => setSelected(idx)}
              >
                <img src={sec.icon} alt="" style={{
                  width: 23, height: 23, borderRadius: 8,
                  filter: selected === idx ? "drop-shadow(0 2px 10px #fff2)" : "none"
                }} />
                {sec.label}
                
              </button>
            ))}
          </div>
          {/* محتوى الديمو */}
          <div style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            background: "#f6f4fa", padding: "36px 28px", minHeight: 320
          }}>
            <div style={{
              width: "100%", maxWidth: 730, textAlign: "center"
            }}>
              {sections[selected].demo}
            </div>
          </div>
        </div>

        {/* فوتر ديمو داخلي */}
        <div style={{
          borderTop: "2px solid #ede7ff",
          padding: "12px 35px", background: "#f9f6fe", fontSize: 16,
          color: "#a18fff", fontWeight: 800, display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <span>منجز – أفضل منصة برمجة مواقع عصرية</span>
          <span style={{ fontSize: 14, color: "#7c4dff" }}>جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</span>
        </div>
      </div>

      {/* زر CTA خارج الديمو */}
      <div style={{ textAlign: "center", margin: "36px auto 0 auto", zIndex: 10, position: "relative" }}>
        <button
        onClick={() => navigate("/web/weborder")}
          style={{
            padding: "15px 58px",
            borderRadius: 26,
            background: "linear-gradient(92deg,#a18fff 65%,#7c4dff 100%)",
            color: "#fff",
            border: "none",
            fontWeight: 900,
            fontSize: 21,
            letterSpacing: ".8px",
            boxShadow: "0 10px 26px 0 #a18fff28",
            cursor: "pointer",
            transition: "background .17s"
          }}
          onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(93deg,#7c4dff 60%,#a18fff 100%)")}
          onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(92deg,#a18fff 65%,#7c4dff 100%)")}
          
        >
          أطلق موقعك الآن 🚀
        </button>
      </div>
    </div>
  );
}
