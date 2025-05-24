import React, {  useEffect} from "react";
import systemIcon from "../assets/svg/system.svg";
import webIcon from "../assets/svg/web.svg";
import seoIcon from "../assets/svg/seo.svg";
import mobileIcon from "../assets/svg/mobile.svg";
import aiIntegrationIcon from "../assets/svg/ai-integration.svg";
import shieldIcon from "../assets/svg/shield.svg";
import supportIcon from "../assets/svg/support.svg";
import shopIcon from "../assets/svg/shop.svg";
import iosIcon from "../assets/svg/ios-icon.svg";
import androidIcon from "../assets/svg/android-icon.svg";
import verifiedIcon from "../assets/svg/verified.svg";
import aramcoIcon from "../assets/svg/aramco.svg";
import stcIcon from "../assets/svg/stc.svg";
import sabicIcon from "../assets/svg/sabic.svg";
import madaIcon from "../assets/svg/mada.svg";
import checkIcon from "../assets/svg/check.svg";
import lightningIcon from "../assets/svg/lightning.svg";
import trophyIcon from "../assets/svg/trophy.svg";
import analyticsIcon from "../assets/svg/analytics.svg";
import launchIcon from "../assets/svg/sa-launch.svg";

export default function OurServices() {

useEffect(() => { document.title = "منجز - خدمات "; }, []);  


return (
    <div dir="rtl" style={{ fontFamily: "Tajawal, Arial, sans-serif", background: "#f6f6ff", width: "100vw" }}>
      {/* هيدر الصفحة */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 10px 36px", textAlign: "center" }}>
        <img src={systemIcon} alt="خدماتنا" style={{ width: 74, marginBottom: 20 }} />
        <h1 style={{
          color: "#7c4dff", fontWeight: 900, fontSize: 38, marginBottom: 16, letterSpacing: ".01em"
        }}>
          خدماتنا التقنية — بداية نجاحك
        </h1>
        <p style={{
          color: "#666", fontWeight: 700, fontSize: 18, marginBottom: 38, maxWidth: 530, margin: "0 auto"
        }}>
          نضع بين يديك موسوعة حلول تقنية تناسب كل مجال أعمال — أنظمة، مواقع، تطبيقات، حماية، ذكاء صناعي، ودعم سعودي حقيقي.
        </p>
      </section>

      {/* Grid الكروت الرئيسية */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "18px 10px 46px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, justifyContent: "center"
        }}>
          <ServiceCard icon={systemIcon} color="#8247e5" btnColor="#7c4dff"
            title="تطوير الأنظمة" desc="أنظمة متكاملة للأعمال، حماية وذكاء وأداء." btnLabel="شاهد الأنظمة" />
          <ServiceCard icon={webIcon} color="#1da6d6" btnColor="#1da6d6"
            title="برمجة المواقع" desc="مواقع عصرية سريعة وآمنة، برمجة احترافية." btnLabel="شاهد المواقع" />
          <ServiceCard icon={seoIcon} color="#ffae2b" btnColor="#ffae2b"
            title="تهيئة المواقع (SEO)" desc="تصدر البحث، ضاعف أرباحك بأحدث طرق السيو." btnLabel="شاهد السيو" />
          <ServiceCard icon={mobileIcon} color="#18c27d" btnColor="#18c27d"
            title="تطبيقات الموبايل" desc="Android وiOS بجودة وكفاءة فريق سعودي." btnLabel="شاهد التطبيقات" />
        </div>
      </section>

      {/* فاصل لوني أو خلفية أخف */}
      <div style={{ background: "#f3f0ff", padding: "36px 0 30px" }}>
        <h2 style={{
          color: "#7c4dff", fontWeight: 800, fontSize: 28, textAlign: "center", marginBottom: 32
        }}>مقارنة التطبيقات: Android VS iOS</h2>
        <div style={{
          display: "flex", justifyContent: "center", gap: 36, flexWrap: "wrap"
        }}>
          <CompareCard
            icon={iosIcon}
            color="#a45dfa"
            title="تطبيقات iOS"
            features={["تطبيقات أعمال فاخرة", "حلول للمستخدمين", "تنبيهات ومواعيد", "Apple Pay وتكامل سريع"]}
            btnLabel="اطلب iOS"
            btnColor="#a45dfa"
          />
          <CompareCard
            icon={androidIcon}
            color="#24e9ca"
            title="تطبيقات Android"
            features={["تسوق إلكتروني عصري", "إدارة متاجر ذكية", "مواعيد طبية", "أنظمة محاسبة"]}
            btnLabel="اطلب Android"
            btnColor="#24e9ca"
          />
        </div>
      </div>

      {/* قسم الإحصائيات وقصص النجاح */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "55px 10px 35px" }}>
        <h2 style={{ color: "#7c4dff", fontWeight: 900, fontSize: 27, textAlign: "center", marginBottom: 7 }}>
          🚀 إحصائيات ونجاحات منجز
        </h2>
        <div style={{
          display: "flex", justifyContent: "center", gap: 24, margin: "25px 0 18px", flexWrap: "wrap"
        }}>
          <StatCard icon={analyticsIcon} color="#7c4dff" value="99.7%" label="رضا العملاء" />
          <StatCard icon={launchIcon} color="#22e0fd" value="+200" label="مشروع ناجح" />
          <StatCard icon={checkIcon} color="#259f45" value="3 أشهر" label="متوسط إنجاز" />
          <StatCard icon={trophyIcon} color="#ffd166" value="#1" label="الريادة في السوق" />
        </div>
        <div style={{ textAlign: "center", fontWeight: 700, color: "#444", fontSize: 16, marginBottom: 24 }}>
          خبرة سعودية، ضمان حماية وأداء، ونتائج حقيقية لكل عميل.
        </div>
        <div style={{
          display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap"
        }}>
          <StoryCard icon={verifiedIcon} title="تصدُّر بحث جوجل" desc="أكثر من 20 كلمة مفتاحية بصفحة أولى لعملائنا." />
          <StoryCard icon={verifiedIcon} title="مضاعفة مبيعات متجر" desc="+120% زيارات ومبيعات في أقل من 3 شهور." />
        </div>
      </section>

      {/* قسم الأنظمة المتقدمة */}
      <div style={{ background: "#f5f9ff", padding: "58px 0 33px" }}>
        <h2 style={{ color: "#259f45", fontWeight: 900, fontSize: 27, textAlign: "center", marginBottom: 14 }}>
          حلول متقدمة — أمان وذكاء ومرونة
        </h2>
        <div style={{
          display: "flex", justifyContent: "center", gap: 22, flexWrap: "wrap"
        }}>
          <FeatureCard icon={aiIntegrationIcon} color="#36e59b" title="ذكاء صناعي" desc="حلول AI لكل المجالات." />
          <FeatureCard icon={shieldIcon} color="#3866ed" title="حماية متقدمة" desc="أمان وحماية ضد كل المخاطر." />
          <FeatureCard icon={supportIcon} color="#7c4dff" title="دعم فني سعودي" desc="استجابة فورية 24/7." />
        </div>
      </div>

      {/* قسم التوثيق والعملاء */}
      <section style={{ maxWidth: 1050, margin: "0 auto", padding: "48px 10px 28px" }}>
        <h2 style={{
          color: "#8247e5", fontWeight: 900, fontSize: 24, textAlign: "center", marginBottom: 25
        }}>موثوقين من أكبر الجهات والشركات:</h2>
        <div style={{
          display: "flex", justifyContent: "center", gap: 30, alignItems: "center", flexWrap: "wrap"
        }}>
          <img src={verifiedIcon} alt="توثيق" style={{ width: 42, margin: "0 5px" }} />
          <img src={aramcoIcon} alt="أرامكو" style={{ width: 56, margin: "0 5px" }} />
          <img src={stcIcon} alt="STC" style={{ width: 52, margin: "0 5px" }} />
          <img src={sabicIcon} alt="SABIC" style={{ width: 49, margin: "0 5px" }} />
          <img src={madaIcon} alt="مدى" style={{ width: 54, margin: "0 5px" }} />
        </div>
      </section>

      {/* CTA ختامي */}
      <section style={{ maxWidth: 510, margin: "42px auto 0 auto", padding: "0 10px 60px" }}>
        <div style={{
          background: "linear-gradient(93deg,#7c4dff 40%,#24e9ca 100%)",
          borderRadius: 18, padding: "32px 0",
          textAlign: "center", color: "#fff", fontWeight: 900, fontSize: 23, marginBottom: 9,
        }}>
          جاهز تبدأ مشروعك التقني مع منجز؟
          <div>
            <button style={{
              marginTop: 15, background: "#fff", color: "#7c4dff", fontWeight: 900, fontSize: 18,
              borderRadius: 12, padding: "11px 44px", border: "none", cursor: "pointer",
              transition: "all .16s"
            }}>اطلب استشارة مجانية الآن</button>
          </div>
        </div>
      </section>

      {/* فوتر بسيط */}
      <footer style={{
        background: "#262743", color: "#fff", padding: "38px 0 23px 0", marginTop: 24, textAlign: "center"
      }}>
        جميع الحقوق محفوظة &copy; منجز {new Date().getFullYear()}
      </footer>
    </div>
  );
}

