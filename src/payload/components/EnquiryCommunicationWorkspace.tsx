"use client";

import React, { useState } from "react";
import { useDocumentInfo, useField } from "@payloadcms/ui";
import { sendEnquiryReplyAction } from "../actions/enquiryReplyAction";

interface ReplyItem {
  id: string;
  sentAt: string;
  sentBy: string;
  senderEmail?: string;
  subject: string;
  message: string;
  status?: string;
  emailDelivered?: boolean;
  deliveryNote?: string;
}

export function EnquiryCommunicationWorkspace({ path }: { path: string }) {
  const { value = [], setValue } = useField<ReplyItem[]>({ path });
  const { initialData, id } = useDocumentInfo();

  const clientName = (initialData?.name as string) || "Prospective Client";
  const clientEmail = (initialData?.email as string) || "";
  const clientPhone = (initialData?.phone as string) || "Not provided";
  const clientOrg = (initialData?.organisation as string) || "Individual / Independent";
  const category = (initialData?.enquiryType as string) || "General";
  const pathway = (initialData?.serviceOrPathway as string) || "";
  const originalMessage = (initialData?.message as string) || "";
  const createdAt = (initialData?.createdAt as string) || "";
  const initialStatus = (initialData?.status as string) || "new";

  const [subject, setSubject] = useState(
    () => `Re: [The IAM Lab] Consultation Regarding ${pathway || category.replace(/_/g, " ")}`
  );
  const [messageBody, setMessageBody] = useState("");
  const [targetStatus, setTargetStatus] = useState("contacted");
  const [logOfflineIfSmtpMissing, setLogOfflineIfSmtpMissing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "warning" | "error";
    text: string;
  } | null>(null);

  const repliesList: ReplyItem[] = Array.isArray(value) ? value : [];

  const handleSendReply = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setFeedback(null);

    if (!messageBody.trim()) {
      setFeedback({ type: "error", text: "Please enter a response message before sending." });
      return;
    }

    if (!clientEmail) {
      setFeedback({ type: "error", text: "No client email address is associated with this enquiry." });
      return;
    }

    setIsSending(true);

    try {
      const res = await sendEnquiryReplyAction({
        enquiryId: typeof id === "number" ? id : Number(id) || 1,
        clientEmail,
        clientName,
        subject,
        messageBody,
        newStatus: targetStatus,
        saveAsInternalNoteIfSmtpUnavailable: logOfflineIfSmtpMissing,
      });

      if (res.success && res.reply) {
        const updated = [...repliesList, res.reply as ReplyItem];
        setValue(updated);
        setMessageBody("");
        setFeedback({
          type: res.emailDelivered ? "success" : "warning",
          text: res.emailDelivered
            ? `Email delivered via SMTP and recorded in Supabase. ${res.deliveryNote || ""}`
            : `${res.deliveryNote || "Logged to internal history without email dispatch."}`,
        });
      } else {
        setFeedback({
          type: "error",
          text: res.error || "Unable to send email. Nothing was falsely marked as delivered.",
        });
      }
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Network error while sending response.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        marginTop: "16px",
        marginBottom: "24px",
        borderRadius: "8px",
        border: "1px solid #E2E8F0",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(11, 20, 36, 0.04)",
      }}
    >
      {/* Header matching Approved Dashboard Tone */}
      <div
        style={{
          backgroundColor: "#0B1424",
          color: "#FFFFFF",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #D89A43",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#D89A43",
                display: "inline-block",
              }}
            />
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#FFFFFF" }}>
              Client Communication Workspace
            </h3>
          </div>
          <p style={{ margin: "4px 0 0 16px", fontSize: "12px", color: "#94A3B8" }}>
            Original submission summary, chronological communication log, and SMTP email response console.
          </p>
        </div>

        <span
          style={{
            padding: "4px 10px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            backgroundColor: "#14243B",
            color: "#D89A43",
            border: "1px solid rgba(216, 154, 67, 0.35)",
          }}
        >
          Lead Status: {initialStatus.replace(/_/g, " ")}
        </span>
      </div>

      <div style={{ padding: "20px" }}>
        {/* Original Client Briefing Summary */}
        <div
          style={{
            backgroundColor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "6px",
            padding: "16px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#B07424",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Original Enquiry Details
              </span>
              <h4 style={{ margin: "2px 0 0 0", fontSize: "14px", fontWeight: 700, color: "#0B1424" }}>
                {clientName} &middot;{" "}
                <span style={{ fontWeight: 500, color: "#475569" }}>{clientOrg}</span>
              </h4>
              <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#64748B" }}>
                Email: <strong>{clientEmail}</strong> &middot; Phone: {clientPhone}
              </p>
            </div>

            {createdAt && (
              <span style={{ fontSize: "11px", color: "#64748B" }}>
                Submitted{" "}
                {new Date(createdAt).toLocaleString("en-GB", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            )}
          </div>

          <div
            style={{
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#1E293B",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "4px",
              padding: "12px 14px",
              whiteSpace: "pre-wrap",
            }}
          >
            {originalMessage || "No message body provided."}
          </div>
        </div>

        {/* Chronological Correspondence Log */}
        <div style={{ marginBottom: "24px" }}>
          <h4
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#64748B",
              marginBottom: "12px",
            }}
          >
            Chronological Communication History ({repliesList.length})
          </h4>

          {repliesList.length === 0 ? (
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#F8FAFC",
                border: "1px dashed #CBD5E1",
                borderRadius: "6px",
                color: "#64748B",
                fontSize: "13px",
              }}
            >
              No replies recorded yet. Compose an email below to respond to {clientName}.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {repliesList.map((rep, idx) => {
                const isDelivered = rep.emailDelivered === true || rep.status === "delivered";
                return (
                  <div
                    key={rep.id || idx}
                    style={{
                      backgroundColor: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      borderLeft: `4px solid ${isDelivered ? "#10B981" : "#D89A43"}`,
                      borderRadius: "4px",
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "6px",
                        flexWrap: "wrap",
                        gap: "6px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#0B1424" }}>
                          {rep.sentBy || "The IAM Lab Team"}
                        </span>
                        <span style={{ fontSize: "11px", color: "#64748B" }}>
                          &rarr; {clientEmail}
                        </span>
                      </div>
                      <span style={{ fontSize: "11px", color: "#64748B" }}>
                        {rep.sentAt ? new Date(rep.sentAt).toLocaleString("en-GB") : ""}
                      </span>
                    </div>

                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#1E293B", marginBottom: "6px" }}>
                      Subject: {rep.subject}
                    </div>

                    <div style={{ fontSize: "13px", lineHeight: 1.6, color: "#334155", whiteSpace: "pre-wrap" }}>
                      {rep.message}
                    </div>

                    {rep.deliveryNote && (
                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "11px",
                          color: isDelivered ? "#065F46" : "#92400E",
                          fontWeight: 600,
                        }}
                      >
                        {isDelivered ? "✓ " : "! "}
                        {rep.deliveryNote}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Direct Reply Composer */}
        <div role="region" aria-label={`Reply to ${clientName}`} style={{ borderTop: "1px solid #E2E8F0", paddingTop: "20px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#0B1424", marginBottom: "12px" }}>
            Reply to {clientName}
          </h4>

          {feedback && (
            <div
              role="alert"
              style={{
                padding: "10px 14px",
                borderRadius: "6px",
                fontSize: "13px",
                marginBottom: "14px",
                backgroundColor:
                  feedback.type === "success"
                    ? "#ECFDF5"
                    : feedback.type === "warning"
                      ? "#FFFBEB"
                      : "#FEF2F2",
                color:
                  feedback.type === "success"
                    ? "#065F46"
                    : feedback.type === "warning"
                      ? "#92400E"
                      : "#991B1B",
                border:
                  feedback.type === "success"
                    ? "1px solid #A7F3D0"
                    : feedback.type === "warning"
                      ? "1px solid #FDE68A"
                      : "1px solid #FECACA",
              }}
            >
              {feedback.text}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px", textTransform: "uppercase" }}>
                Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{
                  width: "100%",
                  height: "38px",
                  padding: "0 12px",
                  borderRadius: "6px",
                  border: "1px solid #CBD5E1",
                  fontSize: "13px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px", textTransform: "uppercase" }}>
                Update Lead Status To
              </label>
              <select
                value={targetStatus}
                onChange={(e) => setTargetStatus(e.target.value)}
                style={{
                  width: "100%",
                  height: "38px",
                  padding: "0 10px",
                  borderRadius: "6px",
                  border: "1px solid #CBD5E1",
                  fontSize: "13px",
                  boxSizing: "border-box",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <option value="contacted">Contacted / In Discussion</option>
                <option value="proposal_sent">Proposal Sent</option>
                <option value="resolved">Resolved / Closed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px", textTransform: "uppercase" }}>
              Message Body
            </label>
            <textarea
              rows={5}
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              placeholder={`Write your consultation reply to ${clientName}...`}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "1px solid #CBD5E1",
                fontSize: "13px",
                lineHeight: 1.6,
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                color: "#64748B",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={logOfflineIfSmtpMissing}
                onChange={(e) => setLogOfflineIfSmtpMissing(e.target.checked)}
              />
              <span>Log as internal note only if SMTP is unconfigured in Preview</span>
            </label>

            <button
              type="button"
              onClick={handleSendReply}
              disabled={isSending || !messageBody.trim()}
              style={{
                backgroundColor: isSending ? "#718096" : "#0B1424",
                color: "#FFFFFF",
                border: "1px solid #14243B",
                borderRadius: "6px",
                padding: "10px 22px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: isSending || !messageBody.trim() ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>{isSending ? "Verifying & Sending..." : "Send Response to Client →"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnquiryCommunicationWorkspace;
