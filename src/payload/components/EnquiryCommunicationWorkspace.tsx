"use client";

import React, { useState } from "react";
import { useField, useDocumentInfo } from "@payloadcms/ui";
import { sendEnquiryReplyAction } from "../actions/enquiryReplyAction";

interface ReplyItem {
  id: string;
  sentAt: string;
  sentBy: string;
  subject: string;
  message: string;
  status?: string;
  deliveryNote?: string;
}

export function EnquiryCommunicationWorkspace({ path }: { path: string }) {
  const { value = [], setValue } = useField<ReplyItem[]>({ path });
  const { initialData, id } = useDocumentInfo();

  const clientName = (initialData?.name as string) || "Prospective Client";
  const clientEmail = (initialData?.email as string) || "";
  const clientOrg = (initialData?.organisation as string) || "Not provided";
  const category = (initialData?.enquiryType as string) || "General";
  const pathway = (initialData?.serviceOrPathway as string) || "";
  const originalMessage = (initialData?.message as string) || "";
  const createdAt = (initialData?.createdAt as string) || "";
  const initialStatus = (initialData?.status as string) || "new";

  const [subject, setSubject] = useState(
    () => `Re: [The IAM Lab] Consultation Regarding ${pathway || category}`
  );
  const [messageBody, setMessageBody] = useState("");
  const [targetStatus, setTargetStatus] = useState("contacted");
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const repliesList: ReplyItem[] = Array.isArray(value) ? value : [];

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!messageBody.trim()) {
      setFeedback({ type: "error", text: "Please enter a message before sending." });
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
        adminName: "The IAM Lab Advisory Team",
        newStatus: targetStatus,
      });

      if (res.success && res.reply) {
        const updated = [...repliesList, res.reply as ReplyItem];
        setValue(updated);
        setMessageBody("");
        setFeedback({
          type: "success",
          text: `Response successfully recorded and dispatched. ${res.deliveryNote || ""}`,
        });
      } else {
        setFeedback({
          type: "error",
          text: res.error || "An error occurred while dispatching the response.",
        });
      }
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Network error during response delivery.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "16px",
        marginBottom: "24px",
        borderRadius: "8px",
        border: "1px solid #CBD5E1",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* Workspace Header */}
      <div
        style={{
          backgroundColor: "#0B1424",
          color: "#FFFFFF",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #D89A43",
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
            <h3
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
              }}
            >
              Client Communication Workspace
            </h3>
          </div>
          <p
            style={{
              margin: "4px 0 0 16px",
              fontSize: "12px",
              color: "#94A3B8",
            }}
          >
            Direct response console and chronological communication history for this enquiry.
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
            border: "1px solid rgba(216, 154, 67, 0.3)",
          }}
        >
          Status: {initialStatus.replace(/_/g, " ")}
        </span>
      </div>

      <div style={{ padding: "20px" }}>
        {/* Original Client Inquiry Brief */}
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
              marginBottom: "10px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Inbound Message from Client
              </span>
              <h4 style={{ margin: "2px 0 0 0", fontSize: "14px", fontWeight: 700, color: "#0B1424" }}>
                {clientName} &middot;{" "}
                <span style={{ fontWeight: 400, color: "#475569" }}>{clientOrg}</span>
              </h4>
            </div>

            {createdAt && (
              <span style={{ fontSize: "11px", color: "#64748B" }}>
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
            {originalMessage || "No message body provided in enquiry."}
          </div>
        </div>

        {/* Chronological Communication Timeline */}
        <div style={{ marginBottom: "24px" }}>
          <h4
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#475569",
              marginBottom: "12px",
            }}
          >
            Communication History ({repliesList.length} Messages)
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
              No outgoing correspondence recorded yet. Use the composer below to reply directly to {clientName}.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {repliesList.map((rep, idx) => (
                <div
                  key={rep.id || idx}
                  style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderLeft: "4px solid #D89A43",
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
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#0B1424" }}>
                        {rep.sentBy || "The IAM Lab Advisory Team"}
                      </span>
                      <span style={{ fontSize: "11px", color: "#64748B" }}>
                        &rarr; to {clientEmail}
                      </span>
                    </div>

                    <span style={{ fontSize: "11px", color: "#64748B" }}>
                      {rep.sentAt ? new Date(rep.sentAt).toLocaleString("en-GB") : ""}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#1E293B",
                      marginBottom: "6px",
                    }}
                  >
                    Subject: {rep.subject}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "#334155",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {rep.message}
                  </div>

                  {rep.deliveryNote && (
                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "11px",
                        color: "#059669",
                        fontWeight: 500,
                      }}
                    >
                      &check; {rep.deliveryNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Composer */}
        <form
          onSubmit={handleSendReply}
          style={{
            borderTop: "1px solid #E2E8F0",
            paddingTop: "20px",
          }}
        >
          <h4
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#0B1424",
              marginBottom: "12px",
            }}
          >
            Compose Direct Response to {clientName}
          </h4>

          {feedback && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "4px",
                fontSize: "13px",
                marginBottom: "14px",
                backgroundColor: feedback.type === "success" ? "#F0FDF4" : "#FEF2F2",
                color: feedback.type === "success" ? "#166534" : "#991B1B",
                border:
                  feedback.type === "success" ? "1px solid #BBF7D0" : "1px solid #FECACA",
              }}
            >
              {feedback.text}
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: "12px", marginBottom: "12px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "4px",
                }}
              >
                Email Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{
                  width: "100%",
                  height: "38px",
                  padding: "0 12px",
                  borderRadius: "4px",
                  border: "1px solid #CBD5E1",
                  fontSize: "13px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#475569",
                  marginBottom: "4px",
                }}
              >
                Update Status to
              </label>
              <select
                value={targetStatus}
                onChange={(e) => setTargetStatus(e.target.value)}
                style={{
                  width: "100%",
                  height: "38px",
                  padding: "0 8px",
                  borderRadius: "4px",
                  border: "1px solid #CBD5E1",
                  fontSize: "13px",
                  boxSizing: "border-box",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <option value="in_discussion">In Discussion</option>
                <option value="proposal_sent">Proposal Sent</option>
                <option value="resolved">Resolved / Closed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                color: "#475569",
                marginBottom: "4px",
              }}
            >
              Response Content
            </label>
            <textarea
              rows={6}
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              placeholder={`Write your professional consultation response to ${clientName}...`}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "4px",
                border: "1px solid #CBD5E1",
                fontSize: "13px",
                lineHeight: 1.6,
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button
              type="submit"
              disabled={isSending || !messageBody.trim()}
              style={{
                backgroundColor: isSending ? "#718096" : "#0B1424",
                color: "#FFFFFF",
                border: "1px solid #14243B",
                borderRadius: "4px",
                padding: "10px 20px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: isSending || !messageBody.trim() ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {isSending ? (
                <span>Delivering response...</span>
              ) : (
                <>
                  <span>Send Response to Client</span>
                  <span>&rarr;</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnquiryCommunicationWorkspace;
