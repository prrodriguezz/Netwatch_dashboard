import type { NetworkData, Device, Alert, BandwidthPoint, IncidentPoint, Service } from '../types';

const BASE_DEVICES: Device[] = [
  { id: 'd1', name: 'Router-01', status: 'online', ip: '10.0.0.1', cpu: 34, memory: 65, bandwidth: 1.2, latency: 8, location: 'DC-A', uptime: '47d 3h' },
  { id: 'd2', name: 'Router-02', status: 'offline', ip: '10.0.0.2', cpu: null, memory: null, bandwidth: null, latency: null, location: 'DC-A', uptime: '—' },
  { id: 'd3', name: 'Switch-Core', status: 'online', ip: '10.0.1.1', cpu: 18, memory: 42, bandwidth: 2.1, latency: 3, location: 'DC-A', uptime: '90d 14h' },
  { id: 'd4', name: 'FW-Primary', status: 'online', ip: '10.0.2.1', cpu: 91, memory: 78, bandwidth: 0.4, latency: 14, location: 'DC-B', uptime: '12d 6h' },
  { id: 'd5', name: 'AP-Floor1', status: 'online', ip: '10.0.3.1', cpu: 22, memory: 31, bandwidth: 0.3, latency: 6, location: 'Andar 1', uptime: '30d 0h' },
  { id: 'd6', name: 'AP-Floor2', status: 'degraded', ip: '10.0.3.2', cpu: 56, memory: 69, bandwidth: 0.1, latency: 48, location: 'Andar 2', uptime: '30d 0h' },
  { id: 'd7', name: 'NAS-Storage', status: 'offline', ip: '10.0.4.1', cpu: null, memory: null, bandwidth: null, latency: null, location: 'DC-B', uptime: '—' },
  { id: 'd8', name: 'Load-Balancer', status: 'online', ip: '10.0.5.1', cpu: 45, memory: 55, bandwidth: 3.8, latency: 5, location: 'DC-A', uptime: '25d 11h' },
  { id: 'd9', name: 'VPN-Gateway', status: 'online', ip: '10.0.6.1', cpu: 38, memory: 48, bandwidth: 0.7, latency: 20, location: 'DC-B', uptime: '60d 2h' },
];

const BASE_ALERTS: Alert[] = [
  { id: 'a1', severity: 'critical', title: 'CPU crítico — FW-Primary', description: 'Uso em 91% por 18 minutos contínuos', device: 'FW-Primary', timestamp: new Date(Date.now() - 2 * 60000) },
  { id: 'a2', severity: 'critical', title: 'NAS-Storage inacessível', description: 'Sem resposta desde 14:22 — falha de disco possível', device: 'NAS-Storage', timestamp: new Date(Date.now() - 34 * 60000) },
  { id: 'a3', severity: 'warning', title: 'Alta latência — AP-Floor2', description: '48 ms detectado (limite: 30 ms)', device: 'AP-Floor2', timestamp: new Date(Date.now() - 72 * 60000) },
  { id: 'a4', severity: 'warning', title: 'Router-02 offline', description: 'Failover ativado automaticamente para Router-01', device: 'Router-02', timestamp: new Date(Date.now() - 185 * 60000) },
  { id: 'a5', severity: 'info', title: 'Backup concluído — Switch-Core', description: 'Config backup OK · 2.1 MB salvo com sucesso', device: 'Switch-Core', timestamp: new Date(Date.now() - 360 * 60000) },
];

const BASE_SERVICES: Service[] = [
  { name: 'DNS Primário', uptime: 99.98, status: 'operational' },
  { name: 'DNS Secundário', uptime: 99.91, status: 'operational' },
  { name: 'DHCP', uptime: 100, status: 'operational' },
  { name: 'VPN Gateway', uptime: 98.72, status: 'degraded' },
  { name: 'Firewall', uptime: 99.85, status: 'operational' },
  { name: 'Proxy Web', uptime: 99.60, status: 'operational' },
  { name: 'NAS / Backup', uptime: 94.10, status: 'down' },
  { name: 'Monitoramento', uptime: 100, status: 'operational' },
  { name: 'SNMP Collector', uptime: 99.77, status: 'operational' },
  { name: 'API Interna', uptime: 99.95, status: 'operational' },
  { name: 'Load Balancer', uptime: 97.30, status: 'degraded' },
  { name: 'Syslog Server', uptime: 100, status: 'operational' },
];

function generateBandwidth(): BandwidthPoint[] {
  const now = new Date();
  return Array.from({ length: 25 }, (_, i) => {
    const d = [0.9,1.1,0.8,0.7,0.6,0.8,1.2,2.1,3.4,4.1,3.8,3.6,3.9,4.2,3.7,3.5,4.8,5.2,4.6,3.9,3.2,2.8,2.1,1.5,1.2];
    const u = [0.3,0.4,0.3,0.2,0.2,0.3,0.5,0.9,1.4,1.7,1.5,1.4,1.6,1.7,1.5,1.4,1.9,2.1,1.8,1.5,1.3,1.1,0.8,0.6,0.5];
    const h = new Date(now.getTime() - (24 - i) * 3600000);
    return { time: h.getHours() + 'h', download: d[i] + (Math.random() - 0.5) * 0.2, upload: u[i] + (Math.random() - 0.5) * 0.1 };
  });
}

function generateIncidents(): IncidentPoint[] {
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const base = [2, 5, 1, 3, 7, 2, 1];
  return days.map((day, i) => ({ day, count: base[i] }));
}

function jitter(val: number | null, delta: number): number | null {
  if (val === null) return null;
  return Math.max(0, Math.round(val + (Math.random() - 0.5) * delta));
}

export async function fetchNetworkData(): Promise<NetworkData> {
  await new Promise(r => setTimeout(r, 600));

  const devices = BASE_DEVICES.map(d => ({
    ...d,
    cpu: jitter(d.cpu, 4),
    memory: jitter(d.memory, 3),
    latency: jitter(d.latency, 3),
  }));

  const online = devices.filter(d => d.status === 'online').length;
  const offline = devices.filter(d => d.status === 'offline').length;
  const totalBw = devices.reduce((acc, d) => acc + (d.bandwidth ?? 0), 0);
  const lats = devices.filter(d => d.latency !== null).map(d => d.latency as number);
  const avgLat = Math.round(lats.reduce((a, b) => a + b, 0) / lats.length);

  return {
    kpis: {
      totalDevices: devices.length,
      onlineDevices: online,
      offlineDevices: offline,
      bandwidth: Math.round(totalBw * 10) / 10,
      avgLatency: avgLat,
      criticalAlerts: BASE_ALERTS.filter(a => a.severity === 'critical').length,
    },
    devices,
    alerts: BASE_ALERTS,
    bandwidth: generateBandwidth(),
    incidents: generateIncidents(),
    services: BASE_SERVICES,
  };
}
