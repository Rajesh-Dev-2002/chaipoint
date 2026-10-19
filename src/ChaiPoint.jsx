import React, { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX, Flame, MapPin, Clock, Phone,Mail, SkipForward,Instagram } from "lucide-react";


const PLAYLIST = [
  { title: "Chhoti Si Pyarisi Nanhisi", src: "/audio/Chhoti Si Pyarisi Nanhisi Male Anari 320 Kbps.mp3" },
  { title: "Chori Chori Dil Tera", src: "/audio/Chori Chori Dil Tera Phool Aur Angaar 320 Kbps.mp3" },
  { title: "Jaadu Teri Nazar", src: "/audio/Jaadu Teri Nazar Darr 320 Kbps.mp3" },
  { title: "O Lal Dupatte Wali", src: "/audio/O Lal Dupatte Wali Aankhen 320 Kbps.mp3" },
  { title: "Phoolon Sa Chehra Tera", src: "/audio/Phoolon Sa Chehra Tera Anari 320 Kbps.mp3" },
  { title: "Tumse Milna", src: "/audio/Tumse Milna Tere Naam 320 Kbps.mp3" },
  { title: "Raah Mein Unse Mulaqat", src: "/audio/Raah Mein Unse Mulaqat Vijaypath 320 Kbps.mp3" },
  { title: "Mujhse Mohabbat Ka", src: "/audio/Mujhse Mohabbat Ka Hum Hain Rahi Pyar Ke 320 Kbps.mp3" },
  { title: "Main Duniya Bhula Doonga", src: "/audio/Main Duniya Bhula Doonga Aashiqui 320 Kbps.mp3" },
  { title: "Kitna Haseen Chehra", src: "/audio/Kitna Haseen Chehra Dilwale 320 Kbps.mp3" },
  { title: "Jeeye To Jeeye Kaise", src: "/audio/Jeeye To Jeeye Kaise Duet Version Saajan 320 Kbps.mp3" },
  { title: "Hum Lakh Chupaye", src: "/audio/Hum Lakh Chupaye Jaan Tere Naam 320 Kbps.mp3" },
  { title: "Ek Sanam Chahiye", src: "/audio/Ek Sanam Chahiye Aashiqui Ke Liye Aashiqui 320 Kbps.mp3" },
  { title: "Dard Karaara Dum Laga Ke", src: "/audio/Dard Karaara Dum Laga Ke Haisha 320 Kbps.mp3" },
  { title: "Tu Pyar Hai Kisi Aur Ka", src: "/audio/Tu Pyar Hai Kisi Aur Ka Dil Hai Ke Manta Nahin 320 Kbps.mp3" },
  { title: "Saaton Janam Main Tere", src: "/audio/Saaton Janam Main Tere Dilwale 320 Kbps.mp3" },
  { title: "Sab Kuchh Bhula Diya", src: "/audio/Sab Kuchh Bhula Diya Hum Tumhare Hain Sanam 320 Kbps.mp3" },
  { title: "Woh Meri Neend Mera Chain", src: "/audio/Woh Meri Neend Mera Chain Hum Hain Rahi Pyar Ke 320 Kbps.mp3" },
  { title: "Tujhko Na Dekhun", src: "/audio/Tujhko Na Dekhun Jaanwar 320 Kbps.mp3" },
  { title: "Tum Dil Ki Dhadkan Mein", src: "/audio/Tum Dil Ki Dhadkan Mein Kumar Sanu 320 Kbps.mp3" },
  { title: "Tum Se Achcha Kaun Hai", src: "/audio/Tum Se Achcha Kaun Hai Chand Tare Phool Tauseef Akhtar 320 Kbps.mp3" },
  { title: "Tumhein Apna Banane Ki", src: "/audio/Tumhein Apna Banane Ki Kasam Khai Hai Male Sadak 320 Kbps.mp3" },
  { title: "Tumsa Koi Pyaara", src: "/audio/Tumsa Koi Pyaara Khuddar 320 Kbps.mp3" },
  
];

function shuffledIndices(length, excludeIndex) {
  const pool = Array.from({ length }, (_, i) => i).filter((i) => i !== excludeIndex);
  if (pool.length === 0) return 0;
  return pool[Math.floor(Math.random() * pool.length)];
}

function usePlaylistPlayer(playlist) {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * Math.max(playlist.length, 1))
  );
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      setCurrentIndex((prev) => shuffledIndices(playlist.length, prev));
    };
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [playlist.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = playlist[currentIndex]?.src || "";
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [currentIndex, playlist]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [playing]);

  const skip = useCallback(() => {
    setCurrentIndex((prev) => shuffledIndices(playlist.length, prev));
  }, [playlist.length]);

  return { audioRef, playing, toggle, skip, currentTitle: playlist[currentIndex]?.title };
}

