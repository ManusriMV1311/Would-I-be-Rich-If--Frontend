import { Scenario, SimulationResultData, ApiResponse } from '../types/scenario.types';
import { mockScenarios, mockCategories, mockSimulationResult } from './mockData';

// Delay helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ScenarioService = {
  async getScenarios(category?: string): Promise<ApiResponse<Scenario[]>> {
    await delay(600); // simulate API response time
    
    let data = mockScenarios;
    if (category) {
      data = data.filter(s => s.category === category);
    }
    
    return {
      success: true,
      data,
      error: null
    };
  },

  async getCategories(): Promise<ApiResponse<typeof mockCategories>> {
    await delay(300);
    return {
      success: true,
      data: mockCategories,
      error: null
    };
  },

  async getScenarioByUuid(uuid: string): Promise<ApiResponse<Scenario>> {
    await delay(400);
    const scenario = mockScenarios.find(s => s.uuid === uuid);
    
    if (!scenario) {
      return {
        success: false,
        data: null,
        error: { code: 'NOT_FOUND', message: 'Scenario not found', details: {} }
      };
    }
    
    return {
      success: true,
      data: scenario,
      error: null
    };
  }
};

export const SimulationService = {
  async simulateScenario(uuid: string): Promise<ApiResponse<SimulationResultData>> {
    await delay(1500); // Simulate math processing time
    
    // In strict testing mode, throw a simulated 404 for unknown uuids
    if (!mockScenarios.find(s => s.uuid === uuid)) {
      return {
        success: false,
        data: null,
        error: { code: 'NOT_FOUND', message: 'Scenario not found', details: {} }
      };
    }

    return {
      success: true,
      data: mockSimulationResult,
      error: null
    };
  },

  async getResultById(resultId: string): Promise<ApiResponse<SimulationResultData>> {
    await delay(500);
    
    if (resultId !== mockSimulationResult.result_id) {
       return {
        success: false,
        data: null,
        error: { code: 'NOT_FOUND', message: 'Result expired or missing', details: {} }
      };
    }

    return {
      success: true,
      data: mockSimulationResult,
      error: null
    };
  }
};
