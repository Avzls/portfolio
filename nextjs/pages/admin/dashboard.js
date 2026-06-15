import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { resolveMedia } from "@/src/media";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const TABS = [
  { key: "profile", label: "👤 Profile" },
  { key: "skills", label: "🛠️ Skills" },
  { key: "experiences", label: "📋 Resume" },
  { key: "portfolios", label: "💼 Portfolio" },
  { key: "social-links", label: "🔗 Social" },
  { key: "facts", label: "📊 Facts" },
  { key: "clients", label: "🤝 Clients" },
  { key: "blog-posts", label: "📝 Blog" },
  { key: "settings", label: "⚙️ Settings" },
];



export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [token, setToken] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) { router.push("/admin/login"); return; }
    setToken(t);
  }, []);

  // Track viewport so we can switch between drawer (mobile) and fixed (desktop).
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const logout = () => { localStorage.removeItem("token"); router.push("/admin/login"); };

  const selectTab = (key) => {
    setActiveTab(key);
    if (isMobile) setSidebarOpen(false);
  };

  if (!token) return null;

  const sidebarStyle = {
    ...styles.sidebar,
    ...(isMobile
      ? {
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 1100,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
        }
      : {}),
  };

  return (
    <>
      <Head>
        <title>Dashboard - Porto Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </Head>
      <div style={styles.layout}>
        {/* Mobile backdrop */}
        {isMobile && sidebarOpen && (
          <div style={styles.backdrop} onClick={() => setSidebarOpen(false)} />
        )}

        <aside style={sidebarStyle}>
          <h2 style={styles.sidebarTitle}>Porto Admin</h2>
          {TABS.map((tab) => (
            <button key={tab.key} onClick={() => selectTab(tab.key)}
              style={{ ...styles.tabBtn, ...(activeTab === tab.key ? styles.tabBtnActive : {}) }}>
              {tab.label}
            </button>
          ))}
          <button onClick={logout} style={{ ...styles.tabBtn, marginTop: "auto", color: "#ff6b6b" }}>
            🚪 Logout
          </button>
        </aside>
        <main style={styles.main}>
          {/* Mobile top bar with hamburger */}
          {isMobile && (
            <div style={styles.topbar}>
              <button onClick={() => setSidebarOpen(true)} style={styles.hamburger} aria-label="Open menu">
                ☰
              </button>
              <span style={styles.topbarTitle}>Porto Admin</span>
            </div>
          )}
          {activeTab === "profile" && <ProfileTab token={token} isMobile={isMobile} />}
          {activeTab === "skills" && <CrudTab token={token} endpoint="skills" fields={skillFields} title="Skills" isMobile={isMobile} />}
          {activeTab === "experiences" && <CrudTab token={token} endpoint="experiences" fields={expFields} title="Experiences" isMobile={isMobile} />}
          {activeTab === "portfolios" && <CrudTab token={token} endpoint="portfolios" fields={portfolioFields} title="Portfolios" isMobile={isMobile} />}
          {activeTab === "social-links" && <CrudTab token={token} endpoint="social-links" fields={socialFields} title="Social Links" isMobile={isMobile} />}
          {activeTab === "facts" && <CrudTab token={token} endpoint="facts" fields={factFields} title="Facts" isMobile={isMobile} />}
          {activeTab === "clients" && <CrudTab token={token} endpoint="clients" fields={clientFields} title="Clients" isMobile={isMobile} />}
          {activeTab === "blog-posts" && <CrudTab token={token} endpoint="blog-posts" fields={blogFields} title="Blog Posts" isMobile={isMobile} />}
          {activeTab === "settings" && <SettingsTab token={token} isMobile={isMobile} />}

        </main>

      </div>
    </>
  );
}


