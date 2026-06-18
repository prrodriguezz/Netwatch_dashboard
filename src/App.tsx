import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Fade } from '@mui/material';
import RouterIcon from '@mui/icons-material/Router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SyncIcon from '@mui/icons-material/Sync';
import { useNetworkData } from './hooks/useNetworkData';
import { KpiCards } from './components/KpiCards';
import { DeviceTable } from './components/DeviceTable';
import { AlertsPanel } from './components/AlertsPanel';
import { BandwidthChart } from './components/BandwidthChart';
import { IncidentsChart } from './components/IncidentsChart';
import { ServicesGrid } from './components/ServicesGrid';

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id); }, []);
  return <Typography sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'rgba(0,212,255,0.6)' }}>{time.toLocaleTimeString('pt-BR')}</Typography>;
}

export default function App() {
  const { data, isLoading, isError, isFetching } = useNetworkData();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: { xs: 1.5, md: 2 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, pb: 1.5, borderBottom: '0.5px solid rgba(0,212,255,0.12)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <RouterIcon sx={{ color: '#00D4FF', fontSize: 22 }} />
            <Box sx={{ position: 'absolute', top: 0, right: -2, width: 7, height: 7, borderRadius: '50%', bgcolor: '#00D4FF', animation: 'pulse 2s infinite', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: 'text.primary', lineHeight: 1, fontSize: '0.95rem' }}>NetWatch AI</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(0,212,255,0.65)', letterSpacing: '0.08em' }}>MONITORING DASHBOARD</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          {isFetching && !isLoading && (
            <Fade in>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                <SyncIcon sx={{ fontSize: 14, color: 'rgba(0,212,255,0.5)', animation: 'spin 1s linear infinite', '@keyframes spin': { to: { transform: 'rotate(360deg)' } } }} />
                <Typography sx={{ fontSize: '0.72rem', color: 'rgba(0,212,255,0.5)' }}>Atualizando</Typography>
              </Box>
            </Fade>
          )}
          {!isError && !isLoading && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
              <CheckCircleIcon sx={{ fontSize: 14, color: '#00E096' }} />
              <Typography sx={{ fontSize: '0.72rem', color: 'rgba(0,224,150,0.7)' }}>Sistema Operacional</Typography>
            </Box>
          )}
          <Clock />
        </Box>
      </Box>

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>Falha ao carregar dados de rede. Tentando novamente...</Alert>
      )}

      {isLoading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 2 }}>
          <CircularProgress sx={{ color: '#00D4FF' }} />
          <Typography color="text.secondary" variant="body2">Conectando aos dispositivos...</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <KpiCards data={data?.kpis} loading={isLoading} />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 300px' }, gap: 1.5, alignItems: 'start' }}>
            <DeviceTable devices={data?.devices} loading={isLoading} />
            <AlertsPanel alerts={data?.alerts} />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 1.5 }}>
            <BandwidthChart data={data?.bandwidth} />
            <IncidentsChart data={data?.incidents} />
          </Box>

          <ServicesGrid services={data?.services} />
        </Box>
      )}
    </Box>
  );
}
