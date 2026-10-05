'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  CalendarCheck,
  Check,
  Copy,
  Inbox,
  Mail,
  RefreshCw,
  Search,
  Trash2,
  Video,
  X,
} from 'lucide-react';
import { adminFetch } from '@/lib/admin-fetch';
import type { Inquiry } from '@/server/inquiries';

type StatusFilter = 'all' | 'new' | 'contacted' | 'scheduled' | 'closed';

interface InquiryStats {
  total: number;
  newCount: number;
  contactedCount: number;
  scheduledCount: number;
  closedCount: number;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<InquiryStats>({
    total: 0,
    newCount: 0,
    contactedCount: 0,
    scheduledCount: 0,
    closedCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Scheduling state for drawer
  const [meetingDate, setMeetingDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [meetingTime, setMeetingTime] = useState('10:00');
  const [meetingDuration, setMeetingDuration] = useState('30');
  const [meetingLink, setMeetingLink] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch('/api/admin/inquiries');
      if (!res.ok) throw new Error('Failed to load inquiries');
      const data = (await res.json()) as { inquiries: Inquiry[]; stats: InquiryStats };
      setInquiries(data.inquiries || []);
      if (data.stats) setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchInquiries();
  }, []);

  // Sync drawer inputs when selected inquiry changes
  useEffect(() => {
    if (selectedInquiry) {
      setAdminNotes(selectedInquiry.notes || '');
      setMeetingLink(selectedInquiry.meetingLink || '');
      if (selectedInquiry.meetingScheduledAt) {
        try {
          const d = new Date(selectedInquiry.meetingScheduledAt);
          setMeetingDate(d.toISOString().slice(0, 10));
          const hours = String(d.getHours()).padStart(2, '0');
          const mins = String(d.getMinutes()).padStart(2, '0');
          setMeetingTime(`${hours}:${mins}`);
        } catch {
          // keep fallback
        }
      }
    }
  }, [selectedInquiry]);

  const updateStatus = async (id: string, newStatus: Inquiry['status']) => {
    try {
      const res = await adminFetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Update failed');
      const data = (await res.json()) as { inquiry: Inquiry };
      setInquiries((prev) => prev.map((item) => (item.id === id ? data.inquiry : item)));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(data.inquiry);
      }
      void fetchInquiries();
    } catch {
      alert('Failed to update status.');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setSavingNotes(true);
    try {
      const res = await adminFetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: adminNotes }),
      });
      if (!res.ok) throw new Error('Save failed');
      const data = (await res.json()) as { inquiry: Inquiry };
      setSelectedInquiry(data.inquiry);
      setInquiries((prev) =>
        prev.map((item) => (item.id === selectedInquiry.id ? data.inquiry : item)),
      );
    } catch {
      alert('Could not save notes.');
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this inquiry?')) return;
    try {
      const res = await adminFetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
      void fetchInquiries();
    } catch {
      alert('Failed to delete inquiry.');
    }
  };

  // Google Calendar URL generator with Meet
  const handleScheduleGoogleMeet = async () => {
    if (!selectedInquiry) return;

    const startDateTime = new Date(`${meetingDate}T${meetingTime}:00`);
    const durationMinutes = parseInt(meetingDuration, 10) || 30;
    const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

    const formatGCalDate = (date: Date) =>
      date
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, '');

    const eventTitle = encodeURIComponent(`Neoxis x ${selectedInquiry.name} — Project Discovery`);
    const details = encodeURIComponent(
      `Discovery Call between Neoxis Design Studio and ${selectedInquiry.name}.\n\n` +
        `• Client Email: ${selectedInquiry.email}\n` +
        `• Target Budget: ${selectedInquiry.budget || 'Not specified'}\n` +
        `• Project Types: ${(selectedInquiry.projectTypes || []).join(', ') || 'General'}\n\n` +
        `Client Brief:\n"${selectedInquiry.message}"\n\n` +
        `Meeting Link: ${meetingLink || 'Google Meet attached'}`,
    );
    const location = encodeURIComponent('Google Meet');
    const attendee = encodeURIComponent(selectedInquiry.email);
    const dates = `${formatGCalDate(startDateTime)}/${formatGCalDate(endDateTime)}`;

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${dates}&details=${details}&location=${location}&add=${attendee}`;

    // Update status in backend to 'scheduled' and save meetingScheduledAt
    try {
      const res = await adminFetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'scheduled',
          meetingScheduledAt: startDateTime.toISOString(),
          meetingLink: meetingLink.trim() || undefined,
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { inquiry: Inquiry };
        setSelectedInquiry(data.inquiry);
        setInquiries((prev) =>
          prev.map((item) => (item.id === selectedInquiry.id ? data.inquiry : item)),
        );
      }
    } catch {
      // ignore
    }

    // Open Google Calendar in new tab
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLaunchInstantMeet = () => {
    window.open('https://meet.google.com/new', '_blank', 'noopener,noreferrer');
  };

  const copyEmailText = () => {
    if (!selectedInquiry) return;
    const body =
      `Hi ${selectedInquiry.name},\n\n` +
      `Thank you for reaching out to Neoxis! We reviewed your project brief and would love to connect for a 30-minute discovery call.\n\n` +
      `Proposed Date & Time: ${meetingDate} at ${meetingTime}\n` +
      `Google Meet Link: ${meetingLink || 'https://meet.google.com'}\n\n` +
      `Looking forward to speaking with you!\n\nBest regards,\nNeoxis Team\nhttps://neoxis.design`;

    void navigator.clipboard.writeText(body);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Filtered inquiries list
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus = statusFilter === 'all' ? true : inq.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.message.toLowerCase().includes(q) ||
        (inq.projectTypes && inq.projectTypes.some((t) => t.toLowerCase().includes(q))) ||
        (inq.budget && inq.budget.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [inquiries, statusFilter, searchQuery]);

  const statusBadge = (status: Inquiry['status']) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 font-clash text-xs font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            New
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 px-2.5 py-0.5 font-clash text-xs font-semibold text-blue-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Contacted
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 px-2.5 py-0.5 font-clash text-xs font-semibold text-purple-600">
            <Video className="h-3 w-3" />
            Meeting Scheduled
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-200 border border-neutral-300 px-2.5 py-0.5 font-clash text-xs font-medium text-neutral-600">
            Closed
          </span>
        );
    }
  };

  return (
    <div className="mx-auto max-w-full">
      {/* Header */}
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
            <Link href="/admin" className="hover:text-neutral-900 transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-neutral-900">Inquiries</span>
          </div>
          <h1 className="mt-1 font-clash text-3xl font-bold tracking-tight text-neutral-950">
            Client Inquiries &amp; Leads
          </h1>
          <p className="mt-1 font-neue text-sm text-neutral-500">
            Manage incoming contact briefs, track status, and coordinate Google Meet calls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchInquiries}
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 font-neue text-xs font-medium text-neutral-700 transition-colors hover:bg-black/[0.04] cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={handleLaunchInstantMeet}
            className="flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-2 font-neue text-xs font-medium text-white shadow-sm transition-transform hover:bg-neutral-800 active:scale-95 cursor-pointer"
          >
            <Video className="h-3.5 w-3.5 text-emerald-400" />
            Instant Google Meet ↗
          </button>
        </div>
      </header>

      {/* KPI Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <p className="font-neue text-xs font-medium text-neutral-500">Total Leads</p>
          <p className="mt-1 font-clash text-2xl font-bold text-neutral-950">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <p className="font-neue text-xs font-medium text-emerald-600">New / Unread</p>
          <p className="mt-1 font-clash text-2xl font-bold text-emerald-600">{stats.newCount}</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <p className="font-neue text-xs font-medium text-purple-600">Meetings Scheduled</p>
          <p className="mt-1 font-clash text-2xl font-bold text-purple-600">{stats.scheduledCount}</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <p className="font-neue text-xs font-medium text-neutral-500">Closed / Completed</p>
          <p className="mt-1 font-clash text-2xl font-bold text-neutral-700">{stats.closedCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-black/10 bg-white p-1.5 shadow-sm">
          {(
            [
              { key: 'all', label: 'All', count: stats.total },
              { key: 'new', label: 'New', count: stats.newCount },
              { key: 'contacted', label: 'Contacted', count: stats.contactedCount },
              { key: 'scheduled', label: 'Scheduled', count: stats.scheduledCount },
              { key: 'closed', label: 'Closed', count: stats.closedCount },
            ] as const
          ).map((tab) => {
            const active = statusFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setStatusFilter(tab.key)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 font-neue text-xs font-medium transition-colors cursor-pointer ${
                  active
                    ? 'bg-neutral-950 font-semibold text-white shadow-sm'
                    : 'text-neutral-600 hover:bg-black/[0.04]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    active ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px] sm:w-72">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search leads, email, brief…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-black/10 bg-white py-2 pl-9 pr-4 font-neue text-xs text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900"
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-50 p-4 text-xs font-neue text-red-600">
          {error}
        </div>
      )}

      {/* Inquiries Table / Empty States */}
      {loading ? (
        <div className="rounded-2xl border border-black/10 bg-white p-12 text-center text-neutral-500 font-neue text-sm">
          <RefreshCw className="mx-auto h-6 w-6 animate-spin text-neutral-400 mb-2" />
          Loading inquiries…
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="rounded-2xl border border-black/10 bg-white py-16 px-6 text-center shadow-sm">
          <Inbox className="mx-auto h-12 w-12 text-neutral-300 mb-3" />
          <h3 className="font-clash text-lg font-bold text-neutral-950">No inquiries found</h3>
          <p className="mt-1 font-neue text-xs text-neutral-500 max-w-sm mx-auto">
            {searchQuery
              ? 'No client briefs matched your search criteria. Try a different query.'
              : 'When visitors submit the contact form or collab modal, their inquiries will show up right here.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/10 bg-neutral-50/60 font-neue text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  <th className="py-3.5 pl-6 pr-4">Client</th>
                  <th className="py-3.5 px-4">Services / Budget</th>
                  <th className="py-3.5 px-4">Project Brief</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] font-neue text-xs">
                {filteredInquiries.map((inq) => {
                  const isSelected = selectedInquiry?.id === inq.id;
                  const formattedDate = new Date(inq.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <tr
                      key={inq.id}
                      onClick={() => setSelectedInquiry(inq)}
                      className={`cursor-pointer transition-colors hover:bg-neutral-50/80 ${
                        isSelected ? 'bg-neutral-100/70' : ''
                      }`}
                    >
                      {/* Client */}
                      <td className="py-4 pl-6 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 font-clash text-xs font-bold text-white uppercase">
                            {inq.name.slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-neutral-950 truncate max-w-[150px]">
                              {inq.name}
                            </p>
                            <p className="text-neutral-500 truncate max-w-[150px]">{inq.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Scope & Budget */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1 max-w-[160px]">
                          {inq.budget && (
                            <span className="font-clash text-[11px] font-bold text-neutral-900">
                              {inq.budget}
                            </span>
                          )}
                          <div className="flex flex-wrap gap-1">
                            {inq.projectTypes && inq.projectTypes.length > 0 ? (
                              inq.projectTypes.slice(0, 2).map((type) => (
                                <span
                                  key={type}
                                  className="rounded bg-black/[0.05] px-1.5 py-0.5 text-[10px] text-neutral-600 truncate"
                                >
                                  {type}
                                </span>
                              ))
                            ) : (
                              <span className="text-neutral-400 text-[11px]">General inquiry</span>
                            )}
                            {inq.projectTypes && inq.projectTypes.length > 2 && (
                              <span className="text-[10px] text-neutral-400">
                                +{inq.projectTypes.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Brief */}
                      <td className="py-4 px-4">
                        <p className="line-clamp-2 max-w-xs text-neutral-600 leading-snug">
                          {inq.message}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">{statusBadge(inq.status)}</td>

                      {/* Date */}
                      <td className="py-4 px-4 whitespace-nowrap text-neutral-400 text-[11px]">
                        {formattedDate}
                      </td>

                      {/* Actions */}
                      <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                        <div
                          className="flex items-center justify-end gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            title="Schedule Google Meet"
                            onClick={() => setSelectedInquiry(inq)}
                            className="rounded-lg p-1.5 text-neutral-600 hover:bg-neutral-100 hover:text-purple-600 transition-colors"
                          >
                            <Calendar className="h-4 w-4" />
                          </button>
                          <a
                            href={`mailto:${inq.email}?subject=${encodeURIComponent(
                              'Re: Your inquiry to Neoxis Design',
                            )}`}
                            title="Send Email"
                            className="rounded-lg p-1.5 text-neutral-600 hover:bg-neutral-100 hover:text-blue-600 transition-colors"
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                          <button
                            type="button"
                            title="Delete inquiry"
                            onClick={() => handleDelete(inq.id)}
                            className="rounded-lg p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inquiry Details & Google Meet Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="relative h-full w-full max-w-xl bg-white shadow-2xl flex flex-col overflow-y-auto border-l border-black/10">
            {/* Drawer Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white/95 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 font-clash text-sm font-bold text-white uppercase">
                  {selectedInquiry.name.slice(0, 2)}
                </span>
                <div>
                  <h3 className="font-clash text-lg font-bold text-neutral-950">
                    {selectedInquiry.name}
                  </h3>
                  <p className="font-neue text-xs text-neutral-500">{selectedInquiry.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 space-y-6 p-6">
              {/* Status Selector */}
              <div className="rounded-2xl border border-black/10 bg-neutral-50/70 p-4">
                <label className="block font-neue text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 mb-2">
                  Inquiry Status
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(['new', 'contacted', 'scheduled', 'closed'] as const).map((status) => {
                    const active = selectedInquiry.status === status;
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => updateStatus(selectedInquiry.id, status)}
                        className={`rounded-xl px-3 py-2 font-clash text-xs font-semibold capitalize transition-all cursor-pointer ${
                          active
                            ? 'bg-neutral-950 text-white shadow-sm'
                            : 'border border-black/10 bg-white text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scope & Brief Card */}
              <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-3">
                  <div>
                    <span className="font-neue text-[11px] uppercase tracking-wider text-neutral-400">
                      Target Budget
                    </span>
                    <p className="font-clash text-base font-bold text-neutral-950">
                      {selectedInquiry.budget || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <span className="font-neue text-[11px] uppercase tracking-wider text-neutral-400">
                      Submitted Via
                    </span>
                    <p className="font-neue text-xs font-medium text-neutral-800">
                      {selectedInquiry.source === 'connect_modal'
                        ? 'Collab Modal'
                        : 'Contact Form Section'}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="font-neue text-[11px] uppercase tracking-wider text-neutral-400">
                    Project Categories
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {selectedInquiry.projectTypes && selectedInquiry.projectTypes.length > 0 ? (
                      selectedInquiry.projectTypes.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-neutral-100 border border-neutral-200 px-3 py-1 font-neue text-xs font-medium text-neutral-800"
                        >
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-neutral-400">No categories selected</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="font-neue text-[11px] uppercase tracking-wider text-neutral-400">
                    Project Brief &amp; Vision
                  </span>
                  <div className="mt-1.5 rounded-xl bg-neutral-50 p-4 font-neue text-xs leading-relaxed text-neutral-700 whitespace-pre-wrap border border-black/[0.04]">
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>

              {/* Google Meeting Scheduler Section */}
              <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-500/[0.04] to-transparent p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white">
                    <Video className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-clash text-sm font-bold text-neutral-950">
                      Schedule a Google Meeting
                    </h4>
                    <p className="font-neue text-[11px] text-neutral-500">
                      Pre-populates Google Calendar with Google Meet and adds the client as guest.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mt-4">
                  <div>
                    <label className="block font-neue text-[11px] font-semibold text-neutral-600 mb-1">
                      Meeting Date
                    </label>
                    <input
                      type="date"
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                      className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 font-neue text-xs text-neutral-900 outline-none focus:border-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block font-neue text-[11px] font-semibold text-neutral-600 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={meetingTime}
                      onChange={(e) => setMeetingTime(e.target.value)}
                      className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 font-neue text-xs text-neutral-900 outline-none focus:border-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block font-neue text-[11px] font-semibold text-neutral-600 mb-1">
                      Duration
                    </label>
                    <select
                      value={meetingDuration}
                      onChange={(e) => setMeetingDuration(e.target.value)}
                      className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 font-neue text-xs text-neutral-900 outline-none focus:border-purple-600"
                    >
                      <option value="15">15 Minutes</option>
                      <option value="30">30 Minutes</option>
                      <option value="45">45 Minutes</option>
                      <option value="60">60 Minutes</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block font-neue text-[11px] font-semibold text-neutral-600 mb-1">
                    Google Meet URL (Optional / Saved Link)
                  </label>
                  <input
                    type="url"
                    placeholder="https://meet.google.com/xxx-yyyy-zzz"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 font-neue text-xs text-neutral-900 placeholder-neutral-400 outline-none focus:border-purple-600"
                  />
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleScheduleGoogleMeet}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 font-clash text-xs font-semibold text-white shadow-sm hover:bg-purple-700 active:scale-95 transition-all cursor-pointer"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    Open in Google Calendar (with Meet) ↗
                  </button>

                  <button
                    type="button"
                    onClick={copyEmailText}
                    className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 font-neue text-xs font-medium text-neutral-700 hover:bg-black/[0.04] transition-all cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Invite Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Email Invite</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Admin Internal Notes */}
              <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-neue text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                    Team Notes &amp; Activity
                  </label>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    disabled={savingNotes}
                    className="rounded-lg bg-neutral-900 px-3 py-1 font-neue text-xs font-medium text-white hover:bg-neutral-800 disabled:opacity-50 cursor-pointer"
                  >
                    {savingNotes ? 'Saving…' : 'Save Notes'}
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record call notes, proposal links, next steps, or specific requirements here…"
                  className="w-full rounded-xl border border-black/10 bg-neutral-50/50 p-3 font-neue text-xs text-neutral-900 outline-none focus:border-neutral-900 resize-none transition-colors"
                />
              </div>

              {/* Direct Email Action */}
              <div className="pt-2 flex items-center justify-between border-t border-black/10">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                    `Re: Your inquiry to Neoxis Design`,
                  )}`}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 font-neue text-xs font-medium text-neutral-800 hover:bg-black/[0.04] transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Reply via Default Email Client
                </a>

                <button
                  type="button"
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="inline-flex items-center gap-1.5 font-neue text-xs text-red-600 hover:underline cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
