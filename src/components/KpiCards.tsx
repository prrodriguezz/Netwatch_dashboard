import { Box, Paper, Typography, Skeleton } from '@mui/material';
import RouterIcon from '@mui/icons-material/Router';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import SpeedIcon from '@mui/icons-material/Speed';
import TimerIcon from '@mui/icons-material/Timer';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import type { KpiData } from '../types';

interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  accent: string;
  icon: React.ReactNode;
  loading?: boolean;
}

function KpiCard({ label, value, sub, accent, icon, loading }: KpiCardProps) {
  return (
    <Paper sx={{ p: 2, position: 'relative', overflow: 'hidden', height: '100%' }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Box sx={{ color: accent, opacity: 0.7, fontSize: 18 }}>{icon}</Box>
      </Box>
      {loading ? (
        <Skeleton width={80} height={40} sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />
      ) : (
        <Typography variant="h4" sx={{ color: accent, fontFamily: 'monospace', lineHeight: 1 }}>{value}</Typography>
      )}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{sub}</Typography>
    </Paper>
  );
}

interface Props { data?: KpiData; loading: boolean; }

export function KpiCards({ data, loading }: Props) {
  const cards = [
    { label: 'Dispositivos Online', value: data ? `${data.onlineDevices}` : '—', sub: `de ${data?.totalDevices ?? '—'} total`, accent: '#00D4FF', icon: <RouterIcon fontSize="small" /> },
    { label: 'Offline', value: data ? `${data.offlineDevices}` : '—', sub: 'com falha ativa', accent: '#FF4D6A', icon: <WifiOffIcon fontSize="small" /> },
    { label: 'Uso de Banda', value: data ? `${data.bandwidth} Gbps` : '—', sub: 'tráfego agregado atual', accent: '#A78BFA', icon: <SpeedIcon fontSize="small" /> },
    { label: 'Latência Média', value: data ? `${data.avgLatency} ms` : '—', sub: 'todos os dispositivos', accent: '#00E096', icon: <TimerIcon fontSize="small" /> },
    { label: 'Alertas Críticos', value: data ? `${data.criticalAlerts}` : '—', sub: '4 avisos ativos', accent: '#FF4D6A', icon: <WarningAmberIcon fontSize="small" /> },
  ];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1.5, '@media (max-width:900px)': { gridTemplateColumns: 'repeat(2, 1fr)' }, '@media (max-width:500px)': { gridTemplateColumns: '1fr' } }}>
      {cards.map(card => (
        <KpiCard key={card.label} {...card} loading={loading} />
      ))}
    </Box>
  );
}
