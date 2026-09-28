import { apiClient } from '../../core/api/apiClient'
import type { ShellMetricsDto } from './metricsTypes'

export const metricsService = {
  getShellMetrics: async () => {
    return await apiClient<ShellMetricsDto>('/Metrics/shell')
  },
}
