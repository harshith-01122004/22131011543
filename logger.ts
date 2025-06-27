import axios from 'axios';

// Define allowed values for stack, level, and package
type Stack = 'backend' | 'frontend';
type Level = 'info' | 'warn' | 'error' | 'fatal';
type BackendPackage =
  | 'cache'
  | 'controller'
  | 'cron job'
  | 'domain'
  | 'handler'
  | 'repository'
  | 'route'
  | 'service';
type FrontendPackage =
  | 'api'
  | 'component'
  | 'hook'
  | 'page'
  | 'state'
  | 'style';
type CommonPackage =
  | 'auth'
  | 'config'
  | 'middleware'
  | 'utils';
type Package = BackendPackage | FrontendPackage | CommonPackage;

interface LogRequest {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

interface LogResponse {
  logID: string;
  message: string;
}

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';

// Reusable logging function
export async function tog(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string,
  authToken?: string // Optional: if API requires authorization
): Promise<LogResponse> {
  const body: LogRequest = { stack, level, package: pkg, message };
  const headers: Record<string, string> = {};
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const response = await axios.post<LogResponse>(LOG_API_URL, body, { headers });
    return response.data;
  } catch (error) {
    console.error('Failed to log:', error);
    throw error;
  }
}
