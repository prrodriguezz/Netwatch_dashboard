import { Paper, Box, Typography, Stack } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/Error';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { Alert } from '../types';

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diff < 60) return `há ${diff} min`;
  if (diff < 1440) return `há ${Math.floor(diff / 60)}h ${diff % 60}min`;
  return `há ${Math.floor(diff / 1440)}d`;
}

interface Props { alerts?: Alert[]; }

export function AlertsPanel({ alerts }: Props) {
  const config = {
    critical: { color: '#FF4D6A', bg: 'rgba(255,77,106,0.07)', border: 'rgba(255,77,106,0.18)', icon: <ErrorOutlineIcon sx={{ fontSize: 16 }} />, label: 'CRÍTICO' },
    warning: { color: '#FFB700', bg: 'rgba(255,183,0,0.07)', border: 'rgba(255,183,0,0.18)', icon: <WarningAmberIcon sx={{ fontSize: 16 }} />, label: 'AVISO' },
    info: { color: '#00D4FF', bg: 'rgba(0,212,255,0.06)', border: 'rgba(0,212,255,0.15)', icon: <InfoOutlinedIcon sx={{ fontSize: 16 }} />, label: 'INFO' },
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="caption" color="primary" sx={{ letterSpacing: '0.08em', display: 'block', mb: 1.5 }}>Alertas Ativos</Typography>
      <Stack spacing={1}>
        {alerts?.map(alert => {
          const c = config[alert.severity];
          return (
            <Box
              key={alert.id}
              sx={{ display: 'flex', gap: 1.2, p: 1.2, borderRadius: 1.5, bgcolor: c.bg, border: `0.5px solid ${c.border}` }}
            >
              <Box sx={{ color: c.color, mt: 0.2, flexShrink: 0 }}>{c.icon}</Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" sx={{ color: c.color, fontWeight: 500, lineHeight: 1.3 }}>{alert.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.72rem', mt: 0.3, lineHeight: 1.4 }}>{alert.description}</Typography>
                <Typography variant="body2" sx={{ fontSize: '0.68rem', color: 'text.disabled', mt: 0.4, fontFamily: 'monospace' }}>
                  {timeAgo(alert.timestamp)} · {c.label}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Paper>
  );
}
