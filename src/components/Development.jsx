// SystemDevelopmentPage.js
import React, { useEffect } from "react";

// مسارات SVG (بدّلها لو عندك SVGات أصلية)
import shieldSVG from "../assets/svg/shield.svg";
import settingsSVG from "../assets/svg/settings.svg";
import aiSVG from "../assets/svg/ai.svg";
import supportSVG from "../assets/svg/support.svg";
import upgradeSVG from "../assets/svg/upgrade.svg";
import networkSVG from "../assets/svg/network.svg";

// CSS Animations
const css = `
@keyframes rotate {
  0% {transform: rotate(0);}
  100% {transform: rotate(360deg);}
}
@keyframes pulse {
  0%, 100% {filter: drop-shadow(0 0 0 #24e9ca66);}
  50% {filter: drop-shadow(0 0 16px #24e9ca99);}
}
@keyframes bounceIn {
  0% {opacity:0; transform: scale(.65);}
  80% {opacity:1; transform: scale(1.1);}
  100% {opacity:1; transform: scale(1);}
}
@keyframes fadeInRight {
  0% {opacity:0; transform: translateX(40px);}
  100% {opacity:1; transform: translateX(0);}
}
@keyframes fadeInLeft {
  0% {opacity:0; transform: translateX(-40px);}
  100% {opacity:1; transform: translateX(0);}
}
.planet-card {
  animation: bounceIn 1s cubic-bezier(.5,1.4,.5,1.01) forwards;
  opacity: 0;
}
.planet-card.show {
  opacity: 1;
}
.timeline-dot {
  animation: pulse 1.7s infinite;
}
.cta-glow {
  box-shadow: 0 0 16px 3px #24e9ca44, 0 8px 32px 0 #7c4dff22;
  transition: box-shadow .18s;
}
.cta-glow:hover {
  box-shadow: 0 0 32px 6px #24e9ca66, 0 8px 42px 0 #7c4dff33;
  filter: brightness(1.1);
}
`;

const PLANETS = [
  {
    icon: shieldSVG,
    color: "#24e9ca",
    title: "حماية مطلقة",
    desc: "أنظمة أمان متعددة الطبقات، حماية من الهجمات والاختراقات، ومراقبة على مدار الساعة.",
    anim: "rotate"
  },
  {
    icon: settingsSVG,
    color: "#7c4dff",
    title: "تطوير مستمر",
    desc: "ترقيات وتحديثات دائمة، بناء ميزات جديدة وتحديث البرمجيات بذكاء.",
    anim: "pulse"
  },
  {
    icon: aiSVG,
    color: "#46b6ff",
    title: "ذكاء اصطناعي",
    desc: "حلول ذكية للمراقبة والتنبيهات، ونظم تعتمد على AI لمعالجة المشاكل قبل وقوعها.",
    anim: "pulse"
  },
  {
    icon: supportSVG,
    color: "#ff7da7",
    title: "دعم تقني 24/7",
    desc: "فريق دعم احترافي متواجد دائمًا… لأي طارئ أو تطوير أو استشارة.",
    anim: "pulse"
  },
  {
    icon: upgradeSVG,
    color: "#ffa726",
    title: "ترقية الأنظمة",
    desc: "تطوير البنية التحتية، تحسين الأداء، واستبدال كل قديم بجديد أسرع وأكثر أمانًا.",
    anim: "rotate"
  }
];