/* ===== PROFILE TAB ===== */
function ProfileTab({ token, isMobile }) {
  const gridStyle = { ...styles.cardGrid, ...(isMobile ? { gridTemplateColumns: "1fr" } : {}) };

  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/profile`).then(r => r.json()).then(setProfile);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch(`${API_URL}/api/admin/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    setMsg("✅ Saved!");
    setTimeout(() => setMsg(""), 2000);
  };

  const uploadFile = async (field, folder) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = field === "cv_url" ? ".pdf" : "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const res = await fetch(`${API_URL}/api/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      setProfile({ ...profile, [field]: data.url });
    };
    input.click();
  };

  if (!profile) return <div style={styles.loading}>Loading...</div>;

  const fields = [
    { key: "name", label: "Name" },
    { key: "tagline", label: "Tagline" },
    { key: "age", label: "Age" },
    { key: "education", label: "Education" },
    { key: "address", label: "Address" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "languages", label: "Languages" },
  ];

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Profile</h1>
        <button onClick={save} style={styles.saveBtn} disabled={saving}>
          {saving ? "Saving..." : "💾 Save"}
        </button>
      </div>
      {msg && <div style={styles.successMsg}>{msg}</div>}

      <div style={gridStyle}>
        {fields.map((f) => (
          <div key={f.key} style={styles.fieldGroup}>
            <label style={styles.fieldLabel}>{f.label}</label>
            <input style={styles.fieldInput} value={profile[f.key] || ""}
              onChange={(e) => setProfile({ ...profile, [f.key]: e.target.value })} />
          </div>
        ))}
      </div>

      <div style={{ ...gridStyle, marginTop: "20px" }}>

        <div style={styles.fieldGroup}>
          <label style={styles.fieldLabel}>Photo</label>
          <div style={styles.uploadRow}>
            <input style={{ ...styles.fieldInput, flex: 1 }} value={profile.photo_url || ""} readOnly />
            <button onClick={() => uploadFile("photo_url", "profile")} style={styles.uploadBtn}>📸 Upload</button>
          </div>
          {profile.photo_url && <img src={resolveMedia(profile.photo_url)} style={styles.previewImg} alt="preview" />}

        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.fieldLabel}>CV (PDF)</label>
          <div style={styles.uploadRow}>
            <input style={{ ...styles.fieldInput, flex: 1 }} value={profile.cv_url || ""} readOnly />
            <button onClick={() => uploadFile("cv_url", "profile")} style={styles.uploadBtn}>📄 Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== GENERIC CRUD TAB ===== */
