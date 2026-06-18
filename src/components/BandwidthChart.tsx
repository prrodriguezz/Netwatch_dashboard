import { Paper, Box, Typography } from '@mui/material';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import type { BandwidthPoint } from '../types';

interface Props { data?: BandwidthPoint[]; }

export function BandwidthChart({ data }: Props) {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="caption" color="primary" sx={{ letterSpacing: '0.08em', display: 'block', mb: 2 }}>
        Consumo de Rede — Últimas 24h
      </Typography>
      <Box sx={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="dlGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ulGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#A78BFA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.06)" />
            <XAxis dataKey="time" tick={{ fill: 'rgba(226,232,240,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} interval={3} />
            <YAxis tick={{ fill: 'rgba(226,232,240,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${v}G`} />
            <Tooltip
              contentStyle={{ background: '#1E293B', border: '0.5px solid rgba(0,212,255,0.2)', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: 'rgba(226,232,240,0.5)' }}
              formatter={(v: unknown, name?: string | number) => [`${Number(v).toFixed(1)} Gbps`, name === 'download' ? 'Download' : 'Upload'] as [string, string]}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, color: 'rgba(226,232,240,0.45)', paddingTop: 8 }}
              formatter={(v) => v === 'download' ? 'Download' : 'Upload'}
            />
            <Area type="monotone" dataKey="download" stroke="#00D4FF" strokeWidth={1.5} fill="url(#dlGrad)" dot={false} />
            <Area type="monotone" dataKey="upload" stroke="#A78BFA" strokeWidth={1.5} strokeDasharray="4 3" fill="url(#ulGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
