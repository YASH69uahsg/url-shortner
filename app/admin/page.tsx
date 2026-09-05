"use client";

import { useState, useEffect, useCallback } from "react";
import CopyButton from "@/components/CopyButton";

interface LinkData {
  id: string;
  code: string;
  destinationUrl: string;
  title: string | null;
  active: boolean;
  createdAt: string;
  totalViews: number;
  step1Views: number;
  step2Views: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [secretKey, setSecretKey] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Link creation state
  const [destinationUrl, setDestinationUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [title, setTitle] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");

  // Links list
  const [links, setLinks] = useState<LinkData[]>([]);
  const [linksLoading, setLinksLoading] = useState(false);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const fetchLinks = useCallback(async () => {
    setLinksLoading(true);
    try {
      const res = await fetch("/api/admin/links");
      if (res.ok) {
        const data = await res.json();
        setLinks(data.links);
        setIsAuthenticated(true);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      }
    } catch {
      // ignore
    } finally {
      setLinksLoading(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: secretKey }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setSecretKey("");
        fetchLinks();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Invalid key");
      }
    } catch {
      setLoginError("Network error");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");
    setCreateSuccess("");
    setCreateLoading(true);

    try {
      const res = await fetch("/api/admin/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinationUrl,
          customCode: customCode || undefined,
          title: title || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCreateSuccess(`Link created: ${appUrl}/s/${data.link.code}`);
        setDestinationUrl("");
        setCustomCode("");
        setTitle("");
        fetchLinks();
      } else {
        const data = await res.json();
        setCreateError(data.error || "Failed to create link");
      }
    } catch {
      setCreateError("Network error");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/links/${id}`, { method: "PATCH" });
      if (res.ok) fetchLinks();
    } catch {
      // ignore
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    try {
      const res = await fetch(`/api/admin/links/${id}`, { method: "DELETE" });
      if (res.ok) fetchLinks();
    } catch {
      // ignore
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
          <span className="text-sm text-white/40">Loading...</span>
        </div>
      </div>
    );
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="glass-card p-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mb-4 shadow-lg shadow-brand-500/30">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h1 className="text-2xl font-display font-bold text-white">LinkVault</h1>
              <p className="text-sm text-white/40 mt-1">Private URL Shortener</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="secret-key" className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
                  Admin Secret Key
                </label>
                <input
                  id="secret-key"
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Enter your secret key"
                  className="input-glass"
                  required
                  autoFocus
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {loginError}
                </div>
              )}

              <button type="submit" disabled={loginLoading} className="btn-primary w-full">
                {loginLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Authenticate"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  const totalViews = links.reduce((sum, l) => sum + l.totalViews, 0);
  const activeLinks = links.filter((l) => l.active).length;
  const totalStep2 = links.reduce((sum, l) => sum + l.step2Views, 0);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-white">LinkVault</h1>
            <p className="text-xs text-white/40">Admin Dashboard</p>
          </div>
        </div>
        <div className="badge-active">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse" />
          Admin
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in-up">
        <div className="stat-card">
          <span className="stat-value">{links.length}</span>
          <span className="stat-label">Total Links</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{activeLinks}</span>
          <span className="stat-label">Active Links</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalViews}</span>
          <span className="stat-label">Total Views</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalStep2}</span>
          <span className="stat-label">Completions</span>
        </div>
      </div>

      {/* Create Link Form */}
      <div className="glass-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-lg font-display font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Short Link
        </h2>

        <form onSubmit={handleCreateLink} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="destination-url" className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                Destination URL *
              </label>
              <input
                id="destination-url"
                type="url"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                placeholder="https://example.com/your-long-url"
                className="input-glass"
                required
              />
            </div>
            <div>
              <label htmlFor="custom-code" className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                Custom Code (optional)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-white/30 mr-2">/s/</span>
                <input
                  id="custom-code"
                  type="text"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="my-link"
                  className="input-glass"
                  pattern="^[a-zA-Z0-9_-]{3,20}$"
                />
              </div>
            </div>
            <div>
              <label htmlFor="title" className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                Title (optional)
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Descriptive title for this link"
                className="input-glass"
              />
            </div>
          </div>

          {createError && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {createError}
            </div>
          )}

          {createSuccess && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-mono text-xs">{createSuccess.replace("Link created: ", "")}</span>
              </div>
              <CopyButton text={createSuccess.replace("Link created: ", "")} />
            </div>
          )}

          <button type="submit" disabled={createLoading} className="btn-primary">
            {createLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Shorten URL
              </>
            )}
          </button>
        </form>
      </div>

      {/* Links Table */}
      <div className="glass-card overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="p-6 border-b border-white/[0.06]">
          <h2 className="text-lg font-display font-semibold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            All Links
            <span className="text-sm font-normal text-white/30">({links.length})</span>
          </h2>
        </div>

        {linksLoading && links.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin mx-auto mb-3" />
            <span className="text-sm text-white/40">Loading links...</span>
          </div>
        ) : links.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-12 h-12 text-white/10 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <p className="text-sm text-white/30">No links yet. Create your first short link above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-white/30 uppercase tracking-wider">
                  <th className="px-6 py-3">Link</th>
                  <th className="px-6 py-3">Destination</th>
                  <th className="px-6 py-3 text-center">Step 1</th>
                  <th className="px-6 py-3 text-center">Step 2</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {links.map((link) => (
                  <tr key={link.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-brand-400">/s/{link.code}</span>
                          <CopyButton text={`${appUrl}/s/${link.code}`} label="Copy" />
                        </div>
                        {link.title && (
                          <span className="text-xs text-white/30 mt-0.5">{link.title}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white/50 max-w-[200px] truncate block">
                        {link.destinationUrl}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium text-white/70">{link.step1Views}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium text-white/70">{link.step2Views}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleToggle(link.id)}>
                        {link.active ? (
                          <span className="badge-active">Active</span>
                        ) : (
                          <span className="badge-inactive">Inactive</span>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="btn-danger opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
