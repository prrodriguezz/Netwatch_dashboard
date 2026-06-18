import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Box, LinearProgress, Typography, Skeleton,
} from '@mui/material';
import type { Device } from '../types';

function StatusChip({ status }: { status: Device['status'] }) {
  const map = {
    online: { label: 'Online', color: '#00E096', bg: 'rgba(0,224,150,0.1)', border: 'rgba(0,224,150,0.25)' },
    offline: { label: 'Offline', color: '#FF4D6A', bg: 'rgba(255,77,106,0.1)', border: 'rgba(255,77,106,0.25)' },
    degraded: { label: 'Degradado', color: '#FFB700', bg: 'rgba(255,183,0,0.1)', border: 'rgba(255,183,0,0.25)' },
  };
  const s = map[status];
  return (
    <Chip
      label={s.label}
      size="small"
      sx={{ color: s.color, bgcolor: s.bg, border: `0.5px solid ${s.border}`, height: 20, fontSize: '0.68rem' }}
    />
  );
}

function BarCell({ value, color }: { value: number | null; color: string }) {
  if (value === null) return <Typography variant="body2" color="text.disabled">—</Typography>;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" sx={{ color, minWidth: 36, fontFamily: 'monospace' }}>{value}%</Typography>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{ flex: 1, height: 4, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.06)', '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 2 } }}
      />
    </Box>
  );
}

interface Props { devices?: Device[]; loading: boolean; }

const skRows = Array.from({ length: 7 });

export function DeviceTable({ devices, loading }: Props) {
  const cols = ['Dispositivo', 'Status', 'IP', 'CPU', 'Memória', 'Banda', 'Latência', 'Local', 'Uptime'];

  return (
    <TableContainer component={Paper} sx={{ flex: 1 }}>
      <Box sx={{ px: 2, pt: 1.5, pb: 1, borderBottom: '0.5px solid rgba(0,212,255,0.08)' }}>
        <Typography variant="caption" color="primary" sx={{ letterSpacing: '0.08em' }}>Dispositivos</Typography>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            {cols.map(c => <TableCell key={c}>{c}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? skRows.map((_, i) => (
                <TableRow key={i}>
                  {cols.map((c) => (
                    <TableCell key={c}><Skeleton sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} /></TableCell>
                  ))}
                </TableRow>
              ))
            : devices?.map(d => {
                const cpuColor = (d.cpu ?? 0) > 80 ? '#FF4D6A' : (d.cpu ?? 0) > 60 ? '#FFB700' : '#00E096';
                const memColor = (d.memory ?? 0) > 80 ? '#FF4D6A' : (d.memory ?? 0) > 60 ? '#FFB700' : '#00E096';
                return (
                  <TableRow key={d.id} hover sx={{ '&:hover': { bgcolor: 'rgba(0,212,255,0.02)' } }}>
                    <TableCell sx={{ fontFamily: 'monospace', color: 'text.primary', fontWeight: 500 }}>{d.name}</TableCell>
                    <TableCell><StatusChip status={d.status} /></TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{d.ip}</TableCell>
                    <TableCell sx={{ minWidth: 100 }}><BarCell value={d.cpu} color={cpuColor} /></TableCell>
                    <TableCell sx={{ minWidth: 100 }}><BarCell value={d.memory} color={memColor} /></TableCell>
                    <TableCell sx={{ fontFamily: 'monospace' }}>{d.bandwidth !== null ? `${d.bandwidth} Gbps` : <Typography variant="body2" color="text.disabled">—</Typography>}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: (d.latency ?? 0) > 30 ? '#FF4D6A' : 'text.primary' }}>
                      {d.latency !== null ? `${d.latency} ms` : <Typography variant="body2" color="error">timeout</Typography>}
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{d.location}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{d.uptime}</TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
