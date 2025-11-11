// src/components/AnimatedThemeButton.js
import React from 'react';
import { StyleSheet, Text, Pressable, Dimensions } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';

const { width, height } = Dimensions.get('window');

export default function AnimatedThemeButton({ isDarkTheme, toggleTheme }) {
  return (
    <>
      {/* Efeito suave no fundo da tela */}
      <MotiView
        from={{ backgroundColor: isDarkTheme ? '#121212' : '#ffffff' }}
        animate={{ backgroundColor: isDarkTheme ? '#121212' : '#ffffff' }}
        transition={{ duration: 600 }}
        style={{
          ...StyleSheet.absoluteFillObject,
          zIndex: -1,
        }}
      />

      {/* Partículas flutuantes no modo escuro */}
      <AnimatePresence>
        {isDarkTheme &&
          [...Array(10)].map((_, i) => (
            <MotiView
              key={i}
              from={{
                opacity: 0,
                translateY: height,
                scale: 0.5,
              }}
              animate={{
                opacity: [0.8, 0],
                translateY: height / 2 - Math.random() * 300,
                scale: [0.5, 1],
              }}
              transition={{
                duration: 3000 + Math.random() * 2000,
                delay: i * 200,
                loop: true,
              }}
              style={{
                position: 'absolute',
                left: Math.random() * width,
                top: Math.random() * height,
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.6)',
              }}
            />
          ))}
      </AnimatePresence>

      {/* Botão com animação */}
      <Pressable onPress={toggleTheme}>
        <MotiView
          from={{
            rotate: '0deg',
            scale: 1,
            backgroundColor: isDarkTheme ? '#222' : '#FFD700',
          }}
          animate={{
            rotate: isDarkTheme ? '180deg' : '0deg',
            scale: [1, 1.2, 1],
            backgroundColor: isDarkTheme ? '#4169E1' : '#FFD700',
          }}
          transition={{
            type: 'timing',
            duration: 700,
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: isDarkTheme ? 'white' : 'black', fontSize: 22 }}>
            {isDarkTheme ? '🌙' : '☀️'}
          </Text>
        </MotiView>
      </Pressable>
    </>
  );
}