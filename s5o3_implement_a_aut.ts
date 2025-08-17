/**
 * File: s5o3_implement_a_aut.ts
 * Description: Implement an automated API service tracker.
 * Purpose: This project aims to create a system that can track and monitor API services automatically.
 * Author: [Your Name]
 * Date: [Current Date]
 */

// Import required libraries and modules
import axios, { AxiosResponse } from 'axios';
import { setTimeout } from 'timers';

// Define the API service interface
interface ApiService {
  id: string;
  name: string;
  url: string;
  interval: number; // in seconds
}

// Define the API service tracker class
class ApiServiceTracker {
  private services: ApiService[] = [];

  constructor(services: ApiService[]) {
    this.services = services;
  }

  // Method to track API services
  trackServices() {
    this.services.forEach((service) => {
      this.trackService(service);
    });
  }

  // Method to track a single API service
  private trackService(service: ApiService) {
    axios.head(service.url)
      .then((response: AxiosResponse) => {
        console.log(`API Service ${service.name} is up and running.`);
        this.scheduleNextCheck(service);
      })
      .catch((error) => {
        console.error(`API Service ${service.name} is down. Error: ${error.message}`);
        this.scheduleNextCheck(service);
      });
  }

  // Method to schedule the next check for a service
  private scheduleNextCheck(service: ApiService) {
    setTimeout(() => {
      this.trackService(service);
    }, service.interval * 1000); // Convert interval to milliseconds
  }
}

// Example usage
const services: ApiService[] = [
  { id: '1', name: 'Service A', url: 'https://api.servicea.com', interval: 30 },
  { id: '2', name: 'Service B', url: 'https://api.serviceb.com', interval: 60 },
  { id: '3', name: 'Service C', url: 'https://api.servicec.com', interval: 90 },
];

const tracker = new ApiServiceTracker(services);
tracker.trackServices();