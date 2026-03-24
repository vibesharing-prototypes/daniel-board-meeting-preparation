'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

type StatusColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

interface AgendaItem {
  id: number;
  title: string;
  presenter: string;
  duration: string;
}

interface Document {
  name: string;
  size: string;
  type: string;
}

interface Meeting {
  id: string;
  date: string;
  committee: string;
  status: string;
  statusColor: StatusColor;
  agenda: AgendaItem[];
  documents: Document[];
  aiSummary: string;
}

const meetings: Meeting[] = [
  {
    id: '1',
    date: 'Apr 2, 2026',
    committee: 'Audit & Risk Committee',
    status: 'Needs Review',
    statusColor: 'warning',
    agenda: [
      { id: 1, title: 'Q1 Financial Audit Update', presenter: 'Sarah Chen', duration: '20 min' },
      { id: 2, title: 'Cybersecurity Risk Assessment', presenter: 'Marcus Webb', duration: '15 min' },
      { id: 3, title: 'Regulatory Compliance Review', presenter: 'Priya Nair', duration: '25 min' },
      { id: 4, title: "Internal Controls Framework", presenter: "James O'Brien", duration: '20 min' },
    ],
    documents: [
      { name: 'Q1 Audit Report.pdf', size: '2.4 MB', type: 'PDF' },
      { name: 'Cyber Risk Matrix.xlsx', size: '1.1 MB', type: 'XLS' },
      { name: 'Compliance Dashboard.pptx', size: '4.7 MB', type: 'PPT' },
    ],
    aiSummary:
      "This quarter's audit findings reveal three areas requiring immediate board attention: (1) A 12% increase in cybersecurity incidents warrants an updated incident response policy. (2) The Q1 financial results show a 3.2% variance from forecast, primarily driven by supply chain disruptions. (3) Two regulatory deadlines fall within Q2 — GDPR re-certification (Apr 15) and SOX attestation (May 1) — both requiring board sign-off.",
  },
  {
    id: '2',
    date: 'Apr 9, 2026',
    committee: 'Governance & Nominating',
    status: 'Scheduled',
    statusColor: 'info',
    agenda: [
      { id: 1, title: 'Board Composition Review', presenter: 'Linda Park', duration: '30 min' },
      { id: 2, title: 'Director Independence Assessment', presenter: 'Tom Russell', duration: '15 min' },
      { id: 3, title: 'ESG Reporting Framework', presenter: 'Ana Torres', duration: '20 min' },
    ],
    documents: [
      { name: 'Board Skills Matrix 2026.pdf', size: '1.8 MB', type: 'PDF' },
      { name: 'ESG Draft Report.pdf', size: '3.2 MB', type: 'PDF' },
    ],
    aiSummary:
      'Key governance priorities this session include finalizing the 2026 board skills matrix ahead of the annual proxy, reviewing director independence in light of two new committee appointments, and approving the ESG reporting framework for public disclosure. The nominations committee recommends two new director candidates with expertise in AI governance and climate risk.',
  },
  {
    id: '3',
    date: 'Apr 16, 2026',
    committee: 'Compensation Committee',
    status: 'Scheduled',
    statusColor: 'info',
    agenda: [
      { id: 1, title: 'Executive Compensation Benchmarking', presenter: 'HR Team', duration: '25 min' },
      { id: 2, title: 'Incentive Plan Review', presenter: 'CFO', duration: '20 min' },
    ],
    documents: [{ name: 'Comp Benchmarking 2026.pdf', size: '2.1 MB', type: 'PDF' }],
    aiSummary:
      'The compensation committee will review executive pay benchmarking data showing the company is positioned at the 55th percentile for total compensation. The long-term incentive plan metrics are proposed to shift from EPS-only to a balanced scorecard including ESG targets (25% weighting) starting in FY2027.',
  },
  {
    id: '4',
    date: 'Apr 23, 2026',
    committee: 'Full Board Meeting',
    status: 'In Progress',
    statusColor: 'success',
    agenda: [
      { id: 1, title: 'CEO Business Update', presenter: 'CEO', duration: '20 min' },
      { id: 2, title: 'Strategic Plan Progress', presenter: 'Strategy Team', duration: '30 min' },
      { id: 3, title: 'M&A Pipeline Review', presenter: 'CFO & Legal', duration: '25 min' },
      { id: 4, title: 'Shareholder Engagement Update', presenter: 'IR Team', duration: '15 min' },
      { id: 5, title: 'Committee Reports', presenter: 'Committee Chairs', duration: '20 min' },
    ],
    documents: [
      { name: 'Board Package Q2 2026.pdf', size: '8.4 MB', type: 'PDF' },
      { name: 'Strategic Plan Deck.pptx', size: '5.6 MB', type: 'PPT' },
      { name: 'M&A Target Analysis.pdf', size: '3.8 MB', type: 'PDF' },
    ],
    aiSummary:
      'This full board session centers on strategic execution and capital allocation. The CEO update will address two business unit performance gaps identified in Q1. The M&A pipeline includes one near-term acquisition target (Term Sheet stage) that requires board approval. Key shareholder concerns from the most recent engagement round include board diversity, executive pay ratio, and the timeline for the announced sustainability targets.',
  },
];