function CrudTab({ token, endpoint, fields, title }) {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchItems = useCallback(() => {
    fetch(`${API_URL}/api/${endpoint}`).then(r => r.json()).then(setItems);
  }, [endpoint]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const emptyItem = () => {
    const obj = {};
    fields.forEach(f => { obj[f.key] = f.type === "number" ? 0 : ""; });
    return obj;
  };

  const openCreate = () => { setEditItem(emptyItem()); setShowForm(true); };
  const openEdit = (item) => { setEditItem({ ...item }); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditItem(null); };

  const saveItem = async () => {
    const isNew = !editItem.id;
    const url = isNew ? `${API_URL}/api/admin/${endpoint}` : `${API_URL}/api/admin/${endpoint}/${editItem.id}`;
    await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(editItem),
    });
    closeForm();
    fetchItems();
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this item?")) return;
    await fetch(`${API_URL}/api/admin/${endpoint}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchItems();
  };

  const uploadImage = async (field) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,.pdf";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", endpoint);
      const res = await fetch(`${API_URL}/api/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      setEditItem(prev => ({ ...prev, [field]: data.url }));
    };
    input.click();
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>{title}</h1>
        <button onClick={openCreate} style={styles.saveBtn}>➕ Add</button>
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              {fields.filter(f => !f.hidden).map(f => <th key={f.key} style={styles.th}>{f.label}</th>)}
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} style={i % 2 === 0 ? styles.trEven : {}}>
                <td style={styles.td}>{i + 1}</td>
                {fields.filter(f => !f.hidden).map(f => (
                  <td key={f.key} style={styles.td}>
                    {f.type === "image" && item[f.key] ? (
                      <img src={resolveMedia(item[f.key])} style={{ height: "40px", borderRadius: "4px" }} alt="" />
                    ) : (

                      String(item[f.key] || "").substring(0, 50)
                    )}
                  </td>
                ))}
                <td style={styles.td}>
                  <button onClick={() => openEdit(item)} style={styles.editBtn}>✏️</button>
                  <button onClick={() => deleteItem(item.id)} style={styles.deleteBtn}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>{editItem.id ? "Edit" : "Add"} {title}</h3>
            {fields.map(f => (
              <div key={f.key} style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>{f.label}</label>
                {f.type === "image" ? (
                  <div style={styles.uploadRow}>
                    <input style={{ ...styles.fieldInput, flex: 1 }} value={editItem[f.key] || ""} readOnly />
                    <button onClick={() => uploadImage(f.key)} style={styles.uploadBtn}>📸</button>
                  </div>
                ) : f.type === "textarea" ? (
                  <textarea style={{ ...styles.fieldInput, minHeight: "120px", resize: "vertical", fontFamily: "inherit" }}
                    value={editItem[f.key] || ""}
                    onChange={(e) => setEditItem({ ...editItem, [f.key]: e.target.value })}
                  />
                ) : (
                  <input style={styles.fieldInput}
                    type={f.type === "number" ? "number" : "text"}
                    value={editItem[f.key] || ""}
                    onChange={(e) => setEditItem({ ...editItem, [f.key]: f.type === "number" ? parseInt(e.target.value) || 0 : e.target.value })}
                  />
                )}

              </div>
            ))}
            <div style={styles.modalActions}>
              <button onClick={closeForm} style={styles.cancelBtn}>Cancel</button>
              <button onClick={saveItem} style={styles.saveBtn}>💾 Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== SETTINGS TAB ===== */
const THEME_COLORS = ["yellow", "green", "red", "blue", "orange", "yellowgreen", "pink", "goldenrod"];

const settingFields = [
  { key: "site_title", label: "Site Title (browser tab)" },
  { key: "hero_greeting", label: "Hero Greeting (e.g. Hello.)" },
  { key: "hero_intro", label: "Hero Intro (e.g. I am)" },
  { key: "header_email", label: "Header Email" },
  { key: "designer_name", label: "Designer Name (footer)" },
  { key: "designer_url", label: "Designer URL (footer link)" },
  { key: "theme_color", label: "Theme Color", type: "select", options: THEME_COLORS },
];


function SettingsTab({ token, isMobile }) {
  const gridStyle = { ...styles.cardGrid, ...(isMobile ? { gridTemplateColumns: "1fr" } : {}) };
  const [settings, setSettings] = useState(null);

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/settings`).then(r => r.json()).then(setSettings);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch(`${API_URL}/api/admin/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setMsg("✅ Saved!");
    setTimeout(() => setMsg(""), 2000);
  };

  if (!settings) return <div style={styles.loading}>Loading...</div>;

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Settings</h1>
        <button onClick={save} style={styles.saveBtn} disabled={saving}>
          {saving ? "Saving..." : "💾 Save"}
        </button>
      </div>
      {msg && <div style={styles.successMsg}>{msg}</div>}

      <div style={gridStyle}>
        {settingFields.map((f) => (

          <div key={f.key} style={styles.fieldGroup}>
            <label style={styles.fieldLabel}>{f.label}</label>
            {f.type === "select" ? (
              <select style={styles.fieldInput} value={settings[f.key] || ""}
                onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}>
                {f.options.map((opt) => (
                  <option key={opt} value={opt} style={{ color: "#000" }}>{opt}</option>
                ))}
              </select>
            ) : (
              <input style={styles.fieldInput} value={settings[f.key] || ""}
                onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })} />
            )}
          </div>
        ))}
      </div>

      <ChangePasswordForm token={token} />
    </div>
  );
}

