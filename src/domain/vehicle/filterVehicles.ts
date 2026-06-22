import type {Vehicle, VehicleFilterId} from './types';

export function filterVehicles(
  vehicles: Vehicle[],
  filterId: VehicleFilterId,
): Vehicle[] {
  if (filterId === 'all') {
    return vehicles;
  }

  if (filterId === 'electric') {
    return vehicles.filter(vehicle => vehicle.isElectric);
  }

  if (filterId === 'sedan') {
    return vehicles.filter(vehicle =>
      vehicle.type.toLowerCase().includes('sedan'),
    );
  }

  if (filterId === 'suv') {
    return vehicles.filter(vehicle => vehicle.type.toLowerCase().includes('suv'));
  }

  return vehicles;
}
