import type {Vehicle} from '../domain/vehicle';

import vehiclesJson from '../assets/vehicles.json';

export const vehicles = vehiclesJson as unknown as Vehicle[];