/* ===== CHANGE PASSWORD FORM ===== */
function ChangePasswordForm({ token }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null); // { type: "ok"|"err", text }

  const submit = async () => {
    setMsg(null);
    if (next.length < 6) {
      setMsg({ type: "err", text: "Password baru minimal 6 karakter" });
      return;
    }
    if (next !== confirm) {
      setMsg({ type: "err", text: "Konfirmasi password tidak cocok" });
      return;
    }

    setSaving(true);
    const res = await fetch(`${API_URL}/api/admin/auth/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ current_password: current, new_password: next }),
    });
    setSaving(false);

    if (res.ok) {
      setMsg({ type: "ok", text: "✅ Password berhasil diubah" });
      setCurrent(""); setNext(""); setConfirm("");
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg({ type: "err", text: data.error || "Gagal mengubah password" });
    }
  };

  return (
    <div style={{ marginTop: "40px", maxWidth: "480px" }}>
      <h2 style={{ ...styles.pageTitle, fontSize: "18px", marginBottom: "16px" }}>🔑 Change Password</h2>
      {msg && (
        <div style={msg.type === "ok" ? styles.successMsg : { ...styles.successMsg, background: "rgba(255,59,48,0.15)", border: "1px solid rgba(255,59,48,0.3)", color: "#ff6b6b" }}>
          {msg.text}
        </div>
      )}
      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Current Password</label>
        <input type="password" style={styles.fieldInput} value={current} onChange={(e) => setCurrent(e.target.value)} />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>New Password</label>
        <input type="password" style={styles.fieldInput} value={next} onChange={(e) => setNext(e.target.value)} />
      </div>
      <div style={styles.fieldGroup}>
        <label style={styles.fieldLabel}>Confirm New Password</label>
        <input type="password" style={styles.fieldInput} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </div>
      <button onClick={submit} style={styles.saveBtn} disabled={saving}>
        {saving ? "Saving..." : "🔑 Update Password"}
      </button>
    </div>
  );
}


/* ===== FIELD CONFIGS ===== */
const skillFields = [

  { key: "name", label: "Skill Name", type: "text" },
  { key: "icon_class", label: "Icon Class (devicon)", type: "text" },
  { key: "sort_order", label: "Order", type: "number" },
];

const expFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "company", label: "Company", type: "text" },
  { key: "period", label: "Period", type: "text" },
  { key: "sort_order", label: "Order", type: "number" },
];

const portfolioFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "project_type", label: "Project Type", type: "text" },
  { key: "client", label: "Client", type: "text" },
  { key: "duration", label: "Duration", type: "text" },
  { key: "framework", label: "Framework", type: "text" },
  { key: "image_url", label: "Image", type: "image" },
  { key: "preview_url", label: "Preview URL", type: "text" },
  { key: "video_url", label: "Video Embed URL", type: "text" },
  { key: "sort_order", label: "Order", type: "number" },
];

const socialFields = [
  { key: "platform", label: "Platform", type: "text" },
  { key: "url", label: "URL", type: "text" },
  { key: "icon_class", label: "Icon Class (Font Awesome)", type: "text" },
  { key: "sort_order", label: "Order", type: "number" },
];

const factFields = [
  { key: "number", label: "Number (e.g. 4)", type: "text" },
  { key: "label", label: "Label (e.g. years of)", type: "text" },
  { key: "highlight", label: "Highlight (e.g. experience)", type: "text" },
  { key: "sort_order", label: "Order", type: "number" },
];

const clientFields = [
  { key: "name", label: "Client Name", type: "text" },
  { key: "logo_url", label: "Logo", type: "image" },
  { key: "sort_order", label: "Order", type: "number" },
];

const blogFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "category", label: "Category", type: "text" },
  { key: "excerpt", label: "Excerpt (short preview)", type: "text" },
  { key: "content", label: "Content (full article)", type: "textarea", hidden: true },
  { key: "image_url", label: "Image", type: "image" },
  { key: "post_date", label: "Post Date (e.g. 9 Apr 2022)", type: "text" },
  { key: "comments", label: "Comments Count", type: "number" },
  { key: "sort_order", label: "Order", type: "number" },
];



/* ===== STYLES ===== */
const styles = {
  layout: {
    display: "flex", minHeight: "100vh",
    background: "#0f0f23", fontFamily: "'Inter', sans-serif", color: "#fff",
  },
  sidebar: {
    width: "220px", background: "rgba(255,255,255,0.03)",
    borderRight: "1px solid rgba(255,255,255,0.08)",
    padding: "24px 16px", display: "flex", flexDirection: "column", gap: "4px",
  },
  sidebarTitle: { color: "#fff", fontSize: "18px", fontWeight: "700", marginBottom: "24px", padding: "0 8px" },
  tabBtn: {
    background: "none", border: "none", color: "rgba(255,255,255,0.6)",
    padding: "10px 12px", borderRadius: "8px", textAlign: "left",
    cursor: "pointer", fontSize: "13px", fontWeight: "500", transition: "all 0.15s",
  },
  tabBtnActive: {
    background: "rgba(102,126,234,0.2)", color: "#667eea",
  },
  main: { flex: 1, padding: "20px 16px", overflowY: "auto", minWidth: 0 },

  backdrop: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.5)", zIndex: 1050,
  },
  topbar: {
    display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px",
  },
  hamburger: {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff", fontSize: "18px", lineHeight: 1, padding: "8px 12px",
    borderRadius: "8px", cursor: "pointer",
  },
  topbarTitle: { fontSize: "16px", fontWeight: "700" },

  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  pageTitle: { fontSize: "24px", fontWeight: "700", margin: 0 },
  loading: { color: "rgba(255,255,255,0.5)", padding: "40px", textAlign: "center" },
  successMsg: {
    background: "rgba(52,199,89,0.15)", border: "1px solid rgba(52,199,89,0.3)",
    borderRadius: "8px", padding: "10px 16px", color: "#34c759", fontSize: "13px", marginBottom: "16px",
  },
  cardGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  fieldGroup: { marginBottom: "12px" },
  fieldLabel: { display: "block", color: "rgba(255,255,255,0.6)", fontSize: "12px", marginBottom: "4px", fontWeight: "500" },
  fieldInput: {
    width: "100%", padding: "10px 12px", background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
    color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box",
  },
  uploadRow: { display: "flex", gap: "8px", alignItems: "center" },
  uploadBtn: {
    padding: "10px 14px", background: "rgba(102,126,234,0.2)", border: "1px solid rgba(102,126,234,0.3)",
    borderRadius: "8px", color: "#667eea", cursor: "pointer", fontSize: "13px", whiteSpace: "nowrap",
  },
  previewImg: { marginTop: "8px", height: "80px", borderRadius: "8px", objectFit: "cover" },
  saveBtn: {
    padding: "10px 20px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none", borderRadius: "8px", color: "#fff", fontSize: "13px",
    fontWeight: "600", cursor: "pointer",
  },
  cancelBtn: {
    padding: "10px 20px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "8px", color: "#fff", fontSize: "13px", cursor: "pointer",
  },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left", padding: "10px 12px", fontSize: "12px", fontWeight: "600",
    color: "rgba(255,255,255,0.5)", borderBottom: "1px solid rgba(255,255,255,0.08)",
    textTransform: "uppercase", letterSpacing: "0.5px",
  },
  td: { padding: "10px 12px", fontSize: "13px", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  trEven: { background: "rgba(255,255,255,0.02)" },
  editBtn: { background: "none", border: "none", cursor: "pointer", fontSize: "14px", padding: "4px 8px" },
  deleteBtn: { background: "none", border: "none", cursor: "pointer", fontSize: "14px", padding: "4px 8px" },
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px", padding: "24px", width: "calc(100% - 32px)", maxWidth: "500px", maxHeight: "85vh", overflowY: "auto",
  },

  modalTitle: { fontSize: "18px", fontWeight: "600", marginBottom: "20px" },
  modalActions: { display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "20px" },
};