const MENU = [
  { name: "Cutting Chai", price: "₹10", note: "Half glass, full mood" },
  { name: "Adrak Chai", price: "₹15", note: "Ginger-pounded, no mercy" },
  { name: "Elaichi Chai", price: "₹15", note: "Cardamom, extra fragrant" },
  { name: "Masala Chai", price: "₹18", note: "The whole spice box" },
  { name: "Kadak Chai", price: "₹15", note: "Strong enough to wake the dead" },
  { name: "Bun Maska", price: "₹20", note: "Butter melting on arrival" },
];

const STOPS = [
  { time: "Since", label: "1998", desc: "One kettle, one bench, one regular customer who never left." },
  { time: "Now", label: "4 Tapris", desc: "Same recipe, same rowdy adda energy, just more benches." },
  { time: "Always", label: "Open 6AM–11PM", desc: "Before the world's awake, after it's gone quiet." },
];

function EqualizerIcon({ active }) {
  return (
    <div className="flex items-end gap-[3px] h-4 w-5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-sm"
          style={{
            background: "#F0E4D0",
            height: active ? undefined : "4px",
            animation: active ? `eqbar 0.${6 + i * 3}s ease-in-out infinite alternate` : "none",
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function ChaiPoint() {
  const { audioRef, playing, toggle, skip, currentTitle } = usePlaylistPlayer(PLAYLIST);

  return (
    <div
      style={{
        background: "#241109",
        color: "#F0E4D0",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        minHeight: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes eqbar { from { height: 4px; } to { height: 16px; } }
        @keyframes steam {
          0% { transform: translateY(0) scaleX(1); opacity: 0.55; }
          50% { transform: translateY(-18px) scaleX(1.4); opacity: 0.25; }
          100% { transform: translateY(-38px) scaleX(0.8); opacity: 0; }
        }
        .signage { font-family: 'Impact', 'Arial Narrow Bold', sans-serif; letter-spacing: 0.02em; }
        .chalk { font-family: 'Georgia', serif; }
        .grain::before {
          content: "";
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(240,228,208,0.035) 1px, transparent 1px);
          background-size: 3px 3px;
          pointer-events: none;
        }
      `}</style>

      {/* Audio element driving the shuffled playlist */}
      <audio ref={audioRef} preload="none" />

      {/* Sound player: toggle + skip + now-playing */}
      <div
        style={{
          position: "fixed",
          top: "18px",
          right: "18px",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {playing && (
          <span
            style={{
              background: "#1A0D06",
              border: "1px solid #6B3410",
              borderRadius: "999px",
              padding: "6px 12px",
              fontSize: "0.7rem",
              color: "#D8C4A0",
              maxWidth: "160px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "'Arial', sans-serif",
            }}
            title={currentTitle}
          >
            ♪ {currentTitle}
          </span>
        )}
        <button
          onClick={skip}
          aria-label="Skip to another random track"
          style={{
            background: "#6B3410",
            border: "2px solid #F0E4D0",
            borderRadius: "999px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: "0 4px 0 #3D1D08",
          }}
        >
          <SkipForward size={25} color="#F0E4D0" />
        </button>
        <button
          onClick={toggle}
          aria-label={playing ? "Pause tapri radio" : "Play tapri radio"}
          style={{
            background: "#B5651D",
            border: "2px solid #F0E4D0",
            borderRadius: "999px",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 0 #6B3410",
          }}
        >
          {playing ? <Volume2 size={18} color="#F0E4D0" /> : <VolumeX size={18} color="#F0E4D0" />}
          <EqualizerIcon active={playing} />
        </button>
      </div>

      {/* HERO */}
      <section
        className="grain"
        style={{
          position: "relative",
          minHeight: "82vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          borderBottom: "6px solid #B5651D",
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(181,101,29,0.25), transparent 60%), #241109",
        }}
      >
        {/* Kettle + steam */}
        <div style={{ position: "relative", marginBottom: "18px" }}>
          <svg width="86" height="70" viewBox="0 0 86 70" fill="none">
            <path
              d="M10 50 Q10 30 43 30 Q76 30 76 50 L76 58 Q76 64 70 64 L16 64 Q10 64 10 58 Z"
              fill="#8B8680"
              stroke="#F0E4D0"
              strokeWidth="2"
            />
            <path d="M76 42 Q90 42 90 34 Q90 26 78 28" stroke="#8B8680" strokeWidth="4" fill="none" />
            <rect x="30" y="18" width="10" height="14" rx="2" fill="#8B8680" stroke="#F0E4D0" strokeWidth="2" />
          </svg>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                top: "-6px",
                left: `${28 + i * 10}px`,
                width: "5px",
                height: "20px",
                borderRadius: "999px",
                background: "#F0E4D0",
                opacity: 0.4,
                animation: `steam ${2.4 + i * 0.5}s ease-in infinite`,
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}
        </div>

        <h1
          className="signage"
          style={{
            fontSize: "clamp(3rem, 12vw, 7rem)",
            color: "#E8A33D",
            textShadow: "3px 3px 0 #6B3410, -1px -1px 0 #241109",
            textAlign: "center",
            lineHeight: 0.95,
            margin: 0,
          }}
        >
          chaiPoint
        </h1>
        <p
          className="chalk"
          style={{
            marginTop: "18px",
            fontSize: "1.15rem",
            color: "#D8C4A0",
            maxWidth: "480px",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Your neighborhood tapri, now with a website. Same steel glass. Same
          bench that wobbles. Same uncle who remembers your order1111.
        </p>
        <div
          style={{
            marginTop: "26px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              background: "#E8A33D",
              color: "#241109",
              padding: "8px 18px",
              borderRadius: "4px",
              fontWeight: "bold",
              fontFamily: "'Arial', sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "0.05em",
            }}
          >
            EST. 1998
          </span>
          <span
            style={{
              border: "1px solid #8B8680",
              padding: "8px 18px",
              borderRadius: "4px",
              fontSize: "0.85rem",
              fontFamily: "'Arial', sans-serif",
              color: "#8B8680",
            }}
          >
            Turn on the sound ↗
          </span>
        </div>
      </section>

      {/* MENU — chalkboard */}
      <section style={{ padding: "70px 20px", background: "#2E1710" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <h2
            className="signage"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
              color: "#F0E4D0",
              textAlign: "center",
              marginBottom: "6px",
            }}
          >
            The Board
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#8B8680",
              marginBottom: "36px",
              fontStyle: "italic",
            }}
          >
            Prices haven't changed since we stopped pretending inflation isn't real111111111111.
          </p>
          <div
            style={{
              background: "#1A0D06",
              border: "3px solid #6B3410",
              borderRadius: "8px",
              padding: "28px",
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.4)",
            }}
          >
            {MENU.map((item, i) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "14px 0",
                  borderBottom:
                    i !== MENU.length - 1 ? "1px dashed rgba(240,228,208,0.2)" : "none",
                }}
              >
                <div>
                  <div className="chalk" style={{ fontSize: "1.15rem", color: "#F0E4D0" }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#8B8680", fontStyle: "italic" }}>
                    {item.note}
                  </div>
                </div>
                <div style={{ color: "#E8A33D", fontWeight: "bold", fontSize: "1.1rem" }}>
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY / STOPS */}
      <section style={{ padding: "70px 20px", background: "#241109" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2
            className="signage"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
              color: "#F0E4D0",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            The Adda
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
            }}
          >
            {STOPS.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#2E1710",
                  border: "1px solid #6B3410",
                  borderRadius: "8px",
                  padding: "22px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <Flame size={16} color="#E8A33D" />
                  <span style={{ fontSize: "0.75rem", color: "#8B8680", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {s.time}
                  </span>
                </div>
                <div className="signage" style={{ fontSize: "1.6rem", color: "#E8A33D", marginBottom: "8px" }}>
                  {s.label}
                </div>
                <p style={{ fontSize: "0.9rem", color: "#D8C4A0", lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "50px 20px 40px",
          background: "#1A0D06",
          borderTop: "6px solid #B5651D",
          textAlign: "center",
        }}
      >
        <div className="signage" style={{ fontSize: "1.8rem", color: "#E8A33D", marginBottom: "16px" }}>
          chaiPoint
        </div>
        <div
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
            color: "#D8C4A0",
            fontSize: "0.9rem",
            fontFamily: "'Arial', sans-serif",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <MapPin size={14} color="#8B8680" /> Bengaluru,Karnataka,India
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Clock size={14} color="#8B8680" /> 6AM – 11PM, daily
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Mail size={14} color="#8B8680" /> rajeshkumarmohanta593@gmail.com
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }} href = "https://www.instagram.com/rajeshkumar.java/">
            <Instagram size={14} color="#8B8680" /> www.instagram.com/rajeshkumar.java
          </span>
        </div>
        <p style={{ marginTop: "24px", fontSize: "0.75rem", color: "#6B5A45" }}>
          © {new Date().getFullYear()} chaiPoint. Built with ❤️ and 90'S.
        </p>
      </footer>
    </div>
  );
}
