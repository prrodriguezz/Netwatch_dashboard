export type DeviceStatus = 'online' | 'offline' | 'degraded';

export interface Device {
  id: string;
  name: string;
  status: DeviceStatus;
  ip: string;
  cpu: number | null;
  memory: number | null;
  bandwidth: number | null;
  latency: number | null;
  location: string;
  uptime: string;
}

export interface KpiData {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  bandwidth: number;
  avgLatency: number;
  criticalAlerts: number;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  device: string;
  timestamp: Date;
}

export interface BandwidthPoint {
  time: string;
  download: number;
  upload: number;
}

export interface IncidentPoint {
  day: string;
  count: number;
}

export interface Service {
  name: string;
  uptime: number;
  status: 'operational' | 'degraded' | 'down';
}

export interface NetworkData {
  kpis: KpiData;
  devices: Device[];
  alerts: Alert[];
  bandwidth: BandwidthPoint[];
  incidents: IncidentPoint[];
  services: Service[];
}
