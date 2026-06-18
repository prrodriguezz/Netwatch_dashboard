import { Paper, Box, Typography } from '@mui/material';
import type { Service } from '../types';

interface Props { services?: Service[]; }

export function ServicesGrid({ services }: Props) {
  const color = (s: Service) => {
    if (s.status === 'down') return '#FF4D6A';
    if (s.status === 'degraded') return '#FFB700';
    return '#00E096';
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="caption" color="primary" sx={{ letterSpacing: '0.08em', display: 'block', mb: 2 }}>
        Disponibilidade dos Serviços — Últimos 30 dias
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, '@media (max-width:900px)': { gridTemplateColumns: 'repeat(2, 1fr)' }, '@media (max-width:500px)': { gridTemplateColumns: '1fr' } }}>
        {services?.map((svc) => (
          <Box
            key={svc.name}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 0.85, px: 0.5, borderBottom: '0.5px solid rgba(0,212,255,0.06)' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color(svc), flexShrink: 0 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem' }}>{svc.name}</Typography>
            </Box>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 500, color: color(svc) }}>
              {svc.uptime.toFixed(2)}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
