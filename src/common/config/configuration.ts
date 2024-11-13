import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development',
  
  api: {
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-api-key': process.env.API_KEY || 'P1MfFHfQMOtL16Zpg36NcntJYCLFm8FqFfudnavl',  
      'x-requested-with': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
      'Origin': 'https://www.metrocuadrado.com',
      'Referer': 'https://www.metrocuadrado.com'
    }
  },

  scraper: {
    maxPages: 10,
    defaultSize: 50,
    requestDelay: 1000,
    minAdministration: 80000,
    defaultExpenses: 120000
  },

  analysis: {
    inflationRate: 0.04,
    appreciationRate: 0.05,
    yearsToProject: 5,
    defaultYieldRate: 6.0
  },

  neighborhoods: {
    yields: {
      // Zona Centro-Norte
      'Chapinero Alto': 6.50,
      'Chapinero Central': 6.70,
      'Quinta Camacho': 6.10,
      'La Cabrera': 6.20,
      'Emaus': 6.20,
      // Zona Centro
      'Teusaquillo': 6.71,
      'Galerías': 6.71,
      'La Soledad': 6.71,
      'Palermo': 6.71,
      'Marly': 6.71,
      'Quesada': 6.71,
      // Zona Centro-Occidental
      'Ciudad Salitre': 6.26,
      'Salitre Oriental': 6.26,
      'Quinta Paredes': 6.26,
      'La Esmeralda': 6.26,
      'Nicolas de Federman': 6.26,
      'fontibon': 6.26,
      // Zona Norte
      'Cedritos': 6.18,
      'Santa Barbara': 6.18,
      'Chico': 6.18,
      'Bella Suiza': 6.18,
      // Zonas Emergentes
      'San Felipe': 6.47,
      'La Castellana': 6.47,
      'Park Way': 6.71,
      'Batán': 6.18,
      'Pontevedra': 6.26
    },
    recommended: [
      'Chapinero Alto',
      'Chapinero Central',
      'Quinta Camacho',
      'La Cabrera',
      'Emaus',
      'Teusaquillo',
      'Galerías',
      'La Soledad',
      'Palermo',
      'Marly',
      'Quesada',
      'Ciudad Salitre',
      'Salitre Oriental',
      'Quinta Paredes',
      'La Esmeralda',
      'Nicolas de Federman',
      'fontibon',
      'Cedritos',
      'Santa Barbara',
      'Chico',
      'Bella Suiza',
      'San Felipe',
      'La Castellana',
      'Park Way',
      'Batán',
      'Pontevedra'
    ]
  },

  cache: {
    ttl: parseInt(process.env.CACHE_TTL, 10) || 3600
  },

  rateLimit: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL, 10) || 60,
    limit: parseInt(process.env.RATE_LIMIT_MAX, 10) || 10
  }
}));