function DocTypeTag({ type }: { type: string }) {
  return (
    <Box
      sx={{
        px: 1,
        py: 0.25,
        bgcolor: 'var(--action-muted)',
        borderRadius: 'var(--radius-sm)',
        minWidth: 40,
        textAlign: 'center',
        flexShrink: 0,
      }}
    >
      <Typography
        sx={{
          fontFamily: 'var(--font-sans)',
          fontSize: 10,
          fontWeight: 700,
          color: 'var(--action-default)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {type}
      </Typography>
    </Box>
  );
}

export default function BoardMeetingPrep() {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting>(meetings[0]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'var(--bg-base)', fontFamily: 'var(--font-sans)' }}>

      {/* ── Page Header Bar ── */}
      <Box
        sx={{
          px: 3,
          pt: 2,
          pb: 1.75,
          bgcolor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-default)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
            Board Meeting Preparation
          </Typography>
          <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)', mt: 0.25 }}>
            Review upcoming committee meetings, agenda items, and AI-generated briefings
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: 'var(--action-default)',
            color: 'var(--text-inverse)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 13,
            px: 2.5,
            py: 0.75,
            mt: 0.5,
            textTransform: 'none',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'none',
            flexShrink: 0,
            '&:hover': { bgcolor: 'var(--action-hover)', boxShadow: 'none' },
          }}
        >
          Generate Brief
        </Button>
      </Box>

      {/* ── Split Layout ── */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Left Panel — Meeting List */}
        <Box
          sx={{
            width: 300,
            flexShrink: 0,
            bgcolor: 'var(--bg-surface)',
            borderRight: '1px solid var(--border-default)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ px: 2.5, py: 1.5, borderBottom: '1px solid var(--border-default)' }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Upcoming Meetings
            </Typography>
          </Box>

          {meetings.map((meeting) => {
            const isSelected = selectedMeeting.id === meeting.id;
            return (
              <Box
                key={meeting.id}
                onClick={() => setSelectedMeeting(meeting)}
                sx={{
                  px: 2.5,
                  py: 2,
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--border-muted)',
                  bgcolor: isSelected ? 'var(--bg-inset)' : 'transparent',
                  borderLeft: isSelected ? '3px solid var(--action-default)' : '3px solid transparent',
                  transition: 'background-color 0.12s',
                  '&:hover': { bgcolor: isSelected ? 'var(--bg-inset)' : 'var(--bg-elevated)' },
                }}
              >
                <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-muted)', mb: 0.5 }}>
                  {meeting.date}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    fontWeight: isSelected ? 700 : 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.35,
                    mb: 1,
                  }}
                >
                  {meeting.committee}
                </Typography>
                <Chip
                  label={meeting.status}
                  size="small"
                  color={meeting.statusColor}
                  sx={{
                    height: 20,
                    fontSize: 11,
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
              </Box>
            );
          })}
        </Box>

        {/* Right Panel — Meeting Detail */}
        <Box sx={{ flex: 1, overflowY: 'auto', bgcolor: 'var(--bg-base)' }}>
          <Box sx={{ p: 3, maxWidth: 860 }}>

            {/* Meeting title + status */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-muted)', mb: 0.5 }}>
                {selectedMeeting.date}
              </Typography>
              <Stack direction="row" alignItems="center" gap={1.5} flexWrap="wrap">
                <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedMeeting.committee}
                </Typography>
                <Chip
                  label={selectedMeeting.status}
                  size="small"
                  color={selectedMeeting.statusColor}
                  sx={{ height: 22, fontSize: 12, fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                />
              </Stack>
            </Box>

            {/* AI Summary Card */}
            <Box
              sx={{
                bgcolor: 'var(--bg-inset)',
                border: '1px solid var(--border-emphasis)',
                borderRadius: 'var(--radius-lg)',
                p: 2.5,
                mb: 3,
              }}
            >
              <Stack direction="row" alignItems="center" gap={1} mb={1.25}>
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    bgcolor: 'var(--action-default)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: '-0.02em' }}>AI</Typography>
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                  }}
                >
                  AI Summary — Key Discussion Points
                </Typography>
              </Stack>
              <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.65 }}>
                {selectedMeeting.aiSummary}
              </Typography>
            </Box>

            {/* Agenda Items */}
            <Box
              sx={{
                bgcolor: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                mb: 3,
              }}
            >
              <Box sx={{ px: 2.5, py: 1.5, bgcolor: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-default)' }}>
                <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                  Agenda Items
                </Typography>
              </Box>
              {selectedMeeting.agenda.map((item, index) => (
                <Box key={item.id}>
                  {index > 0 && <Divider sx={{ borderColor: 'var(--border-muted)' }} />}
                  <Box sx={{ px: 2.5, py: 1.75, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Stack direction="row" gap={2} alignItems="center" flex={1} minWidth={0}>
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 13,
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          minWidth: 20,
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </Typography>
                      <Box minWidth={0}>
                        <Typography
                          sx={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 14,
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-secondary)' }}>
                          {item.presenter}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>
                      {item.duration}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Attached Documents */}
            <Box
              sx={{
                bgcolor: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ px: 2.5, py: 1.5, bgcolor: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-default)' }}>
                <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                  Attached Documents
                </Typography>
              </Box>
              {selectedMeeting.documents.map((doc, index) => (
                <Box key={doc.name}>
                  {index > 0 && <Divider sx={{ borderColor: 'var(--border-muted)' }} />}
                  <Box sx={{ px: 2.5, py: 1.75, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Stack direction="row" gap={1.5} alignItems="center" flex={1} minWidth={0}>
                      <DocTypeTag type={doc.type} />
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 14,
                          color: 'var(--link-default)',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          '&:hover': { color: 'var(--link-hover)', textDecoration: 'underline' },
                        }}
                      >
                        {doc.name}
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>
                      {doc.size}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

          </Box>
        </Box>
      </Box>
    </Box>
  );
}
