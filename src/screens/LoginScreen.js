import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { getRegisteredUser, saveUser } from '../services/storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Email dan password tidak boleh kosong!');
      return;
    }

    const registeredUser = await getRegisteredUser();

    if (!registeredUser) {
      setErrorMessage('Belum ada akun terdaftar! Silakan daftar terlebih dahulu.');
      return;
    }

    if (registeredUser.email.toLowerCase() !== email.toLowerCase().trim() || registeredUser.password !== password) {
      setErrorMessage('Email atau password salah!');
      return;
    }

    setErrorMessage('');
    await saveUser(registeredUser);
    navigation.replace('MainTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        {/* Header Branding */}
        <View style={styles.brandSection}>
          <View style={styles.logoCircle}>
            <Text style={{ fontSize: 40 }}>🏥</Text>
          </View>
          <Text style={styles.title}>SamoisCARE</Text>
          <Text style={styles.subtitle}>Sistem Layanan Klinik Digital Terpadu</Text>
        </View>

        {/* Card Form Login */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Masuk ke Akun Pasien</Text>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <Text style={styles.label}>Alamat Email</Text>
          <TextInput
            style={styles.input}
            placeholder="nama@email.com"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Kata Sandi</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Masukkan password Anda"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.forgotText}>Lupa Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Masuk Sekarang</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Belum memiliki akun pasien?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.registerLink}>Daftar Akun Baru</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff' },
  content: { flex: 1, justifyContent: 'center', padding: 20 },
  brandSection: { alignItems: 'center', marginBottom: 24 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#e0f2fe', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '800', color: '#0284c7', letterSpacing: 0.5 },
  subtitle: { fontSize: 13, color: '#64748b', marginTop: 4 },
  formCard: { backgroundColor: '#ffffff', padding: 24, borderRadius: 20, elevation: 4, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 },
  formTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '600', color: '#475569', marginBottom: 6 },
  input: { backgroundColor: '#f8fafc', padding: 14, borderRadius: 12, marginBottom: 14, borderWidth: 1, borderColor: '#e2e8f0', color: '#0f172a', fontSize: 14 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, marginBottom: 8 },
  passwordInput: { flex: 1, padding: 14, color: '#0f172a', fontSize: 14 },
  eyeButton: { padding: 12 },
  eyeIcon: { fontSize: 16 },
  forgotButton: { alignSelf: 'flex-end', marginBottom: 20 },
  forgotText: { color: '#0284c7', fontSize: 12, fontWeight: '600' },
  button: { backgroundColor: '#0284c7', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24, gap: 6 },
  footerText: { color: '#64748b', fontSize: 13 },
  registerLink: { color: '#0284c7', fontWeight: '700', fontSize: 13 },
  errorText: { color: '#ef4444', backgroundColor: '#fef2f2', padding: 10, borderRadius: 8, marginBottom: 14, fontSize: 12, fontWeight: '600', textAlign: 'center' }
});