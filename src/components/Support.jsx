import React from "react";
import systemIcon from "../assets/svg/system.svg";
import verifiedIcon from "../assets/svg/verified.svg";
import aramcoIcon from "../assets/svg/aramco.svg";
import stcIcon from "../assets/svg/stc.svg";
import sabicIcon from "../assets/svg/sabic.svg";
import madaIcon from "../assets/svg/mada.svg";
import trophyIcon from "../assets/svg/trophy.svg";
import analyticsIcon from "../assets/svg/analytics.svg";
import shieldIcon from "../assets/svg/shield.svg";
import supportIcon from "../assets/svg/support.svg";
import aiIntegrationIcon from "../assets/svg/ai-integration.svg";
import teamImg from "../assets/svg/team.svg"; // عدل لمسار صورة فريقك أو رسم جرافيكي

export default function AboutUs() {
  return (
    <div dir="rtl" style={{ background: "#f6f6ff", fontFamily: "Tajawal, Arial, sans-serif", width: "100vw" }}>
      {/* هيدر فاخر */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 10px 38px", textAlign: "center" }}>
        <img src={systemIcon} alt="من نحن" style={{ width: 64, marginBottom: 20 }} />
        <h1 style={{
          color: "#7c4dff", fontWeight: 900, fontSize: 37, marginBottom: 16, letterSpacing: ".01em"
        }}>
          من نحن — منجز، قصة نجاح سعودي
        </h1>
        <p style={{
          color: "#666", fontWeight: 700, fontSize: 18, marginBottom: 33, maxWidth: 540, margin: "0 auto"
        }}>
          منجز ليست مجرد شركة تقنية… نحن فريق شغوف يُبدع ويحقق أحلام العملاء، نطور حلولًا رقمية بمواصفات عالمية ومعايير سعودية صرفة.
        </p>
      </section>

      {/* قصة منجز & فريق العمل */}
      <section style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 45,
        maxWidth: 1080, margin: "0 auto", marginBottom: 44, flexWrap: "wrap"
      }}>
        {/* رسم أو صورة فريق/هوية */}
        <img src={teamImg} alt="فريق منجز" style={{
          width: 340, maxWidth: "100%", borderRadius: 32, boxShadow: "0 6px 26px #7c4dff18"
        }} />
        <div style={{ flex: 1, minWidth: 300 }}>
          <h2 style={{ color: "#8247e5", fontWeight: 800, fontSize: 25, marginBottom: 16 }}>
            لماذا منجز؟
          </h2>
          <ul style={{
            listStyle: "none", padding: 0, color: "#444", fontWeight: 700, fontSize: 16, marginBottom: 13, lineHeight: 2
          }}>
            <li>✔️ خبرة حقيقية في تطوير الأنظمة والمواقع والتطبيقات</li>
            <li>✔️ فريق سعودي بالكامل، يفهم احتياجات السوق المحلي والعالمي</li>
            <li>✔️ شراكات رسمية مع جهات معتمدة</li>
            <li>✔️ حلول آمنة، ذكية، وقابلة للتوسع</li>
            <li>✔️ استشارات تقنية مستمرة ودعم فني سريع</li>
          </ul>
          <div style={{
            color: "#259f45", fontWeight: 800, fontSize: 17
          }}>مع منجز، أنت مع فريق يحمل مسؤولية نجاحك بكل تفاصيلها!</div>
        </div>
      </section>

      {/* قسم القيم والشهادات */}
      <section style={{
        background: "#f2f0fd", padding: "48px 0 33px", marginBottom: 40
      }}>
        <h2 style={{
          color: "#7c4dff", fontWeight: 900, fontSize: 26, textAlign: "center", marginBottom: 15
        }}>
          قيمنا… والجودة أساس كل إنجاز
        </h2>
        <div style={{
          display: "flex", justifyContent: "center", gap: 22, marginBottom: 30, flexWrap: "wrap"
        }}>
          <ValueCard icon={shieldIcon} title="حماية وأمان" desc="بياناتك بأمان مع أعلى المعايير العالمية." color="#3866ed" />
          <ValueCard icon={supportIcon} title="دعم فني سعودي" desc="استجابة سريعة ومتابعة مستمرة." color="#259f45" />
          <ValueCard icon={aiIntegrationIcon} title="ابتكار وذكاء" desc="حلول عصرية تعتمد أحدث التقنيات." color="#7c4dff" />
          <ValueCard icon={analyticsIcon} title="تحليل وشفافية" desc="كل مشروع بقياسات حقيقية ونتائج ملموسة." color="#ffae2b" />
        </div>
        <div style={{ textAlign: "center", color: "#555", fontWeight: 700, fontSize: 16, marginBottom: 24 }}>
          لا حلول جاهزة… كل مشروع يُبنى خصيصاً لك!
        </div>
      </section>

      {/* شهادات التوثيق والشراكة */}
      <section style={{
        maxWidth: 980, margin: "0 auto", padding: "38px 10px 18px", textAlign: "center"
      }}>
        <h2 style={{
          color: "#8247e5", fontWeight: 900, fontSize: 24, marginBottom: 19
        }}>شهادات وجوائز وتوثيق</h2>
        <div style={{
          display: "flex", justifyContent: "center", gap: 30, alignItems: "center", flexWrap: "wrap", marginBottom: 20
        }}>
          <img src={verifiedIcon} alt="توثيق" style={{ width: 46 }} />
          <img src={trophyIcon} alt="جائزة" style={{ width: 44 }} />
          <img src={aramcoIcon} alt="أرامكو" style={{ width: 56 }} />
          <img src={stcIcon} alt="STC" style={{ width: 52 }} />
          <img src={sabicIcon} alt="SABIC" style={{ width: 49 }} />
          <img src={madaIcon} alt="مدى" style={{ width: 54 }} />
        </div>
        <div style={{ color: "#18c27d", fontWeight: 900, fontSize: 19 }}>
          معتمدون وموثوقون من أكبر الهيئات والشركات في السعودية
        </div>
      </section>

      {/* قسم الأرقام والإحصائيات */}
      <section style={{
        maxWidth: 1100, margin: "0 auto", padding: "52px 10px 38px"
      }}>
        <h2 style={{
          color: "#7c4dff", fontWeight: 900, fontSize: 25, textAlign: "center", marginBottom: 11
        }}>حقائق وأرقام منجز</h2>
        <div style={{
          display: "flex", justifyContent: "center", gap: 28, margin: "18px 0 0", flexWrap: "wrap"
        }}>
          <StatCard icon={trophyIcon} color="#7c4dff" value="+220" label="مشروع ناجح" />
          <StatCard icon={verifiedIcon} color="#259f45" value="6" label="شهادات توثيق وجوائز" />
          <StatCard icon={shieldIcon} color="#3866ed" value="99.5%" label="رضا العملاء" />
          <StatCard icon={analyticsIcon} color="#ffae2b" value="1st" label="ريادة السوق السعودي" />
        </div>
      </section>

      {/* خاتمة & تواصل */}
      <section style={{
        maxWidth: 600, margin: "48px auto 0 auto", padding: "0 10px 70px", textAlign: "center"
      }}>
        <div style={{
          background: "linear-gradient(93deg,#7c4dff 40%,#24e9ca 100%)",
          borderRadius: 18, padding: "34px 0",
          color: "#fff", fontWeight: 900, fontSize: 23, marginBottom: 14,
        }}>
          مستعد تتعرف على شريك نجاحك القادم؟
          <div>
            <button style={{
              marginTop: 15, background: "#fff", color: "#7c4dff", fontWeight: 900, fontSize: 18,
              borderRadius: 12, padding: "13px 54px", border: "none", cursor: "pointer",
              transition: "all .16s"
            }}>تواصل مع فريق منجز الآن</button>
          </div>
        </div>
      </section>

      {/* فوتر */}
      <footer style={{
        background: "#262743", color: "#fff", padding: "38px 0 23px 0", marginTop: 24, textAlign: "center"
      }}>
        جميع الحقوق محفوظة &copy; منجز {new Date().getFullYear()}
      </footer>
    </div>
  );
}

// ---- كومبوننتس فرعية ----
function ValueCard({ icon, title, desc, color }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 19,
      boxShadow: "0 2px 10px #7c4dff13",
      border: "1.5px solid #ece8fb",
      padding: "23px 15px 12px", textAlign: "center", minWidth: 180, flex: 1
    }}>
      <img src={icon} alt={title} style={{ width: 31, marginBottom: 7 }} />
      <div style={{
        color, fontWeight: 900, fontSize: 16, marginBottom: 4
      }}>{title}</div>
      <div style={{
        color: "#444", fontWeight: 600, fontSize: 14
      }}>{desc}</div>
    </div>
  );
}

function StatCard({ icon, color, value, label }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 17,
      boxShadow: `0 2px 10px ${color}16`,
      border: `1.5px solid ${color}22`,
      padding: "21px 13px 12px", textAlign: "center", minWidth: 120, flex: 1
    }}>
      <img src={icon} alt={label} style={{ width: 28, marginBottom: 7 }} />
      <div style={{
        color, fontWeight: 900, fontSize: 21, marginBottom: 2, fontFamily: "monospace"
      }}>{value}</div>
      <div style={{
        color: "#555", fontWeight: 700, fontSize: 14
      }}>{label}</div>
    </div>
  );
}
