"use client";

import { Send, Users } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/app/app-shell";
import { useAppState } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { peers } from "@/lib/demo-data";
import { cn, formatDate } from "@/lib/utils";

function MessagesView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isHydrated, sendPeerMessage, state } = useAppState();
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!isHydrated) return;
    if (!state.hasOnboarded) {
      router.replace("/");
    }
  }, [isHydrated, router, state.hasOnboarded]);

  const connectedPeers = useMemo(
    () => peers.filter((peer) => state.connectedPeerIds.includes(peer.id)),
    [state.connectedPeerIds],
  );

  const selectedPeerId =
    searchParams.get("peer") ?? connectedPeers[0]?.id ?? null;
  const selectedPeer =
    connectedPeers.find((peer) => peer.id === selectedPeerId) ?? null;

  const thread = useMemo(
    () =>
      state.messages
        .filter((message) => message.peerId === selectedPeerId)
        .sort(
          (a, b) =>
            new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
        ),
    [selectedPeerId, state.messages],
  );

  function handleSend() {
    const body = draft.trim();
    if (!selectedPeer || !body) return;
    sendPeerMessage(selectedPeer.id, body);
    setDraft("");
  }

  return (
    <AppShell title="Messages">
      <PageTransition>
        <div className="page-shell">
          {connectedPeers.length === 0 ? (
            <section className="surface-card flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <Users className="h-6 w-6 text-[var(--accent)]" />
                <h2 className="h2-text">No connections yet</h2>
                <p className="body-text text-[var(--text-secondary)]">
                  Connect with a peer first, then message them from here.
                </p>
              </div>
              <Link href="/network">
                <Button variant="secondary">Browse network</Button>
              </Link>
            </section>
          ) : (
            <section className="grid min-h-[calc(100vh-132px)] overflow-hidden rounded-[8px] border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[320px_minmax(0,1fr)]">
              <aside className="border-b border-[var(--border-subtle)] bg-[var(--surface)] lg:border-b-0 lg:border-r">
                <div className="border-b border-[var(--border-subtle)] p-4">
                  <p className="section-label">Connected</p>
                </div>
                <div className="flex gap-2 overflow-x-auto p-3 lg:block lg:space-y-2 lg:overflow-visible">
                  {connectedPeers.map((peer) => {
                    const isSelected = peer.id === selectedPeer?.id;
                    const latest = state.messages
                      .filter((message) => message.peerId === peer.id)
                      .at(-1);

                    return (
                      <button
                        key={peer.id}
                        type="button"
                        onClick={() => router.push(`/messages?peer=${peer.id}`)}
                        className={cn(
                          "min-w-[250px] rounded-[8px] border p-3 text-left transition lg:w-full lg:min-w-0",
                          isSelected
                            ? "border-[var(--accent)] bg-[var(--accent-dim)]"
                            : "border-transparent hover:bg-[var(--surface-raised)]",
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[14px] font-semibold text-[var(--text)]">
                              {peer.name}
                            </p>
                            <p className="small-text text-[var(--text-secondary)]">
                              {peer.role}
                            </p>
                          </div>
                          <span className="small-text text-[var(--text-muted)]">
                            {peer.compatibility}%
                          </span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-[var(--text-secondary)]">
                          {latest?.body ?? "No messages yet."}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div className="flex min-h-[520px] flex-col">
                {selectedPeer ? (
                  <>
                    <header className="border-b border-[var(--border-subtle)] p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h2 className="h2-text">{selectedPeer.name}</h2>
                          <p className="small-text text-[var(--text-secondary)]">
                            {selectedPeer.role} / {selectedPeer.university}
                          </p>
                        </div>
                        <span className="rounded-full border border-[var(--border)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-secondary)]">
                          Connected
                        </span>
                      </div>
                    </header>

                    <div className="muted-scrollbar flex-1 space-y-3 overflow-y-auto p-4">
                      {thread.length === 0 ? (
                        <div className="mx-auto flex h-full max-w-[460px] flex-col items-center justify-center gap-3 text-center">
                          <p className="section-label">Start here</p>
                          <h3 className="h2-text">
                            Compare your scenario paths.
                          </h3>
                          <p className="body-text text-[var(--text-secondary)]">
                            Ask what they chose in The Succession Crisis, or
                            suggest a quick debrief around one decision.
                          </p>
                        </div>
                      ) : (
                        thread.map((message) => {
                          const mine = message.sender === "user";

                          return (
                            <div
                              key={message.id}
                              className={cn(
                                "flex",
                                mine ? "justify-end" : "justify-start",
                              )}
                            >
                              <div
                                className={cn(
                                  "max-w-[78%] rounded-[8px] border px-4 py-3",
                                  mine
                                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                                    : "border-[var(--border)] bg-[var(--surface-raised)] text-[var(--text)]",
                                )}
                              >
                                <p className="text-[14px] leading-6">
                                  {message.body}
                                </p>
                                <p
                                  className={cn(
                                    "mt-2 text-[11px]",
                                    mine
                                      ? "text-white/75"
                                      : "text-[var(--text-muted)]",
                                  )}
                                >
                                  {formatDate(message.sentAt)}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="border-t border-[var(--border-subtle)] p-4">
                      <div className="flex gap-2">
                        <input
                          value={draft}
                          onChange={(event) => setDraft(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              handleSend();
                            }
                          }}
                          placeholder={`Message ${selectedPeer.name.split(" ")[0]}`}
                          className="min-h-11 flex-1 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-4 text-[14px] text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
                        />
                        <Button
                          type="button"
                          onClick={handleSend}
                          disabled={!draft.trim()}
                          className="gap-2"
                        >
                          <Send className="h-4 w-4" />
                          Send
                        </Button>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </section>
          )}
        </div>
      </PageTransition>
    </AppShell>
  );
}

export default function MessagesPage() {
  return (
    <Suspense
      fallback={
        <AppShell title="Messages">
          <div className="page-shell">
            <section className="surface-card">
              <p className="section-label">Loading</p>
              <h1 className="h2-text mt-2">Opening messages</h1>
            </section>
          </div>
        </AppShell>
      }
    >
      <MessagesView />
    </Suspense>
  );
}
