import { Paper, Box, Typography } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import type { IncidentPoint } from '../types';

interface Props { data?: IncidentPoint[]; }

function getColor(count: number) {
  if (count >= 5) return '#FF4D6A';
  if (count >= 3) return '#FFB700';
  return '#00D4FF';
}

export function IncidentsChart({ data }: Props) {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="caption" color="primary" sx={{ letterSpacing: '0.08em', display: 'block', mb: 2 }}>
        Incidentes — Últimos 7 dias
      </Typography>
      <Box sx={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.06)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: 'rgba(226,232,240,0.4)', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: 'rgba(226,232,240,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: '#1E293B', border: '0.5px solid rgba(0,212,255,0.2)', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: 'rgba(226,232,240,0.5)' }}
              formatter={(v: unknown) => [Number(v), 'Incidentes']}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data?.map((entry, i) => (
                <Cell key={i} fill={getColor(entry.count)} fillOpacity={0.75} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