// ------- المكونات الفرعية -------

function ServiceCard({ icon, color, title, desc, btnLabel, btnColor }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 23,
      boxShadow: "0 8px 32px #a488fa1b,0 2px 10px #7c4dff0b",
      border: "2.2px solid #ece8fb",
      padding: "38px 14px 25px",
      textAlign: "center",
      minHeight: 190,
      transition: "transform 0.22s",
      cursor: "pointer"
    }}>
      <div style={{
        background: color || "#7c4dff", width: 54, height: 54,
        borderRadius: "50%", display: "flex", alignItems: "center",
        justifyContent: "center", margin: "0 auto 14px auto",
        boxShadow: `0 2px 12px ${color || "#7c4dff"}18`
      }}>
        <img src={icon} alt={title} style={{ width: 32, height: 32 }} />
      </div>
      <div style={{
        fontSize: 19, fontWeight: 900, color: "#8247e5", marginBottom: 7
      }}>{title}</div>
      <div style={{
        color: "#555", fontWeight: 600, fontSize: 14.5, marginBottom: 11
      }}>{desc}</div>
      <button style={{
        background: btnColor || "#7c4dff", color: "#fff",
        borderRadius: 13, padding: "9px 28px", fontWeight: 900, fontSize: 15,
        border: "none", marginTop: 5, cursor: "pointer", letterSpacing: ".03em"
      }}>
        {btnLabel}
      </button>
    </div>
  );
}

