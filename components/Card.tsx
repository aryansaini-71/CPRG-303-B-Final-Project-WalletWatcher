// 1. ADD THIS LINE AT THE TOP
import React, { ReactNode } from 'react'; 
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants/Colors';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
}

// 2. CHANGE TO EXPORT DEFAULT (Matches our project style)
export default function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 28,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3, 
    marginBottom: 16,
  },
});