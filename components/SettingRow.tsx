import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

// Define the interface for the props
interface SettingRowProps {
  icon: string;
  title: string;
  onPress?: () => void; // Optional function for navigation
}

const SettingRow: React.FC<SettingRowProps> = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.row} 
      onPress={onPress} 
      activeOpacity={0.6}
      disabled={!onPress} // Disables touch if no action is provided
    >
      <View style={styles.leftSide}>
        <View style={styles.iconContainer}>
          {/* We cast icon name as 'any' to avoid strict FontAwesome glyph typing issues */}
          <FontAwesome name={icon as any} size={18} color={Colors.light.walletDark} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FontAwesome name="chevron-right" size={14} color="#CCC" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F0F5F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default SettingRow;