function CompareCard({ icon, color, title, features, btnLabel, btnColor }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 21,
      boxShadow: `0 4px 20px ${color}11`,
      border: `1.8px solid ${color}44`,
      padding: "32px 20px",
      minWidth: 250, maxWidth: 350, flex: 1, textAlign: "center"
    }}>
      <img src={icon} alt={title} style={{ width: 40, marginBottom: 10 }} />
      <div style={{ color, fontWeight: 800, fontSize: 19, marginBottom: 13 }}>{title}</div>
      <ul style={{
        listStyle: "none", padding: 0, margin: 0, color: "#444", fontWeight: 700, fontSize: 15, marginBottom: 13
      }}>
        {features.map(f => <li key={f} style={{ marginBottom: 6 }}>{f}</li>)}
      </ul>
      <button style={{
        background: btnColor, color: "#fff",
        borderRadius: 12, padding: "9px 0", width: "100%", fontWeight: 800, fontSize: 15,
        border: "none", marginTop: 7, cursor: "pointer"
      }}>{btnLabel}</button>
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
      <img src={icon} alt={label} style={{ width: 30, marginBottom: 7 }} />
      <div style={{
        color, fontWeight: 900, fontSize: 24, marginBottom: 3, fontFamily: "monospace"
      }}>{value}</div>
      <div style={{
        color: "#555", fontWeight: 700, fontSize: 15
      }}>{label}</div>
    </div>
  );
}

function StoryCard({ icon, title, desc }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 17,
      boxShadow: "0 2px 10px #7c4dff13",
      border: "1.5px solid #ece8fb",
      padding: "21px 13px 12px", textAlign: "center", minWidth: 185, flex: 1
    }}>
      <img src={icon} alt={title} style={{ width: 32, marginBottom: 7 }} />
      <div style={{
        color: "#7c4dff", fontWeight: 900, fontSize: 17, marginBottom: 5
      }}>{title}</div>
      <div style={{
        color: "#444", fontWeight: 600, fontSize: 14
      }}>{desc}</div>
    </div>
  );
}

function FeatureCard({ icon, color, title, desc }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 17,
      boxShadow: "0 2px 10px #7c4dff13",
      border: "1.5px solid #ece8fb",
      padding: "23px 15px 12px", textAlign: "center", minWidth: 190, flex: 1
    }}>
      <img src={icon} alt={title} style={{ width: 34, marginBottom: 7 }} />
      <div style={{
        color, fontWeight: 900, fontSize: 16, marginBottom: 4
      }}>{title}</div>
      <div style={{
        color: "#444", fontWeight: 600, fontSize: 14
      }}>{desc}</div>
    </div>
  );
}
