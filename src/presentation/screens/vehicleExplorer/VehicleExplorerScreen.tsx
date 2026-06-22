import React, {useMemo, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';

import {vehicles} from '../../../data';
import {useLanguage} from '../../../core/context';
import {
  filterVehicles,
  VEHICLE_FILTERS,
  VEHICLE_LINEUP_STATS,
  type Vehicle,
  type VehicleFilterId,
} from '../../../domain/vehicle';
import {withLocalizedTypography} from '../../i18n';
import {SafeAreaWrapper} from '../../ui/SafeAreaWrapper';
import {VehicleCard} from '../../ui/VehicleCard';
import {colors, fontFamilies, spacing, typography} from '../../theme';

export type VehicleExplorerScreenProps = {
  onSelectVehicle?: (vehicle: Vehicle) => void;
};

const HORIZONTAL_PADDING = 40;
const GRID_GAP = spacing.md;

function getColumnCount(width: number): number {
  if (width >= 900) {
    return 3;
  }
  if (width >= 600) {
    return 2;
  }
  return 1;
}

function ExplorerHeader() {
  const {language, isArabic} = useLanguage();

  return (
    <Animated.View
      entering={FadeInDown.duration(500)}
      style={styles.header}>
      <Text
        style={withLocalizedTypography(styles.eyebrow, language, {
          textAlign: isArabic ? 'right' : 'left',
        })}>
        {isArabic ? 'المجموعة الكاملة' : 'Complete Lineup'}
      </Text>
      <Text
        style={withLocalizedTypography(styles.title, language, {
          textAlign: isArabic ? 'right' : 'left',
        })}>
        {isArabic ? 'اختر سيارتك' : 'Select Your Genesis'}
      </Text>
    </Animated.View>
  );
}

function FilterChips({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: VehicleFilterId;
  onFilterChange: (filterId: VehicleFilterId) => void;
}) {
  const {language} = useLanguage();

  return (
    <Animated.View entering={FadeIn.duration(500).delay(200)} style={styles.filters}>
      {VEHICLE_FILTERS.map(filter => {
        const isActive = activeFilter === filter.id;

        return (
          <Pressable
            key={filter.id}
            accessibilityRole="button"
            accessibilityState={{selected: isActive}}
            onPress={() => onFilterChange(filter.id)}
            style={({pressed}) => [
              styles.filterChip,
              isActive ? styles.filterChipActive : styles.filterChipInactive,
              pressed && styles.filterChipPressed,
            ]}>
            <Text
              style={withLocalizedTypography(
                isActive ? styles.filterLabelActive : styles.filterLabelInactive,
                language,
              )}>
              {filter.label[language]}
            </Text>
          </Pressable>
        );
      })}
    </Animated.View>
  );
}

function ExplorerFooter() {
  const {language, isArabic} = useLanguage();

  return (
    <Animated.View
      entering={FadeInDown.duration(500).delay(400)}
      style={[styles.footer, isArabic && styles.footerRtl]}>
      <View style={[styles.statsRow, isArabic && styles.statsRowRtl]}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{VEHICLE_LINEUP_STATS.models}</Text>
          <Text
            style={withLocalizedTypography(styles.statLabel, language, {
              textAlign: 'center',
            })}>
            {isArabic ? 'موديلات' : 'Models'}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{VEHICLE_LINEUP_STATS.electric}</Text>
          <Text
            style={withLocalizedTypography(styles.statLabel, language, {
              textAlign: 'center',
            })}>
            {isArabic ? 'كهربائية' : 'Electric'}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{VEHICLE_LINEUP_STATS.warranty}</Text>
          <Text
            style={withLocalizedTypography(styles.statLabel, language, {
              textAlign: 'center',
            })}>
            {isArabic ? 'ضمان' : 'Warranty'}
          </Text>
        </View>
      </View>

      <Text
        style={withLocalizedTypography(styles.footerHint, language, {
          textAlign: isArabic ? 'right' : 'left',
        })}>
        {isArabic
          ? 'انقر على أي سيارة لعرض المواصفات الكاملة'
          : 'Tap any vehicle to view full specifications'}
      </Text>
    </Animated.View>
  );
}

export function VehicleExplorerScreen({
  onSelectVehicle,
}: VehicleExplorerScreenProps) {
  const {language, isArabic} = useLanguage();
  const {width} = useWindowDimensions();
  const [activeFilter, setActiveFilter] = useState<VehicleFilterId>('all');

  const numColumns = getColumnCount(width);
  const cardWidth =
    (width - HORIZONTAL_PADDING * 2 - GRID_GAP * (numColumns - 1)) /
    numColumns;

  const filteredVehicles = useMemo(
    () => filterVehicles(vehicles, activeFilter),
    [activeFilter],
  );

  return (
    <SafeAreaWrapper style={styles.root}>
      <View style={styles.headerSection}>
        <ExplorerHeader />
        <FilterChips
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </View>

      <FlatList
        key={`vehicle-grid-${numColumns}`}
        data={filteredVehicles}
        numColumns={numColumns}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={numColumns > 1 ? styles.gridRow : undefined}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text
              style={withLocalizedTypography(styles.emptyText, language, {
                textAlign: 'center',
              })}>
              {isArabic ? 'لا توجد سيارات' : 'No vehicles found'}
            </Text>
          </View>
        }
        renderItem={({item, index}) => (
          <VehicleCard
            vehicle={item}
            index={index}
            language={language}
            width={cardWidth}
            onPress={vehicle => onSelectVehicle?.(vehicle)}
          />
        )}
      />

      <ExplorerFooter />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  headerSection: {
    flexShrink: 0,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: spacing.section,
    paddingBottom: spacing.lg,
  },
  header: {
    gap: spacing.xs,
  },
  eyebrow: {
    ...typography.overline,
    color: colors.brand.copper,
    letterSpacing: 4.8,
  },
  title: {
    ...typography.headline3,
    fontFamily: fontFamilies.heading,
    fontWeight: '600',
    color: colors.ink.primary,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  filterChipActive: {
    backgroundColor: colors.brand.copper,
  },
  filterChipInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.brand.border,
  },
  filterChipPressed: {
    opacity: 0.9,
  },
  filterLabelActive: {
    ...typography.caption,
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.brand.black,
  },
  filterLabelInactive: {
    ...typography.caption,
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.brand.muted,
  },
  gridContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: spacing.xl,
  },
  gridRow: {
    gap: GRID_GAP,
  },
  emptyState: {
    minHeight: 256,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    ...typography.bodyLarge,
    color: colors.brand.muted,
  },
  footer: {
    flexShrink: 0,
    borderTopWidth: 1,
    borderTopColor: colors.brand.border,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    flexWrap: 'wrap',
  },
  footerRtl: {
    flexDirection: 'row-reverse',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  statsRowRtl: {
    flexDirection: 'row-reverse',
  },
  stat: {
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    ...typography.bodyLarge,
    color: colors.brand.copper,
    fontWeight: '600',
  },
  statLabel: {
    ...typography.caption,
    color: colors.brand.muted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  footerHint: {
    ...typography.caption,
    color: colors.brand.muted,
    flexShrink: 1,
  },
});