export default function SystemDevelopmentPage() {
  useEffect(() => {
    // حركة دخول الكروت واحدة واحدة
    document.querySelectorAll('.planet-card').forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), 220 + i * 140);
    });
  }, []);
  return (
    <div style={{
      background: "linear-gradient(96deg,#f8faff 55%,#f4edff 100%)",
      minHeight: "100vh",
      fontFamily: "Tajawal, Arial",
      direction: "rtl",
      paddingBottom: 36
    }}>
      <style>{css}</style>

      {/* Hero */}
      <section style={{
        textAlign: "center",
        padding: "62px 0 34px"
      }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center"
        }}>
          <div style={{
            width: 104, height: 104, background: "radial-gradient(circle,#24e9ca22 60%,#7c4dff09 100%)",
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 13
          }}>
            <img
              src={networkSVG}
              alt="شبكة الأنظمة"
              style={{ width: 74, animation: "rotate 10s linear infinite" }}
            />
          </div>
          <h1 style={{
            fontWeight: 900,
            fontSize: 33,
            background: "linear-gradient(90deg, #7c4dff 65%, #24e9ca 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 10,
            letterSpacing: ".5px"
          }}>
            تطوير الأنظمة | أمان، أداء، مستقبل!
          </h1>
          <p style={{
            color: "#444",
            fontSize: 18,
            maxWidth: 510,
            margin: "0 auto 10px"
          }}>
            منظومات برمجية عصرية، محمية، قابلة للتطوير، مدعومة بأقوى خبراء الدعم والتقنية في السعودية.
          </p>
        </div>
      </section>

      {/* Planets */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
        gap: 26,
        maxWidth: 1200,
        margin: "0 auto 38px",
        justifyItems: "center"
      }}>
        {PLANETS.map((planet, idx) => (
          <div key={idx} className="planet-card" style={{
            background: "#fff",
            borderRadius: 28,
            boxShadow: "0 4px 18px 0 rgba(124,77,255,0.09)",
            padding: "32px 18px 28px",
            minWidth: 210,
            minHeight: 220,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative"
          }}>
            <div style={{
              width: 66, height: 66, marginBottom: 13,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: `radial-gradient(circle,${planet.color}22 60%,#fff0 100%)`
            }}>
              <img
                src={planet.icon}
                alt={planet.title}
                style={{
                  width: 42,
                  animation: planet.anim + " 2.8s linear infinite"
                }}
              />
            </div>
            <h2 style={{
              fontWeight: 800, fontSize: 18.5, color: "#7c4dff", margin: "0 0 8px"
            }}>{planet.title}</h2>
            <div style={{
              color: "#444", fontSize: 15.2, lineHeight: 1.7, marginBottom: 0
            }}>{planet.desc}</div>
          </div>
        ))}
      </section>

      {/* Timeline Steps */}
      <section style={{ maxWidth: 800, margin: "0 auto 38px" }}>
        <h2 style={{
          textAlign: "center", fontWeight: 900, fontSize: 23,
          color: "#7c4dff", marginBottom: 22
        }}>
          خطواتنا في تطوير الأنظمة
        </h2>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: 0, marginTop: 14
        }}>
          {["تحليل نظامك", "خطة تطوير", "تأمين وترقية", "صيانة ومتابعة دورية"].map((txt, i, arr) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="timeline-dot" style={{
                  width: 23, height: 23, background: "#fff", border: "4px solid #24e9ca",
                  borderRadius: "50%", marginBottom: 7, boxShadow: "0 1px 8px #24e9ca33"
                }}></div>
                <span style={{
                  fontWeight: 800, fontSize: 14.5, color: "#444", whiteSpace: "nowrap"
                }}>{txt}</span>
              </div>
              {i !== arr.length - 1 && (
                <div style={{
                  height: 4, background: "linear-gradient(90deg,#24e9ca 60%,#7c4dff 100%)",
                  flex: 1, margin: "0 3px"
                }}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Solutions Grid */}
      <section style={{ maxWidth: 1080, margin: "0 auto 36px" }}>
        <h2 style={{
          textAlign: "center", fontWeight: 900, fontSize: 23,
          color: "#7c4dff", marginBottom: 20
        }}>
          حلول تطوير تناسب كل احتياج:
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(185px,1fr))",
          gap: 20,
          justifyItems: "center"
        }}>
          {[
            { txt: "مواقع شركات", icon: settingsSVG },
            { txt: "متاجر إلكترونية", icon: aiSVG },
            { txt: "أنظمة حجز وعيادات", icon: shieldSVG },
            { txt: "دعم فني ذكي", icon: supportSVG },
            { txt: "بنية تحتية متطورة", icon: upgradeSVG }
          ].map((s, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 2px 12px 0 #7c4dff14",
              padding: "18px 8px 14px",
              minWidth: 140,
              textAlign: "center"
            }}>
              <img src={s.icon} alt="" style={{ width: 28, marginBottom: 7 }} />
              <div style={{
                fontWeight: 700, color: "#24e9ca", fontSize: 15
              }}>{s.txt}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        maxWidth: 480, margin: "0 auto 28px", textAlign: "center"
      }}>
        <div className="cta-glow" style={{
          background: "linear-gradient(93deg,#7c4dff 70%,#24e9ca 100%)",
          borderRadius: 17,
          padding: "34px 12px 20px",
          transition: "box-shadow .18s"
        }}>
          <h2 style={{
            fontSize: 22, color: "#fff", marginBottom: 15, fontWeight: 900
          }}>جاهز تطوّر نظامك وتخليه بيد أمينة؟</h2>
          <a href="/dev" style={{
            padding: "12px 28px",
            background: "linear-gradient(90deg,#24e9ca 16%,#7c4dff 90%)",
            borderRadius: 15,
            color: "#fff",
            fontWeight: 800,
            fontSize: 15,
            textDecoration: "none",
            boxShadow: "0 2px 14px 0 #24e9ca25",
            transition: "filter .12s",
            display: "inline-block"
          }}
            onMouseOver={e => e.currentTarget.style.filter = "brightness(1.10)"}
            onMouseOut={e => e.currentTarget.style.filter = "brightness(1)"}
          >ابدأ التطوير الآن</a>
        </div>
      </section>
    </div>
  );
}
