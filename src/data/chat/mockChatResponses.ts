import type {AppLanguage} from '../../core/types/locale';
import type {Vehicle} from '../../domain/vehicle';

export function greetingText(language: AppLanguage, vehicle: Vehicle | null): string {
  if (language === 'ar') {
    return 'مرحباً بك في Genesis. أنا مستشارك الشخصي. كيف يمكنني مساعدتك اليوم؟';
  }
  if (vehicle) {
    return (
      `Welcome to Genesis. I see you're interested in the ${vehicle.name}. ` +
      `I'd be happy to tell you more about it or help you find the perfect Genesis for you. ` +
      'What would you like to know?'
    );
  }
  return (
    "Welcome to Genesis. I'm your personal AI concierge. Whether you're looking for a powerful sedan, " +
    "a luxury SUV, or an electric vehicle — I'm here to guide you. What brings you in today?"
  );
}
