import axios from 'axios';
import { Launch, Rocket, Launchpad } from '../types/index';

const API_BASE = 'https://api.spacexdata.com/v4';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const spaceXApi = {
  // Get all launches
  async getLaunches(): Promise<Launch[]> {
    try {
      const response = await api.get('/launches');
      return response.data;
    } catch (error) {
      console.error('Error fetching launches:', error);
      throw error;
    }
  },

  // Get upcoming launches
  async getUpcomingLaunches(): Promise<Launch[]> {
    try {
      const response = await api.get('/launches/upcoming');
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming launches:', error);
      throw error;
    }
  },

  // Get past launches
  async getPastLaunches(): Promise<Launch[]> {
    try {
      const response = await api.get('/launches/past');
      return response.data;
    } catch (error) {
      console.error('Error fetching past launches:', error);
      throw error;
    }
  },

  // Get single launch details
  async getLaunch(id: string): Promise<Launch> {
    try {
      const response = await api.get(`/launches/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching launch ${id}:`, error);
      throw error;
    }
  },

  // Get all rockets
  async getRockets(): Promise<Rocket[]> {
    try {
      const response = await api.get('/rockets');
      return response.data;
    } catch (error) {
      console.error('Error fetching rockets:', error);
      throw error;
    }
  },

  // Get single rocket
  async getRocket(id: string): Promise<Rocket> {
    try {
      const response = await api.get(`/rockets/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching rocket ${id}:`, error);
      throw error;
    }
  },

  // Get all launchpads
  async getLaunchpads(): Promise<Launchpad[]> {
    try {
      const response = await api.get('/launchpads');
      return response.data;
    } catch (error) {
      console.error('Error fetching launchpads:', error);
      throw error;
    }
  },

  // Get single launchpad
  async getLaunchpad(id: string): Promise<Launchpad> {
    try {
      const response = await api.get(`/launchpads/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching launchpad ${id}:`, error);
      throw error;
    }
  },

  // Get launch statistics
  async getLaunchStats(): Promise<{
    total_launches: number;
    successful_launches: number;
    failed_launches: number;
  }> {
    try {
      const launches = await this.getLaunches();
      const successful = launches.filter(l => l.success === true).length;
      const failed = launches.filter(l => l.success === false).length;
      return {
        total_launches: launches.length,
        successful_launches: successful,
        failed_launches: failed,
      };
    } catch (error) {
      console.error('Error calculating launch stats:', error);
      throw error;
    }
  },
};
